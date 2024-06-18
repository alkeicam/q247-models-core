import typescript from '@rollup/plugin-typescript';
// import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/q247-models-core.ts',
  output: [
    {
      file: 'dist/q247-models-core.esm.js',
      format: 'es'
    },
    {
      file: 'dist/q247-models-core.umd.js',
      format: 'umd',
      name: 'q247-models-core',
    }
  ],   
  // plugins: [typescript(), nodeResolve()],
  plugins: [typescript()],
};
