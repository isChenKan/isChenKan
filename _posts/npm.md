---
date: 2019-7-22
tags: JavaScript
author: 葵花养殖技术人员
location: Beijing
---

# 学习npm包源码
> 每周都会看三个npm包的源码来学习一下。

## 1.关于n--和--n
```js
var n = 3
while(n--) {
	console.log(n) 
}
// value of (n--) is 3，所以一共循环了三次
// 2 1 0

var n = 3
while(--n) {
	console.log(n)
}
// 相当于while(n = n - 1）
// value of (n = n - 1) is 2，所以一共只循环了两次
// 2 1
```

## 2.+运算法和|运算符
```js
var num = "3"
+num  // 3
Number(num)  // 3
```
[Github: array-range](https://github.com/mattdesl/array-range/blob/master/index.js)
为什么有a = a | 0 ？

|是按位或运算，转化为二进制，有1则该位为1。
用var a = a | 0，如果a是二进制或者八进制、十六进制，就可以转换成十进制。其实Number('0b11')也是一样的效果。
* 二进制表示：0b11  // 3
* 八进制表示：0o11  // 9
* 十六进制表示：0x11  // 17
```js
25 | 3  // 27
var a = 0b11  // 二进制的3
typeof a  // "number"
a = a | 0  // 3
```
还能将小数去掉：
```js
1.1 | 0  // 1
```


## 3.去重
```js
//去重，一般的做法是两个循环，复杂度高，可以利用对象：
function dedupe (client, hasher) {
  // 如果是普通的数组，就用每一项的值作为键（字符串），比如[1, 2, 3]，键就会是：
  // JSON.stringify(1)
  // "1"
    hasher = hasher || JSON.stringify
    const clone = []
    const lookup = {}
    for (let i = 0; i < client.length; i++) {
        let elem = client[i]
        let hashed = hasher(elem)
        if (!lookup[hashed]) {
            clone.push(elem)
            lookup[hashed] = true
        }
    }
    return clone
}
//可以自己提供一个函数作为参数：
var aaa = [{a: 2, b: 1}, {a: 1, b: 2}, {a: 1, b: 3}, {a: 1, b: 4}]
var bbb = dedupe(aaa, value => value.a)
console.log(bbb)
// result: [{a: 2, b: 1}, {a: 1,b: 2}]
```