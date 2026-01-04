import { sortBlogs } from '@/src/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Tag from '../Elements/Tag';

const HomeCoverSection = ({ blogs }) => {
  if (!Array.isArray(blogs) || blogs.length === 0) return null;

  // 调试：查看数据结构
  console.log('HomeCoverSection 接收的数据:', blogs[0]);
  console.log('homeCover 值:', blogs[0]?.frontmatter?.homeCover);

  // 优先 frontmatter 标记的 homeCover:true，否则取排序后的第一篇
  const sortedBlogs = sortBlogs(blogs);
  
  // ✅ 修改这里：使用 frontmatter.homeCover
  const coverBlog = blogs.find(b => 
    b.frontmatter?.homeCover === true || 
    b.frontmatter?.homeCover === 'true'
  ) || sortedBlogs[0];

  console.log('最终选中的封面文章:', coverBlog?.title);
  console.log('homeCover 状态:', coverBlog?.frontmatter?.homeCover);

  if (!coverBlog) return null;

  return (
    <div className="w-full inline-block">
      <article className="flex flex-col items-start justify-end mx-5 sm:mx-10 relative h-[60vh] sm:h-[85vh]">
        <div
          className="absolute top-0 left-0 bottom-0 right-0 h-full
            bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-0"
        />

        {/* ✅ 图片也能点击跳转 */}
        {coverBlog.image && (
          <Link href={coverBlog.url} className="absolute inset-0 -z-10 rounded-3xl">
            <Image
              src={coverBlog.image.src}
              placeholder={coverBlog.image.blurDataURL ? "blur" : undefined}
              blurDataURL={coverBlog.image.blurDataURL}
              alt={coverBlog.title}
              fill
              className="w-full h-full object-center object-cover rounded-3xl hover:opacity-90 transition-opacity"
              sizes="100vw"
              priority
            />
          </Link>
        )}

        <div className="w-full lg:w-3/4 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col items-start justify-center z-0 text-light">
          {/* ✅ 显示所有标签 */}
          {coverBlog.tags && coverBlog.tagSlugs && coverBlog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {coverBlog.tags.map((tag, idx) => (
                <Tag
                  key={idx}
                  link={`/categories/${coverBlog.tagSlugs[idx]}`}
                  name={tag}
                />
              ))}
            </div>
          )}

          {/* 标题也能点击跳转 */}
          <Link href={coverBlog.url} className="mt-6">
            <h1 className="font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl">
              <span
                className="bg-gradient-to-r from-accent to-accent dark:from-accentDark/50 
                dark:to-accentDark/50 bg-[length:0px_6px]
                hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500"
              >
                {coverBlog.title}
              </span>
            </h1>
          </Link>

          {coverBlog.description && (
            <p className="mt-4 md:text-lg lg:text-xl">
              {coverBlog.description}
            </p>
          )}
        </div>
      </article>
    </div>
  );
};

export default HomeCoverSection;
