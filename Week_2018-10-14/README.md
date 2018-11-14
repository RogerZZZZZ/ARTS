# Week 2018-10-14

## Algorithm

[933. Number of Recent Calls](https://leetcode.com/problems/number-of-recent-calls/description/)

[700. Search in a Binary Search Tree](https://leetcode.com/problems/search-in-a-binary-search-tree/description/)

## Review

> Learn something about chrome extension & implement a extension to batch download pictures from page.

[Batch Image Download Google Extension](https://github.com/RogerZZZZZ/batch-img-download)

## Tips

#### Function

> **defer**

Defers invoking a function until the current call stack has cleared.

Use setTimeout() with a timeout of 1ms to add a new event to the browser event queue and allow the rendering engine to complete its work. Use the spread (...) operator to supply the function with an arbitrary number of arguments.

```javascript
const defer = (fn, ...args) => setTimeout(fn, 1, ...args);

// Example A:
defer(console.log, 'a'), console.log('b'); // logs 'b' then 'a'

// Example B:
document.querySelector('#someElement').innerHTML = 'Hello';
longRunningFunction(); // Browser will not update the HTML until this has finished
defer(longRunningFunction); // Browser will update the HTML then run the function
```


> **hz**

Returns the number of times a function executed per second. hz is the unit for hertz, the unit of frequency defined as one cycle per second.

```javascript
const hz = (fn, iterations = 100) => {
  const before = performance.now();
  for (let i = 0; i < iterations; i++) fn();
  return (1000 * iterations) / (performance.now() - before);
};

// 10,000 element array
const numbers = Array(10000)
  .fill()
  .map((_, i) => i);

// Test functions with the same goal: sum up the elements in the array
const sumReduce = () => numbers.reduce((acc, n) => acc + n, 0);
const sumForLoop = () => {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  return sum;
};

// `sumForLoop` is nearly 10 times faster
Math.round(hz(sumReduce)); // 572
Math.round(hz(sumForLoop)); // 4784
```

> **memoize**

Returns the memoized (cached) function.

```javascript
const memoize = fn => {
  const cache = new Map();
  const cached = function(val) {
    return cache.has(val) ? cache.get(val) : cache.set(val, fn.call(this, val)) && cache.get(val);
  };
  cached.cache = cache;
  return cached;
};

// See the `anagrams` snippet.
const anagramsCached = memoize(anagrams);
anagramsCached('javascript'); // takes a long time
anagramsCached('javascript'); // returns virtually instantly since it's now cached
console.log(anagramsCached.cache); // The cached anagrams map
```

> **once**

Ensures a function is called only once.

```javascript
const once = fn => {
  let called = false;
  return function(...args) {
    if (called) return;
    called = true;
    return fn.apply(this, args);
  };
};

const startApp = function(event) {
  console.log(this, event); // document.body, MouseEvent
};
document.body.addEventListener('click', once(startApp)); // only runs `startApp` once upon click
```

> **partial**

Creates a function that invokes fn with partials prepended to the arguments it receives.

```javascript
const partial = (fn, ...partials) => (...args) => fn(...partials, ...args);

const greet = (greeting, name) => greeting + ' ' + name + '!';
const greetHello = partial(greet, 'Hello');
greetHello('John'); // 'Hello John!'
```

> **throttle**

Creates a throttled function that only invokes the provided function at most once per every wait milliseconds

```javascript
const throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime;
  return function() {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function() {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};

window.addEventListener(
  'resize',
  throttle(function(evt) {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 250)
); // Will log the window dimensions at most every 250ms
```

## Share