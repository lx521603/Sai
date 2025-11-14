// velite.config.ts
import { defineConfig, s } from 'velite'
import GithubSlugger from 'github-slugger'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import pinyin from 'pinyin'  // ← 中文转拼音

const slugger = new GithubSlugger()

const codeOptions = {
  theme: 'github-dark',
  grid: false,
}

// 工具：中文标签 → 拼音 slug
const getTagSlug = (tag: string): string => {
  return pinyin(tag, {
    style: pinyin.STYLE_NORMAL,
    heteronym: false,
  })
    .join('-')
    .toLowerCase()
}

const blog = s
  .object({
    title: s.string(),
    publishedAt: s.isodate(),
    updatedAt: s.isodate(),
    description: s.string(),
    image: s.image(),
    isPublished: s.boolean().default(true),
    author: s.string(),
    tags: s.array(s.string()),  // 支持中文
    body: s.mdx(),
    toc: s.toc(),
    slug: s.string(),
  })
  .transform(data => {
    slugger.reset()

    // 生成 tagSlugs（拼音），用于 URL 和过滤
    const tagSlugs = data.tags.map(getTagSlug)

    return {
      ...data,
      url: `/blogs/${data.slug}`,
      readingTime: readingTime(data.body),
      tagSlugs,  // ← 关键字段：["qianduan", "next-js"]
      image: {
        ...data.image,
        src: data.image.src.replace('/static', '/blogs'),
      },
    }
  })

export default defineConfig({
  root: 'content',
  collections: {
    blogs: {
      name: 'Blog',
      pattern: 'blogs/**/*.mdx',
      schema: blog,
    },
  },
  output: {
    data: '.velite/generated',
    assets: 'public/blogs',
    clean: true,
  },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
      [rehypePrettyCode, codeOptions],
    ],
  },
})