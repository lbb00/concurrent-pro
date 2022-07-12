import { build } from 'esbuild'

build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
  bundle: true,
  minify: true,
  format: 'esm',
  target: ['esnext'],
}).catch(() => process.exit(1))
