import { sortBlogs } from '@/src/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Tag from '../Elements/Tag';

const HomeCoverSection = ({ blogs }) => {
  if (!Array.isArray(blogs) || blogs.length === 0) {
    console.log('HomeCoverSection: 没有接收到文章数据');
    return null;
  }

  // 调试：查看所有文章的 homeCover 状态
  console.log('=== HomeCoverSection 调试信息 ===');
  blogs.forEach((blog, index) => {
    console.log(`${index + 1}. ${blog.title || blog.frontmatter?.title}`);
    console.log('  - homeCover (直接访问):', blog.homeCover);
    console.log('  - homeCover (frontmatter访问):', blog.frontmatter?.homeCover);
    console.log('  - 是否有 frontmatter:', !!blog.frontmatter);
  });

  // 查找有 homeCover 的文章
  const homeCoverBlogs = blogs.filter(blog => {
    const hasCover = 
      blog.homeCover === true || 
      blog.homeCover === 'true' || 
      blog.frontmatter?.homeCover === true ||
      blog.frontmatter?.homeCover === 'true';
    return hasCover;
  });
  
  console.log('找到 homeCover 文章数量:', homeCoverBlogs.length);
  
  // 如果有 homeCover 文章，按日期排序后取最新的一篇
  let coverBlog;
  if (homeCoverBlogs.length > 0) {
    // 按日期排序 homeCover 文章
    const sortedCoverBlogs = [...homeCoverBlogs].sort((a, b) => {
      const dateA = a.publishedAt || a.date || a.frontmatter?.publishedAt || a.frontmatter?.date;
      const dateB = b.publishedAt || b.date || b.frontmatter?.publishedAt || b.frontmatter?.date;
      return new Date(dateB) - new Date(dateA); // 最新的在前面
    });
    coverBlog = sortedCoverBlogs[0];
    console.log('选择 homeCover 文章:', coverBlog.title);
  } else {
    // 没有 homeCover 文章，取最新的一篇
    const sortedBlogs = sortBlogs(blogs);
    coverBlog = sortedBlogs[0];
    console.log('没有找到 homeCover，使用最新文章:', coverBlog.title);
  }

  if (!coverBlog) {
    console.log('没有找到任何文章作为封面');
    return null;
  }

  console.log('最终封面文章信息:', {
    title: coverBlog.title,
    homeCover: coverBlog.homeCover || coverBlog.frontmatter?.homeCover,
    image: coverBlog.image,
    url: coverBlog.url
  });

  // 获取实际要使用的字段
  const title = coverBlog.title || coverBlog.frontmatter?.title;
  const image = coverBlog.image || { src: '/default-cover.jpg' };
  const url = coverBlog.url || `/blog/${coverBlog.slug}`;
  const description = coverBlog.description || coverBlog.frontmatter?.description;
  const tags = coverBlog.tags || coverBlog.frontmatter?.tags || [];
  const tagSlugs = coverBlog.tagSlugs || [];

  return (
    <div className="w-full inline-block border-4 border-green-500"> {/* 临时添加边框以便识别 */}
      <article className="flex flex-col items-start justify-end mx-5 sm:mx-10 relative h-[60vh] sm:h-[85vh]">
        <div
          className="absolute top-0 left-0 bottom-0 right-0 h-full
            bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-0"
        />

        {/* 图片部分 */}
        <Link href={url} className="absolute inset-0 -z-10 rounded-3xl">
          <Image
            src={typeof image === 'string' ? image : image.src}
            placeholder="blur"
            blurDataURL={image.blurDataURL || '/default-cover.jpg'}
            alt={title}
            fill
            className="w-full h-full object-center object-cover rounded-3xl hover:opacity-90 transition-opacity"
            sizes="100vw"
            priority
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
        </div>
      </article>
    </div>
  );
};

export default HomeCoverSection;
