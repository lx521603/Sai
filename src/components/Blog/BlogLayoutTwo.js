import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tag from "../Elements/Tag";

const BlogLayoutTwo = ({ blog }) => {
  if (!blog) return null;

  return (
    <div className="group grid grid-cols-12 gap-4 items-center text-dark dark:text-light relative">
      {/* 图片 */}
      {blog.image && (
        <Image
          src={blog.image.src}
          placeholder={blog.image.blurDataURL ? "blur" : undefined}
          blurDataURL={blog.image.blurDataURL}
          alt={blog.title}
          width={blog.image.width}
          height={blog.image.height}
          className="col-span-12 lg:col-span-4 aspect-square w-full h-full object-cover object-center rounded-xl group-hover:scale-105 transition-all ease duration-300"
          sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
        />
      )}

      {/* ✅ 透明点击层覆盖图片 */}
      <Link href={blog.url} className="absolute inset-0 z-20">
        <span className="sr-only">{blog.title}</span>
      </Link>

      <div className="col-span-12 lg:col-span-8 w-full z-30">
        {/* 标签：显示所有 */}
        {blog.tags &&
          blog.tags.length > 0 &&
          blog.tagSlugs &&
          blog.tagSlugs.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, idx) => (
                <Tag
                  key={idx}
                  link={`/categories/${blog.tagSlugs[idx]}`}
                  name={tag}
                  className="uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm"
                />
              ))}
            </div>
          )}

        {/* 标题 */}
        <Link href={blog.url} className="inline-block my-1">
          <h2 className="font-semibold capitalize text-base sm:text-lg">
            <span
              className="bg-gradient-to-r from-accent/50 dark:from-accentDark/50 to-accent/50 dark:to-accentDark/50
                bg-[length:0px_6px] group-hover:bg-[length:100%_6px]
                bg-left-bottom bg-no-repeat transition-[background-size] duration-500"
            >
              {blog.title}
            </span>
          </h2>
        </Link>

        {/* 简介 */}
        {blog.description && (
          <p className="mt-2 text-xs sm:text-sm md:text-base text-dark dark:text-light line-clamp-2">
            {blog.description}
          </p>
        )}

        {/* 发布时间 */}
        {blog.publishedAt && (
          <span className="inline-block w-full capitalize text-gray dark:text-light/50 font-semibold text-xs sm:text-base mt-1">
            {format(new Date(blog.publishedAt), "MMMM dd, yyyy")}
          </span>
        )}
      </div>
    </div>
  );
};

export default BlogLayoutTwo;
