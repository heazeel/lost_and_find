// const vuxLoader = require('vux-loader')
// const webpack = require('webpack');
const path = require('path');
const { resolve } = require('path');
module.exports = {
  // 将部署应用程序的基本URL
  // 将部署应用程序的基本URL。
  // 默认情况下，Vue CLI假设您的应用程序将部署在域的根目录下。
  // https://www.my-app.com/。如果应用程序部署在子路径上，则需要使用此选项指定子路径。例如，如果您的应用程序部署在https://www.foobar.com/my-app/，集baseUrl到'/my-app/'.

  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',

  // eslint-disable-next-line no-dupe-keys
  outputDir: 'dist',

  // pages:{ type:Object,Default:undfind }
  /*
构建多页面模式的应用程序.每个“页面”都应该有一个相应的JavaScript条目文件。该值应该是一
个对象，其中键是条目的名称，而该值要么是指定其条目、模板和文件名的对象，要么是指定其条目
的字符串，
注意：请保证pages里配置的路径和文件名 在你的文档目录都存在 否则启动服务会报错的
*/
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
    },
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    // subpage: 'src/subpage/main.js'
  },

  //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
  lintOnSave: 'warning',

  chainWebpack: config => {
    config.plugins.delete('prefetch-index');
  },
  configureWebpack: config => {
    config.resolve = {
      extensions: ['.js', '.json', '.vue'],
      alias: {
        vue: 'vue/dist/vue.js',
        '@': path.resolve(__dirname, './src'),
        '@c': path.resolve(__dirname, './src/components'),
        valineJS: resolve('static/valine.js'),
      },
      plugins: [
        // 下面是下载的插件的配置
        // new CompressionWebpackPlugin({
        //   filename: '[path].gz[query]',
        //   algorithm: 'gzip',
        //   test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        //   threshold: 10240,
        //   minRatio: 0.8,
        //   deleteOriginalAssets: false, // 删除原文件
        // }),
      ],
    };
  },

  // productionSourceMap：{ type:Bollean,default:true } 生产源映射
  // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  productionSourceMap: false,

  devServer: {
    port: 8081,
    host: 'localhost',
    open: true,
    https: false,
    // proxy: {
    //   '/api': {
    //     target: 'http://118.31.59.223:8080/lost-and-find/',
    //     // target: 'http://localhost:8080/',
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': '',
    //     },
    //   },
    // },
  },
  // dev: {
  //   // Paths
  //   assetsSubDirectory: 'static',
  //   assetsPublicPath: '/',
  //   proxyTable: { // axios跨域处理
  //     '/api': { // 此处并非和url一致
  //       target: 'http://118.31.59.223:8080/lost-and-find/lost_and_find/',
  //       changeOrigin: true, // 允许跨域
  //       pathRewrite: {
  //         '^/api': '',
  //       },
  //     },
  //   },
  // },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "./src/styles/main.scss";',
      },
      less: {
        javascriptEnabled: true,
      },
    },
    // postcss: {
    //     plugins: [
    //     require('postcss-px2rem')({
    //         remUnit: 37.5
    //     })
    //     ]
    //     }
    // }
  },
};
