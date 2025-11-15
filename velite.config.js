import { defineConfig, s } from 'velite'
import GithubSlugger from 'github-slugger'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { pinyin } from 'pinyin-pro'   // ✅ 中文标签转拼音

const slugger = new GithubSlugger()

const codeOptions = {
  theme: 'github-dark',
  grid: false,
}

const blog = s
  .object({
    title: s.string(),
    // ✅ 新字段
    date: s.isodate().optional(),
    update: s.isodate().optional(),
    // ✅ 老字段兼容
    publishedAt: s.isodate().optional(),
    updatedAt: s.isodate().optional(),
    description: s.string().optional(),
    summary: s.string().optional(),
    excerpt: s.string().optional(),
    image: s.image().optional(),
    isPublished: s.boolean().default(true),
    author: s.string().optional(),
    tags: s.array(s.string()).optional().default([]),
    body: s.mdx(),
    toc: s.toc().optional(),
    slug: s.string().optional(),
  })
  .transform(data => {
    slugger.reset()

    // ✅ 中文标签转拼音 slug
    const tagSlugs = (data.tags || []).map(tag => {
      if (/[\u4e00-\u9fa5]/.test(tag)) {
        return pinyin(tag, { toneType: 'none', type: 'array' }).join('-').toLowerCase()
      }
      return slugger.slug(tag)
    })

    // ✅ 标题 slug 也支持中文
    const titleSlug = /[\u4e00-\u9fa5]/.test(data.title)
      ? pinyin(data.title, { toneType: 'none', type: 'array' }).join('-').toLowerCase()
      : slugger.slug(data.title)

    return {
      ...data,
      slug: data.slug || titleSlug,
      url: `/blogs/${data.slug || titleSlug}`,
      readingTime: readingTime(data.body),
      tagSlugs,
      // ✅ 自动兼容老字段
      date: data.date || data.publishedAt || new Date().toISOString(),
      update: data.update || data.updatedAt || new Date().toISOString(),
      description: data.description || data.summary || data.excerpt || '',
      image: data.image
        ? {
            ...data.image,
            src: data.image.src.replace('/static', '/blogs'),
          }
        : null,
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
