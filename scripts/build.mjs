import { build } from 'esbuild'

build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
  bundle: true,
  minify: true,
  format: 'cjs',
  target: ['esnext'],
}).catch(() => process.exit(1))

build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.esm.js',
  bundle: true,
  minify: false,
  format: 'esm',
  target: ['esnext'],
}).catch(() => process.exit(1))
