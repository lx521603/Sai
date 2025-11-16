import React from "react";
import Tag from "../Elements/Tag";
import Link from "next/link";
import Image from "next/image";

const BlogLayoutOne = ({ blog }) => {
  if (!blog) return null;

  return (
    <div className="group inline-block overflow-hidden rounded-xl relative">
      {/* 背景渐变层 */}
      <div
        className="absolute top-0 left-0 bottom-0 right-0 h-full
          bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-xl z-10"
      />

      {/* 图片本身 */}
      {blog.image && (
        <Image
          src={blog.image.src}
          placeholder={blog.image.blurDataURL ? "blur" : undefined}
          blurDataURL={blog.image.blurDataURL}
          alt={blog.title}
          width={blog.image.width}
          height={blog.image.height}
          className="w-full h-full object-center object-cover rounded-xl group-hover:scale-105 transition-all ease duration-300"
          sizes="(max-width: 1180px) 100vw, 50vw"
        />
      )}

      {/* ✅ 透明点击层，覆盖图片但不影响文字 */}
      <Link
        href={blog.url}
        className="absolute inset-0 z-20"
      >
        <span className="sr-only">{blog.title}</span>
      </Link>

      {/* 文字和标签 overlay */}
      <div className="w-full absolute bottom-0 p-4 xs:p-6 sm:p-10 z-30">
        {/* 标签：显示所有标签 */}
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
                  className="px-4 text-xs sm:text-sm py-1 sm:py-2 !border"
                />
              ))}
            </div>
          )}

        {/* 标题 */}
        <Link href={blog.url} className="mt-6 block">
          <h2 className="font-bold capitalize text-sm xs:text-base sm:text-xl md:text-2xl text-light mt-2 sm:mt-4">
            <span
              className="bg-gradient-to-r from-accent to-accent bg-[length:0px_6px] dark:from-accentDark/50 dark:to-accentDark/50
                group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500"
            >
              {blog.title}
            </span>
          </h2>
        </Link>

        {/* 简介 */}
        {blog.description && (
          <p className="mt-2 text-xs sm:text-sm md:text-base text-light line-clamp-2">
            {blog.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogLayoutOne;
