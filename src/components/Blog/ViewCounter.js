// src/components/ViewCounter.js
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function ViewCounter({ slug, noCount = false, showCount = true }) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  try {
    // 增加浏览次数
    if (!noCount) {
      const { error } = await supabase.rpc("increment", {
        slug_text: slug
      });
      if (error) {
        console.error("Error incrementing view count:", error);
      }
    }

    // 获取浏览次数
    const { data, error } = await supabase
      .from("views")
      .select("count")
      .match({ slug })
      .single();

    if (error) {
      console.error("Error fetching view count:", error);
    }

    const views = data?.count || 0;

    if (showCount) {
      return <div>{views} 次浏览</div>;
    }
    
    return null;

  } catch (error) {
    console.error("Unexpected error in ViewCounter:", error);
    if (showCount) {
      return <div>0 次浏览</div>;
    }
    return null;
  }
}