const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/style/main.scss";`,
      },
    },
  },
  pluginOptions: {
    svgSprite: {
      dir: './src/assets/icons',
      test: /\.svg$/,
      loaderOptions: {
        extract: false,
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('svg-sprite')
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader');
  },
})
