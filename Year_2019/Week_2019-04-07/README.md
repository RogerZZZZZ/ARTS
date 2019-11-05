# Week 2019-04-07

## Algorithm

[501] Find Mode in Binary Search Tree

## Review

[Dart语法预览 2](http://dart.goodev.org/guides/language/language-tour)

> Constructor

```dart
class Point {
  num x;
  num y;

  Point(this.x, this.y)
}
```

- Redirecting constructors

```dart
// 使用冒号调用其他构造函数
class Point {
  num x;
  num y;

  // The main constructor for this class.
  Point(this.x, this.y);

  // Delegates to the main constructor.
  Point.alongXAxis(num x) : this(x, 0);
}
```

- Factory constructors

```dart
class Logger {
  final String name;
  bool mute = false;

  // _cache is library-private, thanks to the _ in front
  // of its name.
  static final Map<String, Logger> _cache =
      <String, Logger>{};

  factory Logger(String name) {
    if (_cache.containsKey(name)) {
      return _cache[name];
    } else {
      final logger = new Logger._internal(name);
      _cache[name] = logger;
      return logger;
    }
  }

  Logger._internal(this.name);

  void log(String msg) {
    if (!mute) {
      print(msg);
    }
  }
}
```

> getter and setter

```dart
class Rectangle {
  num left;
  num top;
  num width;
  num height;

  Rectangle(this.left, this.top, this.width, this.height);

  // Define two calculated properties: right and bottom.
  num get right             => left + width;
      set right(num value)  => left = value - width;
  num get bottom            => top + height;
      set bottom(num value) => top = value - height;
}
```


> Overridable operators

可以定义两个类之间的操作符操作逻辑,可以定义的操作符有: `<, +, -, |, [], >, /, ^, *`等等等

```dart
class Vector {
  final int x;
  final int y;
  const Vector(this.x, this.y);

  /// Overrides + (a + b).
  Vector operator +(Vector v) {
    return new Vector(x + v.x, y + v.y);
  }

  /// Overrides - (a - b).
  Vector operator -(Vector v) {
    return new Vector(x - v.x, y - v.y);
  }
}

main() {
  final v = new Vector(2, 3);
  final w = new Vector(2, 2);

  // v == (2, 3)
  assert(v.x == 2 && v.y == 3);

  // v + w == (4, 5)
  assert((v + w).x == 4 && (v + w).y == 5);

  // v - w == (0, 1)
  assert((v - w).x == 0 && (v - w).y == 1);
}
```

> Enumerated types

```dart
enum Color {
  red,
  green,
  blue
}

assert(Color.red.index == 0)
```

> Adding features to class: mixins

Mixins是一种在多类继承中重用一个类代码的方法,使用`with`关键字后面为一个或者多个mixins名字来使用mixins

```dart
class Musician extends Performer with Musical {
  // ...
}

class Maestro extends Person
    with Musical, Aggressive, Demented {
  Maestro(String maestroName) {
    name = maestroName;
    canConduct = true;
  }
}

// Mixins 可以继承其他类，不再限制为继承 Object
// Mixins 可以调用 super()。
```

## Tips

[React源码解析(四):事件系统](https://juejin.im/post/5a0cf54ff265da43333df2c4)

> react实现了`SyntheticEvent`层处理事件,是将所有的事件都绑定在document上,通过统一的事件监听器处理并分发,找到对应的回调函数并执行


> SyntheticEvent

```jsx
<Component onClick={this.handleClick}/>
```

在组件挂载的时候,React就已经开始通过`mountComponent`内部的`_updateDOMProperties`方法进行事件处理了,在这个方法中,执行的是`enqueuePutListener`方法去注册事件

```js
function enqueuePutListener(inst, registrationName, listener, transaction) {
  var isDocumentFragment = containerInfo._node && containerInfo._node.nodeType === DOC_FRAGMENT_TYPE
  // 找到真实DOM
  var doc = isDocumentFragment ? containerInfo._node : containerInfo._ownerDocument
  // 调用listen to注册
  listenTo(registrationName, doc)
  // 进入事务队列
  transaction.getReactMountReady().enqueue(putListner, {
    inst,
    registrationName,
    listener,
  })
}
```

`listenTo`函数调用了`tapBubbledEvent`以及`tapCapturedEvent`,这两个函数用于处理事件捕获以及冒泡


> 事件存储

```js
putListener: function(inst, registrationName, listener) {
  var key = getDictionaryKey(inst)
  var bankForRegistrationName = listenerBank[registrationName] || (listenerBank[registrationName] = {})
  bankForRegistrationName[key] = listener
}
```

可见所有的回调函数都以二维数组的形式存储在listenerBank中，根据组件对应的key来进行管理。

> 事件分发

```js
function handleTopLevelImpl(bookKeeping) {
  // 寻找事件触发的DOM
  let targetInst = bookKeeping.targetInst
  let ancestor = targetInst
  // 在执行之前,先存储事件触发瞬间的DOM结构,记为ancestors数组
  do {
    bookKeeping.ancestors.push(ancestor)
    const root = findRootContainerNode(ancestor)
    bookKeeping.ancestors.push(ancestor)
    ancestor = getClosestInstanceFromNode(root)
  } while(ancestor)

  // 依次遍历数组,并执行回调函数,
  for (let i = 0; i < bookKeeping.ancestors.length; i++) {
    targetInst = bookKeeping.ancestors[i]
    _handleTopLevel(
      bookKeeping.topLevelType,
      targetInst,
      bookKeeping.nativeEvent,
      getEvnentTarget(bookKeeping.nativeEvent),
    )
  }
}
```

记录dom结构的原因是,回调可能会导致DOM结构的变化,`_handleTopLevel`最终对回调函数进行处理

```js
handleTopLevel: function(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
  var events = EventPluginHub.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget)
  runEventQueueInBatch(events)
}
```

`extractEvents`是用于合成事件的,根据事件类型的不同,合成不同的,跨浏览器的`SyntheticEvent`对象实例

```js
ReactInjection.EventPluginHub.injectEventPluginsByName({
  SimpleEventPlugin,
  EnterLeaveEventPlugin,
  ChangeEventPlugin,
  SelectEventPlugin,
  BeforeInputEventPlugin,
})
// 对于不同的事件,React使用不同的功能插件
```

> 事件处理

React处理事件的思想和`setState`类似,都是批处理的方式

```js
EventPluginHub.enqueueEvents(events)

EventPluginHub.processEventQueue(false)
```

```js
processEventQueue: function(simulated) {
  var processingEventQueue = eventQueue
  eventQueue = null

  forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseSimulated)
  // 遍历队列中的事件
  // event.constructor.release(event)
}
```

事件处理的核心入口是: `executeDispatchesInOrder`

```js
// 事件回调函数
var dispatchListeners = event._dispatchListeners;
// 对应的组件
var dispatchInstances = event._dispatchInstances;

executeDispatch(event, simulated, dispatchListeners[i], dispatchInstances[i]);


function executeDispatch(event, simulated, listener, inst) {
    var type = event.type || 'unknown-event';
    ReactErrorUtils.invokeGuardedCallback(type, listener, event);
}
```

## Share