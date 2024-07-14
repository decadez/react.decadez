import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import Utils from "../rollup/utils";
import replace from '@rollup/plugin-replace';

// 提供给下游工程的vite，便于调试框架
export default defineConfig({
  server: {
    hmr: true
  },
  plugins: [
    react(),
    replace({
      __DEV__: true,
      preventAssignment: true,
    }),
  ],
  resolve: {
    alias: [
      {
        find: 'react',
        replacement: Utils.resolvePkgPath('react'),
      },
      {
        find: 'react-dom',
        replacement: Utils.resolvePkgPath('react-dom'),
      },
      {
        find: "hostConfig",
        replacement: path.resolve(
          Utils.resolvePkgPath('react-dom'),
          './src/hostConfig.ts'
        )
      }
    ]
  }
})