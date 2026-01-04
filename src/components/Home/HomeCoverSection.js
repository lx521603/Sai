import { sortBlogs } from '@/src/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Tag from '../Elements/Tag';

const HomeCoverSection = ({ blogs }) => {
  if (!Array.isArray(blogs) || blogs.length === 0) {
    console.log('HomeCoverSection: 没有文章数据');
    return null;
  }

  console.log('=== HomeCoverSection开始执行 ===');
  
  // 方法1：先尝试找到有homeCover的文章
  const findHomeCoverBlog = () => {
    for (let blog of blogs) {
      // 检查各种可能的homeCover位置
      let hasCover = false;
      
      // 直接属性
      if (blog.homeCover === true || blog.homeCover === 'true') {
        console.log(`找到homeCover文章(直接属性): ${blog.title}`);
        hasCover = true;
      }
      // frontmatter属性
      else if (blog.frontmatter?.homeCover === true || blog.frontmatter?.homeCover === 'true') {
        console.log(`找到homeCover文章(frontmatter): ${blog.title}`);
        hasCover = true;
      }
      // metadata属性
      else if (blog.metadata?.homeCover === true || blog.metadata?.homeCover === 'true') {
        console.log(`找到homeCover文章(metadata): ${blog.title}`);
        hasCover = true;
      }
      
      if (hasCover) {
        return blog;
      }
    }
    return null;
  };

  // 方法2：排序获取最新文章
  const getLatestBlog = () => {
    const sorted = sortBlogs(blogs);
    const latest = sorted[0];
    console.log(`最新文章: ${latest?.title}`);
    return latest;
  };

  // 查找homeCover文章
  let coverBlog = findHomeCoverBlog();
  
  if (coverBlog) {
    console.log('✅ 使用homeCover文章作为封面:', coverBlog.title);
  } else {
    console.log('❌ 没有找到homeCover文章，使用最新文章');
    coverBlog = getLatestBlog();
  }

  if (!coverBlog) {
    console.log('没有找到任何文章作为封面');
    return (
      <div className="w-full text-center py-20">
        <p className="text-gray-500">暂无封面文章</p>
      </div>
    );
  }

  // 确保我们获取正确的字段
  const getField = (blog, field) => {
    // 按优先级查找字段
    const sources = [
      () => blog[field],
      () => blog.frontmatter?.[field],
      () => blog.metadata?.[field],
      () => blog.data?.[field]
    ];
    
    for (let source of sources) {
      const value = source();
      if (value !== undefined && value !== null) {
        return value;
      }
    }
    return null;
  };

  const title = getField(coverBlog, 'title') || '无标题';
  const imageSrc = getField(coverBlog, 'image')?.src || 
                   getField(coverBlog, 'image') || 
                   '/default-cover.jpg';
  const url = coverBlog.url || `/blog/${coverBlog.slug}`;
  const description = getField(coverBlog, 'description') || '';
  const tags = getField(coverBlog, 'tags') || [];
  const tagSlugs = getField(coverBlog, 'tagSlugs') || [];

  console.log('封面文章详情:', {
    title,
    image: imageSrc,
    url,
    hasImage: !!imageSrc
  });

  return (
    <div className="w-full inline-block">
      <article className="flex flex-col items-start justify-end mx-5 sm:mx-10 relative h-[60vh] sm:h-[85vh]">
        <div
          className="absolute top-0 left-0 bottom-0 right-0 h-full
            bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-0"
        />

        {/* 图片部分 */}
        <Link href={url} className="absolute inset-0 -z-10 rounded-3xl">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="w-full h-full object-center object-cover rounded-3xl hover:opacity-90 transition-opacity"
            sizes="100vw"
            priority
            // 如果没有blurDataURL，可以移除placeholder属性
          />
        </Link>

        <div className="w-full lg:w-3/4 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col items-start justify-center z-0 text-light">
          {/* 标签 */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <Tag
                  key={idx}
                  link={`/categories/${tagSlugs[idx] || tag.toLowerCase()}`}
                  name={tag}
                />
              ))}
            </div>
          )}

          {/* 标题 */}
          <Link href={url} className="mt-6">
            <h1 className="font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl">
              <span
                className="bg-gradient-to-r from-accent to-accent dark:from-accentDark/50 
                dark:to-accentDark/50 bg-[length:0px_6px]
                hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500"
              >
                {title}
              </span>
            </h1>
          </Link>

          {description && (
            <p className="mt-4 md:text-lg lg:text-xl">
              {description}
            </p>
          )}
          
          {/* 调试信息（仅在开发环境显示） */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-2 bg-black/50 text-xs rounded">
              <div>当前封面: {title}</div>
              <div>homeCover值: {String(getField(coverBlog, 'homeCover'))}</div>
              <div>图片路径: {imageSrc}</div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default HomeCoverSection;
