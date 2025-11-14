/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  turbopack: {
    resolveAlias: {
      "@": "./src",
      "@/.velite/generated": "./.velite/generated"
    }
  },

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
        watch: dev,
        clean: !dev,
      })
    })
  }
}
