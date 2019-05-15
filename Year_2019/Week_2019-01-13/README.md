# Week 2019-01-13

## Algorithm

[53. maximum-subarray](https://leetcode.com/problems/maximum-subarray/description/)

[58. length-of-last-word](https://leetcode.com/problems/length-of-last-word/description/)

## Review

## Tips

**ES10**

- `[].flat()`: 打平一次数组，可以传入打平次数，也可以链式调用
- `Object.fromEntries` 转换成对 [key, value] 的 Array 成为一个 Object.

```js
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);
const obj = Object.fromEntries(entries);
console.log(obj);
// expected output: Object { foo: "bar", baz: 42 }
```

- `trimLeft() / trimRight()`
- `function.toString()` 返回Function代码
- `Symbol Description Accessor` 在构建函数 symbol 时把 description 作第一个参数传入，就可以通过 toString() 取得

```js
const symbolExample = Symbol("Symbol description");
console.log(symbolExample.toString());
// 'Symbol(Symbol description)'
```

## Share

### [函数式编程 - 1]

- compose函数的实现

```js
function compose(...args) {
    return (result) => {
        return args.reduceRight((result, fn) => {
          return fn(result)
        }, result)
  }
}
```


**point-free**: 表示的是没有形参的编程风格

```js
// 这就是有参的，因为 word 这个形参
var snakeCase = word => word.toLowerCase().replace(/\s+/ig, '_');

// 这是 pointfree，没有任何形参
var snakeCase = compose(replace(/\s+/ig, '_'), toLowerCase);
```

但是point-free背后使用的最底层函数都是非point-free的

- currying

compose函数接受的函数参数，其都只能接受一个参数，所以需要currying

```js
function currying(fn, ...args) {
    if (args.length >= fn.length) {
        return fn(...args)
    }
    return function (...args2) {
        return currying(fn, ...args, ...args2)
    }
}
```