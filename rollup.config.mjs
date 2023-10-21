import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { readFileSync } from 'fs';
import dts from 'rollup-plugin-dts';
import { minify } from 'rollup-plugin-esbuild';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import postcssHeader from 'postcss-header';
import postcssDiscardComment from 'postcss-discard-comments';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

const header = `/*!
 * vue-animate.css - ${pkg.homepage}
 * Version: ${pkg.version}
 * License: MIT - see LICENSE
 * 
 * This library is port of animate.css (https://github.com/animate-css/animate.css) to support Vue.js transitions.
 * The animate.css LICENSE please see: https://github.com/animate-css/animate.css/blob/main/LICENSE
 */`;

// @see https://gist.github.com/aleclarson/9900ed2a9a3119d865286b218e14d226
export default [
  {
    input: 'src/animates/main.css',
    output: {
      file: pkg.css,
      format: 'es',
      sourcemap: true
    },
    plugins: [
      postcss({
        // modules: true,
        extract: true,
        plugins: [
          postcssImport(),
          postcssDiscardComment({
            removeAll: true
          }),
          postcssHeader({ header })
        ]
      }),
      copy({
        targets: [
          { src: 'src/animates/**/*.css', dest: 'dist' },
        ],
        flatten: false
      })
    ]
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.browser,
        format: 'umd',
        sourcemap: true,
        name: 'VueAnimate',
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
      ...(process.env.NODE_ENV === 'production'
        ? [
          {
            file: addMinToFilename(pkg.browser),
            format: 'umd',
            sourcemap: true,
            name: 'VueAnimate',
            plugins: [
              minify(),
            ]
          },
          {
            file: addMinToFilename(pkg.module),
            format: 'esm',
            sourcemap: true,
            plugins: [
              minify(),
            ]
          }
        ]
        : [])
    ],
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: './tsconfig.lib.json'
      })
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: pkg.typings,
      format: 'es',
    },
    plugins: [
      dts({
        tsconfig: './tsconfig.lib.json'
      })
    ]
  }
];

function addMinToFilename(fileName) {
  return fileName.replace(/.js$/, '.min.js');
}
