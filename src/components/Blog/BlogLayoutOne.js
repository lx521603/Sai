import React from "react";
import Tag from "../Elements/Tag";
import Link from "next/link";
import Image from "next/image";

const BlogLayoutOne = ({ blog }) => {
  if (!blog) return null;

  const allTags = blog.tags?.map((tag, idx) => ({
    tag,
    slug: blog.tagSlugs[idx],
  })) || [];

  const overlayTags = allTags
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.min(3, allTags.length));

  return (
    <div className="group flex flex-col text-dark dark:text-light">
      {/* 图片 + 随机标签 overlay */}
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

        {overlayTags.length > 0 && (
          <div className="absolute bottom-2 left-2 z-30 flex flex-wrap gap-2">
            {overlayTags.map((item, idx) => (
              <Tag key={idx} link={`/categories/${item.slug}`} name={item.tag} />
            ))}
          </div>
        )}

        <Link href={blog.url} className="absolute inset-0 z-20">
          <span className="sr-only">{blog.title}</span>
        </Link>
      </div>

      {/* 标题 + 简介 + 全部标签 */}
      <div className="mt-4">
        <Link href={blog.url}>
          <h2 className="font-bold text-xl">{blog.title}</h2>
        </Link>
        {blog.description && <p className="mt-2 text-sm">{blog.description}</p>}

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {allTags.map((item, idx) => (
              <Tag key={idx} link={`/categories/${item.slug}`} name={item.tag} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogLayoutOne;
