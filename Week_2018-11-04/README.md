# Week 2018-11-04

## Algorithm

[872. Leaf-Similar Trees](https://leetcode.com/problems/leaf-similar-trees/description/)

[893. Groups of Special-Equivalent Strings](https://leetcode.com/problems/groups-of-special-equivalent-strings/description/)

## Review

[精读《怎么用 React Hooks 造轮子》](https://github.com/dt-fe/weekly/blob/master/80.%E7%B2%BE%E8%AF%BB%E3%80%8A%E6%80%8E%E4%B9%88%E7%94%A8%20React%20Hooks%20%E9%80%A0%E8%BD%AE%E5%AD%90%E3%80%8B.md)


> **组件辅助**

```js
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import ReactDOM from "react-dom";

function getSize(el) {
  if (!el) {
    return {};
  }

  return {
    width: el.offsetWidth,
    height: el.offsetHeight
  };
}

function useComponentSize(ref) {
  let [ComponentSize, setComponentSize] = useState(getSize(ref.current));

  function handleResize() {
    if (ref && ref.current) {
      setComponentSize(getSize(ref.current));
    }
  }

  useLayoutEffect(() => {
    handleResize();

    let resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect(ref.current);
      resizeObserver = null;
    };
  }, []);

  return ComponentSize;
}

function App() {
  const ref = useRef(null);
  const componentSize = useComponentSize(ref);
  return (
    <>
      {componentSize.width}
      <textArea ref={ref} />
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

```


> **拿到组件onChange抛出的值**

```js
let name = useInputValue("Jamie");
// name = { value: 'Jamie', onChange: [Function] }
return <input {...name} />;


function useInputValue(initialValue) {
  let [value, setValue] = useState(initialValue);
  let onChange = useCallback(function(event) {
    setValue(event.currentTarget.value);
  }, []);

  return {
    value,
    onChange
  };
}
```


> **做动画**

#### 在某个时间段内获取0-1之间的值

```js
const value = useRaf(1000)
```

通过 useRaf(t) 拿到 t 毫秒内不断刷新的 0-1 之间的数字，期间组件会不断刷新，但刷新频率由 `requestAnimationFrame` 控制（不会卡顿 UI）


> **发请求**

```js
const { loading, error, result } = useAsync(fetchUser, [id]);
```

具体的实现逻辑可以参考: [react-async-hook](https://github.com/slorber/react-async-hook/blob/master/src/index.js)


> **Request Service**

之前的写法：

```js
async componentDidMount() {
  // setState: 改 isLoading state
  try {
    const data = await fetchUser()
    // setState: 改 isLoading、error、data
  } catch (error) {
    // setState: 改 isLoading、error
  }
}
```

引入redux后

```js
@Connect(...)
class App extends React.PureComponent {
  public componentDidMount() {
    this.props.fetchUser()
  }

  public render() {
    // this.props.userData.isLoading | error | data
  }
}
```

引入Hooks后

```js
function App() {
  const { isLoading, error, data } = useFetchUser();
}
```


> **填表单**

[react-use-form-state](https://github.com/wsmd/react-use-form-state)

```js
const [formState, { text, password }] = useFormState();
return (
  <form>
    <input {...text("username")} required />
    <input {...password("password")} required minLength={8} />
  </form>
);
```

`useFormState()`的简单实现

```js
export function useFormState(initialState) {
  const [state, setState] = useReducer(stateReducer, initialState || {});

  const createPropsGetter = type => (name, ownValue) => {
    const hasOwnValue = !!ownValue;
    const hasValueInState = state[name] !== undefined;

    function setInitialValue() {
      let value = "";
      setState({ [name]: value });
    }

    const inputProps = {
      name, // 给 input 添加 type: text or password
      get value() {
        if (!hasValueInState) {
          setInitialValue(); // 给初始化值
        }
        return hasValueInState ? state[name] : ""; // 赋值
      },
      onChange(e) {
        let { value } = e.target;
        setState({ [name]: value }); // 修改对应 Key 的值
      }
    };

    return inputProps;
  };

  const inputPropsCreators = ["text", "password"].reduce(
    (methods, type) => ({ ...methods, [type]: createPropsGetter(type) }),
    {}
  );

  return [
    { values: state }, // formState
    inputPropsCreators
  ];
}
```


> **存数据**

将数据持久化： [easy-peasy](https://github.com/ctrlplusb/easy-peasy)



## Tips

#### other API from React Hooks

> **useCallback**

```js
// Returns a memoized callback.
const memoizedCallback = useCallback(() => {
  doSomethings(a, b)
}, [a, b])
```

Pass an inline callback and an array of inputs. `useCallback` will return a memoized version of the callback that only changes if one of the inputs has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. `shouldComponentUpdate`).

> **useMemo**

```js
// Return s a memoized value
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

Pass a “create” function and an array of inputs. `useMemo` will only recompute the memoized value when one of the inputs has changed. This optimization helps to avoid expensive calculations on every render.


> **useRef**

```js
const refContainer = useRef(initialValue);
```

`useRef` returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component.


```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

- Note that `useRef()` is useful for more than the ref attribute. It’s handy for keeping any mutable value around similar to how you’d use instance fields in classes.


> **useMutationEffect**

The signature is identical to `useEffect`, but it fires synchronously during the same phase that React performs its DOM mutations, before sibling components have been updated. Use this to perform custom DOM mutations.

Prefer the standard `useEffect` **when possible to avoid blocking visual updates**.

- Avoid reading from the DOM in useMutationEffect. If you do, you can cause performance problems by introducing layout thrash. When reading computed styles or layout information, useLayoutEffect is more appropriate.


> **useLayoutEffect**

The signature is identical to useEffect, but it fires synchronously after all DOM mutations. Use this to read layout from the DOM and synchronously re-render. Updates scheduled inside useLayoutEffect will be flushed synchronously, before the browser has a chance to paint.

Prefer the standard `useEffect` **when possible to avoid blocking visual updates**.

- If you’re migrating code from a class component, useLayoutEffect fires in the same phase as componentDidMount and componentDidUpdate, so if you’re unsure of which effect Hook to use, it’s probably the least risky.

## Share

React Hooks：

- 可以实现数据处理逻辑、状态管理和渲染的解耦
- 可以更好的封装出一个表单组件
- 可以更好的加强和对一个已有组件进行功能添加
- 减少一些不必要的固定代码，类似之前在`componentDidMount` & `componentDidUpdate`中的逻辑，都可以用`useEffect`完美替代。