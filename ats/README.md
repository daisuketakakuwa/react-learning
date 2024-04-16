# 技術スタック

## =======アプリ関連=======

基盤

- Node.js(14.15.4)

React

- React(16.3.2)
- react-dom(16.3.2)
- react-router(3.2.0)
- react-router-scroll(0.4.2)
- recompose(0.26.0)

Redux

- redux(3.7.2)
- redux-async-loader(1.2.3)
- redux-effects-steps(1.0.1)
- react-router-redux(4.0.8)
- react-redux(5.0.7)

HOC

- recompose(0.26.0)

### HOC(Higher-Order Component) / 高階コンポーネント

- ...lift state into functional wrappers(**関数コンポーネントが対象**)
- HOC として `withState`, `withStateHandlers`, `withHandlers`, `mapProps`, `lifecycle`, `setPropTypes` がある。
- `compose`関数を使うことで、複数の HOC を組み合わせて１つの HOC にできる。

## =======ビルド関連=======

Webpack

- webpack(4.6.0)
- webpack-bundle-analyzer(2.11.1)
- webpack-cli(3.1.1)
- webpack-dev-server(3.1.3)
- webpack-merge(4.1.2)　※storybook 用？
- html-webpack-plugin(3.1.0)

Babel(基本設定)

- babel-loader(8.0.0-beta.1)

Babel(Presets)

- @babel/preset-env(7.0.0-beta.44)
- @babel/preset-react(7.0.0-beta.44)

Babel(Plugins)

- babel-plugin-module-resolver(3.1.0)
- babel-plugin-dual-import(1.2.1)
- react-hot-loader(4.1.2) ※`webpack-dev-server --hot`で事足りてるから不要
- @babel/plugin-proposal-object-rest-spread(7.0.0-beta.44)
- @babel/plugin-syntax-dynamic-import(7.0.0-beta.44)

CSS

- style-loader(0.20.3)
- css-loader(0.28.11)
- extract-text-webpack-plugin(4.0.0-beta.0)

静的ファイル(画像)

- url-loader(1.0.1)

## ======= webpack 関連 =======

- webpack 単体は【JS】ファイルしか扱わない → **JS ファイル以外(CSS,画像) は loader に任せる。**
- バンドル/ビルド に対して Plugin でカスタマイズする。
- **バンドル(Loader 実行) → Plugin 実行**

<br>

### **CSS（css loader → style-loader → extract-text-webpack-plugin）**

React application(JS modules)<br>
　 ↓<br>
　 ↓ 【**css loader**】 collect CSS refered in Javascript modules<br>
　 ↓<br>
String<br>
　 ↓<br>
　 ↓ 【**style-loader**】 put String into \<style> tags in index.html<br>
　 ↓<br>
index.html with all styles in \<style> tags<br>
　 ↓<br>
　 ↓ 【**extract-text-webpack-plugin**】 extract \<style> tags into CSS file<br>
　 ↓<br>
index.html with `<link href="/app.css?dbf252bbfeb1e34fabcc" rel="stylesheet">`

全ての style が index.html の\<head>内に定義されるのは読みづらい。<br>
→ CSS ファイルが別のファイルに切り出すのが`extract-text-webpack-plugin`
