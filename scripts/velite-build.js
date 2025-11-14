// scripts/velite-build.js
(async () => {
  const dev = process.env.NODE_ENV !== 'production'
  const { build } = await import('velite')

  await build({
    watch: dev,
    clean: !dev,
  })
})().catch((err) => {
  console.error('[velite-build] failed:', err)
  process.exit(1)
})
