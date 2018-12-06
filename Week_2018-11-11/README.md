# Week 2018-11-11

## Algorithm

[884. Uncommon Words from Two Sentences](https://leetcode.com/problems/uncommon-words-from-two-sentences/description/)

[463. Island Perimeter](https://leetcode.com/problems/island-perimeter/description/)

## Review

[How Does React Tell a Class From a Function](How Does React Tell a Class from a Function?)

在引入Hooks之前，Function Component和Class Component最大的区别第一是语法有所不同，第二是Function Component中无法使用各种的生命周期，第三是Function中没有`setState`方法。

并且因为Function和Class的机制不同的缘故，导致React在使用component时，需要用不同的方法去创建实例。下面有两个简单的例子

```js
// Your code
function Greeting() {
  return <p>Hello</p>;
}

// Inside React
const result = Greeting(props); // <p>Hello</p>


// Your code
class Greeting extends React.Component {
  render() {
    return <p>Hello</p>;
  }
}

// Inside React
const instance = new Greeting(props); // Greeting {}
const result = instance.render(); // <p>Hello</p>
```

可以简单的看出，一个有`new`关键字，而Function Component则没有。

首先我们需要看一些关于`new`, `this`, `class`, `arrow function`, `prototype`, `__proto__`,以及`—instanceof`的知识点。

`new`: Create an {} object and point this inside the Person function to that object so I can assign stuff like this.name. Then give that object back to me. And also `new` operator also makes anything we put on prototype available on its instance object.

无法始终使用`new`的原因有以下几点：
- class需要创建实例则必须使用`new`，所以导致React无法简单的通过`new`来创建Function Component和Class Component的实例
- `arrow function`也无法使用`new`来创建实例
- it would preclude React from supporting components that return strings or other primitive types.

```js
function Greeting() {
  return 'Hello';
}

Greeting(); // ✅ 'Hello'
new Greeting(); // 😳 Greeting {}
```

> 如何判断一个函数时箭头函数，箭头函数的prototype是undefined

```js
(() => {}).prototype // undefined
(function() {}).prototype // {constructor: f}
```

> JavaScript also allows a function called with new to override the return value of new by returning some other object. Presumably, this was considered useful for patterns like pooling where we want to reuse instances:

```js
// Created lazily
var zeroVector = null;

function Vector(x, y) {
  if (x === 0 && y === 0) {
    if (zeroVector !== null) {
      // Reuse the same instance
      return zeroVector;
    }
    zeroVector = this;
  }
  this.x = x;
  this.y = y;
}

var a = new Vector(1, 1);
var b = new Vector(0, 0);
var c = new Vector(0, 0); // 😲 b === c
```

而实际React去辨别是不是Class Component的方法是，其是否继承`React.Component`

在这里我们有需要讲一些关于`prototype chain`的知识。**Confusingly, the prototype property of a class or a function does not point to the prototype of that value.**

```js
function Person() {}

console.log(Person.prototype); // 🤪 Not Person's prototype
console.log(Person.__proto__); // 😳 Person's prototype
```

so the “prototype chain” is more like `__proto__.__proto__.__proto__` than `prototype.prototype.prototype`. And that __proto__ chain is how JavaScript looks up properties:

```js
fred.sayHi();
// 1. Does fred have a sayHi property? No.
// 2. Does fred.__proto__ have a sayHi property? Yes. Call it!

fred.toString();
// 1. Does fred have a toString property? No.
// 2. Does fred.__proto__ have a toString property? No.
// 3. Does fred.__proto__.__proto__ have a toString property? Yes. Call it!

class Greeting extends React.Component {
  render() {
    return <p>Hello</p>;
  }
}

let c = new Greeting();
console.log(c.__proto__); // Greeting.prototype
console.log(c.__proto__.__proto__); // React.Component.prototype
console.log(c.__proto__.__proto__.__proto__); // Object.prototype

c.render();      // Found on c.__proto__ (Greeting.prototype)
c.setState();    // Found on c.__proto__.__proto__ (React.Component.prototype)
c.toString();    // Found on c.__proto__.__proto__.__proto__ (Object.prototype)
```

因此

```js
let greeting = new Greeting();

console.log(greeting instanceof Greeting); // true
// greeting (🕵️‍ We start here)
//   .__proto__ → Greeting.prototype (✅ Found it!)
//     .__proto__ → React.Component.prototype 
//       .__proto__ → Object.prototype

console.log(greeting instanceof React.Component); // true
// greeting (🕵️‍ We start here)
//   .__proto__ → Greeting.prototype
//     .__proto__ → React.Component.prototype (✅ Found it!)
//       .__proto__ → Object.prototype

console.log(greeting instanceof Object); // true
// greeting (🕵️‍ We start here)
//   .__proto__ → Greeting.prototype
//     .__proto__ → React.Component.prototype
//       .__proto__ → Object.prototype (✅ Found it!)

console.log(greeting instanceof Banana); // false
// greeting (🕵️‍ We start here)
//   .__proto__ → Greeting.prototype
//     .__proto__ → React.Component.prototype 
//       .__proto__ → Object.prototype (🙅‍ Did not find it!)
```

但是为什么React不是通过instanceof的机制来检查的，原因为如果在一个项目中有多个React的copy则会导致这样的机制检查失败。

因此最后的解决办法为加入了一个flag在React.Component中，可以通过下面的代码来判断。

```js
// Inside React
class Component {}
Component.isReactClass = {};

// We can check it like this
class Greeting extends Component {}
console.log(Greeting.isReactClass); // ✅ Yes
```

但是还是存在问题，是有一些实现可能不会拷贝静态属性，导致flag被丢失，因此最终React的做法是将flag移至React.Component.prototype上

```js
// Inside React
class Component {}
Component.prototype.isReactComponent = {};

// We can check it like this
class Greeting extends Component {}
console.log(Greeting.prototype.isReactComponent); // ✅ Yes
```

## Tips

## Share

Dan大神的一句话，真是很激励人

You might say this story is a bit of a bait-and-switch. The actual solution is really simple, but I went on a huge tangent to explain why React ended up with this solution, and what the alternatives were.

In my experience, that’s often the case with library APIs. For an API to be simple to use, you often need to consider the language semantics (possibly, for several languages, including future directions), runtime performance, ergonomics with and without compile-time steps, the state of the ecosystem and packaging solutions, early warnings, and many other things. The end result might not always be the most elegant, but it must be practical.

If the final API is successful, its users never have to think about this process. Instead they can focus on creating apps.

But if you’re also curious… it’s nice to know how it works.

**Stay Hungry and Stay Foolish**