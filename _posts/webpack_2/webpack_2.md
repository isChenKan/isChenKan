---
date: 2020-03-22
tags: Webpack
author: 社长的社畜
location: 北京
---

# webpack-从配置到源码

## init package.json
npm init -y（-y是默认都选yes的意思）

## scripts
通过npm run build运行构建的原理是：模块局部安装会在./node_modules/.bin目录创建软连接，package.json可以读取到.bin目录下的这些命令。当npm run scripts的时候，会去.bin目录下寻找对应的命令。
```js
// 配置：
"scripts": {
  "build": "webpack"
},
```
运行`npm run build`就相当于运行`./node_modules/.bin/webpack`

## Plugins
插件用于bundle文件的优化，资源管理（构建之前删除某些指定文件之类的）和环境变量注入。作用于整个构建过程。

## Mode
process.env.NODE_ENV

production(default), development, none
设置mode可以使用webpack内置的函数。

## Loader
```js
{
  test: /.css$/,
  use: ["style-loader", "css-loader" ]
}
```
注意：loader是链式调用的，执行顺序是从右向左。这里实际执行的时候先执行css-loader，再执行style-loader。

## file-loader
图片和字体的打包
```js
{
  test: /\.(png|jpg|gif|jpeg)$/,
  use: 'file-loader'
},
{
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  use: 'file-loader'
}
```
图片打包还可以用url-loader，对于小图片转成base64:
```js
{
  test: /\.(png|jpg|gif|jpeg)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 10240 //字节，10kb
    }
  }
}
```
小于10kb的图片，打包成base64。减少网络请求。

## 文件监听
在发现源码发生变化的时候，自动重新构建出新的输出文件。
* webpack命令，带上--watch
* 在配置webpack.config.js中设置watch: true

### watch的缺点:
1. 每次监听到代码变化后会自动重新构建，但是需要手动刷新浏览器。
2. I/O，每次构建完都放到硬盘上，速度慢。

## 热更新(webpack-dev-server) HMR
配合HotModuleReplacementPlugin，构建后输出的文件直接放在内存里。
package.json, script配置:
```js
"dev": "webpack-dev-server --open" // --open：构建完成后自动开启浏览器
```
```js
// webpack配置：
plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
devServer: {
    contentBase: './dist',
    hot: true
}
```
### 热更新原理：
这里面的热更新有最核心的是 HMR Server 和 HMR runtime。

HMR Server 是服务端，用来将变化的 js 模块通过 websocket 的消息通知给浏览器端。
HMR Runtime是浏览器端，用于接受 HMR Server 传递的模块数据，浏览器端可以看到 .hot-update.json 的文件过来。

HotModuleReplacementPlugin是做什么用的？
webpack 构建出来的 bundle.js 本身是不具备热更新的能力的，HotModuleReplacementPlugin 的作用就是将 HMR runtime 注入到 bundle.js，使得bundle.js可以和HMR server建立websocket的通信连接。
￼
## 文件指纹
文件指纹的作用是：版本管理，利用缓存。

```js
// image: hash(md5)
{
  test: /\.(png|jpg|gif|jpeg)$/,
  use: {
    loader: 'file-loader',
    options: {
      name: `'[name]_[hash:8][ext]'`
    }
  }
}
// js: `[chunkhash]`
output: {
  path: path.join(__dirname, 'dist'),
  filename: `'[name]_[chunkhash:8].js'` // 取八位
}
// css: `[contenthash]`
{
  test: `/\.css$/`,
  use: [
    // "style-loader",
    MiniCssExtractPlugin.loader,
      "css-loader"
    ]
}
// plugins: [
    // 把css提取出来形成一个独立的文件
    new MiniCssExtractPlugin({
      filename: `'[name]_[contenthash:8].css'`
    })
]
```

## 代码压缩
js文件的压缩：（内置了uglifyjs-webpack-plugin，默认压缩）

css文件的压缩：optimize-css-assets-webpack-plugin, cssnano
```js
plugins: [
	new OptimizeCSSAssetsPlugin({
		assetsNameRegExp: /\.css$/g,
		cssProcessor: require('cssnano')
	})
]
```
html文件的压缩：html-webpack-plugin, 设置压缩参数。

## 自动清理构建目录
￼clean-webpack-plugin

## postcss-loader
```js
{
     loader: "postcss-loader",
     options: {
     		plugins: () => [
          		require('autoprefixer')({
          			browsers: ['last 2 version', '>1%', 'ios 7']
          		})
      		]
      }
}
```
## 移动端rem打包问题
[https://github.com/amfe/article/issues/17](https://github.com/amfe/article/issues/17)
￼
## 资源内联

row-loader, html-inline-css-webpack-plugin

## source-map

配置：`devtool: 'source-map' (|| 'cheap-source-map')`

## splitchunks
```js
// 提取公共文件和react：
optimization: {
  splitChunks: {
    minSize: 0, // 最小的体积限制
    cacheGroups: {
      vendors: {
        test: /(react|react-dom)/,
        name: 'vendors',
        chunks: 'all'
      },
      commons: {
        name: 'commons',
        chunks: 'all',
        minChunks: 2 // 公共资源最少引用的次数
      }
    }
  }
}
```
## tree shaking（摇树优化）
tree shaking利用DCE（Dead Code Elimination(淘汰)）来删除没有用的代码。
* 代码不会被执行
* 代码执行的结果不会被用到
* 代码只会影响死变量（只写不读）

另外，函数不能有副作用：

副作用这个概念来源于函数式编程(FP)，纯函数是没有副作用的，也不依赖外界环境或者改变外界环境。纯函数的概念是：接受相同的输入，任何情况下输出都是一样的。
非纯函数存在副作用，副作用就是：相同的输入，输出不一定相同。或者这个函数会影响到外部变量、外部环境。
函数如果调用了全局对象或者改变函数外部变量，则说明这个函数有副作用。

## 代码分割：动态import，懒加载脚本

支持动态import需要babel的插件：
```js
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import" // 就是这个
  ]
}
// 动态import：
loadComponent() {
    import('./text.js').then((Text) => {
      this.setState({
        Text: Text.default
      })
    })
}
```
打包的时候，text.js这个组件会单独build，形如：1_43d42d49.js（打包出来的懒加载脚本）。只有执行loadComponent的时候才会加载该文件。

## webpack打包library

这里的例子是一个计算大整数的add函数：
```js
export default function add(a, b) {
  let i = a.length - 1
  let j = b.length - 1
  let carry = 0
  let ret = ''
  while (i >= 0 || j >= 0) {
    let x = 0
    let y = 0
    let sum = 0
    if (i >= 0) {
      x = +a[i]
      i--
    }
    if (j >= 0) {
      y = +b[j]
      j--
    } 
    // add('99999999999999999999999999999999999', '1')
    sum = x + y + carry
    if (sum >= 10) {
      carry = 1
      sum -= 10
    } else {
      carry = 0
    }
    ret = sum + ret
  }
  if (carry) {
    ret = carry + ret
  }
  return ret
}
webpack.config.js配置：
const TerserPlugin = require('terser-webpack-plugin') // 压缩器

module.exports = {
  entry: {
    'large-number': './src/index.js', // 完整版
    'large-number.min': './src/index.js', // 压缩版
  },
  output: {
    filename: '[name].js',
    library: 'largeNumber',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  mode: 'none', // 如果这里是production的话，上面的两个文件都会被压缩，所以需要下面我们手动设置压缩规则
  optimization: {
    minimize: true, //开启压缩工具，mode是production的时候也是true
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/  // 只压缩.min.js结尾的文件
      })
    ]
  }
}
```

## 发布到npm：
package.json配置：
```js
{
  "name": "large-number",
  "version": "1.0.0",
  "description": "add big number",
  "main": "index.js", // index.js负责判断环境，导出打包好的脚本
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "prepublish": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "cli": "^1.0.1",
    "terser-webpack-plugin": "^2.3.5",
    "webpack": "^4.41.6",
    "webpack-cli": "^3.3.11"
  }
}
```
index.js，判断环境：
```js
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/large-number.min.js')
} else {
  module.exports = require('./dist/large-number.js')
}
```
发布到npm流程：
* npm login：登陆npm账号；
* npm publish：发布到npm。

## 服务端渲染SSR

所有模版等资源都存储在服务器，内网机器拉取数据更快，一个HTML返回所有数据。

服务端渲染的优势：
* 减少白屏时间
* 对于SEO友好（客户端渲染(SPA)一开始把html拉下来，什么内容都没有，不利于爬虫分析）

具体参考[vue服务端渲染文档](https://ssr.vuejs.org/zh/)

服务端渲染，不能用import，全部改成CJS语法，用require。注意服务端没有的对象要做特殊处理，例如window，document等等。命名规范可以是，形如：index-server.js。模版渲染具体可以参考vue和react的ssr文档。

服务端渲染代码：
```js
// hack处理，服务端没有window等对象
if (typeof window === 'undefined') {
  global.window = {}
}

const express = require('express')
const { renderToString } = require('react-dom/server')
const SSR = require('../dist/search-server')
const fs = require('fs')
const path = require('path')
const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8')
const data = require('./data.json')

const server = (port) => {
  const app = express()

  app.use(express.static('dist'))

  app.get('/search', (req, res) => {
    const html = renderMarkup(renderToString(SSR))
    console.log(html)
  })

  app.listen(port, () => {
    console.log('Server is running on port:' + port)
  })
}

server(process.env.PORT || 3000)

// 解决样式不显示的问题：
// 使⽤用打包出来的浏览器端 html 为模板 
// 设置占位符，动态插⼊组件 
const renderMarkup = (str) => {
  const dataStr = JSON.stringify(data)
  return template.replace('<!-- HTML_PLACEHOLDER -->', str)
    .replace('<!-- INITIAL_DATA-PLACEHOLDER -->', `<script>widow.__initial_data=${dataStr}</script>`)
}
```
PS：在index.html按照约定用占位符，再把根元素root替换成react renderToString出来的组件字符串。打包出来的search.js是这样的：
```html
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Document</title><link href="search_1fefdefd.css" rel="stylesheet"></head><body><div id="root"><!-- HTML_PLACEHOLDER --></div><!-- INITIAL_DATA-PLACEHOLDER --><script type="text/javascript" src="search-server.js"></script></body></html>
```
## 优化构建时命令行的显示日志

只需设置webpack config:
```js
module.exports = {
	entry: {...},
	output: {...},
	stats: 'errors-only'
	// 如果是dev环境：
	devServer: {
    contentBase: './dist',
    hot: true,
    stats: 'errors-only'
  }
}
```
效果还是不是很理想，使用优化插件`friendly-errors-webpack-plugin`。

## 构建包工程化设计

webpack base, dev, prod有些配置是通用的，写在base里面，其他配置文件需要使用webpack merge来合并base选项：https://www.npmjs.com/package/webpack-merge

## Eslint
安装：

`npm i eslint babel-eslint eslint-config-airbnb-base eslint-plugin-import -D`

.eslintrc.js配置：
```js
module.exports = {
  "parser": "babel-eslint", 
  "extends": "airbnb-base",
  "env": {
    "browser": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 6
  }
}
package.json配置：
"scripts": {
    "lint": "eslint ./lib --fix" // 校验lib文件夹，自动修复空格格式
}
```
## 冒烟测试
以我们第23点做的webpack构建工程化包为例，我们的冒烟测试主要测试：
* 构建是否成功（webpack构建错误回调）
* 每次构建完成build目录是否有内容输出（测试工具检查：是否有.html, .js, .css等文件）

检查./dist文件夹里的生成物：
```js
// css-js-test.js:
const glob = require('glob-all')
describe('Checking generated css&js files', () => {
  it('should generate css&js files', (done) => {
    const files = glob.sync([
      './dist/index_*.js',
      './dist/index_*.css',
      './dist/search_*.js',
      './dist/search_*.css',
    ])

    if (files.length > 0) {
      done()
    } else {
      throw new Error('no css&js files generated')
    }
  })
})
// index.js:
const path = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')
const Mocha = require('mocha')

const mocha = new Mocha({
  timeout: '10000ms'
})

process.chdir(path.join(__dirname, 'template')) // 进入到当前冒烟测试的template目录

// 移除dist目录
rimraf('./dist', () => {
  const prodConfig = require('../../lib/webpack.prod.js')

  // 删除dist目录之后运行构建
  webpack(prodConfig, (err, stats) => {
    // 构建是否成功
    if (err) {
      console.error(err)
      process.exit(2) // 以错误码2退出
    }
    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false
    }))

    console.log('Webpack build success, begin run test.')

    // mocha：检查是否有产物
    mocha.addFile(path.join(__dirname, 'css-js-test.js'))

    mocha.run()
  })
})
```
## 单元测试&测试覆盖率
Mocha+chai/assert、Jest（react）

测试覆盖率：npm nyc -D
## 持续集成CI

* https://travis-ci.org/ 使用 GitHub 账号登录
* 在 https://travis-ci.org/account/repositories 为项目开启 
* 项目根目录下新增 .travis.yml 

## 发布到npm
升级版本，执行命令会自动改变三位的版本数字（eg: v1.0.0）
* 升级补丁版本号: npm version patch (自动变成v1.0.1)
* 升级小版本号: npm version minor (v1.1.0)
* 升级大版本号: npm version major (v2.0.0)

发布版本: npm publish 

## Commit规范&Changlog生成

参考angular的 commit规范。
￼
subject：对提交内容的总结描述
body：如果一句话总结不了，就在body里换行列出对提交的代码的描述
footer：可以贴一些链接，比如修复issue的链接

本地开发阶段增加 precommit 钩子&自动生成changelog：
```js
npm install husky -D
"scripts": {	"commitmsg": "validate-commit-msg",
	"changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"
}, 
"devDependencies": {
	"validate-commit-msg": "^2.11.1",
	"conventional-changelog-cli": "^1.2.0",
	"husky": "^0.13.1" 
}
```
## webpack构建速度统计：内置的stats
```js
"scripts": {
    "build:stats": "webpack --config webpack.prod.js --json > stats.json"
},
```
## 速度分析：speed-measure-webpack-plugin
```js
const smp = new SpeedMeasureWebpackPlugin()

module.exports = smp.wrap({
	entry: //,
	output: //,
	plugins: []
})
```
￼
## 体积分析：webpack-bundle-analyzer
```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 
module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
// 会自动打开http://127.0.0.1:8888/
```
备注：几个size的意义？
￼
stats是webpack统计的压缩工具之前的大小，parsed是经过压缩之后的大小。

## 多进程/多实例构建
thread-loader

## 并行压缩
terser-webpack-plugin 

## 预编译资源模块 
思路:将 react、react-dom、redux、react-redux 基础包和业务基础包打包成一个文件 

方法:使用 DLLPlugin 进行分包，DllReferencePlugin 对 manifest.json 引用 
```js
// webpack.dll.js
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    library: [
      'react',
      'react-dom'
    ]
  },
  output: {
    filename: '[name]_[chunkhash].dll.js',
    path: path.join(__dirname, 'build/library'),
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: path.join(__dirname, 'build/library/[name].json')
    })
  ]
}
// webpack.prod.js
const webpack = require('webpack');

new webpack.DllReferencePlugin({
      manifest: require('./build/library/library.json')
})
```
## 缓存提高二次构建速度
* babel-loader 开启缓存
* terser-webpack-plugin 开启缓存
* 使用 cache-loader 或者 hard-source-webpack-plugin 

## 减少文件搜索范围
```js
// 优化：优化构建路径查找过程
resolve: {
  alias: {
    'react': path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
    'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js')
  },
  extensions: ['.js'],
  mainFields: ['main']
}
```
## 体积优化：删除没有用到的CSS
```js
const PurgecssPlugin = require('purgecss-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, 'src')
}
new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
})
```
## 动态polyfill
[https://polyfill.io/v3/polyfill.min.js](https://polyfill.io/v3/polyfill.min.js)

## webpack原理解析
### npm run dev/build发生了什么？
在命令行运行以上命令后，npm会让命令行工具进入`node_modules\.bin` 目录，查找是否存在 webpack.sh（mac命令）或者 webpack.cmd（windows命令）文件，如果存在，就执行，不存在，就抛出错误。 
实际的入口文件是: `node_modules\webpack\bin\webpack.js` （这里会生成上面的那个命令）

启动后的结果：
webpack.js最终找到webpack-cli(或webpack-command)这个npm包，并且执行CLI 。

### webpack-cli
webpack-cli 做的事情 
* 引入 yargs，对命令行进行定制 分析命令行参数。
* 对各个参数进行转换，组成编译配置项 引用webpack。
* 根据配置项进行编译和构建 

webpack-cli 提供的不需要编译的命令：
```js
const NON_COMPILATION_ARGS = [ 
	"init", 			// 创建一份 webpack 配置文件
	"migrate",		// 进行 webpack 版本迁移
	"add",		      // 往 webpack 配置文件中增加属性
	"remove", 	      // 往 webpack 配置文件中删除属性
	"serve",	      // 运行 webpack-serve	"generate-loader", 	// 生成 webpack loader 代码
 	"generate-plugin",    // 生成 webpack plugin 代码 
	"info"			// 返回与本地环境相关的一些信息 
]
```
webpack通过命令行工具包yargs读取命令行参数进行参数分组 (config/config-args.js)，将命令划分为9类: 
* Config options: 配置相关参数(文件名称、运行环境等)
* Basic options: 基础参数(entry设置、debug模式设置、watch监听设置、devtool设置) 
* Module options: 模块参数，给 loader 设置扩展
* Output options: 输出参数(输出路径、输出文件名称) 
* Advanced options: 高级用法(记录设置、缓存设置、监听频率、bail等)
* Resolving options: 解析参数(alias 和 解析的文件后缀设置) 
* Optimizing options: 优化参数 
* Stats options: 统计参数
* options: 通用参数(帮助命令、版本信息等) 

webpack-cli 执行的结果：

webpack-cli对配置文件和命令行参数进行转换最终生成配置选项参数 options 
最终会根据配置参数实例化 webpack 对象，然后执行构建流程 

## webpack的核心：tapable

Webpack 的本质：Webpack可以将其理解是一种基于事件流的编程范例，一系列的插件运行。 

核心对象 Compiler 继承 Tapable 
```js
class Compiler extends Tapable { 
	// ... 
} 
```
核心对象 Compilation 继承 Tapable 
```js
class Compilation extends Tapable { 
	// ... 
} 
```
Tapable 是一个类似于 Node.js 的 EventEmitter 的库，主要是控制钩子函数的发布与订阅,控制着 webpack 的插件系统。 

Tapable库暴露了很多 Hook(钩子)类，为插件提供挂载的钩子。

compiler对象里有一百多个hooks，然后wepack.js会把compiler对象传给每一个plugin，plugin必须实现apply方法，webpack会把compiler对象传递给plugin，通常在plugin内部会用hooks.tap的方式监听compiler里面的钩子，从而在适当的时机执行plugin里面的代码。

tapable如何和webpack联系起来？
```js
// node_modules/webpack/lib/webpack.js
let compiler;
if (Array.isArray(options)) {
  compiler = new MultiCompiler(
    Array.from(options).map(options => webpack(options))
  );
} else if (typeof options === "object") {
  options = new WebpackOptionsDefaulter().process(options);

  compiler = new Compiler(options.context);
  compiler.options = options;
  new NodeEnvironmentPlugin({
    infrastructureLogging: options.infrastructureLogging
  }).apply(compiler);

  // 遍历options选项中的插件，传入compiler对象
  // 这些插件会监听compiler中的hooks，从而在某个时机执行。

  if (options.plugins && Array.isArray(options.plugins)) {
    for (const plugin of options.plugins) {
      if (typeof plugin === "function") {
        plugin.call(compiler, compiler);
      } else {
        plugin.apply(compiler);
      }
    }
  }

  compiler.hooks.environment.call();
  compiler.hooks.afterEnvironment.call();
  compiler.options = new WebpackOptionsApply().process(options, compiler);
} else {
  throw new Error("Invalid argument: options");
}
```
43.webpack的构建流程-模块构建和chunk生成阶段

看源代码流程：

make=> addEntry => _addModuleChain => buildModule => module.build(parser) => seal => optimization => createHash => createModuleAssets(seal done) => emit
compile.js里面run()触发make钩子，SingleEntryPlugin.js等插件监听了make钩子，然后开始根据entry对模块进行分析，执行compilation中的addEntry()，然后执行buildModule()，buildModule会调用该模块类型对应的build方法(module.build())，然后实际调用例如NormalModule.js里面的doBuild()。在这里对模块的相关require()进行解析，最后把build出来的代码放到compilation的modules对象里。然后触发seal钩子，这里主要进行一些优化，optimization。

Chunk 生成算法 ：
* webpack 先将 entry 中对应的 module 都生成一个新的 chunk
* 遍历 module 的依赖列表，将依赖的 module 也加入到 chunk 中 
* 如果一个依赖 module 是动态引入的模块，那么就会根据这个 module 创建一个 新的 chunk，继续遍历依赖 
* 重复上面的过程，直至得到所有的 chunks 

## webpack的构建流程-文件生成
emit钩子，compliation.assets输出到磁盘目录.

## loader（开发loader官网有教程）

loader的执行顺序是从右到左。（compose函数，函数式）

loader-runner：loader-runner 允许你在不安装 webpack 的情 况下运行 loaders。
```js
// 代码示例
// node run-loader.js
// run-loader.js
const { runLoaders } = require('loader-runner')
const path = require('path')
const fs = require('fs')

runLoaders({
  resource: path.join(__dirname, './src/demo.txt'),
  loaders: [
    {
      loader: path.join(__dirname, './src/raw-loader.js'),
	// loader的参数，可以通过loader-util的getOptions方法来获取此参数
      options: {
        name: 'test'
      }
    }
  ],
  context: {
    minimize: true
  },
  readResource: fs.readFile.bind(fs)
}, (err, result) => {
  err ? console.log(err) : console.log(result)
})

// raw-loader.js
const loaderUtils = require('loader-utils')

module.exports = function (source) {
  // 获取传递给loader的参数
  const { name } = loaderUtils.getOptions(this)
  console.log('name:', name)

  const json = JSON.stringify(source)
    .replace(/u2028/g, '\\u2028')
    .replace(/u2029/g, '\\u2029')

  return `export default ${json}`
}

// 异步loader：
const callback = this.async()

fs.readFile(path.join(__dirname, './async.txt'), 'utf-8', (err, data) => {
    if (err) {
      callback(err, '')
    }
    callback(null, data)
})
```
loader输出内容到文件：this.emitFile(url, source)

## 开发plugin（官网有教程）

传参：
```js
// webpack.config.js
plugins: [
  new MyPlugin({
    name: 'aaa'
  })
]
// my-plugin.js

module.exports = class MyPlugin {
  constructor(options) {
    // 参数
    this.options = options
  }

  apply(compiler) {
    console.log('My plugin is excuted!')
    console.log('My plugin options', this.options)
  }
}
```
