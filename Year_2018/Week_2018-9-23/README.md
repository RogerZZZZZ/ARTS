# Week 2018-9-23

## Algorithm

[561. Array Partition I](https://leetcode.com/problems/array-partition-i/description/)

[922. Sort Array By Parity II](https://leetcode.com/problems/sort-array-by-parity-ii/description/)

## Review

Translate article [Understanding V8's Bytecode](https://github.com/RogerZZZZZ/V8-blog/tree/master/Understanding-V8's-Bytecode)

## Tips

#### Array

> **similarity**

Returns an array of elements that appear in both arrays.

```javascript
const similartiry = (arr, values) => arr.filter(v => values.includes(v))

similarity([1, 2, 3], [1, 2, 4]); // [1, 2]
```

> **sortedIndex**

Returns the lowest index at which value should be inserted into array in order to maintain its sort order.

```javascript
const sortedIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr.findIndex(el => (isDescending ? n >= el : n <= el));
  return index === -1 ? arr.length : index;
};

sortedIndex([5, 3, 2, 1], 4); // 1
sortedIndex([30, 50], 40); // 1
```

> **sortedIndexBy**

Returns the lowest index at which value should be inserted into array in order to maintain its sort order, based on a provided iterator function.

```javascript
const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el => (isDescending ? val >= fn(el) : val <= fn(el)));
  return index === -1 ? arr.length : index;
};

sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0
```

> **stableSort**

Performs stable sorting of an array, preserving the initial indexes of items when their values are the same. Does not mutate the original array, but returns a new array instead.

```javascript
const stableSort = (arr, compare) =>
  arr
    .map((item, index) => ({ item, index }))
    .sort((a, b) => compare(a.item, b.item) || a.index - b.index)
    .map(({ item }) => item);

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const stable = stableSort(arr, () => 0); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

> **symmetricDifferenceBy**

Returns the symmetric difference between two arrays, after applying the provided function to each array element of both.

```javascript
const symmetricDifferenceBy = (a, b, fn) => {
  const sA = new Set(a.map(v => fn(v))),
    sB = new Set(b.map(v => fn(v)));
  return [...a.filter(x => !sB.has(fn(x))), ...b.filter(x => !sA.has(fn(x)))];
};

symmetricDifferenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [ 1.2, 3.4 ]
```

> **takeRightWhile**

Removes elements from the end of an array until the passed function returns true. Returns the removed elements.

```javascript
const takeRightWhile = (arr, func) =>
  arr.reduceRight((acc, el) => (func(el) ? acc : [el, ...acc]), []);

takeRightWhile([1, 2, 3, 4], n => n < 3); // [3, 4]
```

> **toHash**

Reduces a given Array-like into a value hash (keyed data store).

```javascript
const toHash = (object, key) =>
  Array.prototype.reduce.call(
    object,
    (acc, data, index) => ((acc[!key ? index : data[key]] = data), acc),
    {}
  );

toHash([4, 3, 2, 1]); // { 0: 4, 1: 3, 2: 2, 1: 1 }
toHash([{ a: 'label' }], 'a'); // { label: { a: 'label' } }
// A more in depth example:
let users = [{ id: 1, first: 'Jon' }, { id: 2, first: 'Joe' }, { id: 3, first: 'Moe' }];
let managers = [{ manager: 1, employees: [2, 3] }];
// We use function here because we want a bindable reference, but a closure referencing the hash would work, too.
managers.forEach(
  manager =>
    (manager.employees = manager.employees.map(function(id) {
      return this[id];
    }, toHash(users, 'id')))
);
managers; // [ { manager:1, employees: [ { id: 2, first: "Joe" }, { id: 3, first: "Moe" } ] } ]
```

> **union**

Returns every element that exists in any of the two arrays once.

```javascript
const union = (a, b) => Array.from(new Set([...a, ...b]));

union([1, 2, 3], [4, 3, 2]); // [1,2,3,4]
```

> **uniqueElements**

Returns all unique values of an array.

```javascript
const uniqueElements = arr => [...new Set(arr)];

uniqueElements([1, 2, 2, 3, 4, 4, 5]); // [1, 2, 3, 4, 5]
```

> **uniqueElementsBy**

Returns all unique values of an array, based on a provided comparator function.

```javascript
const uniqueElementsBy = (arr, fn) =>
  arr.reduce((acc, v) => {
    if (!acc.some(x => fn(v, x))) acc.push(v);
    return acc;
  }, []);

uniqueElementsBy(
  [
    { id: 0, value: 'a' },
    { id: 1, value: 'b' },
    { id: 2, value: 'c' },
    { id: 1, value: 'd' },
    { id: 0, value: 'e' }
  ],
  (a, b) => a.id == b.id
); // [ { id: 0, value: 'a' }, { id: 1, value: 'b' }, { id: 2, value: 'c' } ]
```

> **unzip**

Creates an array of arrays, ungrouping the elements in an array produced by zip.

```javascript
const unzip = arr =>
  arr.reduce(
    (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
    Array.from({
      length: Math.max(...arr.map(x => x.length))
    }).map(x => [])
  );

unzip([['a', 1, true], ['b', 2, false]]); //[['a', 'b'], [1, 2], [true, false]]
unzip([['a', 1, true], ['b', 2]]); //[['a', 'b'], [1, 2], [true]]
```

> **zipObject**

Given an array of valid property identifiers and an array of values, return an object associating the properties to the values.

```javascript
const zipObject = (props, values) =>
  props.reduce((obj, prop, index) => ((obj[prop] = values[index]), obj), {});

zipObject(['a', 'b', 'c'], [1, 2]); // {a: 1, b: 2, c: undefined}
zipObject(['a', 'b'], [1, 2, 3]); // {a: 1, b: 2}
```

> **zipWith**

Creates an array of elements, grouped based on the position in the original arrays and using function as the last value to specify how grouped values should be combined.

```javascript
const zipWith = (...array) => {
  const fn = typeof array[array.length - 1] === 'function' ? array.pop() : undefined;
  return Array.from(
    { length: Math.max(...array.map(a => a.length)) },
    (_, i) => (fn ? fn(...array.map(a => a[i])) : array.map(a => a[i]))
  );
};

zipWith([1, 2], [10, 20], [100, 200], (a, b, c) => a + b + c); // [111,222]
zipWith(
  [1, 2, 3],
  [10, 20],
  [100, 200],
  (a, b, c) => (a != null ? a : 'a') + (b != null ? b : 'b') + (c != null ? c : 'c')
); // [111, 222, '3bc']

zipWith([1, 2], [3, 4]) // [[1, 3], [2, 4]]
```

## Share

[coding tip to code without loops](https://edgecoders.com/coding-tip-try-to-code-without-loops-18694cf06428)

The reason is that `for-loop`(including for in, for each....etc) is called `imperative approach`, which is actualy closed to the computer instructions, not like how we think.

So just replace the `for-loop` with `map, reduce, filter`