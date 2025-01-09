import commonjs from  '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
//import babel from '@rollup/plugin-babel';
const banner= `
/*
  Project: ziko-server
  Author: Zakaria Elalaoui
  Date : ${new Date()}
  Git-Repo : https://github.com/zakarialaoui10/ziko-lottie.js
  Released under MIT License
*/
`
export default {
  input: 'src/entry-client.js',
  output: [
    {
    file: 'entry/client.js',
    format: 'es',
    banner,
  }  
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