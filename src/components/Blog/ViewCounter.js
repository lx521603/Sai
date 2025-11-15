// src/components/ViewCounter.js
"use client";
import { createBrowserClient } from '@supabase/ssr'
import { useEffect, useState } from "react";

const ViewCounter = ({ slug, noCount = false, showCount = true }) => {
  const [views, setViews] = useState(0);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    // ... 原来的客户端逻辑保持不变
  }, [slug, noCount]);

  if (showCount) {
    return <div>{views} 次浏览</div>;
  }
  return null;
};

export default ViewCounter;