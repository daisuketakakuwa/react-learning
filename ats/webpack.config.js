const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = (env, args) => ({
  // development: デバッグしやすい形でバンドル
  // production:  パフォーマンス効率のよい形でバンドル
  mode: args.mode || "development",
  // バンドルの入口となるJSファイル
  entry: "./src/index.js",
  // バンドルのOUTPUT
  output: {
    path: path.resolve(__dirname, "dist"),
    // ビルドごとに異なるハッシュ値を生成する -> キャッシュクリア
    filename: "[name]-[hash].js",
    // １つのファイルだけにバンドルすることが不効率な場合に複数のチャンクファイルを生成する。
    chunkFilename: "[name]-[chunkhash].js",
    // バンドルされた静的リソース(JSファイル、CSSファイル、画像)のベースパス
    publicPath: "/",
  },
  // webpack-dev-server実行時の設定
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 3000,
    // SPAでの画面遷移を有効にする
    historyApiFallback: true,
    // APIリクエストは流す
    proxy: {
      "/api": {
        target: "http://localhost:8080",
      },
    },
  },
  // module = Loaderの設定
  // Loader = 「JavaScript以外のリソース（画像、CSS）」を処理する方法を定義する
  module: {
    // Loaderを定義していく
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // ここでoptionで定義してもいいし、.babelcに切り出してもOK
          //   options: {
          //     presets: ["@babel/preset-env", "@babel/preset-react"],
          //   },
        },
      },
      // CSSが <style>タグではなく、cssファイルに出力されるように
      // https://v4.webpack.js.org/plugins/extract-text-webpack-plugin/#usage
      {
        // sass-loader使わずとも、これでCSSに変換されるっぽいわ。
        test: /\.css|.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
        }),
      },
      // 静的ファイル(画像)をインライン化(DataURL化)するかどうかをファイルサイズで決める。
      // 　limit未満の小さいファイル -> 同じHTMLファイル内にインライン化する。
      // 　limit以上の大きいファイル -> 画像ファイルに出力する。
      // 〇インライン化する = HTTPリクエスト数が減る。
      // ✕インライン化すると、画像だけ差し替えたい場合にHTMLファイルごと更新必要
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // ファイルサイズの上限（バイト単位）
              name: "images/[name].[hash:8].[ext]", // 出力ファイル名のフォーマット
            },
          },
        ],
      },
    ],
  },

  // Plugin = webpackのビルドプロセスを拡張・カスタマイズする
  plugins: [
    // CSSが <style>タグではなく、cssファイルに出力されるように
    new ExtractTextPlugin({
      filename: "app.css",
      allChunks: true,
    }),
    // バンドルで生成したJSファイルは、毎ビルド異なるファイル名となる。
    // 本プラグインで、自動で <script src="/[name]-[hash].js" /> を index.htmlに記述する。
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      // <link rel="shortcut icon" href="/favicon.png"> <head>内に自動追加する。
      favicon: "./public/favicon.png",
      // キャッシュ対策。ファイル名の末尾に?[hash]をつける。ファイル名自体にhashあればこれは不要？
      hash: true,
      // バンドルで生成するHTMLファイルをどう最小化するか。
      minify: {
        collapseWhitespace: true, // 不要な空白文字を削除
        removeComments: true,
        removeRedundantAttributes: true, // 不要な属性を削除 ex: <input type="text" の はデフォルト値なので不要
        removeStyleLinkTypeAttributes: true, // link, styleタグの不要なDefault属性指定を消す。 removeRedundantAttributesでも消えるはず
        useShortDoctype: true, // DOCTYPE宣言を小文字に ※あんま効果が分からん
        keepClosingSlash: true, // HTML5では <img src="example.jpg"> はOKだが、 /> を追加する。
      },
    }),
  ],
});
