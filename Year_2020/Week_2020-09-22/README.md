# Week 2020-09-22

## Algorithm

## Tips

[关于ref的一切](https://mp.weixin.qq.com/s/YflnTCGHZyYE4RwdIy9rpA)

首先我们需要知道的是, 创建ref有三个方式, React.createRef(), useRef()或者是string, function类型, 这三种方式创建出来的ref都是不同的数据类型

> ref的数据结构

为什么string类型的ref props要被废弃

```js
class Foo extends Component {
  render() {
    return (
      <input
        onClick={() => this.action()} 
        ref='input' 
      />
    );
  }
  action() {
    console.log(this.refs.input.value);
  }
}
```

1. 由于string的写法, 无法直接获得this的指向, react需要追踪当前的render的组件, 会影响性能
2. 当使用render回调函数的开发模式, 获得ref的组件实例可能与预期不同

> React.createRef

```ts
function createRef(): RefObject {
  const refObject = {
    current: null,
  };
  return refObject;
}
```

> useRef

对于`mount`与`update`, useRef分别对应两个函数

```js
function mountRef<T>(initialValue: T): {|current: T|} {
  // 获取当前useRef hook
  const hook = mountWorkInProgressHook();
  // 创建ref
  const ref = {current: initialValue};
  hook.memoizedState = ref;
  return ref;
}

function updateRef<T>(initialValue: T): {|current: T|} {
  // 获取当前useRef hook
  const hook = updateWorkInProgressHook();
  // 返回保存的数据
  return hook.memoizedState;
}
```

与createRef相同, ref对象仅仅包含current属性

> ref的生命周期

在react中, `HostComponent`, `ClassComponent`, `ForwardRef`可以赋值ref属性

```js
// HostComponent
<div ref={domRef}></div>
// ClassComponent / ForwardRef
<App ref={cpnRef} />
```

对于HostComponent以及ClassComponent在render阶段, 如果包含ref操作, 则会被打上对应的tag, 然后再commimt阶段被更新

所以ref的生命周期可以分为两个阶段

- render阶段, 对应fiber添加ref effecttag
- commit阶段, 为包含ref effectTag的fiber执行对应的操作

##### render阶段

1. 对于`mount`, workInProgress.ref !== null, 即首次render时存在ref属性
2. 对于`update`, current.ref !== workInProgress.ref, 即组件更新时ref属性改变

##### commit阶段

分为两个子阶段: 
1. 移除以前的ref

```js
function commitDetachRef(current: Fiber) {
  const currentRef = current.ref;
  if (currentRef !== null) {
    if (typeof currentRef === 'function') {
      // function类型ref，调用他，传参为null
      currentRef(null);
    } else {
      // 对象类型ref，current赋值为null
      currentRef.current = null;
    }
  }
}
```

2. 更新ref

```js
function commitAttachRef(finishedWork: Fiber) {
  // finishedWork为含有Ref effectTag的fiber
  const ref = finishedWork.ref;
  
  // 含有ref prop，这里是作为数据结构
  if (ref !== null) {
    // 获取ref属性对应的Component实例
    const instance = finishedWork.stateNode;
    let instanceToUse;
    switch (finishedWork.tag) {
      case HostComponent:
        // 对于HostComponent，实例为对应DOM节点
        instanceToUse = getPublicInstance(instance);
        break;
      default:
        // 其他类型实例为fiber.stateNode
        instanceToUse = instance;
    }

    // 赋值ref
    if (typeof ref === 'function') {
      ref(instanceToUse);
    } else {
      ref.current = instanceToUse;
    }
  }
}
```

对于`内联函数`的ref

```
<div ref={dom => this.dom = dom}></div>
```
由于每次render ref都对应一个全新的内联函数，所以在commit阶段会先执行commitDetachRef删除再执行commitAttachRef更新。
即内联函数会被调用两次，第一次传参dom的值为null，第二次为更新的DOM。

## Share