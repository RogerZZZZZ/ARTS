# Week 2019-01-06

## Algorithm

[27. remove-element](https://leetcode.com/problems/remove-element/description/)

[28. implement-str-str](https://leetcode.com/problems/implement-strstr/description/)

[35. search-insert-position](https://leetcode.com/problems/search-insert-position/description/)

## Review

## Tips

**[CSS]**

- vw/vh: 当前屏幕的百分比. 50vw相当于当前屏幕宽度一半的大小

**[JS]**

- 发get请求的方法

```js
const image = new Image(1, 1)
image.src = '..'
// 相当于进行了一次get请求
```

- 插件开发的一种方式
优点在于可以多个库同时使用，并且可以共享其中的变量和状态

```js
// 直接挂在window对象上
window.XXX = new XXX()

```

## Share

### [函数式编程 - 1]

- 函数式编程的目的是使用函数来抽象作用在数据之上的控制流和操作，从而在系统中消除副作用并减少对状态的改变。

1. 声明式编程

```js
// 命令式方式
var array = [0, 1, 2, 3]
for(let i = 0; i < array.length; i++) {
    array[i] = Math.pow(array[i], 2)
}

array; // [0, 1, 4, 9]

// 声明式方式
[0, 1, 2, 3].map(num => Math.pow(num, 2))

// 而声明式是将程序的描述与求值分离开来。它关注如何用各种表达式来描述程序逻辑，而不一定要指明其控制流或状态关系的变化。
```

2. 纯函数
3. 引用透明

```js
// 非引用透明
var counter = 0

function increment() {
    return ++counter
}

// 引用透明
var increment = (counter) => counter + 1
// 其实对于箭头函数在函数式编程里面有一个高大上的名字，叫 lambda 表达式，对于这种匿名函数在学术上就是叫 lambda 表达式，现在在 Java 里面也是支持的。
```

4. 不可变数据