# Week 2020-08-11

## Algorithm

[392] Is Subsequence

[541] Reverse String II

## Tips

[React技术揭秘](https://react.iamkasong.com/preparation/idea.html)

### 理念篇

1. 受限于使用jsx(实际为js)的影响, react很难在编译层面对框架进行优化, 所以react在别的地方做出了努力

> PureComponent或者React.memo构建组件
> 使用shoudComponentUpdate生命周期钩子
> 使用useCallback和useMemo缓存函数和变量等

2. React15架构

可以分为两层, Reconciler(协调器, 负责找出变化的组件)以及Render(渲染器, 负责将变化的组件渲染到页面上)

> Reconciler

当更新发生时, Reconciler会做如下的工作:

1. 调用函数组件或者class组件的render方法将jsx转化为虚拟dom
2. 将虚拟dom与上次更新时的虚拟dom进行对比
3. 通过对比找出需要变化的虚拟dom
4. 调用Renderer将变化的虚拟dom渲染到页面上

> Renderer

由于React支持多平台, 所以不同平台对Renderer有不同的实现

3. React15架构的缺点

最大的问题为递归更新子组件, 主流的浏览器刷新率大概都在60Hz, 也就是16.6ms刷新一次屏幕, 因为react递归执行, 一旦开始更新, 中途就无法中断, 当层级很深时, 递归超过16.6ms, 用户交互就会出现卡顿的现象,这里在React16中引入了异步更新的机制**Concurrent mode**

4. React16架构

新的react架构可以分为三层

> Scheduler - 调度器, 用于调度任务的优先级, 高优任务优先进入Reconciler

Scheduler 其实是`requestIdleCallback` 的一个polyfill, 即告诉浏览器我们时候还有空闲时间继续处理逻辑

> Reconciler

更新工作从递归变成了可中断的循环过程, `shouldYield`用于判断剩余时间

```js
/** @noinline */
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    workInProgress = performUnitOfWork(workInProgress);
  }
}
```

那react16是如何解决dom更新渲染不完全的问题呢, 现在Reconciler和Renderer已经不再是交替运行, 而是Reconciler将需要更新的虚拟dom全部打上tag之后, **统一交给Renderer进行处理**

```js
export const Placement = /*             */ 0b0000000000010;
export const Update = /*                */ 0b0000000000100;
export const PlacementAndUpdate = /*    */ 0b0000000000110;
export const Deletion = /*              */ 0b0000000001000;
```

> Renderer


5. Fiber架构的心智模型

> 代数效应

代数效应是函数式编程中的一个概念, 用于将side effects从函数调用中分离, 代数效应在React中的应用, 比如useState, useRef, useReducer等, 我们并不用关心FunctionComponent的state在hook中是如何保存的, 我们只需要假设useState返回的就是我们想要的state即可

我们知道React16中最大的改变就是将老的同步更新架构变为异步可中断更新, 最简单的实现方式当然就是浏览器支持的Generator. 但是Generator有天生的缺陷, 比如
- 类似async await, 具有传染性
- Generator执行的**中间状态**是上下文关联的

```js
function* doWork(A, B, C) {
  var x = doExpensiveWorkA(A);
  yield;
  var y = x + doExpensiveWorkB(B);
  yield;
  var z = y + doExpensiveWorkC(C);
  return z;
}

// 如果只考虑单一任务中断以及继续, Generator可以很好地完成, 但是如果有高优先级任务插队的情况发生, 比如B组件接收到一个好友更新, 那么计算y时无法复用之前已经计算出的x值, 需要重新计算
```

6. Fiber架构的实现原理

Fiber包含三层含义: 
> 作为架构来说, 之前React15的Reconciler采用递归的方式执行, 数据保存在递归调用栈中, 所以被称为stack Reconciler, React16以后成为Fiber Reconciler

> 作为静态数据结构来说, 每个Fiber节点对应一个组件,保存了该组件的类型(函数组件/类组件/原生组件), 对应的DOM节点等信息

> 作为动态的工作单元来说, 每个Fiber节点保存了本次更新中该组件改变的状态, 要执行的工作(需要被删除/被插入页面中/被更新...)

7. Fiber架构的工作原理

首先我们需要知道什么是双缓存

> 当我们用canvas绘制动画, 每一帧绘制前都会ctx.clearRect清除上一帧画面. 为了防止白屏的发生, 会在内存中绘制当前帧的画面, 之后直接替换, 这样的内存中构建并直接替换的技术叫做双缓存.

而对于Fiber来说, 则是同时存在两颗Fiber树, 分别为current Fiber树以及内存中构建workInProgress Fiber树, 通过alternate属性链接

```js
currentFiber.alternate === workInProgressFiber;
workInProgressFiber.alternate === currentFiber;
```


## Share