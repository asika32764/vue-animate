import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { readFileSync } from 'fs';
import postcssDiscardComment from 'postcss-discard-comments';
import postcssHeader from 'postcss-header';
import postcssImport from 'postcss-import';
import dts from 'rollup-plugin-dts';
import { minify } from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';

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
    ]
  },
  {
    input: 'src/animates/main.css',
    output: {
      file: addMinToCssFilename(pkg.css),
      format: 'es',
      sourcemap: true
    },
    plugins: [
      postcss({
        // modules: true,
        extract: true,
        minimize: true,
        plugins: [
          postcssImport(),
          postcssDiscardComment({
            removeAll: true
          }),
          postcssHeader({ header })
        ]
      }),
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

function addMinToCssFilename(fileName) {
  return fileName.replace(/.css$/, '.min.css');
}
