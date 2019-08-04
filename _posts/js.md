---
date: 2018-11-16
tags: JavaScript
author: 葵花养殖技术人员
location: Chongqing
---

# JS基础之：小知识点

## DOM, BOM, window, document
`DOM`: 为了能操作HTML，把它抽象成了DOM树，div这些标签就是一个其中的一个节点。DOM提供了操作这些节点的API。

`document`: 上面说的这个HTML就是document（一个文件），document也是这个DOM树的根节点。

`BOM`: BOM是浏览器提供的控制浏览器行为的API，比如`location.href = 'https://kuifafa.com'`。

`window`: window是BOM的一个对象。可以调用浏览器API，所以可以通过这个对象可以获取窗口位置、确定窗口大小、弹出对话框等。

总结：
* **DOM是为了操作文档出现的API，document 是其的一个对象。**
* **BOM是为了操作浏览器出现的API，window 是其的一个对象。**

## Shuffle乱序函数实现
Lodash有个[_.shuffle](https://lodash.com/docs/4.17.11#shuffle)方法，shuffle将一个数组随机打乱顺序。实现如下：
```js
function shuffle(array) {
  let i = array.length
  let j = 0
  while(i) {
    j = Math.floor(Math.random() * i--);
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
shuffle([1,2,3,4,5])
// [5, 1, 4, 2, 3]
```
另外一种方法：
```js
function shuffle(arr) {
  return arr.sort(()=> Math.random() > 0.5)
}
```
但是我以前看过一篇文章说这个方法不好，并没有“很乱”，好像跟sort()本身的实现是排序（插入排序和快排两种方案），这样并不是完全打乱，排序是根据一定的规律比较的。

## 函数节流和函数防抖
* 函数节流（throttle）：规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。(第一次触法后隔了指定的delay之后会执行一次)
* 函数防抖（debounce）：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
这两个方法都是为了防止调用过多的时候执行太多次同样的操作。比如resize，scroll的时候，或者疯狂点击某个按钮的时候。Lodash也有这两个方法：[debounce](https://lodash.com/docs/4.17.11#debounce), [throttle](https://lodash.com/docs/4.17.11#throttle)

debounce的实现：
```js
// 这里timer之所以不能放里面的原因是：如果放在里面的函数里，就会每次新建一个timer，是不行的。
// 但是timer也不能是一个全局变量啊，
// 所以通过闭包来实现。
function _debounce(cb, delay){
  let timer = null
  return function() {
      clearTimeout(timer)
      timer = setTimeout(()=>{
        cb()
      }, delay)
  }
}
function foo() {
  console.log('我执行了！')
}
window.onscroll = _debounce(foo, 200)
// 如果一直不停的滚动是不会执行foo的。
```
## 函数防抖和函数节流的区别
对于函数防抖，如果一直滚动，那么就一直不会执行。函数节流的区别正是在于这里，函数节流就是当第一次滚动的时候就会执行一次，后面如果一直滚动，隔指定的时间就会执行一次。
throttle的实现：
```js
function _throttle(fn, delay, time) {
    var previous = null
    var timer = null
    return function() {
        var now = new Date().getTime()

        if(!previous) previous = now
        if(time && now - previous > time){
          fn()
          previous = now
          clearTimeout(timer)
        } else {
            clearTimeout(timer)
            timer = setTimeout(() => {
              fn()
              previous = null
            }, delay)
        }
    }
}
function foo() {
  console.log('我执行了！')
}
window.onscroll = _throttle(foo, 500, 2000)
```
## bind实现
```js
Function.prototype.bind = function() {
  var self = this
  // shift弹出第一个参数（即需要绑定的上下文）
  var that = [].shift.call(arguments)
  // [].slice.call()方法把arguments转换成数组
  var args = [].slice.call(arguments)
  // concat组装的是foo传入的参数3
  return function() {
    self.apply(that, args.concat([].slice.call(arguments)))
  }
}
var obj = {
  name: 'aaa'
}
var foo = function(a, b, c) {
  console.log(this.name)
  console.log([a, b, c])
}.bind(obj, 1, 2)

foo(3)
// 'aaa'
// [1, 2, 3]
```

## 图片或者图表看板懒加载
在滚动的时候判断图表有没有出现在视图范围内，如果是，就加载它：
1. 通过`const clientHeight = document.documentElement.clientHeight`获取屏幕可视窗口高度。
2. 通过`const offsetTop = element.offsetTop`获取元素相对于文档顶部的距离。
3. 通过`const scrollTop = document.documentElement.scrollTop`获取浏览器窗口顶部与文档顶部之间的距离，也就是滚动条滚动的距离。
最后：`isLoading = offsetTop - scrollTop < clientHeight`

另外一个获取元素位置的方法：`getBoundingClientRect()`
