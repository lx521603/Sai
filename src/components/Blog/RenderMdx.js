"use client"
import React from 'react'
import MDXContent from './MdxContent'
import { components as mdxComponents } from '@/src/components/Elements/mdxComponents'

const RenderMdx = ({ blog }) => {
  // 打印一下看看结构
  console.log("blog.body:", blog.body)

  // 自动判断 blog.body 的结构
  const code =
    typeof blog.body === 'string'
      ? blog.body
      : blog.body?.code || blog.body?.compiledSource || ''

  return (
    <div className='col-span-12 lg:col-span-8 font-in prose sm:prose-base md:prose-lg max-w-max
      prose-blockquote:bg-accent/20 
      prose-blockquote:p-2
      prose-blockquote:px-6
      prose-blockquote:border-accent
      prose-blockquote:not-italic
      prose-blockquote:rounded-r-lg

      prose-figure:relative
      prose-figcaption:mt-1
      prose-figcaption:mb-2

      prose-li:marker:text-accent

      dark:prose-invert
      dark:prose-blockquote:border-accentDark
      dark:prose-blockquote:bg-accentDark/20
      dark:prose-li:marker:text-accentDark

      first-letter:text-3xl
      sm:first-letter:text-5xl'> 
        <MDXContent code={code} components={mdxComponents}/>
    </div>
  )
}

export default RenderMdx