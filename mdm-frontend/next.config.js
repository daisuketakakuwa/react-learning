const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  // /manager/login.html ではなく /manager/login/index.html と出力させる
  // ⇒ S3にデプロイした時に /manager/loginへアクセスしたときにindex.htmlが存在する必要がある
  trailingSlash: true,
  // 本番環境向けではS3向けにデプロイする
  output: 'export',
  // ローカル環境ではAPIサーバへプロキシする
  ...(isDev && {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8080/api/:path*',
        },
      ];
    },
  }),
  // src/pages配下に Containerコンポーネント用のindex.tsを配置したい = これをPageコンポーネントとみなさないように
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
};

module.exports = nextConfig;