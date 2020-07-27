---
date: 2019-07-02
tags: Webpack
author: 社长的社畜
location: 北京
---

# Webpack官网配置指南

## HtmlWebpackPlugin
安装：npm install --save-dev html-webpack-plugin
配置：
```js
// webpack.common.js:
plugins: [
	new HtmlWebpackPlugin({
	  title: '管理输出'
  })
]
```
**HtmlWebpackPlugin**自动生成dist文件夹中的index.html，通过title配置index.html中的`<title></title>`

## CleanWebpackPlugin
引入：const { CleanWebpackPlugin } = require('clean-webpack-plugin');
配置：
```js
// webpack.common.js:
plugins: [
	new CleanWebpackPlugin()
]
```
**CleanWebpackPlugin**插件会在每次构建前清理 /dist 文件夹。

## webpack-dev-server（热加载）
安装：npm install --save-dev webpack-dev-server
配置：
```js
// webpack.dev.js:
devServer: {
	contentBase: './dist'
}
// package.json:
{
	"scripts":{
		"dev": "webpack-dev-server --open --config webpack.dev.js",
		"build": "webpack --config webpack.prod.js"
	}
}
```

## 模块热替换(hot module replacement 或 HMR)跟热加载（live reloading）有什么区别？
配置：
```js
// webpack.dev.js:
const webpack = require('webpack');
devServer: {
	contentBase: './dist',
	hot: true
},
plugins: {
	new webpack.HotModuleReplacementPlugin()
}
```

## sideEffects
配置：
```js
// package.json:
{
  "name": "your-project",
  "sideEffects": false
}
```
如果所有代码都不包含 side effect，我们就可以简单地将该属性标记为 false，来告知 webpack，它可以安全地删除未用到的 export。

## process.env.NODE_ENV
mode环境变量：'development', 'production'

## 代码分离
配置：
```js
// webpack.common.js:
// SplitChunksPlugin optimization: {
	splitChunks: {
		chunks: 'all'
	}
}
```
重复引入的模块会作为单独的一个chunk引入。

## 动态导入
```js
// webpack.common.js:
output: {
  filename: '[name].[contenthash].js',
  chunkFilename: '[name].bundle.js', // chunkFilename决定了non-entry chunk(非入口 chunk) 的名称。
  path: path.resolve(__dirname, 'dist')
}
```
然后通过异步代码来实现动态导入。

## 懒加载
通过某种操作才加载某个模块（example.js），而不是一开始就加载它。代码实例：
```js
// index.js:
button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
  var print = module.default
  print()
})
// print.js:(懒加载)
console.log('The print.js module has loaded! See the network tab in dev tools...')
export default () => {
  console.log('Button Clicked: Here\'s "some text"!')
}
```

## 缓存
缓存是为了速度更快，如果我们在部署新版本时不更改资源的文件名，浏览器可能会认为它没有被更新，就会使用它的缓存版本。通过必要的配置，可以确保 webpack 编译生成的文件能够被客户端缓存，而在文件内容变化后，能够请求到新的文件。
首先，输出的bundle应该带有hash，配置：
```js
// webpack.config.js:
output: {
  filename: '[name].[contenthash].js',
  path: path.resolve(__dirname, 'dist')
}
```
将第三方库缓存到`vendors.a42c3ca0d742766d7a28.js`（中间是hash值）中。因为它们不常变化，所以我们不想在代码更改的时候，这个hash也跟着变。配置：
```js
// webpack.config.js:
optimization: {
  runtimeChunk: 'single',
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
      }
    }
  }
}
```

## HashedModuleIdsPlugin
生产环境构建：不论是否添加任何新的本地依赖，对于前后两次构建，vendor hash 都应该保持一致。配置：
```js
// webpack.config.js:
const webpack = require('webpack');
plugins: [
  new webpack.HashedModuleIdsPlugin()
]
```
