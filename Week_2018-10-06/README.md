# Week 2018-10-06

## Algorithm

[908. Smallest Range I](https://leetcode.com/problems/smallest-range-i/description/)

[876. Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/description/)

## Review

Translation: [An internship on laziness: lazy unlinking of deoptimized functions](https://github.com/RogerZZZZZ/V8-blog/tree/master/Lazy-unlinking-of-deoptimized-functions)

## Tips

#### Browser

> **formatDuration**

```javascript
const formatDuration = ms => {
  if (ms < 0) ms = -ms;
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000
  };
  return Object.entries(time)
    .filter(val => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
    .join(', ');
};

formatDuration(1001); // '1 second, 1 millisecond'
formatDuration(34325055574); // '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'
```

> **getColonTimeFromDate**

Returns a string of the form HH:MM:SS from a Date object.

```javascript
const getColonTimeFromDate = date => date.toTimeString().slice(0, 8);

getColonTimeFromDate(new Date()); // "08:38:00"
```

#### Function

> **chainAsync**

Chains asynchronous functions.

```javascript
const chainAsync = fns => {
  let curr = 0;
  const next = () => fns[curr++](next);
  next();
};

chainAsync([
  next => {
    console.log('0 seconds');
    setTimeout(next, 1000);
  },
  next => {
    console.log('1 second');
  }
]);
```

> **compose**

Performs right-to-left function composition.

```javascript
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

const add5 = x => x + 5;
const multiply = (x, y) => x * y;
const multiplyAndAdd5 = compose(
  add5,
  multiply
);
multiplyAndAdd5(5, 2); // 15
```

> **composeRight**

```javascript
const composeRight = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));
```

> **converge**

Accepts a converging function and a list of branching functions and returns a function that applies each branching function to the arguments and the results of the branching functions are passed as arguments to the converging function.

```javascript
const converge = (converger, fns) => (...args) => converger(...fns.map(fn => fn.apply(null, args)));

const average = converge((a, b) => a / b, [
  arr => arr.reduce((a, v) => a + v, 0),
  arr => arr.length
]);
average([1, 2, 3, 4, 5, 6, 7]); // 4
```

> **curry**

Curries a function.

```javascript
const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);

curry(Math.pow)(2)(10); // 1024
curry(Math.min, 3)(10)(50)(2); // 2
```

> **debounce**

Creates a debounced function that delays invoking the provided function until at least ms milliseconds have elapsed since the last time it was invoked.

```javascript
const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

window.addEventListener(
  'resize',
  debounce(() => {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 250)
); // Will log the window dimensions at most every 250ms
```

## Share