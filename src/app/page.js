export default function Home() {
  const safeBlogs = Array.isArray(blogs) ? blogs : [];

  return (
    <main className="flex flex-col items-center justify-center bg-cover bg-center" 
          style={{ backgroundImage: "url('/bg.jpg')" }}>
      <div className="glass-card w-full max-w-4xl">
        <HomeCoverSection blogs={safeBlogs} />
        <FeaturedPosts blogs={safeBlogs} />
        <RecentPosts blogs={safeBlogs} />
      </div>
    </main>
  );
}
