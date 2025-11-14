/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 构建时移除 console
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 注意：Next.js 16 不再支持在 next.config.js 中配置 eslint
  // 已移除 eslint: { ignoreDuringBuilds: true }

  // Turbopack 配置：显式 alias，兼容你现有的 import 写法
  turbopack: {
    resolveAlias: {
      "@": "./src",
      // 你项目里已经大量用了 "@/.velite/generated"
      "@/.velite/generated": "./.velite/generated",
      // 同时提供一个更清晰的别名，便于未来迁移
      "@velite": "./.velite/generated"
    }
  },

  // 保留 webpack 钩子，但注意：生产构建默认不会走 webpack（仅 Turbopack）
  // 这个钩子仅在使用 `--webpack` 时才会执行
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin())
    return config
  },
}

module.exports = nextConfig

class VeliteWebpackPlugin {
  static started = false

  apply(compiler) {
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return
      VeliteWebpackPlugin.started = true

      const dev = compiler.options.mode === 'development'
      const { build } = await import('velite')

      await build({
        watch: dev,   // 开发模式下 watch
        clean: !dev,  // 生产模式下 clean
      })
    })
  }
}
