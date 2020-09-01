# Week 2020-09-08

## Algorithm

## Tips

[JS原型-显式原型+隐式原型]

- 每个函数都有一个prototype属性, 它默认指向一个Object空对象
- 原型对象中有一个属性constructor, 它指向函数对象

```js
function Fun () {}
console.log(Fun.prototype)  // 默认指向一个Object空对象(没有我们的属性)
//输出 object 里面有constructor+__proto__

// 原型对象中有一个属性constructor, 它指向函数对象
console.log(Date.prototype.constructor===Date)   //ture
console.log(Fun.prototype.constructor===Fun)  
```

> 显式原型与隐式原型

- 每个函数function都有一个prototype, 即显式原型
- 每个实例对象都有一个__proto__, 即隐式原型
- 对象的隐式原型的值等于其对应构造函数显式原型的值
- 函数的prototype属性是在定义函数时自动添加的, 默认为一个空的object对象
- 对象的__proto__属性是创建对象时自动添加的

```js
fn.__proto__ === Fn.prototype
```

```js
Function.__proto__ === Function.prototype // true

Object.__proto__ === Function.prototype // true

Function.prototype.__proto___ === Object.prototype // true

Fn.prototype.__proto__ === Object.prototype // true
```

## Share