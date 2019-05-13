# JS基础之：原型链和继承
## 什么是原型链
我试着自己去总结一下这个概念。首先，JavaScript实现继承的方式跟Java之类的传统语言不一样，js使用原型链来实现继承。

如果试图引用对象（实例instance）的某个属性，会首先在对象内部寻找该属性，直至找不到，然后才在该对象的原型（instance.prototype）里去找这个属性。这样的一条以prototype为核心的链路，称为原型链。

## JS继承
怎么继承呢？使用**构造函数**。以下是一个构造函数：
```js
// Person就是一个构造函数
function Person(name, age) {
  this.name = name
  this.age = age
}
let instance = new Person('abc', 20)

console.log(instance.name) // 'abc'
console.log(instance.age) // 20
```
**new操作符做了四件事情**：
1. 创建一个新对象
2. 将构造函数的作用域赋给新对象（因此Person里的`this`就指向了新对象）
3. 执行构造函数中的代码（为这个新对象添加属性和方法）
4. 返回新对象

如果我们有两个构造函数，一个father，一个son：
```js
function Father() {
	this.name = 'abc'
}
Father.prototype.sayName = function() {
	console.log(this.name)
}
function Son(){
	this.age = 20
}
// 每个构造函数(constructor)都有一个原型对象(prototype)
// 原型对象都包含一个指向构造函数的指针
// 而实例(instance)都包含一个指向原型对象的内部指针

// 所以Son继承Father的过程：
// Son的原型对象指向了father的实例
// 而father的实例包含了一个指向father的原型对象的指针
// father的原型对象又指向了构造函数Father
Son.prototype = new Father()
Son.prototype.sayAge = function() {
	console.log(this.age)
}
let instance = new Son()
console.log(instance.sayName()) // 'abc'
console.log(instance.sayAge()) // 20
```
## 原型链的问题
* 当原型链中包含**引用类型**的原型时，该引用类型值会被所有实例共享
* 在创建子类型(例如创建Son的实例)时，不能向超类型(例如Father)的构造函数中传递参数

## 组合继承
使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。这样既能实现函数的复用，又能保证实例都有自己的属性。
```js
function Father(name) {
  console.log('我执行了！')
  this.name = name
	this.numbers = [1, 2, 3]
}
// Father的方法
Father.prototype.sayName = function() {
	console.log(this.name)
}
function Son(name, age) {
  // 调用Father构造函数，绑定Son的this，传递参数name
  // 立即执行
  // 所以Son就会继承Father的属性和方法
	Father.call(this, name)
	this.age = age
}
// 继承方法
Son.prototype = new Father()
// Son自己的方法
Son.prototype.sayAge = function() {
	console.log(this.age)
}
let aaa = new Son('aaa', 20)
aaa.numbers.push(4)
console.log(aaa.numbers) //[1, 2, 3, 4]
aaa.sayName() // 'aaa'
aaa.sayAge() // 20

let bbb = new Son('bbb', 30)
console.log(bbb.numbers) // [1, 2, 3] 实例都有自己的属性，互不影响
bbb.sayName() // 'bbb'
bbb.sayAge() // 30
```
执行上面的代码，输出应该是：
```js
// 我执行了！ 这一句是new Father()输出的

// 我执行了！ 这一句是new Son()输出的，因为Son调用了Father.call(this, name)
// [1, 2, 3, 4]
// 'aaa'
// 20

// 我执行了！ 这一句是第二次new Son()输出的
// [1, 2, 3]
// 'bbb'
// 30
```
## ES6的继承
```js
class Father {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class Son extends Father {
  constructor(name, age, school) {
    super(name, age)
    this.school = school
  }
}
```
子类必须在constructor方法中调用`super`方法（super指向父类的原型对象，super可以携带参数）。因为ES5的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Father.call(this)）。**ES6的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this**。

关于__proto__属性：
* 子类的__proto__属性，表示构造函数的继承，总是指向父类。
* 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。

用ES6的class重写上面的例子：
```js
class Father {
  constructor(name) {
    this.name = name
    this.numbers = [1, 2, 3]
  }
  sayName() {
    console.log(this.name)
  }
}
class Son extends Father {
  constructor(name, age) {
    // 必须调用super执行Father的构造函数，传name过去
    super(name)
    this.age = age
  }
  sayAge() {
    console.log(this.age)
  }
}
let aaa = new Son('aaa', 20)
aaa.numbers.push(4)
console.log(aaa.numbers) //[1, 2, 3, 4]
aaa.sayName() // 'aaa'
aaa.sayAge() // 20

let bbb = new Son('bbb', 30)
console.log(bbb.numbers) // [1, 2, 3] 实例都有自己的属性，互不影响
bbb.sayName() // 'bbb'
bbb.sayAge() // 30
```