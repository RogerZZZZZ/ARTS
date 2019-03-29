# Week 2018-12-30

## Algorithm

[13. roman to integer](https://leetcode.com/problems/roman-to-integer/description/)

[14. longest common prefix](https://leetcode.com/problems/longest-common-prefix/description/)

## Review

> 全面理解useEffect

1. 每一次渲染都是它自己的props和state

```js
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

**上面例子中，count仅是一个数字而已。它不是神奇的“data binding”, “watcher”, “proxy”，或者其他任何东西。它就是一个普通的数字像下面这个一样：**

```js
// During first render
function Counter() {
  const count = 0; // Returned by useState()
  // ...
  <p>You clicked {count} times</p>
  // ...
}

// After a click, our function is called again
function Counter() {
  const count = 1; // Returned by useState()
  // ...
  <p>You clicked {count} times</p>
  // ...
}
```

而对于effects也是同样的逻辑，每次渲染都有自己的Effects

**可以使用useRef()来获取最新的state**

但是在class中`this.state`的运行结果就完全不同了，原因为this.state指向最新的数据，这个问题可以通过闭包来解决

```js
componentDidMount() {
  const count = this.state.count;
  setTimeout(() => {
    console.log(`You clicked ${count} times`);
  }, 3000);
}
```

2. 告诉React去比对你的Effects

错误示范

```js
const [count, setCount] = useState(0);

useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1);
  }, 1000);
  return () => clearInterval(id);
}, []);
// count永远为1，一直执行的都是setCount(0 + 1)
```

有两种解决方法，一直是将count添加到依赖中，另外一种是使effects自给自足

```js
useEffect(() => {
  const id = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);
  return () => clearInterval(id);
}, []);
```

还可以使用`useReducer()`来解耦，除去effects的依赖

```js
const [state, dispatch] = useReducer(reducer, initialState);
const { count, step } = state;

useEffect(() => {
  const id = setInterval(() => {
    dispatch({ type: 'tick' });
  }, 1000);
  return () => clearInterval(id);
}, [dispatch]);
```

```js
const initialState = {
  count: 0,
  step: 1,
};

function reducer(state, action) {
  const { count, step } = state;
  if (action.type === 'tick') {
    return { count: count + step, step };
  } else if (action.type === 'step') {
    return { count, step: action.step };
  } else {
    throw new Error();
  }
}
```

3. 函数时数据流中的一部分

```js
class Parent extends Component {
  state = {
    query: 'react'
  };
  fetchData = () => {
    const url = 'https://hn.algolia.com/api/v1/search?query=' + this.state.query;
    // ... Fetch data and do something ...
  };
  render() {
    return <Child fetchData={this.fetchData} />;
  }
}

class Child extends Component {
  state = {
    data: null
  };
  componentDidMount() {
    this.props.fetchData();
  }
  componentDidUpdate(prevProps) {
    // 🔴 This condition will never be true
    if (this.props.fetchData !== prevProps.fetchData) {
      this.props.fetchData();
    }
  }
  render() {
    // ...
  }
}
```

你会发现，当fetchData中`this.state.query`改变时，componentDidMount()也不会执行，甚至你加上`componentDidUpdate` 也同样不会起作用，原因在于 **fetchData是一个class方法！（或者你也可以说是class属性 - 但这不能改变什么。）它不会因为状态的改变而不同，所以this.props.fetchData和 prevProps.fetchData始终相等**

但也有解决方法，就是讲query作为另一个prop传入，在componentDidUpdate中判断query的变化

```js
componentDidUpdate(prevProps) {
  if (this.props.query !== prevProps.query) {
    this.props.fetchData();
  }
}
```

在class组件中，函数属性本身并不是数据流的一部分。组件的方法中包含了可变的this变量导致我们不能确定无疑地认为它是不变的。因此，即使我们只需要一个函数，我们也必须把一堆数据传递下去仅仅是为了做“diff”。

使用useCallback，函数完全可以参与到数据流中。我们可以说如果一个函数的输入改变了，这个函数就改变了。

```js
function ColorPicker() {
  // Doesn't break Child's shallow equality prop check
  // unless the color actually changes.
  const [color, setColor] = useState('pink');
  const style = useMemo(() => ({ color }), [color]);
  return <Child style={style} />;
}
```

4. 竞态问题

```js
class Article extends Component {
  state = {
    article: null
  };
  componentDidMount() {
    this.fetchData(this.props.id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.fetchData(this.props.id);
    }
  }
  async fetchData(id) {
    const article = await API.fetchArticle(id);
    this.setState({ article });
  }
  // ...
}
```

请求结果返回的顺序不能保证一致。比如我先请求 {id: 10}，然后更新到{id: 20}，但{id: 20}的请求更先返回。请求更早但返回更晚的情况会错误地覆盖状态值。

```js
function Article({ id }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    let didCancel = false;

    async function fetchData() {
      const article = await API.fetchArticle(id);
      if (!didCancel) {
        setArticle(article);
      }
    }

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [id]);
  // ...
}
```

## Tips

> event loop

首先需要明确的是JS是单线程语言，同一时间只能够执行一个方法，所以需要事件队列来管理事件的执行顺序。虽然有web worker，但是它创建出来的也仅仅只是主线程的子线程，并不能执行I/O，只能够分担一些计算工作。


1. 执行栈和事件队列

当脚本第一次执行的时候，引擎会解析这段代码，并按照执行顺序依次压入到执行栈中。

但是JS是非阻塞的，当遇到异步代码，例如ajax请求，就会将事件挂起，当结果返回时，将这个时间加入到当前执行栈不同的另一个队列，即为事件队列。只有当主线程闲置时，才会去查看事件队列是否有任务，如果有，取出放入到执行栈中，执行同步代码。如此反复。

2. macro task & micro task

但是事件也分为微任务和宏任务，`setInternal` & `setTimeout` 为宏任务。 `Promise` & `new MutaionObserver()` 为微任务。当主线程空闲的时候会首先查看微任务队列，之后查看宏任务队列。同一次事件循环中，微任务永远在宏任务之前执行。

```js
setTimeout(function () {
    console.log(1);
});

new Promise(function(resolve,reject){
    console.log(2)
    resolve(3)
}).then(function(val){
    console.log(val);
})

// 2 3 1
```

##### node 环境中

外部输入数据-->轮询阶段(poll)-->检查阶段(check)-->关闭事件回调阶段(close callback)-->定时器检测阶段(timer)-->I/O事件回调阶段(I/O callbacks)-->闲置阶段(idle, prepare)-->轮询阶段...

- timers: 这个阶段执行定时器队列中的回调如 setTimeout() 和 setInterval()。
- I/O callbacks: 这个阶段执行几乎所有的回调。但是不包括close事件，定时器和setImmediate()的回调。
- idle, prepare: 这个阶段仅在内部使用，可以不必理会。
- poll: 等待新的I/O事件，node在一些特殊情况下会阻塞在这里。
- check: setImmediate()的回调会在这个阶段执行。
- close callbacks: 例如socket.on('close', ...)这种close事件的回调。

1. poll

当个v8引擎将js代码解析后传入libuv引擎后，循环首先进入poll阶段。poll阶段的执行逻辑如下： 先查看poll queue中是否有事件，有任务就按先进先出的顺序依次执行回调。 当queue为空时，会检查是否有setImmediate()的callback，如果有就进入check阶段执行这些callback。但同时也会检查是否有到期的timer，如果有，就把这些到期的timer的callback按照调用顺序放到timer queue中，之后循环会进入timer阶段执行queue中的 callback。 这两者的顺序是不固定的，收到代码运行的环境的影响。

2. check

check阶段专门用来执行`setImmediate()`方法的回调，当poll阶段进入空闲状态，并且setImmediate queue中有callback时，事件循环进入这个阶段

3. close阶段

当一个socket连接或者一个handle被突然关闭时（例如调用了socket.destroy()方法），close事件会被发送到这个阶段执行回调。否则事件会用process.nextTick（）方法发送出去。

4. timer阶段

这个阶段以先进先出的方式执行所有到期的timer加入timer队列里的callback，一个timer callback指得是一个通过setTimeout或者setInterval函数设置的回调函数。

5. I/O callback阶段

如上文所言，这个阶段主要执行大部分I/O事件的回调，包括一些为操作系统执行的回调。例如一个TCP连接生错误时，系统需要执行回调来获得这个错误的报告。

**在I/O事件的回调中，setImmediate方法的回调永远在timer的回调前执行。**

## Share

> SSR vs CSR

process of SSR

- Server sending ready to be rendered HTML response to Browser (loading)
- browser renders the page, now viewable, and browser download js (viewable)
- browser executes React(viewable)
- Page now interactable

process of CSR

- Server sending response to browser (loading)
- Browser download js (loading)
- Browser executes React (loading)
- page now viewable and interactable (viewable and interactable)

**The blank page ficker that happens with csr also doesn't happen with SSR**

Faster time-to-content, especially on slow internet or slow devices. `Server-rendered markup doesn't need to wait until all JavaScript has been downloaded and executed to be displayed`, so your user will see a fully-rendered page sooner. This generally results in better user experience, and can be critical for applications where time-to-content is directly associated with conversion rate.

`prerendering`: Rather than using a web server to compile HTML on-the-fly, prerendering simply generates static HTML files for specific routes at build time. The advantage is setting up prerendering is much simpler and allows you to keep your frontend as a fully static site.

webpack plugin: `prerender-spa-plugin`