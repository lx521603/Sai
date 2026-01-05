import { sortBlogs } from "@/src/utils";
import Link from "next/link";
import React from "react";
import BlogLayoutThree from "../Blog/BlogLayoutThree";

const FeaturedPosts = ({ blogs }) => {
  if (!Array.isArray(blogs) || blogs.length === 0) return null;

  // 1. 筛选出设置了 featuredOrder 的文章
  const hasOrder = blogs.filter(blog => blog.featuredOrder !== undefined);
  
  // 2. 按 featuredOrder 排序（数字小的在前）
  const orderedBlogs = [...hasOrder].sort((a, b) => {
    return (a.featuredOrder || 999) - (b.featuredOrder || 999);
  });
  
  // 3. 如果不够3篇，用最新文章补足
  let displayBlogs = orderedBlogs;
  if (displayBlogs.length < 3) {
    const allSorted = sortBlogs(blogs);
    // 排除已经选中的文章
    const remaining = allSorted.filter(b => 
      !displayBlogs.some(d => d.slug === b.slug)
    );
    displayBlogs = [...displayBlogs, ...remaining.slice(0, 3 - displayBlogs.length)];
  }
  
  // 4. 只取前3篇
  displayBlogs = displayBlogs.slice(0, 6);
  
  // 5. 调试信息（可选）
  console.log('精选文章顺序:', displayBlogs.map(b => ({
    title: b.title,
    order: b.featuredOrder
  })));

  return (
    <section className="w-full mt-16 px-5 sm:px-10 md:px-24 sxl:px-32">
      <div className="flex items-center justify-between">
        <h2 className="w-fit inline-block font-bold capitalize text-2xl md:text-4xl text-dark dark:text-light">
          精选文章
        </h2>
        <Link
          href="/categories/all"
          className="inline-block font-medium text-accent dark:text-accentDark underline underline-offset-2 text-base md:text-lg"
        >
          查看全部
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {displayBlogs.map((blog) => (
          <article key={blog._id || blog.slug} className="col-span-1">
            <BlogLayoutThree blog={blog} />
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPosts;
