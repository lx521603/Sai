import React from "react";
import Tag from "../Elements/Tag";
import Link from "next/link";
import Image from "next/image";

const BlogLayoutOne = ({ blog }) => {
  if (!blog) return null;

  return (
    <div className="group inline-block overflow-hidden rounded-xl relative">
      {/* 背景渐变层 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark/90 rounded-xl z-10" />

      {/* 图片 */}
      {blog.image && (
        <Image
          src={blog.image.src}
          alt={blog.title}
          width={blog.image.width}
          height={blog.image.height}
          className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-all ease duration-300"
          sizes="100vw"
        />
      )}

      {/* 点击层 */}
      <Link href={blog.url} className="absolute inset-0 z-20">
        <span className="sr-only">{blog.title}</span>
      </Link>

      {/* overlay 内容 */}
      <div className="absolute bottom-0 p-6 z-30 text-light">
        {blog.tags && blog.tagSlugs && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, idx) => (
              <Tag key={idx} link={`/categories/${blog.tagSlugs[idx]}`} name={tag} />
            ))}
          </div>
        )}
        <Link href={blog.url}>
          <h2 className="font-bold text-xl mt-2">{blog.title}</h2>
        </Link>
        {blog.description && <p className="mt-2 text-sm">{blog.description}</p>}
      </div>
    </div>
  );
};

export default BlogLayoutOne;