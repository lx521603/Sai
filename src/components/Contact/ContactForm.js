"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("提交的数据:", data);
    const { error } = await supabase
      .from("contacts")
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: data["phone number"],
          project_details: data["project details"],
        },
      ]);
    if (error) {
      console.error("保存失败:", error);
    } else {
      alert("提交成功！");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-12 text-base xs:text-lg sm:text-xl font-medium leading-relaxed font-in"
    >
      你好！我的名字是{" "}
      <input
        type="text"
        placeholder="请输入姓名"
        {...register("name", { required: true, maxLength: 80 })}
        className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-lg border-b border-gray focus:border-gray bg-transparent"
      />
      ，我想讨论一个潜在的项目。你可以通过邮箱联系我：
      <input
        type="email"
        placeholder="请输入邮箱"
        {...register("email", { required: true })}
        className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-lg border-b border-gray focus:border-gray bg-transparent"
      />
      ，或者电话联系我：
      <input
        type="tel"
        placeholder="请输入电话"
        {...register("phone number", {})}
        className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-lg border-b border-gray focus:border-gray bg-transparent"
      />
      <br />
      项目详情：<br />
      <textarea
        {...register("project details", {})}
        placeholder="我的项目是关于……"
        rows={3}
        className="w-full outline-none border-0 p-0 mx-0 focus:ring-0 placeholder:text-lg border-b border-gray focus:border-gray bg-transparent"
      />
      <input
        type="submit"
        value="提交请求"
        className="mt-8 font-medium inline-block capitalize text-lg sm:text-xl py-2 sm:py-3 px-6 sm:px-8 border-2 border-solid border-dark dark:border-light rounded cursor-pointer"
      />
    </form>
  );
}
