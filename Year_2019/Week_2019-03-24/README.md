# Week 2019-03-24

## Algorithm

[453] Minimum Moves to Equal Array Elements

[455] Assign Cookies

## Review

[剖析 React 源码：调度原理](https://juejin.im/post/5cef5392e51d4510727c801e)

> React如何实现调度

实现调度主要靠下面两个内容:
- 计算任务的`expirationTime`
- 实现requestIdleCalllback的`polyfill`版本

1. expirationTime

expirationTime = performance.now() + 一个常量(根据任务优先级改变)

任务优先级通常有五种:

```js
var ImmediatePriority = 1 // -1
var UserBlockingPriority = 2 // 250
var NormalPriority = 3 // 5000
var LowPriority = 4 // 10000
var IdlePriority = 5 // maxSigned31BitInt
```

2. requestIdleCallback

chrome提供的函数`requestIdleCallback`有致命的缺陷,一个是其兼容性不好,另外是它一秒只能调用回调20次,所以React团队自己polyfill了这个函数

实现的核心,如何多次在浏览器空闲时且是渲染后才调用回调方法

说到多次执行,需要使用定时器,唯有`requestAnimationFrame`具备一定的精确度,但是这个函数也有瑕疵,页面处于后台时该回调函数不会执行,因此我们需要补救措施

```js
var rAFID = requestAnimationFrame(function(timestamp) {
  // cancel the setTimeout
  localClearTimeout(rAFTimeoutID)
  callback(timestamp)
})

var rAFTimeoutID = setTimeout(function() {
  // 定时100ms算是一个最佳实践
  localCancelAnimationFrame(rAFID)
  callback(getCurrentTime())
}, 100)
```

接下来我们需要计算当前帧是否还有剩余时间来让我们使用,一般保证一秒60帧,也就是一帧时间为16.6ms

```js
let frameDeadline = 0
let previousFrameTime = 33
let activeFrameTime = 33
let nextFrameTime = performance.now() - frameDeadline + activeFrameTime
if (nextFrameTime < activeFrameTime && previousFrameTime < activeFrameTime) {
  if (nextFrameTime < 8) {
    nextFrameTime = 8;
  }
  activeFrameTime = nextFrameTime < previousFrameTime
    ? previousFrameTime
    : nextFrameTime;
} else {
  previousFrameTime = nextFrameTime;
}
```

最后一步是如何在渲染以后才去执行任务,这里需要事件循环的知识了,渲染之后宏任务最先被执行,但是生成一个宏任务有很多种方式并且各自也有优先级,我们这里选择`MessageChannel`,不选择`setImmediate`的原因是兼容性太差


> 调度的流程

- 通过当前时间加上优先级所对应的常量我们可以计算出`expirationTime`,优先级高的会打断低优先级任务
- 在调度之前,判断当前任务是否过期,过期的话无需调度,直接调用`port.postMessage(undefined)`
- 如果任务没有过期,就通过`requestAnimationFrame`启动定时器,在重绘前调用回调方法
- 在回调方法中我们首先需要计算每一帧的时间以及下一帧的时间,然后执行`port.postMessage(undefined)`
- `channel.port1.onmessage`会在渲染后被调用,在这个过程中我们首先需要去判断当前时间是否小于下一帧时间,如果小于的话就代表我们尚有空余时间去执行任务；如果大于的话就代表当前帧已经没有空闲时间了，`这时候我们需要去判断是否有任务过期，过期的话不管三七二十一还是得去执行这个任务`。如果没有过期的话，那就只能把这个任务丢到下一帧看能不能执行了.


## Tips

[React源码解析(二):组件的类型与生命周期](https://juejin.im/post/59ca03b9518825177c60d10b)

我们知道`ReactDom.render()`会根据传入参数不通，在内部通过工厂方法生成四种不同类型的封装组件，在执行挂在流程时，通过执行每个封装组件内部的`mountComponent`方法触发生命周期。

> 但是生命周期只在React自定义组件中存在，也就是`ReactCompositeComponent`

1. ReactEmptyComponent

```js
function mountComponent(transaction, hostParent, hostContainerInfo, context) {
  var nodeValue = 'react-empty' + this._domID + ' '
  if (transaction.useCreateElement) {
    // ....
    var ownerDocument = hostContainerInfo._ownDocument
    var node = ownDocument.createComment(nodeValue)
    ReactDOMComponentTree.precacheNode(this, node)
    return DOMLazyTree(node)
  } else {
    // 最终插入真实DOM的也是空
    return `<!--` + nodeValue + '-->'
  }
}
```

2. ReactTextComponent

大体的思路和`ReactDOMEmptyCommponent`相同，只是最后在返回的时候会调用一个`escapeTextContentForBrowser`方法来对参数进行空格的校验处理

3. ReactDomComponent

通过`ReactHostComponent.createInternalComponent()`方法创建

```js
function mountComponent(transaction, hostParent, hostContainerInfo, context) {
  // ....

  switch(this._tag) {
    case 'audio':
    case 'form':
    case 'img':
    // .....
  }

  // ...
  div.innerHTML = '<' + type + '></' + type + '>'
}
```

4. ReactCompositeComponent

通过`ReactComposteComponentWrapper()`创建，最终调用`ReactCompositeComponentMixin.mountComponent`，流程如下：

- 处理props
- 根据render的有无，判断是有状态组件还是无状态组件
- 处理state
- 执行ComponentWillMount
- 执行render, 获得html
- 执行ComponentDidMount
- 对子组件重复上述流程

之后解析ReactElement对象获得HTML，将HTML插入到真实DOM中

## Share