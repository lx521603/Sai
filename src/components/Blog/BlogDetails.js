import { format, parseISO } from "date-fns";
import Link from "next/link";
import React from "react";
import ViewCounter from "./ViewCounter";

const BlogDetails = ({ blog, slug: blogSlug }) => {
  if (!blog) return null;

  return (
    <div className="px-2 md:px-10 bg-accent dark:bg-accentDark text-light dark:text-dark py-2 flex items-center justify-around flex-wrap text-lg sm:text-xl font-medium mx-5 md:mx-10 rounded-lg">
      {/* 发布时间 */}
      <time className="m-3">
        {blog.publishedAt
          ? format(parseISO(blog.publishedAt), "LLLL d, yyyy")
          : ""}
      </time>

      {/* 浏览计数 */}
      <span className="m-3">
        <ViewCounter slug={blogSlug} />
      </span>

      {/* 阅读时长 */}
      <div className="m-3">{blog.readingTime?.text || ""}</div>

      {/* ✅ 显示所有标签 */}
      {blog.tags && blog.tagSlugs && blog.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 m-3">
          {blog.tags.map((tag, idx) => (
            <Link
              key={idx}
              href={`/categories/${blog.tagSlugs[idx]}`}
              className="px-2 py-1 bg-dark/20 dark:bg-light/20 rounded text-sm hover:bg-accent hover:text-light transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogDetails;