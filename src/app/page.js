import { blogs } from "@/.velite/generated";
import HomeCoverSection from "../components/Home/HomeCoverSection";
import FeaturedPosts from "../components/Home/FeaturedPosts";
import RecentPosts from "../components/Home/RecentPosts";

export default function Home() {
  const safeBlogs = Array.isArray(blogs) ? blogs : [];

  return (
      <div className="glass-card w-full max-w-6xl mx-auto my-20">
        <HomeCoverSection blogs={safeBlogs} />
        <FeaturedPosts blogs={safeBlogs} />
        <RecentPosts blogs={safeBlogs} />
      </div>
  );
}
