import { blogs } from "@/.velite/generated";
import HomeCoverSection from "../components/Home/HomeCoverSection";
import FeaturedPosts from "../components/Home/FeaturedPosts";
import RecentPosts from "../components/Home/RecentPosts";

export default function Home() {
  const safeBlogs = Array.isArray(blogs) ? blogs : [];

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bd.jpg')" }}
    >
      <div className="glass-card w-full max-w-4xl mx-auto">
        <HomeCoverSection blogs={safeBlogs} />
        <FeaturedPosts blogs={safeBlogs} />
        <RecentPosts blogs={safeBlogs} />
      </div>
    </main>
  );
}
