# Week 2018-9-2

## Algorithm
[657. Robot Return to Origin](https://leetcode.com/problems/robot-return-to-origin/description/)

[832. Flipping an Image](https://leetcode.com/problems/flipping-an-image/description/)

## Review

## Tips

> 30-second-of-code

#### Array

> **all**

Return true if the provided functions returns true for all elements provided.

```javascript
const all = (arr, fn = Boolean) => arr.every(fn);

all([4, 2, 3], x => x > 1); // true
all([1, 2, 3]); // true
// if you do not provide the function, check if the element is truthy

const allEqual = arr => arr.every(val => val === arr[0]);
```

> **any**

```javascript
const any = (arr, fn = Boolean) => arr.some(fn);

any([0, 1, 2, 0], x => x >= 2); // true
any([0, 0, 1, 0]); // true
```

> **arrayToCSV**

```javascript
const arrayToCSV = (arr, delimiter = ',') =>
  arr.map(v => v.map(x => `"${x}"`).join(delimiter)).join('\n');

arrayToCSV([['a', 'b'], ['c', 'd']]); // '"a","b"\n"c","d"'
arrayToCSV([['a', 'b'], ['c', 'd']], ';'); // '"a";"b"\n"c";"d"'
```

> **bifurcateBy**

Splits values into two groups according to a predicate function, which specifies which group an element in the input collection belongs to. If the predicate function returns a truthy value, the collection element belongs to the first group; otherwise, it belongs to the second group.

```javascript
const bifurcateBy = (arr, fn) =>
  arr.reduce((acc, val, i) => (acc[fn(val, i) ? 0 : 1].push(val), acc), [[], []]);

bifurcateBy(['beep', 'boop', 'foo', 'bar'], x => x[0] === 'b'); // [ ['beep', 'boop', 'bar'], ['foo'] ]
```

> **chunk**

Chunks an array into smaller arrays of a specified size.

```javascript
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

chunk([1, 2, 3, 4, 5], 2); // [[1,2],[3,4],[5]]
```

> **compact**

Remove the falsey values from array

```javascript
const compact = (arr) => arr.filter(Boolean)

compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]); // [ 1, 2, 3, 'a', 's', 34 ]
```

> **countBy**

Group the elements based on the function result or attribute of elements.

```javascript
const countBy = (arr, fn) => {
  arr.map(typeof fn === 'function' ? fn: val => val[fn]).reduce((acc, val, i) => {
    acc[val] = (acc[val] || 0) + 1
    return acc
  }, {})
}

countBy([6.1, 4.2, 6.3], Math.floor); // {4: 1, 6: 2}
countBy(['one', 'two', 'three'], 'length'); // {3: 2, 5: 1}
```

> **countOccurrences**

```javascript
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3
```

> **deepFlatten**

```javascript
const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]
```

> **difference**

Compare two array. Return the element in A that B does not have

```javascript
const differnece = (a, b) => {
  const s = new Set(b)
  return a.filter(x => !s.has(x))
}

difference([1, 2, 3], [1, 2, 4]); // [3]

// add a function to do data convert previously

const differenceBy = (a, b, fn) => {
  const s = new Set(b.map(v => fn(v)))
  return a.filter(v => !s.has(fn(v)))
}

differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1.2]
differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x); // [ { x: 2 } ]
```

> **differenceWith**

Filters out all values from an array for which the comparator function does not return true.

```javascript
const differenceWith = (arr, val, comp) => arr.filter(a => val.findIndex(b => comp(a, b)) === -1);

differenceWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0], (a, b) => Math.round(a) === Math.round(b)); // [1, 1.2]
```

> **dropRightWhile**

Removes elements from the end of an array until the passed function returns true. Returns the remaining elements in the array.

```javascript
const dropRightWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[arr.length - 1])) arr = arr.slice(0, -1);
  return arr;
};

dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]
```

> **everyNth**

```javascript
const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);

everyNth([1, 2, 3, 4, 5, 6], 2); // [ 2, 4, 6 ]
```

> **filterNonUniqueBy**

Filters out the non-unique values in an array, based on a provided comparator function.

```javascript
const filterNonUniqueBy = (arr, fn) =>
  arr.filter((v, i) => arr.every((x, j) => (i === j) === fn(v, x, i, j)));

filterNonUniqueBy(
  [
    { id: 0, value: 'a' },
    { id: 1, value: 'b' },
    { id: 2, value: 'c' },
    { id: 1, value: 'd' },
    { id: 0, value: 'e' }
  ],
  (a, b) => a.id === b.id
); // [ { id: 2, value: 'c' } ]
```

## Share

This week share also came from the works college. The topic is **DevOps**, but the content of sharing is only not about the concept in computer science scope. But the basic concept of it.

![DevOps in software development](https://github.com/RogerZZZZZ/ARTS/blob/master/Year_2018/Week_2018-9-2/arts.md)

`Mike Dilwortrh, Agile and DevOps transformation lead` said that:

> DevOps is a culture, not a role! The whole company needs to be doing DevOps for it to work.

What impressed me most is the technical strategy that could imporve the system robustness, the ability of tolerating the error, and decrease the time spending of recover the service. `Netflix Chaos Monkey`, what it does, for example like randomly removing the server. Here is another explanation of it. 

> Chaos Monkey is a tool that Netflix created to turn the volume on system testing to 11. If it is vital for you to be fault tolerant and flexible, you need to prove that it the case, and the only real way to do this is to break things in production and see what happens.

Related articles:

[Netflix Chaos Monkey Upgraded](https://medium.com/netflix-techblog/netflix-chaos-monkey-upgraded-1d679429be5d)

And the github repo: [chaosmonkey](https://github.com/netflix/chaosmonkey)