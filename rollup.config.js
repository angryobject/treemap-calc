import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default {
  input: './src/index.js',

  output: [
    { file: pkg.main, format: 'umd', name: pkg.name },
    { file: pkg.module, format: 'es' },
  ],

  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
