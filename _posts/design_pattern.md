---
date: 2020-05-16
tags: JavaScript
author: 社长的社畜
location: 北京
---

# 设计模式-读《JavaScript设计模式与开发实践》

> 这些是我看了曾探老师写的《JavaScript设计模式与开发实践》之后摘抄下来的一些重要知识点，这本书用JavaScript的角度讲述了常见的一些设计模式，受益匪浅，强烈推荐这本书。

> 设计模式伴随着软件设计的思想，是每个软件工程师都应该掌握的，写程序时不仅仅是要实现当前的功能需求，还应当时刻思考自己的代码是否遵循了这些经过无数程序考验的设计原则？是否可以用某种设计模式来进行优化？如何才能写出健壮的、可扩展性高的程序？

## 设计模式概述
设计模式是在某种场合下对某个问题的一种解决方案。是给面向对象中的一些好的设计起了一些个名字。所有设计模式都遵循一条原则：找出程序中变化的地方，并将变化封装起来。

修改代码总是危险的，修改的地方越多，出错的可能性就越大。记住，追加优于修改。把通用的代码封装起来，要新增功能时，就不用去修改耦合多很高的代码，直接追加新代码即可，从而减少出错。

## 多态的作用？
通过把过程化的条件分支语句转化为对象的多态性，从而消除这些条件分支语句。（if else经常会写出难以维护的代码）将行为分布在各个对象中，让对象各自负责自己的行为。

## this
跟别的语言大相径庭的是，JavaScript的 this 总是指向一个对象，而具体指向哪个对象是在运行时基于函数的执行环境动态绑定的，而非函数被声明时的环境。

this 的指向大致可以分为以下4种：
1. 作为对象的方法调用：this指向该对象。
2. 作为普通函数调用，也是是普通函数调用：this指向全局对象。
3. 构造器调用：当用 new 运算符调用函数时，该函数总会返回一个对象，通常情况下，构造器里的 this 就指向返回的这个对象。
4. Function.prototype.call 或 Function.prototype.apply。

new的过程：
1. 创建一个新对象；
2. 将构造函数的作用域赋给新对象（因此this就指向了这个新对象），这就是this的第三种情况。
3. 执行构造函数的代码（为这个对象添加属性）；
4. 返回新对象。

通过Object.create(null)可以创建出没有原型的对象。

## call、apply
有时候我们使用 call 或者 apply 的目的不在于指定 this 指向，而是另有用途，比如借用其他对象的方法。那么我们可以传入 null 来代替某个具体的对象： 
```js
Math.max.apply( null, [ 1, 2, 5, 3, 4 ] ) // 输出：5
```
比如想往 arguments 中添加一个新的元素，通常会借用 Array.prototype.push：（等同于[].push.call()）
```js
(function() {
	Array.prototype.push.call( arguments, 3 );
	console.log ( arguments ); // 输出[1,2,3]
})( 1, 2 ); 
```
在操作 arguments 的时候，我们经常非常频繁地找 Array.prototype 对象借用方法。
想把 arguments 转成真正的数组的时候，可以借用 Array.prototype.slice（等同于[].slice.call()）方法；想截去 arguments 列表中的头一个元素时，又可以借用 Array.prototype.shift方法。

## 高阶函数
高阶函数是指至少满足下列条件之一的函数：
* 函数可以作为参数被传递；
* 函数可以作为返回值输出。
```js
var getSingle = function ( fn ) { 
	var ret; 
	return function () { 
		return ret || ( ret = fn.apply( this, arguments ) ); 
	}; 
}; 
// 这个高阶函数的例子，既把函数当作参数传递，又让函数执行后返回了另外一个函数。
// 我们可以看看 getSingle 函数的效果： 
var getScript = getSingle(function(){
	return document.createElement( 'script' ); 
}); 
var script1 = getScript(); 
var script2 = getScript(); 
alert ( script1 === script2 ); // 输出：true
```

## AOP
AOP（面向切面编程）的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，这些跟业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。把这些功能抽离出来之后，再通过“动态织入”的方式掺入业务逻辑模块中。这样做的好处首先是可以保持业务逻辑模块的纯净和高内聚性，其次是可以很方便地复用日志统计等功能模块。 

通常，在JavaScript中实现AOP，都是指把一个函数“动态织入”到另外一个函数之中。
```js
Function.prototype.before = function( beforefn ){ 
	var __self = this; // 保存原函数的引用 
	return function() { 
		// 返回包含了原函数和新函数的"代理"函数 
		beforefn.apply( this, arguments ); 
		// 执行新函数，修正this 
		return __self.apply( this, arguments ); // 执行原函数 
	} 
}; 

Function.prototype.after = function( afterfn ){ 
	var __self = this; 
	return function(){ 
		var ret = __self.apply( this, arguments ); 
		afterfn.apply( this, arguments ); return ret; 
	} 
};

var func = function(){ 
	console.log( 2 ); 
}; 
func = func.before(function(){ 
	console.log( 1 ); 
}).after(function(){ 
	console.log( 3 ); 
});
func();
```
## 柯里化
currying 又称部分求值。一个 currying 的函数首先会接受一些参数，接受了这些参数之后，该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。
```js
var currying = function(fn) {
	var args = []
	return function() {
		if (arguments.length === 0) {			return fn.apply(this, args)
		} else {
			[].push.apply(args, arguments)
			return arguments.callee
		}
	}
}

var cost = (function() {
	var money = 0
	return function() {
		for (var i = 0; i < arguments.length; i++) {			money += arguments[i]		}
		return money
	}
})()

var cost = currying(cost)
// 均为真正求值
cost(100)
cost(200)
cost(300)
//这时才求值
console.log(cost()) // 600
```

## 单例模式
单例模式的定义是： 保证一个类仅有一个实例，并提供一个访问它的全局访问点。

惰性单例指的是在需要的时候才创建对象实例。
```js
// 核心代码
var getSingle = function(fn) {
	var result
	return function() {
		return result || (result = fn.apply(this, arguments))
	}
}
```

## 策略模式
策略模式的定义是： 定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。

将不变的部分和变化的部分隔开是每个设计模式的主题，策略模式也不例外，策略模式的目的就是将算法的使用与算法的实现分离开来。

从定义上看，策略模式就是用来封装算法的。但如果把策略模式仅仅用来封装算法，未免有一点大材小用。在实际开发中，我们通常会把算法的含义扩散开来，使策略模式也可以用来封装一系列的“业务规则”。只要这些业务规则指向的目标一致，并且可以被替换使用，我们就可以用策略模式来封装。
```js
// 优化前的if else代码
var calculateBonus = function(performanceLevel, salary) {	if (performanceLevel === 'S') return salary * 4
	if (performanceLevel === 'A') return salary * 3
	if (performanceLevel === 'B') return salary * 2
}
calculateBonus('B', 20000)
calculateBonus('S', 6000)

// 这会使得下次修改业务侵入calculateBonus这个函数，使其越来越庞大并且容易导致错误。
// 我们讲过，追加优于修改。

// 策略模式
var S = function(salary) {
	return salary * 4
}
var A = function(salary) {
	return salary * 3
}
var B = function(salary) {
	return salary * 2
}
var calculateBonus = function(func, salary) {
	return func(salary)
}

calculateBonus(S, 10000)
```
## 代理模式
代理模式的关键是，当客户不方便直接访问一个对象或者不满足需要的时候，提供一个替身对象来控制对这个对象的访问，客户实际上访问的是替身对象。替身对象对请求做出一些处理之后，再把请求转交给本体对象。

代理B可以帮助A过滤掉一些请求，比如给A送花的人中年龄太大的，这种请求就可以直接在代理B处被拒绝掉。这种代理叫作保护代理。

A和B一个充当白脸，一个充当黑脸。白脸A继续保持良好的女神形象，不希望直接拒绝任何人，于是找了黑脸B来控制对A的访问。 另外，假设现实中的花价格不菲，导致在程序世界里， new Flower 也是一个代价昂贵的操作，那么我们可以把 new Flower 的操作交给代理B去执行，代理B会选择在A心情好时再执行 new Flower，这是代理模式的另一种形式，叫作 虚拟代理。虚拟代理把一些开销很大的对象，延迟到真正需要它的时候才去创建。比如图片的预加载。

在客户看来，代理对象和本体是一致的， 代理接手请求的过程对于用户来说是透明的，用户并不清楚代理和本体的区别，这样做有两个好处。 
1. 用户可以放心地请求代理，他只关心是否能得到想要的结果。 
2. 在任何使用本体的地方都可以替换成使用代理。

缓存代理可以为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传递进来的参数跟之前一致，则可以直接返回前面存储的运算结果。

**在vue中data 的数据是怎么可以通过实例直接访问的？**

在Vue的源码中，把data选项里面的属性，都通过proxy（代理模式）挂载到了vm上对应的属性上，比如vm.x可以访问data中的x，但实际操作的却是：vm._data.x。
```js
// vm.x => vm._data.x
proxy(vm, "_data", key)

function proxy(target, sourceKey, key) {    
    Object.defineProperty(target, key, {
        get() {            
            return this[sourceKey][key]
        },
        set(val) {            
            this[sourceKey][key] = val
        }
    })
}
```
## 迭代器模式
迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。

内部迭代器
```js
var each = function( ary, callback ){ 
	for ( var i = 0, l = ary.length; i < l; i++ ){ 
		callback.call( ary[i], i, ary[i] ); // 把下标和元素当作参数传给callback函数
	} 
}; 
each( [ 1, 2, 3 ], function( i, n ){ 
	console.log( [ i, n ] )
});
```
each函数属于内部迭代器，因为迭代规则已经在内部写好了。内部迭代器调用方便，但不够灵活。(对象迭代用for in即可)

外部迭代器
```js
var Iterator = function( obj ){ 
	var current = 0; 
	var next = function(){ 
		current += 1;
	}; 
	var isDone = function(){ 
		return current >= obj.length; 
	}; 
	var getCurrItem = function(){ 
		return obj[ current ]; 
	}; 
	return { 
		next: next, 
		isDone: isDone, 
		getCurrItem: getCurrItem,
		length: obj.length 
	}
}
```
## 发布—订阅模式（观察者模式）
发布—订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。在JavaScript开发中，我们一般用事件模型来替代传统的发布—订阅模式。

发布—订阅模式可以广泛应用于异步编程中，这是一种替代传递回调函数的方案。比如，我们可以订阅ajax请求的 error、 succ 等事件。 或者如果想在动画的每一帧完成之后做一些事情，那我们可以订阅一个事件，然后在动画的每一帧完成之后发布这个事件。在异步编程中使用发布—订阅模式，我们就无需过多关注对象在异步运行期间的内部状态，而只需要订阅感兴趣的事件发生点。

发布—订阅模式可以取代对象之间硬编码的通知机制，一个对象不用再显式地调用另外一个对象的某个接口。发布—订阅模式让两个对象松耦合地联系在一起，虽然不太清楚彼此的细节，但这不影响它们之间相互通信。当有新的订阅者出现时，发布者的代码不需要任何修改；同样发布者需要改变时，也不会影响到之前的订阅者。只要之前约定的事件名没有变化，就可以自由地改变它们。

发布—订阅模式可以用一个全局的 Event 对象来实现，订阅者不需要了解消息来自哪个发布者。发布者也不知道消息会推送给哪些订阅者， Event 作为一个类似“中介者”的角色，把订阅者和发布者联系起来。见如下代码：
```js
var Event = (function(){ 
	var clientList = {}, 
		 listen, 
		 trigger, 
		 remove;
	var listen = function( key, fn ){ 
		if ( !clientList[ key ] ){ 
			clientList[ key ] = []; 
		} 
		clientList[ key ].push( fn ); 
	}; 
	var trigger = function(){ 
		var key = Array.prototype.shift.call( arguments ), 
		fns = clientList[ key ]; 
		if ( !fns || fns.length === 0 ){
			 return false; 
		} 
		for( var i = 0, fn; fn = fns[ i++ ]; ){ 
			fn.apply( this, arguments );
		}; 
	}
	var remove = function( key, fn ){ 
		var fns = clientList[ key ]; 
		if ( !fns ){ 
			return false; 
		} 
		// 没有取消回调参数：取消所有订阅
		if ( !fn ){ 
			fns && ( fns.length = 0 ); 
		} else { 
			for ( var l = fns.length - 1; l >=0; l-- ){ 
				var _fn = fns[ l ]; 
				if ( _fn === fn ){ 
					fns.splice( l, 1 ); 
				} 
			} 
		} 
	}; 
	return { 
		listen: listen, 
		trigger: trigger,
		remove: remove 
	}
})(); 

Event.listen( 'squareMeter88', function( price ){ 
	// 小红订阅消息
	console.log( '价格= ' + price ); // 输出：'价格=2000000' 
}); 
Event.trigger( 'squareMeter88', 2000000 ); // 售楼处发布
```
当然，发布—订阅模式也不是完全没有缺点。创建订阅者本身要消耗一定的时间和内存，而且当你订阅一个消息后，也许此消息最后都未发生，但这个订阅者会始终存在于内存中。另外，发布—订阅模式虽然可以弱化对象之间的联系，但如果过度使用的话，对象和对象之间的必要联系也将被深埋在背后，会导致程序难以跟踪维护和理解。特别是有多个发布者和订阅者嵌套到一起的时候，要跟踪一个bug不是件轻松的事情。

## 命令模式
命令模式是最简单和优雅的模式之一，命令模式中的命令（command）指的是一个执行某些特定事情的指令。 命令模式最常见的应用场景是：有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么。此时希望用一种松耦合的方式来设计程序，使得请求发送者和请求接收者能够消除彼此之间的耦合关系。
```js
// 负责往安装命令
var setCommand = function(button, command) {	button.onclick = function() {
		command.execute()
	}}
// 命令对象command， 请求接收者是receiver
var RefreshCommand = function(receiver) {
	return {
		execute: function() {
			receiver.refresh()
		}
	}
}
// 
var MenuBar = {
	refresh: function() {
		console.log('refresh')
	}
}
// button_1是请求发送者
var refreshCommand = RefreshCommand(MenuBar)
setCommand(button_1, refreshCommand)
```
宏命令是一组命令的集合，其实就是遍历，通过一个命令执行多个指令。

## 组合模式
组合模式将对象组合成树形结构，以表示“部分-整体”的层次结构。好处是通过对象的多态性，使用户对单个对象和组合对象的操作具有一致性。比如宏命令。

比如对文件夹的folder和file的处理（一个folder可以有另外的folder或file），也是一个组合模式的模型。而我们需要统一处理这些对象，当他们具有相同的接口后，组合对象和叶对象都会做各自正确的事情。我们也不必写一堆if else来分别处理他们。
```js
var MacroCommand = function() {
	return {
		commandsList: [],
		add: function(command) {
			this.commandsList.push(command)
		},
		execute: function() {
			for (var i = 0; i < this.commandsList.length; i++) {
				var command = this.commandsList[i]
				command.execute()
			}
		}
	}
}
var openAcCommand = {
	execute: function() {
		console.log('打开空调')
	}
}
var openTvCommand = {
	execute: function() {
		console.log('打开电视')
	}
}
var openSoundCommand = {
	execute: function() {
		console.log('打开音响')
	}
}
// 可以任意组合
var macro_1 = new MacroCommand()
macro_1.add(openTvCommand)
macro_1.add(openSoundCommand)

var macro = new MacroCommand()
macro.add(openAcCommand)
macro.add(macro_1)
macro.execute()
// 打开空调
// 打开电视
// 打开音响
```
## 模版方法模式
使用继承或高阶函数，实现一个模版（类似于抽象类），来抽取通用的逻辑。

钩子是一种隔离变化的常见手段。在父类中放置钩子来加强程序的变化。可以想到vue生命周期中的callhock()。

好莱坞原则：允许底层组件将自己挂钩到高层组件中，而高层组件会决定什么时候，以何种方式去使用这些底层组件，就像好莱坞对待新人演员一样：“别调用我们，我们会调用你”。（例如发布-订阅模式，回调函数：把需要执行的操作封装在回调函数中，然后把主动权交给另一个函数，至于回调函数什么时候执行，则是另一个函数控制的）。
```js
// 冲咖啡和泡茶的通用逻辑都是一样的，可以抽象成一个模版（继承实现）
var Beverage = function() {}
Beverage.prototype.boilWater = function() {
	console.log('把水煮沸')
}
Beverage.prototype.brew = function() {}
Beverage.prototype.pourInCup = function() {}
Beverage.prototype.addCondiments = function() {}
Beverage.prototype.brew = function() {
	this.boilWater()
	this.brew()
	this.pourInCup()
	this.addCondiments()
}

var Coffee = function() {}
Coffee.prototype = new Beverage()
// ...
var coffee = new Coffee
coffee.init()

var Tea  = function() {}
// ...
```
## 享元模式
享元模式通常用于性能优化。核心是运用共享技术来有效支持大量细粒度的对象。

如果程序中有很多相似对象，就可以把内部状态（属性）封装在共享对象（用一个工厂函数，重复创建的直接返回即可）中，从而达到减少内存的目的。

责任链模式
使多个对象都有机会处理请求，从而避免请求的发送者和接受者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递请求，直到有一个对象处理它为止。作用域链、原型链、DOM事件冒泡都有责任链模式的使用。

可以通过一个Chain类来实现一个责任链模式，Chain类来控制各个对象的关系和判断执行next把任务交给下一个对象。也可以使用AOP的after函数来实现：
```js
Function.prototype.after = function( afterfn ){ 
	var __self = this; 
	return function(){ 
		var ret = __self.apply( this, arguments ); 
		if (ret === 'next') {
			return fn.apply(this, arguments)
		}
		return ret
	} 
}
var order = order_1.after(order_2).after(order_3)
```
## 中介者模式
解耦对象与对象之间的关系，增加一个中介者对象，通过中介者对象来进行通信。而不是互相引用。也就是一对多的关系。

中介者遵循迪米特法则，也叫做最少知识原则，一个对象应当尽可能少的了解其他对象。降低耦合性。从而避免因一个对象的改变而影响到其他多个对象。不过中介者模式虽然降低了对象之间的负责性，但转而成为了中介者对象的复杂性。因为它要维护这么多对象之间的关系，通常是庞大的。所以中介者对象自身往往是一个难以维护的对象。

## 装饰者模式
装饰者模式可以动态的给某个对象添加一些额外的职责，而不会影响从这个类中派生的其他对象（而继承则会影响子类）。

装饰函数：不碰原函数，通过保存原引用的方式：
```js
var a = function() {
	console.log(111)
}
var _a = a
a = function() {
	_a()
	console.log(222)
}
a()
```
之前讲过的AOP就是一种装饰函数：
```js
Function.prototype.before = function( beforefn ){ 
	var __self = this; // 保存原函数的引用 
	return function() { 
		// 返回包含了原函数和新函数的"代理"函数 
		beforefn.apply( this, arguments ); 
		// 执行新函数，修正this 
		return __self.apply( this, arguments ); // 执行原函数 
	} 
}; 

Function.prototype.after = function( afterfn ){ 
	var __self = this; 
	return function(){ 
		var ret = __self.apply( this, arguments ); 
		afterfn.apply( this, arguments ); return ret; 
	} 
};

var func = function(){ 
	console.log( 2 ); 
}; 
func = func.before(function(){ 
	console.log( 1 ); 
}).after(function(){ 
	console.log( 3 ); 
});
func();
```
应用：比如我们在点击某个按钮之后，这个按钮自身绑定了一些操作，同时要埋点进行数据上报，这两件事情不应该被耦合在一个handleClick函数中，因此可以用after改造：
```js
document.getElementById('button').onclick = handleClick
var doSomething = function() {
	console.log('do something')
}
var trackEvent = function() {
	console.log("upload data")
}
handleClick = doSomething.after(trackEvent)
```
## 状态模式
状态模式的关键是区分事物内部的状态，事物内部状态的改变往往会带来事物的行为改变。状态模式的关键是把事物的每一种状态都封装成单独的类，跟此种状态有关的行为都被封装在这个类的内部。只需把请求交个当前的状态对象即可，该状态对象会负责处理它自身的行为。

## 适配器模式
适配器模式的作用是解决两个软件实体间的接口不兼容的问题。也称包装器。

## 设计原则

* 单一职责原则：一个对象（方法）只做一件事情。引起它变化的动机（原因）应该只有一个。
* 最少知识原则：减少对象之间的交互，不应该相互通信。以降低耦合度。通常使用一个第三方对象来承担这些对象之间的通信作用。
* 开放-封闭原则：软件实体（类、模块、函数）等应该是可以扩展的，但是不可修改。也就是说，当要给一个程序新增功能或者改变功能的时候，可以用增加代码的方式，而不允许改动程序的源代码。在程序设计之初就应该重视这一点。考虑其扩展性。if else条件分支通常违反开放-封闭原则。因为每当需要新增一个if语句，都要被迫的改动原函数。换成swich-case也是没有用的，这是一种换汤不换药的做法。可以使用对象的多态性，或者策略模式、状态模式等来优化。