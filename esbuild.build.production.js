import esbuild from 'esbuild';
import htmlPlugin from '@chialab/esbuild-plugin-html';
import { sassPlugin } from 'esbuild-sass-plugin'
import { copy } from 'esbuild-plugin-copy';

// build mode
console.log(
  await esbuild.build({
    entryPoints: ['public/index.html'],
    plugins: [
      htmlPlugin(),
      copy({
        resolveFrom: 'cwd',
        assets: {
          from: ['./src/assets/*'],
        },
      }),
      sassPlugin()
    ],
    outdir: 'dist',
    bundle: true,
    minify: true,
    treeShaking: true,
    target: ['esNext', 'es2020'],
    assetNames: 'assets/[name]-[hash]',
    chunkNames: '[ext]/[name]-[hash]',
    publicPath: '/',
    define: {
    },
    jsx: 'automatic',
    loader: {
      '.jsx': 'jsx',
      '.woff2': 'file',
      '.woff': 'file',
      '.svg': 'file',
      '.png': 'file',
    },
  })
);

