import esbuild from 'esbuild';
import htmlPlugin from '@chialab/esbuild-plugin-html';
import { sassPlugin } from 'esbuild-sass-plugin'
import { solidPlugin } from 'esbuild-plugin-solid';
import { copy } from 'esbuild-plugin-copy';

let ctx = await esbuild.context({
  entryPoints: ['public/index.html', 'src/index.tsx'],
  plugins: [
    htmlPlugin(),
    copy({
      resolveFrom: 'cwd',
      assets: {
        from: ['./src/assets/*'],
      },
      watch: true,
    }),
    sassPlugin(),
    solidPlugin()
  ],
  outdir: 'dist',
  bundle: true,
  publicPath: '/',
  target: ['esNext', 'es2020'],
  assetNames: 'assets/[name]-[hash]',
  chunkNames: '[ext]/[name]-[hash]',
  define: {
  },
  jsxDev: true,
  jsx: 'automatic',
  loader: {
    '.jsx': 'jsx',
    '.woff2': 'file',
    '.woff': 'file',
    '.svg': 'file',
    '.png': 'file',
  },
  banner: {
    js: '(() => { (new EventSource("/esbuild")).addEventListener(\'change\', () => location.reload()); })();',
  },
});

console.info('Starting Watch');
await ctx.watch();

console.info('Starting serve');
let { host, port } = await ctx.serve({ servedir: 'dist', port: 3000 });
console.info(`Serving: http://${host}:${port}`);

