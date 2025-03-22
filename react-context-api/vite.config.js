import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import dynamicImport from "vite-plugin-dynamic-import";

// MEMO
// ・esbuildのDefault Loaderとして「JavaScript, TypeScript, JSX」があるため
//   - React ✕ JS
//   - React ✕ TS
//   のどちらかでも、PluginなしでViteアプリ開発可能である。
export default defineConfig({
  build: {
    // ハッシュ化されていないアセットファイル名とハッシュ化されたバージョンのマッピングを含む manifest.json ファイルを生成する
    manifest: true,
    rollupOptions: {
      input: {
        // the default entry point
        app: "./index.html",
      },
      output: {
        assetFileNames: "assets/[name][extname]",
      },
    },
  },

  plugins: [
    // The default Vite plugin for React projects.
    //  1. Use automatic JSX runtime -> React17以降はこれ使えるのでこのPlugin無でもOK。
    //  2. Use custom Babel plugins/presets -> 未設定であればbabel使わない = babel無であればこのPlugin無でもOK。
    react(),
    // TSのpath aliasを利用するために必要な設定。
    tsconfigPaths(),
    // 動的importの引数内に変数がある場合に必要なプラグイン。
    // import(`./pages/${path}.tsx`) -> このままだとbundle時にモジュール解決できずNG
    dynamicImport(),
  ],
  // APIリクエスト -> proxy -> server -> mockAPI(json-server) へ遷移させる。
  server: {
    proxy: {
      // prefixで判断してくれる。
      "/api": "http://localhost:4000",
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    outputFile: "junit.xml",
    reportes: ["default", "junit"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "html", "clover", "json", "lcov"],
    },
    testTimeout: 30000,
  },
});
