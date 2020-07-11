import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import url from '@rollup/plugin-url';
import { terser } from 'rollup-plugin-terser'
import { injectManifest } from 'rollup-plugin-workbox';

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css: (css) => {
        css.write('public/build/bundle.css')
      },
    }),
    injectManifest({
      swDest: 'public/service-worker.js',
      globDirectory: 'public',
      swSrc : 'src/sw-src.js',
    }),
    
    url({
      // Where to put files
      destDir: 'public',
      // Path to put infront of files (in code)
      publicPath: process.env.NODE_ENV === "development"
              ? 'http://localhost:5000/assets/'
              : './assets/',
      // File name once copied
      fileName: '[name][extname]',
      // Kinds of files to process
      include: [
              '**/*.svg',
              '**/*.png',
              '**/*.gif',
              '**/*.jpg',
              '**/*.jpeg',
      ]
    }),
    url({
      // Where to put files
      destDir: 'public',
      // Path to put infront of files (in code)
      publicPath: process.env.NODE_ENV === "development"
              ? 'http://localhost:5000/'
              : '/',
      // File name once copied
      fileName: '[name][extname]',
      // Kinds of files to process
      include: [
              '*.js',
              '*.json',
      ]
    }),
    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),

    commonjs(),
    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
}

function serve() {
  let started = false

  return {
    writeBundle() {
      if (!started) {
        started = true

        require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        })
      }
    },
  }
}