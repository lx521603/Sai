import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tag from "../Elements/Tag";

const BlogLayoutThree = ({ blog }) => {
  if (!blog) return null;

  return (
    <div className="group flex flex-col items-center text-dark dark:text-light">
      {/* 图片：包在 Link，点击可跳转；不做文字叠加 */}
      <Link href={blog.url} className="h-full rounded-xl overflow-hidden w-full">
        {blog.image && (
          <Image
            src={blog.image.src}
            placeholder={blog.image.blurDataURL ? "blur" : undefined}
            blurDataURL={blog.image.blurDataURL}
            alt={blog.title}
            width={blog.image.width}
            height={blog.image.height}
            className="aspect-[4/3] w-full h-full object-cover object-center rounded-xl group-hover:scale-105 transition-all ease duration-300"
            sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
          />
        )}
      </Link>

      {/* 文本区：标题、简介、标签（只在这里渲染标签一次） */}
      <div className="flex flex-col w-full mt-4">
        <Link href={blog.url} className="inline-block my-1">
          <h2 className="font-semibold capitalize text-base sm:text-lg">
            <span className="bg-gradient-to-r from-accent/50 to-accent/50 dark:from-accentDark/50 dark:to-accentDark/50 bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
              {blog.title}
            </span>
          </h2>
        </Link>

        {blog.description && (
          <p className="mt-2 text-xs sm:text-sm md:text-base text-dark dark:text-light line-clamp-2">
            {blog.description}
          </p>
        )}

        {/* 标签：完整渲染一次 */}
        {blog.tags && blog.tagSlugs && blog.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
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

        {blog.publishedAt && (
          <span className="capitalize text-gray dark:text-light/50 font-semibold text-sm sm:text-base mt-2">
            {format(new Date(blog.publishedAt), "MMMM dd, yyyy")}
          </span>
        )}
      </div>
    </div>
  );
};

export default BlogLayoutThree;
