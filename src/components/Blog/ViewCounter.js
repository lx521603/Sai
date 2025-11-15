"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const ViewCounter = ({ slug, noCount = false, showCount = true }) => {
  const [views, setViews] = useState(0);

  useEffect(() => {
    const incrementView = async () => {
      try {
        const decodedSlug = decodeURIComponent(slug); // ✅ decode
        let { error } = await supabase.rpc("increment", {
          slug_text: decodedSlug,
        });

        if (error) {
          console.error("Error incrementing view count:", error);
        }
      } catch (error) {
        console.error("An error occurred while incrementing the view count:", error);
      }
    };

    if (!noCount) {
      incrementView();
    }
  }, [slug, noCount]);

  useEffect(() => {
    const getViews = async () => {
      try {
        const decodedSlug = decodeURIComponent(slug); // ✅ decode
        let { data, error } = await supabase
          .from("views")
          .select("count")
          .match({ slug: decodedSlug })
          .single();

        if (error) {
          console.error("Error fetching view count:", error);
        }

        setViews(typeof data?.count === "number" ? data.count : 0); // ✅ 防御性处理
      } catch (error) {
        console.error("An error occurred while fetching the view count:", error);
      }
    };

    getViews();
  }, [slug]);

  if (showCount) {
    return <div>{views} 次浏览</div>;
  } else {
    return null;
  }
};

export default ViewCounter;
