// src/components/Blog/ViewCounter.js
"use client";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const ViewCounter = ({ slug, noCount = false, showCount = true }) => {
  const [views, setViews] = useState(0);

  useEffect(() => {
    const incrementView = async () => {
      try {
        let { error } = await supabase.rpc("increment", {
          slug_text: slug,
        });
        if (error) console.error("Error incrementing:", error);
      } catch (error) {
        console.error("Increment error:", error);
      }
    };

    if (!noCount) incrementView();
  }, [slug, noCount]);

  useEffect(() => {
    const getViews = async () => {
      try {
        let { data, error } = await supabase
          .from("views")
          .select("count")
          .match({ slug })
          .single();
        if (error) console.error("Error fetching:", error);
        setViews(data?.count || 0);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    getViews();
  }, [slug]);

  if (showCount) return <div>{views} 次浏览</div>;
  return null;
};

export default ViewCounter;