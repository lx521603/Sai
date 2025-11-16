import { sortBlogs } from "@/src/utils";
import React from "react";
import BlogLayoutOne from "../Blog/BlogLayoutOne";
import BlogLayoutTwo from "../Blog/BlogLayoutTwo";

const FeaturedPosts = ({ blogs }) => {
  if (!Array.isArray(blogs) || blogs.length === 0) return null;

  const featuredBlogs = blogs.filter((blog) => blog.featured);
  const sortedBlogs = sortBlogs(blogs);
  const list = featuredBlogs.length > 0 ? featuredBlogs : sortedBlogs.slice(0, 3);

  if (list.length === 0) return null;

  return (
    <section className="w-full mt-16 sm:mt-24 md:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col items-center justify-center">
      <h2 className="w-full inline-block font-bold capitalize text-2xl md:text-4xl text-dark dark:text-light">
        精选文章
      </h2>

      <div className="grid grid-cols-2 grid-rows-2 gap-6 mt-10 sm:mt-16">
        {list[0] && (
          <article className="col-span-2 sxl:col-span-1 row-span-2 relative">
            <BlogLayoutOne blog={list[0]} />
          </article>
        )}

        {list[1] && (
          <article className="col-span-2 sm:col-span-1 row-span-1 relative">
            <BlogLayoutTwo blog={list[1]} />
          </article>
        )}

        {list[2] && (
          <article className="col-span-2 sm:col-span-1 row-span-1 relative">
            <BlogLayoutTwo blog={list[2]} />
          </article>
        )}
      </div>
    </section>
  );
};

export default FeaturedPosts;
