# ES6总结
> 看的是阮一峰老师的ES6文档，因为知识点很多，所以摘取了一些觉得比较重要的记录下来。

## String的新方法
```js
// startsWith()、endsWith()、includes()
let a = 'Hello world!'
a.startsWith('Hello') // true
a.endsWith('!') // true
a.includes('o') // true

// repeat()
let b = 'b'
b.repeat(2) // "bb"

// trimStart()、trimEnd()
const c = '  abc  '
c.trim() // "abc"
c.trimStart() // "abc  "
c.trimEnd() // "  abc"
```

## 关于数值
```js
//二进制和八进制

// 0b表示二进制
0b111110111 === 503 // true
// 0o表示八进制
0o767 === 503 // true

// ES6将全局方法parseInt()和parseFloat()，移植到Number对象上面

// ES5的写法
parseInt('12.34') // 12
// ES6的写法
Number.parseInt('12.34') // 12

Number.isInteger(25.1) // false
```
JavaScript 能够准确表示的整数范围在`-2^53(-9007199254740992)`到`2^53(9007199254740992)`之间（不含两个端点），超过这个范围，无法精确表示这个值。`Number.isSafeInteger()`则是用来判断一个整数是否落在这个范围之内。这两个数字分别是：`Number.MAX_SAFE_INTEGER`和`Number.MIN_SAFE_INTEGER`这两个常量。
```js
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1 // true
Number.MAX_SAFE_INTEGER === 9007199254740991 // true
```

## 关于函数
rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。例子：
```js
const numbers = (...nums) => nums
numbers(1, 2, 3)
// [1,2,3]
```
箭头函数的this对象，就是**定义时所在的对象**，而不是使用时所在的对象。箭头函数里面没有自己的this，而是**引用外层的this**。

### 尾调用
尾调用（Tail Call）是函数式编程的一个重要概念，就是指某个函数的最后一步是调用另一个函数。如：
```js
function foo() {
  return bar()
}
```
以下几种情况不属于尾调用：
```js
// 最后有赋值操作，不属于尾调用
function foo(x) {
  let baz = bar(x)
  return baz
}

// 也属于调用后还有操作，即使写在一行内
function foo(x) {
  return bar(x) + 1
}

// 最后相当于有一句return: undefianed
function foo(x) {
  bar(x)
}
```
### 尾调用优化
尾调用之所以与其他调用不同，就在于它的特殊的调用位置。

我们知道，函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，那么在A的调用帧上方，还会形成一个B的调用帧。等到B运行结束，将结果返回到A，B的调用帧才会消失。如果函数B内部还调用函数C，那就还有一个C的调用帧，以此类推。所有的调用帧，就形成一个“调用栈”（call stack）。

尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。

### 尾递归
函数调用自身，称为递归。如果尾调用自身，就称为尾递归。两个例子：
```js
// bad
function factorial(n) {
  if (n === 1) return 1
  return n * factorial(n - 1) // 这里就不是尾调用，因为这是一句表达式操作
}
factorial(5) // 120

// good: 尾递归
function factorial(n, total = 1) {
  if (n === 1) return total
  return factorial(n - 1, n * total) // 这里就是一个尾调用
}
factorial(5) // 120
```
Fibonacci数列（1, 1, 2, 3, 5, 8, 13, 21, 34...）：
```js
// bad: 容易栈溢出
function Fibonacci (n) {
  if ( n <= 1 ) {return 1}
  return Fibonacci(n - 1) + Fibonacci(n - 2)
}
Fibonacci(10) // 89
Fibonacci(100) // 超时
Fibonacci(500) // 超时

// good
function Fibonacci (n , a = 1 , b = 1) {
  if( n <= 1 ) {return b}
  return Fibonacci (n - 1, b, a + b)
}
Fibonacci(100) // 573147844013817200000
Fibonacci(1000) // 7.0330367711422765e+208
Fibonacci(10000) // Infinity

// Fibonacci(5):
// 5 1 1
// 4 1 2
// 3 2 3
// 2 3 5
// 1 5 8
// **8**
```

## 关于数组
### JS数组-hash
[这里有一个关于JS数组的文章](http://www.wemlion.com/post/javascript-array-evolution-performance/)

**什么是数组**？数组是一串连续的内存位置，用来保存某些值。注意重点，“连续”。JavaScript 数组不是连续（contiguous）的，其实现类似哈希映射（hash-maps）

JS的数组可以容纳不同的数据类型，但是当数组里面的元素类型一致和不一致的时候是不一样的：
* **数组里的元素都是同一种数据类型的时候**：现代编译器已经智能化，能够将元素类型相同的传统数组在内部转换成内存连续的数组。
* **数组里的元素不是同一种数据类型的时候**：性能下降明显，使用ArrayBuffer更佳。

### flat()
用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。接受一个参数，表示拉平的嵌套层数（默认是1）。如果不管有多少层嵌套，都要转成一维数组，可以用`Infinity`关键字作为参数。例子：
```js
[1, 2, [3, 4]].flat() // [1, 2, 3, 4]
[1, 2, [3, [4, 5]]].flat(2) // [1, 2, 3, 4, 5]
[1, [2, [3, 4, [5, [6]]]]].flat(Infinity) // [1, 2, 3, 4, 5, 6]
```

## 关于对象
`Object.getOwnPropertyDescriptor()`方法可以获取该属性的描述对象。
```js
let obj = { foo: 123 }
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true, “可枚举性”
//    configurable: true
//  }
```
对象的遍历主要使用以下两种方式：
* `for...in`循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
* `Object.keys()`返回一个数组，包括对象自身的（**不含继承的**）所有可枚举属性（不含 Symbol 属性）的键名。

## set和map
Set类似于数组，但是成员的值都是唯一的，没有重复的值。WeakSet结构与Set类似，也是不重复的值的集合。但是，WeakSet的成员只能是对象，而不能是其他类型的值。Set去重：
```js
[...new Set([1,2,2,3,3,4,5])] // [1, 2, 3, 4, 5]
[...new Set('ababbc')].join('') // "abc"
```