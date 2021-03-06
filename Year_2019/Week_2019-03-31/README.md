# Week 2019-03-31

## Algorithm

[496] Next Greater Element I

## Review

[Dart语法预览 1](http://dart.goodev.org/guides/language/language-tour)

> 基础概念

- 所有变量引用都是对象, 每个对象都是一个类的实例,所有对象继承于Object类
- Dart支持顶级方法(`main()`)
- 没有初始化的变量自动获取一个默认值为`null`
- 使用三引号创建多行字符串对象
- 只有`true`对象才被认为是true
- 

> Built-in types

- numbers
- strings
- booleans
- lists
- maps
- runes
- symbols


> Function

```dart
isNoble(atomicNumber) {
  return _nobleGases[atomicNumber] != null;
}

bool isNoble(int atomicNumber) => _nobleGases[atomicNumber] != null;
```

- Optional paramters

```dart
/// Sets the [bold] and [hidden] flags to the values
/// you specify.
enableFlags({bool bold, bool hidden}) {
  // ...
}

String say(String from, String msg, [String device]) {
  var result = '$from says $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  return result;
}
```

> The main() function

```dart
void main() {
  querySelector("#sample_text_id")
    ..text = "Click me!"
    ..onClick.listen(reverseText);
}
// 前面代码中的 .. 语法为 级联调用（cascade）。 使用级联调用语法， 你可以在一个对象上执行多个操作。
```

> Type test operators

- as 类型转换
- is 如果对象是指定的类型返回true
- is! 如果对象是指定的类型返回false

> Assignment operators

- `??=` b??= value, 如果b为null才进行赋值
- `expr1 ?? expr2`, 如果expr1为non-null才执行expr2

> Cascade notation(..)

```dart
querySelector('#button')
  ..text = 'confirm'
  ..classes.add('import')
  ..onClick.listen((e) => window.alert('Confirmed!'))
```

#dart支持optional chain#: ?.

## Tips

[React源码解析(三):详解事务与更新队列](https://juejin.im/post/59cc4c4bf265da0648446ce0)

1. `setState`

```js
ReactComponent.prototype.setState = function(partialState, callback) {
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState')
  }
  // updater其实是updateQueue
}
```

```js
function enqueueSetState(publicInstance, partialState) {
  var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState')

  if (!internalInstance) {
    return
  }

  var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = [])
  queue.push(partialState)

  enqueueUpdate(internalInstance)
}
```

下面我们看`enqueueUpdate`的实现

```js
function enqueueUpdate(component) {
  if (!batchingStrategy.isBatchingUpdates) {
    batchingStrategy.batchedUpdates(enqueueUpdate, component)
    return;
  }

  dirtyComponents.push(component)
}


var ReactDefaultBatchingStrategy = {
  isBatchingUpdates: false,

  batchedUpdates: function(callback, a, b, c, d, e) {
    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUdpates

    ReactDefaultBatchingStrategy.isBatchingUpdates = true

    if (alreadyBatchingUpdates) {
      // enqueueUpdate
      callback(a, b, c, d, e)
    } else {
      transaction.perform(callback, null, a, b, c, d, e)
    }
  }
}
```

2. `transaction事务`

```js
<pre>
 *                       wrappers (injected at creation time)
 *                                      +        +
 *                                      |        |
 *                    +-----------------|--------|--------------+
 *                    |                 v        |              |
 *                    |      +---------------+   |              |
 *                    |   +--|    wrapper1   |---|----+         |
 *                    |   |  +---------------+   v    |         |
 *                    |   |          +-------------+  |         |
 *                    |   |     +----|   wrapper2  |--------+   |
 *                    |   |     |    +-------------+  |     |   |
 *                    |   |     |                     |     |   |
 *                    |   v     v                     v     v   | wrapper
 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | +---+ +---+   +---------+   +---+ +---+ |
 *                    |  initialize                    close    |
 *                    +-----------------------------------------+
 * </pre>
```

简单的理解就是封装了一层。如:

```js
function method() {
  console.log('1111')
}

transaction.perform(method)
// 执行initialize
// 1111
// 执行close方法
```

实际上在上面的例子中, `transaction.perform(enqueueUpdate)`中还存在`transaction.perform(enqueueUpdate)`, 为了避免死循环

```js
// 作用为设置isBatchedUpdates，也就是组件更新状态的值
var RESET_BATCHED_UPDATES = {
  initialize: emptyFunction,
  close: function() {
    ReactDefaultBatchingStrategy.isBatchingUpdates = false
  }
}

var FLUSH_BATCHED_UPDATES = {
  initialize: emptyFunction,
  close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
}
```

那么`FLUSH_BATCHED_UPDATES`是用于干什么的呢

```js
var flushBatchedUpdates = function() {
  while (dirtyComponents.length || asapEnqueued) {
    if (dirtyComponents.length) {
      var transaction = ReactUpdatesFlushTransaction.getPooled()
      transaction.perform(runBatchedUdpates, null, transaction)
      ReactUPdatesFlushTransaction.release(transaction)
    }
  }
}
```

> 可以看到flushBatchedUpdates方法循环遍历所有的dirtyComponents，又通过事务的形式调用runBatchedUpdates方法，因为源码较长所以在这里直接说明该方法所做的两件事：

- 一是通过执行updateComponent方法来更新组件
- 二是若setState方法传入了回调函数则将回调函数存入callbackQueue队列。

在`updateComponent`中可以看到执行`componentWillReceiveProps`方法和`shouldComponentUpdate`方法,然后我们可以看到在`shouldComponentUpdate`之前我们会执行一个叫做`_processPendingState`的方法

```js
// 上面方法主要用于合并state 
function _processPendingState(props, context) {
  var inst = this._instance
  var queue = this._pendingStateQueue
  var replace = this._pendingReplaceState
  this._pendingReplaceState = false
  this._pendingStateQuese = null

  if (!queue) {
    return inst.state
  }

  if (replace && queue.length === 1) {
    return queue[0]
  }

  var nextState = _assign({}, replace ? queue[0] : inst.state)
  for (var i = replace ? 1 : 0; i < queue.length; i++) {
    var partial = queue[i]
    _assign(nextState, typeof partial === 'function' ? partial.call(inst, nextState, props, context) : partial)
  }

  return nextState
}
```

接下来是`_updateRenderedComponent`

```js
function _updateRenderedComponent(transaction, context) {
  var prevComponentInstance = this._renderedComponent
  // 获取旧的新的组件信息
  var prevRenderedElement = prevComponentInstance._currentElement;
  var nextRenderedElement = this._renderValidatedComponent()

  if (shouldUpdateReactComponent(prevRenderedElement, nextRenderedElement)) {
    // 执行就组件的更新
    ReactReconciler.receiveComponent(prevComponentInstance, nextRenderedElement, transaction, this._processChildContext(context))
  } else {
    // 执行旧组件的卸载和新组件的挂载
    var oldHostNode = ReactReconciler.getHostNode(prevComponentInstance)
    ReactReconciler.unmountComponent(prevComponentInstance, false)

    var nodeType = ReactNodeTypes.getType(nextRenderedElement)
    this._renderedNodeType = nodeType
    var child = this._instantiateReactComponent(nextRenderedElement, nodeType !== ReactNodeType.EMPTY)
    this._renderedComponent = child

    var nextMarkup = ReactReconciler.mountComponent(child, transaction, this._hostParent, this._hostContainerInfo, this._processChildContext(context), debugID)

    this._replaceNodeWithMarkup(oldHostNode, nextMarkup, prevComponentInstance)
  }
}
```

## Share