console.log("params.slug:", params.slug);
console.log("decoded:", decodeURIComponent(params.slug));
console.log("allBlogs sample:", allBlogs[0]);

import { blogs as allBlogs } from "@/.velite/generated";
import BlogLayoutThree from "@/src/components/Blog/BlogLayoutThree";
import Categories from "@/src/components/Blog/Categories";
import { pinyin } from "pinyin-pro";  // 改用 pinyin-pro

// 生成 slug
const getTagSlug = (tag) => {
  if (/[\u4e00-\u9fa5]/.test(tag)) {
    return pinyin(tag, { toneType: "none", type: "array" })
      .join("-")
      .toLowerCase();
  }
  return tag.toLowerCase().replace(/\s+/g, "-");
};

// 预生成所有分类页 - 移除编码
export async function generateStaticParams() {
  const paths = [{ slug: "all" }];
  const seen = new Set();

  allBlogs.forEach((blog) => {
    if (blog.isPublished && Array.isArray(blog.tagSlugs)) {
      blog.tagSlugs.forEach((slug) => {
        if (!seen.has(slug)) {
          seen.add(slug);
          // ✅ 移除 encodeURIComponent
          paths.push({ slug: slug });
        }
      });
    }
  });

  return paths;
}

// SEO 元数据 - 移除解码
export async function generateMetadata({ params }) {
  const slug = params.slug; // ✅ 移除 decodeURIComponent
  if (slug === "all") {
    return {
      title: "所有文章",
      description: "浏览所有的文章和教程",
    };
  }

  const blogWithTag = allBlogs.find(
    (blog) => Array.isArray(blog.tagSlugs) && blog.tagSlugs.includes(slug) && blog.isPublished
  );

  const originalTag =
    blogWithTag && Array.isArray(blogWithTag.tags) && Array.isArray(blogWithTag.tagSlugs)
      ? blogWithTag.tags[blogWithTag.tagSlugs.indexOf(slug)]
      : slug;

  return {
    title: `${originalTag} Blogs`,
    description: `了解更多 ${originalTag} 通过我们收集的专业文章`,
  };
}

// 主组件 - 移除解码
export default function CategoryPage({ params }) {
  const currentSlug = params.slug; // ✅ 移除 decodeURIComponent

  // ✅ 改成对象数组，保留中文和拼音
  const allCategories = [{ name: "全部标签", slug: "all" }];
  allBlogs.forEach((blog) => {
    if (Array.isArray(blog.tags) && Array.isArray(blog.tagSlugs)) {
      blog.tags.forEach((tag, i) => {
        const slug = blog.tagSlugs[i];
        if (slug && !allCategories.find((c) => c.slug === slug)) {
          allCategories.push({ name: tag, slug });
        }
      });
    }
  });
  allCategories.sort((a, b) => a.slug.localeCompare(b.slug));

  // 过滤博客
  const blogs = allBlogs.filter((blog) => {
    if (currentSlug === "all") return blog.isPublished;
    return Array.isArray(blog.tagSlugs) && blog.tagSlugs.includes(currentSlug) && blog.isPublished;
  });

  // 当前标签中文名
  const currentTagName =
    currentSlug === "all"
      ? "all"
      : allBlogs.find((blog) => Array.isArray(blog.tagSlugs) && blog.tagSlugs.includes(currentSlug))
          ?.tags?.[
            allBlogs.find((blog) => Array.isArray(blog.tagSlugs) && blog.tagSlugs.includes(currentSlug))
              ?.tagSlugs.indexOf(currentSlug)
          ] || currentSlug;

  return (
    <article className="mt-12 flex flex-col text-dark dark:text-light">
      <div className="px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col">
        <h1 className="mt-6 font-semibold text-2xl md:text-4xl lg:text-5xl">
          #{currentTagName}
        </h1>
        <span className="mt-2 inline-block">
          探索更多类别，拓展您的知识！
        </span>
      </div>

      {/* ✅ Categories 组件内部也需要相应修改 */}
      <Categories categories={allCategories} currentSlug={currentSlug} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mt-5 sm:mt-10 md:mt-24 sxl:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32">
        {blogs.map((blog, index) => (
          <article
            key={blog._id || index}
            className="col-span-1 row-span-1 relative"
          >
            <BlogLayoutThree blog={blog} />
          </article>
        ))}
      </div>
    </article>
  );
}