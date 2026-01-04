import { sortBlogs } from "@/src/utils";
import Link from "next/link";
import React from "react";
import BlogLayoutThree from "../Blog/BlogLayoutThree";

const RecentPosts = ({ blogs }) => {
  if (!Array.isArray(blogs) || blogs.length === 0) return null;

  // 先排序
  const sortedBlogs = sortBlogs(blogs);
  
  // 调试：查看排序结果
  console.log('RecentPosts - 排序后的前10篇文章:');
  sortedBlogs.slice(0, 10).forEach((blog, index) => {
    const date = blog.publishedAt || blog.date || blog.frontmatter?.publishedAt;
    console.log(`${index + 1}. ${blog.title} - 日期: ${date}`);
  });

  // ✅ 修改这里：取最新的6篇文章（从第0篇开始）
  // 如果你想要显示最新的6篇，应该是 slice(0, 6)
  // 如果你想要跳过前4篇（可能是homeCover和featured posts），再取6篇，应该是 slice(4, 10)
  // 根据你的需求调整：
  
  // 方案A：显示最新的6篇文章（跳过0篇）
  const recentBlogs = sortedBlogs.slice(0, 6);
  
  // 方案B：跳过前4篇（假设前4篇是homeCover和featured），再显示6篇
  // const recentBlogs = sortedBlogs.slice(4, 10);
  
  // 方案C：动态跳过已显示的文章（更灵活）
  // 假设HomeCoverSection显示1篇，FeaturedPosts显示3篇
  // const alreadyDisplayed = 4; // 已经在前面的部分显示的文章数
  // const recentBlogs = sortedBlogs.slice(alreadyDisplayed, alreadyDisplayed + 6);

  console.log('RecentPosts - 将要显示的文章:', recentBlogs.map(b => b.title));

  return (
    <section className="w-full mt-16 sm:mt-24 md:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col items-center justify-center">
      {/* 标题和"浏览所有"链接 */}
      <div className="w-full flex justify-between">
        <h2 className="w-fit inline-block font-bold capitalize text-2xl md:text-4xl text-dark dark:text-light">
          近期文章
        </h2>
        <Link
          href="/categories/all"
          className="inline-block font-medium text-accent dark:text-accentDark underline underline-offset-2 text-base md:text-lg"
        >
          浏览所有
        </Link>
      </div>

      {/* 文章列表 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-16 mt-16">
        {recentBlogs.map((blog) =>
          blog ? (
            <article
              key={blog._id || blog.slug}
              className="col-span-1 row-span-1 relative"
            >
              <BlogLayoutThree blog={blog} />
            </article>
          ) : null
        )}
      </div>
    </section>
  );
};

export default RecentPosts;
