# Week 2018-9-9

## Algorithm

[617. Merge Two Binary Trees](https://leetcode.com/problems/merge-two-binary-trees/description/)

[852. Peak Index in a Mountain Array](https://leetcode.com/problems/peak-index-in-a-mountain-array/description/)

## Review

**Translation**

[Explaining JavaScript VMs in JavaScript - Inline Caches](https://github.com/RogerZZZZZ/V8-blog/tree/master/translation/Explain-Javascript-VMs-in%20Javascript)

## Tips

> 30-second-of-code

#### Array

> **findLast**

Find the last element for which the provided function return a truthy value.

```javascript
const findLast = (fn, arr) => arr.filter(fn).pop()

findLast([1, 2, 3, 4], n => n % 2 === 1); // 3
```

> **findLastIndex**

Return the last element index for whitch provided function return a truthy value.

```javascript
const findLastIndex = (arr, fn) =>
  arr
    .map((val, i) => [i, val])
    .filter(([i, val]) => fn(val, i, arr))
    .pop()[0];

findLast([1, 2, 3, 4], n => n % 2 === 1); // 2
```

> **flatten**

```javascript
const flatten = (arr, depth = 1) =>
  arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), []);

flatten([1, [2], 3, 4]); // [1, 2, 3, 4]
flatten([1, [2, [3, [4, 5], 6], 7], 8], 2); // [1, 2, 3, [4, 5], 6, 7, 8]
```

> **forEachRight**

Call the fn for each element in array from the last element in it.

```javascript
forEachRight = (arr, fn) =>
  arr 
    .slice(0) // to clone new array
    .reverse()
    .forEach(fn)

forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'
```

> **groupBy**

Groups the elements of an array based on the given funciton.

```javascript
groupBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : arr[fn]).reduce((acc, val, i) => {
    acc[val] = (acc[val] || []).concat(arr[val])
    return acc
  }, {})

groupBy([6.1, 4.2, 6.3], Math.floor); // {4: [4.2], 6: [6.1, 6.3]}
groupBy(['one', 'two', 'three'], 'length'); // {3: ['one', 'two'], 5: ['three']}
```

> **indexOfAll**

Returns all indices of val in an array. If val never occurs, returns [].

```javascript
const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);

indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0,3]
indexOfAll([1, 2, 3], 4); // []
```

> **initialize2DArray**

Build a 2D array based on the given width and heigth

```javascript
const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

initialize2DArray(2, 2, 0); // [[0,0], [0,0]]
```

> **initializeNDArray**

Create a n-dimensional array with given value.

```javascript
const initializeNDArray = (val, ...args) =>
  args.length === 0
    ? val
    : Array.from({ length: args[0] }).map(() => initializeNDArray(val, ...args.slice(1)));

initializeNDArray(1, 3); // [1,1,1]
initializeNDArray(5, 2, 2, 2); // [[[5,5],[5,5]],[[5,5],[5,5]]]
```

> **intersection**

Returns a list of elements that exist in both arrays.

```javascript
const intersection = (a, b) => {
  const s = new Set(b);
  return a.filter(x => s.has(x));
};

intersection([1, 2, 3], [4, 3, 2]); // [2,3]
```

> **intersectionWith**

Returns a list of elements that exist in both arrays, using a provided comparator function.

```javascript
const intersectionWith = (a, b, comp) => a.filter(x => b.findIndex(y => comp(x, y)) !== -1);

intersectionWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0, 3.9], (a, b) => Math.round(a) === Math.round(b)); // [1.5, 3, 0]
```

> **isSorted**

Returns 1 if the array is sorted in ascending order, -1 if it is sorted in descending order or 0 if it is not sorted.

```javascript
const isSorted = arr => {
  let direction = -(arr[0] - arr[1]);
  for (let [i, val] of arr.entries()) {
    direction = !direction ? -(arr[i - 1] - arr[i]) : direction;
    if (i === arr.length - 1) return !direction ? 0 : direction;
    else if ((val - arr[i + 1]) * direction > 0) return 0;
  }
};

isSorted([0, 1, 2, 2]); // 1
isSorted([4, 3, 2]); // -1
isSorted([4, 3, 5]); // 0
```

> **join**

Joins all elements of an array into a string and returns this string. Uses a separator and an end separator.

```javascript
const join = (arr, separator = ',', end = separator) =>
  arr.reduce(
    (acc, val, i) =>
      i === arr.length - 2
        ? acc + val + end
        : i === arr.length - 1
          ? acc + val
          : acc + val + separator,
    ''
  );

join(['pen', 'pineapple', 'apple', 'pen'], ',', '&'); // "pen,pineapple,apple&pen"
join(['pen', 'pineapple', 'apple', 'pen'], ','); // "pen,pineapple,apple,pen"
join(['pen', 'pineapple', 'apple', 'pen']); // "pen,pineapple,apple,pen"
```

> **JSONtoCSV**

Converts an array of objects to a comma-separated values (CSV) string that contains only the columns specified.

```javascript
const JSONtoCSV = (arr, columns, delimiter = ',') =>
  [
    columns.join(delimiter),
    ...arr.map(obj =>
      columns.reduce(
        (acc, key) => `${acc}${!acc.length ? '' : delimiter}"${!obj[key] ? '' : obj[key]}"`,
        ''
      )
    )
  ].join('\n');

JSONtoCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b']); // 'a,b\n"1","2"\n"3","4"\n"6",""\n"","7"'
JSONtoCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b'], ';'); // 'a;b\n"1";"2"\n"3";"4"\n"6";""\n"";"7"'
```

> **mapObject**

Maps the values of an array to an object using a function, where the key-value pairs consist of the original value as the key and the mapped value.

```javascript
const mapObject = (arr, fn) =>
  (a => (
    (a = [arr, arr.map(fn)]), a[0].reduce((acc, val, ind) => ((acc[val] = a[1][ind]), acc), {})
  ))();
// => ((acc[val] = a[1][ind], acc))， just means that run the statements except last sentence, and return the last one.

const squareIt = arr => mapObject(arr, a => a * a);
squareIt([1, 2, 3]); // { 1: 1, 2: 4, 3: 9 }
```

> **offset**

Moves the specified amount of elements to the end of the array.

```javascript
const offset = (arr, offset) => [...arr.slice(offset), ...arr.slice(0, offset)];

offset([1, 2, 3, 4, 5], 2); // [3, 4, 5, 1, 2]
offset([1, 2, 3, 4, 5], -2); // [4, 5, 1, 2, 3]
```

## Share

This week got two new thoughts of replacing the switch or if...else statements, which actually make code more readable and clean.

> Function twist

```javascript
const matched = x => ({
  on: () => matched(x),
  otherwise: () => x,
})

const match = x => ({  
  on: (pred, fn) => (pred(x) ? matched(fn(x)) : match(x)),
  otherwise: fn => fn(x),
})

// EXAMPLE 1
match(50)
 // we are now in match context
.on(x => x < 0, () => 0)
 // Since 50 is not < 0, we remain in match(50) context
.on(x => x >= 0 && x <= 1, () => 1)
 // Since 50 is not between 0 and 1, we remain in match(50) context
.otherwise(x => x * 10)
 // We are still in match(50), so otherwise callback is called,
 // and we get 500 back

// EXAMPLE 2
match(0)
 // we are now in match context
.on(x => x < 0, () => 0)
 // 0 is not <0 so we remain in match(0) context
.on(x => x >= 0 && x <= 1, () => 1)
 // Since 0 satisfies this guard, we use the return value of the
 // function and put it in matched context. We are now in
 // matched(1) context.
.otherwise(x => x * 10)
 // We are in matched context, so the callback is ignored, and
 // instead, we get 1 back
```

The core part is to change the context when the input is valid with the requirements. 

And there is another concept:

```javascript
const done = x => ({
  attempt: () => done(x),
  finally: fn => fn(x),
})
const until = (pred, x) => ({
  attempt: fn => {
    const y = fn(x)
    return pred(y) ? done(y) : until(pred, x)
  },
  finally: (_, fn) => fn(x),
})

// Example
const a = until(x => x > 10, 1)
  .attempt(x => x*2)
  .attempt(x => x*10)
  .finally(x => x*30, x => x + 2)

console.log(a) // 3

// Example
const a = until(x => x > 10, 1)
  .attempt(x => x*2)
  .attempt(x => x*20)
  .finally(x => x*30, x => x + 2)

console.log(a) // 600
```

> Another way

```javascript
parse: (data, pattern) => {
    const func = {
      function: (d) => {
        return d.call(this, data)
      },
      no: (d) => {
        return d
      },
      math: (d) => {
        return mathParser
          .parse(d.exp)
          .evaluate(objResolve(d.param, data))
      },
      object: (d) => {
        return match.parse(data, d)
      },
      param: (d) => {
        return expsResolve(data, d)
      },
    }
    return func[pattern.type](pattern.data)
  }

```