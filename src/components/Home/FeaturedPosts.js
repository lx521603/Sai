import { sortBlogs } from "@/src/utils";
import Link from "next/link";
import React from "react";
import BlogLayoutThree from "../Blog/BlogLayoutThree";
import Tag from "../Elements/Tag";

const RecentPosts = ({ blogs }) => {
  if (!Array.isArray(blogs) || blogs.length === 0) return null;

  const sortedBlogs = sortBlogs(blogs);

  return (
    <section className="w-full mt-16 sm:mt-24 md:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col items-center justify-center">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-16 mt-16">
        {sortedBlogs.slice(4, 10).map((blog) =>
          blog ? (
            <article key={blog._id || blog.slug} className="col-span-1 row-span-1 relative">
              <BlogLayoutThree blog={blog} />

              {/* ✅ 显示所有标签 */}
              {blog.tags && blog.tagSlugs && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {blog.tags.map((tag, idx) => (
                    <Tag key={idx} link={`/categories/${blog.tagSlugs[idx]}`} name={tag} />
                  ))}
                </div>
              )}
            </article>
          ) : null
        )}
      </div>
    </section>
  );
};

export default RecentPosts;
