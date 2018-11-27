# Week 2018-10-28

## Algorithm

[821. Shortest Distance to a Character](https://leetcode.com/problems/shortest-distance-to-a-character/solution/)

[500. Keyboard Row](https://leetcode.com/problems/keyboard-row/description/)

## Review

[对React Hooks的一些思考](https://zhuanlan.zhihu.com/p/48264713)

```javascript
const FunctionComponent = props => {
    // 对所有Hooks的调用，声明前置条件

    // 对props及hooks提供的内容的运算处理，数据加工

    // 将数据转变为JSX并返回
};
```

使用`useEffect`来取代`componentDidMount`和`componentDidUpdate`，因为对于状态管理来说其实并不关心试图的更新进度。

**Time Slicing**

Problem Today

- Wrapper Hell
- Huge components
- Confusing classes

**React Hook**

`useEffect`

useEffect optionally return a function, if return a function, then when useEffect run, will call the return function to clean up, e.g. remove some listeners.

```js
useEffect(() => {
  // ...
  return () => {
    // some clean up operations
  }
}, [param])
```

第二个参数`param`，限定useEffect的作用范围


```js
  // 通过key的更新可以重置component的state
  <ProgressBar
    key={currentIndex + isPlaying}
    time={SlIDE_DURATION}
    animate={isPlaying}
  />
```


#### useReducer -- colocation

```js
const [state, dispatch] = useReducer((state, action) => {
  switch(action.type) {
    case 'PROGRESS':
    case 'NEXT':
      return {
        ...state,
      }
    default:
      return state
  }
})
```

## Tips

#### Utility

> **cloneRegExp**

```javascript
const cloneRegExp = regExp => new RegExp(regExp.source, regExp.flags);
```


> **coalesceFactory**

Returns a customized coalesce function that returns the first argument that returns true from the provided argument validation function.

```javascript
const coalesceFactory = valid => (...args) => args.find(valid);

const customCoalesce = coalesceFactory(_ => ![null, undefined, '', NaN].includes(_));
customCoalesce(undefined, null, NaN, '', 'Waldo'); // "Waldo"
```


> **extendHex**

```javascript
const extendHex = shortHex =>
  '#' +
  shortHex
    .slice(shortHex.startsWith('#') ? 1 : 0)
    .split('')
    .map(x => x + x)
    .join('');

extendHex('#03f'); // '#0033ff'
extendHex('05a'); // '#0055aa'
```


> **isBrowser**

Determines if the current runtime environment is a browser so that front-end modules can run on the server (Node) without throwing errors.

```javascript
const isBrowser = () => ![typeof window, typeof document].includes('undefined');

isBrowser(); // true (browser)
isBrowser(); // false (Node)
```


> **mostPerformant**

```javascript
const mostPerformant = (fns, iterations = 10000) => {
  const times = fns.map(fn => {
    const before = performance.now();
    for (let i = 0; i < iterations; i++) fn();
    return performance.now() - before;
  });
  return times.indexOf(Math.min(...times));
};

mostPerformant([
  () => {
    // Loops through the entire array before returning `false`
    [1, 2, 3, 4, 5, 6, 7, 8, 9, '10'].every(el => typeof el === 'number');
  },
  () => {
    // Only needs to reach index `1` before returning false
    [1, '2', 3, 4, 5, 6, 7, 8, 9, 10].every(el => typeof el === 'number');
  }
]); // 1
```


> **randomHexColorCode**

```javascript
const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

randomHexColorCode(); // "#e34155"
```


> **RGBToHex**

```javascript
const RGBToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

RGBToHex(255, 165, 1); // 'ffa501'
```


> **timeTaken**

Measures the time taken by a function to execute.

```javascript
const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms
```

## Share

React Hooks一些相关的思考

- 状态和更新状态的两两配对，可以用更好的代码结构组织它们
- 状态的更加细粒度的切分，没有联动的的状态放在不同的组件中单独管理
- 状态的管理和视图渲染的隔离，把一个带有复杂`render`实现的类组件拆分为一个`单独管理状态的类组件`和一个`实现渲染逻辑的纯函数组件`，其实也就是HOC的思想


之前React如果需要对state进行操作，需要在class component进行操作。现在有了React Hook之后，可以在任何function component中进行。
