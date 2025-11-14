import { defineConfig, s } from 'velite'
import GithubSlugger from 'github-slugger'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

const slugger = new GithubSlugger()   // 每个构建周期只需要一个实例

const codeOptions = {
  theme: 'github-dark',
  grid: false,
}

// ---------- Blog Schema ----------
const blog = s
  .object({
    title: s.string(),
    publishedAt: s.isodate(),
    updatedAt: s.isodate(),
    description: s.string(),
    image: s.image(),
    isPublished: s.boolean().default(true),
    author: s.string(),
    tags: s.array(s.string()),          // ← 这里可以写中文
    body: s.mdx(),
    toc: s.toc(),
    slug: s.string(),
  })
  .transform(data => {
    // 1. 重置 slugger，防止跨文件累计
    slugger.reset()

    // 2. 为每个 tag 生成 URL-safe slug
    const tagSlugs = data.tags.map(tag => slugger.slug(tag))

    return {
      ...data,
      url: `/blogs/${data.slug}`,
      readingTime: readingTime(data.body),

      // 可选：把 tagSlugs 暴露给前端
      tagSlugs,

      // 图片路径处理（保持原样）
      image: {
        ...data.image,
        src: data.image.src.replace('/static', '/blogs'),
      },
    }
  })

// ---------- Velite Config ----------
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