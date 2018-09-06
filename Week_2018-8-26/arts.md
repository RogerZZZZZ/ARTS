# Week 8/26/2018

## Algorithm

[705. Design HashSet](https://leetcode.com/problems/design-hashset/description/)

[]()

## Review
> Translate one article about v8 engine.

[Introducation to Speculative Optimization](https://github.com/RogerZZZZZ/V8-blog/tree/master/translation/%08Introduction-to-Speculative-Optimization)

## Tips

> 30-second-of-code

#### Adapter

> **ary**

Create a function that accept up to n arguments, ignoring any additional arguments.

```javascript
const ary = (fn, n) => (...args) => fn(...args.slice(0, n))

const firstTwoMax = ary(Math.max, 2);
[[2, 6, 'a'], [8, 4, 6], [10]].map(x => firstTwoMax(...x)); // [6, 8, 10]
```

>**call**

Given a key and a set of arguments, call them when given a context. Primarily useful in composition.

```javascript
const call = (key, ...args) => context => context[key](...args);

Promise.resolve([1, 2, 3])
  .then(call('map', x => 2 * x))
  .then(console.log); //[ 2, 4, 6 ]
const map = call.bind(null, 'map');
Promise.resolve([1, 2, 3])
  .then(map(x => 2 * x))
  .then(console.log); //[ 2, 4, 6 ]
```

>**collectInto**

Changes a function that accepts an array into a variadic function

```javascript
const collectInto = fn => (...args) => fn(args);

const Pall = collectInto(Promise.all.bind(Promise));
let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);
let p3 = new Promise(resolve => setTimeout(resolve, 2000, 3));
Pall(p1, p2, p3).then(console.log); // [1, 2, 3] (after about 2 seconds)
```

>**flip**

Flip takes a function as an argument, then make the first argument the last

```javascript
const flip = fn => (first, ...rest) => fn(...rest, first);

let a = { name: 'John Smith' };
let b = {};
const mergeFrom = flip(Object.assign);
let mergePerson = mergeFrom.bind(null, a); // set the first argument
mergePerson(b); // == b
b = {};
Object.assign(b, a); // == b
```

>**over**

Creates a function that invokes each provided function with the arguments it receives and returns the results in array.

```javascript
const over = (...fns) => (...args) => fns.map(fn => fn.apply(null, args));

const minMax = over(Math.min, Math.max);
minMax(1, 2, 3, 4, 5); // [1,5]
```

>**overArgs**

Creates a function that invokes the provided function with its arguments transformed.

Use Array.map() to apply transforms to args in combination with the spread operator (...) to pass the transformed arguments to fn.

```javascript
const overArgs = (fn, transforms) => (...args) => fn(...args.map((val, i) => transforms[i](val)));

const square = n => n * n;
const double = n => n * 2;
const fn = overArgs((x, y) => [x, y], [square, double]);
fn(9, 3); // [81, 6]
```

>**pipeAsyncFunctions** *

Performs left-to-right function composition for asynchronous functions.

Use Array.reduce() with the spread operator (...) to perform left-to-right function composition using Promise.then(). The functions can return a combination of: simple values, Promise's, or they can be defined as async ones returning through await. All functions must be unary.

```javascript
const pipeAsyncFunctions = (...fns) => arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg));
// The second argument in reduce function is the init value in accumulator.

const sum = pipeAsyncFunctions(
  x => x + 1,
  x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
  x => x + 3,
  async x => (await x) + 4
);
(async () => {
  console.log(await sum(5)); // 15 (after one second)
})();
```

>**pipeFunctions** *

Performs left-to-right function composition.

Use Array.reduce() with the spread operator (...) to perform left-to-right function composition. The first (leftmost) function can accept one or more arguments; the remaining functions must be unary.

```javascript
const pipeFunctions = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));

const add5 = x => x + 5;
const multiply = (x, y) => x * y;
const multiplyAndAdd5 = pipeFunctions(multiply, add5);
multiplyAndAdd5(5, 2); // 15
```

>**promisify**

Converts an asynchronous function to return a promise.

Use currying to return a function returning a Promise that calls the original function. Use the ...rest operator to pass in all the parameters.

In Node 8+, you can use util.promisify

```javascript
const promisify = func => (...args) =>
  new Promise((resolve, reject) =>
    func(...args, (err, result) => (err ? reject(err) : resolve(result)))
);

const delay = promisify((d, cb) => setTimeout(cb, d));
delay(2000).then(() => console.log('Hi!')); // // Promise resolves after 2s
```

>**rearg**

Creates a function that invokes the provided function with its arguments arranged according to the specified indexes.

```javascript
const rearg = (fn, indexes) => (...args) => fn(...indexes.map(i => args[i]));

var rearged = rearg(
  function(a, b, c) {
    return [a, b, c];
  },
  [2, 0, 1]
);
rearged('b', 'c', 'a'); // ['a', 'b', 'c']
```

> **spreadOver**

Takes a variadic function and returns a closure that accepts an array of arguments to map to the inputs of the function.

```javascript
// now could input the array-like parameters to the function that can not accept
const spreadOver = fn => argsArr => fn(...argsArr);

const arrayMax = spreadOver(Math.max);
arrayMax([1, 2, 3]); // 3
// => Math.max(1, 2, 3)
```

> **unary**

Creates a function that accepts up to one argument, ignoring any additional arguments.

```javascript
const unary = fn => val => fn(val);

['6', '8', '10'].map(unary(parseInt)); // [6, 8, 10]

const f = unary(parseInt);
f('2', '1', '3') // 2
```

## Share

> Topic: Redux

主要来自于公司的works college. 分享了Redux对于公司内部大量使用后端渲染的一些改善。主要是可以在前端进行一些状态的管理，比Vuex多一些对之前状态的记录和import，可以实现时光机的功能等，大大提高debug的速度。

再来是一些Redux的基础知识，分为view, action, dispatcher, midderware, reducer等.

其中middlerware可以详细讲一下，可以理解为reducer的pre-task，可以在其中实现例如log之类的操作，或是将一些参数改变为reducer可以接受的参数，提高可用度和扩展性。