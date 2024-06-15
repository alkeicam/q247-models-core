import typescript from '@rollup/plugin-typescript';
// import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/q247-models.ts',
  output: [
    {
      file: 'dist/q247-models.esm.js',
      format: 'es'
    },
    {
      file: 'dist/q247-models.umd.js',
      format: 'umd',
      name: 'q247-models',
    }
  ],   
  // plugins: [typescript(), nodeResolve()],
  plugins: [typescript()],
};
