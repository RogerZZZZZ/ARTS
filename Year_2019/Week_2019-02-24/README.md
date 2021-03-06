# Week 2019-02-24

## Algorithm

[434] Number of Segments in a String
[437] Path Sum III

## Review

只记录一些有意思的点

[React 源码分析](https://juejin.im/post/5cbae9a8e51d456e2809fba3)

- ReactElement

```js
const ReactElement = function(type, key, ref, self, source, owner, props) {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner,
  }
  return element
}
```

- React中一个重要的属性: updater

setState()以及forceUpdate都是直接调用updater中的方法

```js
this.updater = updater || ReactNoopUpdateQueue // 后者用于报warning

Component.prototype.setState = function(partialState, callback) {
  this.updater.enqueueSetState(this, partialState, callback, 'setState')
}

Component.prototype.forceUpdate = function(callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate')
}
```

- Refs

ref目前两种推荐的创建方式

- ref = {el => this.el = el}
- React.createRef()

```js
export function createRef(): RefObject {
  const refObject = {
    current: null,
  }
  if (__DEV__) {
    Object.seal(refObject)
  }
  return refObject
}
```

- mapChildren

```html
<div>
  <span>1</span>
  <span>2</span>
</div>
```

`React.mapChildren(root, c => [c, c])`

```html
<span>1</span>
<span>1</span>
<span>2</span>
<span>2</span>
```

因为mapChildren()会把最终结果全部flatten，主要流程如下：

- 入口mapChildren()
- mapIntoWithKeyPrefixInternal 内部维护一个对象重用池，为了节省性能开销
- traverseAllChildren
- traverseAllChildrenImpl
- 判断children是不是可渲染的单个元素，若不是遍历children，调用traverseAllChildrenImpl
- 如果是执行callback，及mapSingleChildInfoContext， 如果是有效的element，则放入result中，result为mapChildren的返回值

## Tips

[Protocol Buffer]

> protocol buffer与其他技术对比

主要优点是：简单，快。原因是

- 序列化后的二进制消息非常紧凑
- 使用 Protobuf 无需学习复杂的文档对象模型，Protobuf 的编程模式比较友好，简单易学

`Varint`是一种紧凑的表示数字的方法。它用一个或多个字节来表示一个数字，值越小的数字使用越少的字节数。这能减少用来表示数字的字节数。

`Varint`中的每个 byte 的最高位 bit 有特殊的含义，如果该位为 1，表示后续的 byte 也是该数字的一部分，如果该位为 0，则结束。其他的 7 个 bit 都用来表示数字。因此小于 128 的数字都可以用一个 byte 表示。大于 128 的数字，比如 300，会用两个字节来表示：1010 1100 0000 0010

[protobuf语法指南]

1. 指定字段规则

- required: 该值是必须要设置的，且在后续的修改中，不能改动
- optional: 该字段可以有0、1个值
- repeated: 可以重复很多次，相当于List

> 基本类型的repeated字段没有被尽可能搞笑编码，应该使用下面方式来确保高效

`repeated int32 samples = 4 [packed=true]`

2. Optional的字段和默认值

`optional int32 result_per_page = 3 [default = 10]`

> 对string来说，默认值是空字符串。对bool来说，默认值是false。对数值类型来说，默认值是0。对枚举来说，默认值是枚举类型定义中的第一个值

3. 扩展

```js
message Foo {
  // ...
  extensions 100 to 199
}
```

> 在消息Foo中，范围[100, 199]之内的子弹标识号被保留为扩展使用

```js
extend Foo {
  optional int32 bar = 126
}

// 扩展字段标识号需要在之前声明的范围内
```

4. 被预留的标识号

`[19000, 19999]`

5. 定义服务

pb还有很重要的一个应用场景，实在rpc系统中定义服务接口

```js
service SearchService {
  rpc Search (SearchRequest) returns (SearchResponse)
}
```


## Share

初次开始看教程阅读react的源代码，给我的第一感觉是，项目目录十分的多，切划分的非常的仔细，每个模块下面基本都有package.json文件和很多的test来保证项目的质量。非常的不容易，看到git history中的author都是一些十分熟悉的名字，觉得很近有很遥远。漫漫学习之路才刚刚开始。