import commonjs from 'rollup-plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import resolve from 'rollup-plugin-node-resolve'
import svelte from 'rollup-plugin-svelte'
import { terser } from 'rollup-plugin-terser'

import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
// import copy from 'rollup-plugin-copy-assets'

const production = !process.env.ROLLUP_WATCH
export default {
  input: 'src/main.js',
  output: {
    format: 'iife',
    sourcemap: true,
    name: 'app',
    file: 'public/build/bundle.js',
  },

  plugins: [
    svelte({
      dev: !production,
      css: (css) => {
        css.write('public/build/bundle.css')
      },
    }),
    resolve(),
    commonjs(),
    globals(),
    builtins(),
    // copy({
    //   assets: ['src/assets'],
    // }),

    !production && livereload('public'),

    production && terser(),
  ],
}
