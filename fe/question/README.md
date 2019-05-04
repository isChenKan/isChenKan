# 日常开发问题总结（待续）

## Element相关
[Element](https://element.eleme.io)是我在公司常用的vue组件库，总体来说中规中矩吧。但是用了这么多次下来，完成企业各种复杂，乱七八糟的需求还是可以的，主要的一些组件都很齐全，整体来说没有什么大的问题，就是写法上感觉很多地方有些冗余，比如编辑弹窗还有表格这些写起来就很繁杂。

最近我比较倾向于[Vuetify](https://vuetifyjs.com)，它的写法接受起来很舒服，而且组件的动画比Element要好很多，但是目前我没有在企业应用中尝试过，感觉组件不是特别的全，如果一旦用到一半发现一些功能没有，就只能自己去实现，这将会增加很多开发的工作量。比如它表单和表格的功能就不是特别齐全，但这些组件对于企业中后台应用来说是最重要的。因为往往需要有大量的看板和表单交互功能。

#### 再推荐一些vue组件库：
* [Quasar Framework](https://quasar-framework.org/)，非常强大，组件简直太全了吧。
* [Vuesax](https://lusaxweb.github.io/vuesax/)，好看的小组件库，但是不是很全，适合个人应用。

#### 跑题了，还有一些element的坑：

* element pagination的current-page刷新问题：请求是新的current-page，但是页面上并没有刷新。需要使用一个boolean来重新渲染达到刷新current-page的效果。先设置为true，然后在method里设置为false，最后在this.$nextTick里再设置为true。
```js
// .vue
data() {
  return {
    isShow: true,
  }
},
methods: {
  getPage() {
    this.isShow = false
    this.$nextTick(() => {
      this.isShow = true
    })
  }
},
```
* 注意v-model绑定的data值必须符合要求，之前用了后端返回的ruleUser这个字段绑定v-model，结果它这个字段有时候居然是个null，然后我正常流程是这个v-model是个多选，内部有push操作，然后这个ruleUser有时候是个null，导致push报错，而且这个push操作是我自己做的也就算了，很好追踪，但是这个push是用element的el-select组件内部做的push，导致排查起来很麻烦，前端并没有检查出这个类型问题。只是vue warn报错了，但并不是很精确到代码的位置。TS：真香警告！

## 开发中的那些小问题
* `axios delete`携带参数，要放在一个包含data的对象里才行，不能像post那样直接传postData：
```js
deletePageInfo: (postData) => {
	return this.delete('/api/test/page', { data: postData })
}
```
---
* 正则表达式校验邮箱：
```js
const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
return pattern.test(value) || 'Invalid e-mail.'
```
---
* Nodejs encode decode ('base64')
```js
// encode:
var b = new Buffer('JavaScript')
var s = b.toString('base64')
// SmF2YVNjcmlwdA==

// decode:
var b = new Buffer('SmF2YVNjcmlwdA==', 'base64')
var s = b.toString()
// JavaScript
```
---
* JavaScript encode decode ('base64')
```js
// encode:
console.log(btoa('JavaScript'))
// SmF2YVNjcmlwdA==

// decode:
console.log(atob('SmF2YVNjcmlwdA=='))
// JavaScript
```