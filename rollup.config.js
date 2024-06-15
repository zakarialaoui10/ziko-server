import commonjs from  '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
//import babel from '@rollup/plugin-babel';
const banner= `
/*
  Project: ziko-lottie
  Author: Zakaria Elalaoui
  Date : ${new Date()}
  Git-Repo : https://github.com/zakarialaoui10/ziko-lottie.js
  Released under MIT License
*/
`
export default {
  input: 'src/index.js',
  output: [
    {
    file: 'dist/ziko-lottie.cjs',
    format: 'cjs',
    banner,
  },{
    file: 'dist/ziko-lottie.mjs',
    format: 'es',
    banner,
  },
  {
    file: 'dist/ziko-lottie.js',
    format: 'umd',
    name:"ZikoLottie",
    banner,
    globals:{
      "ziko":"Ziko"
    }
  },
  {
    file: 'dist/ziko-lottie.min.js',
    format: 'umd',
    name:"ZikoLottie",
    banner,
    plugins:[terser({
      output: {
        comments: (node, { type, value }) => type === 'comment2' && value.includes('Author'),
      },
    })]
  },
  
],
external: ["ziko"],
  plugins: [
    resolve(), 
    commonjs(),
    // babel({
    //   babelHelpers: 'bundled', // or 'runtime'
    //   //exclude: 'node_modules/**',
    // }), 
  ],
};