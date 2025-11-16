import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tag from "../Elements/Tag";

const BlogLayoutTwo = ({ blog }) => {
  if (!blog) return null;

  return (
    <div className="group flex flex-col text-dark dark:text-light">
      {/* 图片 + 标签 overlay */}
      <div className="relative rounded-xl overflow-hidden">
        {blog.image && (
          <Image
            src={blog.image.src}
            alt={blog.title}
            width={blog.image.width}
            height={blog.image.height}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-all ease duration-300"
            sizes="100vw"
          />
        )}

        {/* 标签 overlay */}
        {blog.tags && blog.tagSlugs && blog.tags.length > 0 && (
          <div className="absolute top-2 left-2 z-30 flex flex-wrap gap-2">
            {blog.tags.map((tag, idx) => (
              <Tag
                key={idx}
                link={`/categories/${blog.tagSlugs[idx]}`}
                name={tag}
              />
            ))}
          </div>
        )}

        {/* 点击层覆盖图片 */}
        <Link href={blog.url} className="absolute inset-0 z-20">
          <span className="sr-only">{blog.title}</span>
        </Link>
      </div>

      {/* 标题 + 简介 + 时间（图片下方） */}
      <div className="mt-4">
        <Link href={blog.url}>
          <h2 className="font-semibold text-lg">
            {blog.title}
          </h2>
        </Link>

        {blog.description && (
          <p className="mt-2 text-sm">{blog.description}</p>
        )}

        {blog.publishedAt && (
          <span className="block text-xs text-gray dark:text-light/50 mt-2">
            {format(new Date(blog.publishedAt), "MMMM dd, yyyy")}
          </span>
        )}
      </div>
    </div>
  );
};

export default BlogLayoutTwo;
