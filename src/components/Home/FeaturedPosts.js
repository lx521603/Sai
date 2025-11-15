import { sortBlogs } from "@/src/utils";
import React from "react";
import BlogLayoutOne from "../Blog/BlogLayoutOne";
import BlogLayoutTwo from "../Blog/BlogLayoutTwo";
import Tag from "../Elements/Tag";

const FeaturedPosts = ({ blogs }) => {
  // 防御性：无数据不渲染
  if (!Array.isArray(blogs) || blogs.length === 0) return null;

  // 优先筛选 frontmatter 里标记了 featured:true 的文章
  const featuredBlogs = blogs.filter((blog) => blog.featured);

  // 如果没有标记，就用排序后的前 3 篇
  const sortedBlogs = sortBlogs(blogs);
  const list = featuredBlogs.length > 0 ? featuredBlogs : sortedBlogs.slice(0, 3);

  // 再次防御性：确保有内容
  if (list.length === 0) return null;

  return (
    <section className="w-full mt-16 sm:mt-24 md:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col items-center justify-center">
      <h2 className="w-full inline-block font-bold capitalize text-2xl md:text-4xl text-dark dark:text-light">
        精选文章
      </h2>

      <div className="grid grid-cols-2 grid-rows-2 gap-6 mt-10 sm:mt-16">
        {/* 第一篇：大图布局 */}
        {list[0] && (
          <article className="col-span-2 sxl:col-span-1 row-span-2 relative">
            <BlogLayoutOne blog={list[0]} />

            {/* 显示所有标签 */}
            {list[0].tags && list[0].tagSlugs && list[0].tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {list[0].tags.map((tag, idx) => (
                  <Tag key={idx} link={`/categories/${list[0].tagSlugs[idx]}`} name={tag} />
                ))}
              </div>
            )}
          </article>
        )}

        {/* 第二篇：小图布局 */}
        {list[1] && (
          <article className="col-span-2 sm:col-span-1 row-span-1 relative">
            <BlogLayoutTwo blog={list[1]} />

            {/* 显示所有标签 */}
            {list[1].tags && list[1].tagSlugs && list[1].tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {list[1].tags.map((tag, idx) => (
                  <Tag key={idx} link={`/categories/${list[1].tagSlugs[idx]}`} name={tag} />
                ))}
              </div>
            )}
          </article>
        )}

        {/* 第三篇：小图布局 */}
        {list[2] && (
          <article className="col-span-2 sm:col-span-1 row-span-1 relative">
            <BlogLayoutTwo blog={list[2]} />

            {/* 显示所有标签 */}
            {list[2].tags && list[2].tagSlugs && list[2].tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {list[2].tags.map((tag, idx) => (
                  <Tag key={idx} link={`/categories/${list[2].tagSlugs[idx]}`} name={tag} />
                ))}
              </div>
            )}
          </article>
        )}
      </div>
    </section>
  );
};

export default FeaturedPosts;
