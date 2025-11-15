export async function generateStaticParams() {
  return blogs.map((blog) => ({ slug: encodeURIComponent(blog.slug) }));
}

export default async function BlogPage({ params }) {
  const slug = decodeURIComponent(params.slug);   // ✅ decode 一次
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  // ...
  return (
    <>
      {/* ... */}
      {blog.tags && blog.tags.length > 0 && blog.tagSlugs && blog.tagSlugs.length > 0 && (
        <Tag
          name={blog.tags[0]}
          link={`/categories/${encodeURIComponent(blog.tagSlugs[0])}`} // ✅ encode
          className="px-6 text-sm py-2"
        />
      )}
      {/* ... */}
    </>
  );
}
