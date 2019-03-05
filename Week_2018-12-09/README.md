# Week 2018-12-09

## Algorithm

[706. Design HashMap](https://leetcode.com/problems/design-hashmap/)

[427. Construct Quad Tree](https://leetcode.com/problems/construct-quad-tree/)

## Review

[https://overreacted.io/making-setinterval-declarative-with-react-hooks/](Making setInterval Declarative with React Hooks)

```js
import React, { useState, useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
```

为什么要使用customer hook而非setInternal, clearInternal呢

首先第一点,更加的简单:

```js
class Counter extends React.Component {
  state = {
    count: 0,
    delay: 1000,
  };

  componentDidMount() {
    this.interval = setInterval(this.tick, this.state.delay);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.delay !== this.state.delay) {
      clearInterval(this.interval);
      this.interval = setInterval(this.tick, this.state.delay);
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  tick = () => {
    this.setState({
      count: this.state.count + 1
    });
  }

  handleDelayChange = (e) => {
    this.setState({ delay: Number(e.target.value) });
  }

  render() {
    return (
      <>
        <h1>{this.state.count}</h1>
        <input value={this.state.delay} onChange={this.handleDelayChange} />
      </>
    );
  }
}
```

但是本文并不是讨论这个问题的,而是为什么`setInternal` & `clearInternal` 会影响hook的使用.

第一次尝试:

```js
function Counter() {
  let [count, setCount] = useState(0);

  useEffect(() => {
    let id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  });

  return <h1>{count}</h1>;
}
```
我们会发现it works,但是其实这个代码会有一个bug, 如果存在一个更短时间的re-render,那么会导致block,会发现count不再更新.

第二次尝试:

```js
function Counter() {
  let [count, setCount] = useState(0);

  useEffect(() => {
    let id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
}
```

依旧存在一个问题: `The problem is that useEffect captures the count from the first render. It is equal to 0. We never re-apply the effect so the closure in setInterval always references the count from the first render, and count + 1 is always 1. Oops!`

fix:

```js
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let id = setInterval(() => {
      // It can always reads fresh state for that variable. But this doesn’t help you read the fresh props, for example.
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
}
```

fix: 

```js
function Counter() {
  const [count, dispatch] = useReducer((state, action) => {
    if (action === 'inc') {
      return state + 1;
    }
  }, 0);

  useEffect(() => {
    let id = setInterval(() => {
      dispatch('inc');
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
}
```

另外一个问题,如何在不重置时间的条件下替换`setInternal`中执行的函数:

答案是使用`useRef()`

```js
  const savedCallback = useRef();
  // { current: null }
```

```js
function Counter() {
  const [count, setCount] = useState(0);
  const savedCallback = useRef();

  function callback() {
    setCount(count + 1);
  }

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
}
```

## Tips

**C Primer Chapter 1-4**

## Share

[https://overreacted.io/why-do-hooks-rely-on-call-order/](Why Do React Hooks Rely on Call Order?)

本文章主要讲的是hooks为什么要选用现在的实现方式，以及实现的一些细节。

1. 为什么不规定一个component中只能使用一个`useState`： 原因是，这样就无法实现`customer hook`了，而这恰好是hooks的核心。

2. 解决命名冲突，为什么不适用`Symbol`，而是依赖它的调用顺序。原因为如果使用`symbol`,那么同一个hook只能调用一次,会产生命名冲突，因为每次 调用 useState() 会获得单独的state。依赖于固定顺序调用使我们免于担心命名冲突

3. 钻石问题，多层继承。 `遗留的 React createClass() 的 mixins 不允许你这样做，有时你会有两个 mixins，它们都是你想要的，但由于扩展了同一个 “base” mixin，因此互不兼容。`因此解决的问题与上面的方法一样，就是每个useState都返回独立的state


hooks会根据不同的调用顺序来获得不同的state，因此hook的调用顺序十分的重要。