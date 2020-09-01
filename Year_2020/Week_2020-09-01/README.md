# Week 2020-09-01

## Algorithm

[105.construct-binary-tree-preorder-inorder]

## Tips

[AST和babel的工作流程](https://mp.weixin.qq.com/s/ov5NO55hHbWw_zUJZljdRw)

> AST 抽象语法树

生成AST可以分为两个阶段, 词法分析和语法分析

```js
const add = (a, b) => a + b
```

1. 词法分析 tokenize

```js
[
    { "type": "Keyword", "value": "const" },
    { "type": "Identifier", "value": "add" },
    { "type": "Punctuator", "value": "=" },
    { "type": "Punctuator", "value": "(" },
    { "type": "Identifier", "value": "a" },
    { "type": "Punctuator", "value": "," },
    { "type": "Identifier", "value": "b" },
    { "type": "Punctuator", "value": ")" },
    { "type": "Punctuator", "value": "=>" },
    { "type": "Identifier", "value": "a" },
    { "type": "Punctuator", "value": "+" },
    { "type": "Identifier", "value": "b" }
]
```

2. 语法分析

通过生成的token数组, 转换成AST

```json
{
  "type": "Program", // 根节点
  "body": [
    {
      "type": "VariableDeclaration", // 变量声明
      "declarations": [ // 具体声明
        {
          "type": "VariableDeclarator", // 变量声明
          "id": {
            "type": "Identifier", // 标识符（最基础的）
            "name": "add" // 函数名
          },
          "init": {
            "type": "ArrowFunctionExpression", // 箭头函数
            "id": null,
            "expression": true,
            "generator": false,
            "params": [ // 参数
              {
                "type": "Identifier",
                "name": "a"
              },
              {
                "type": "Identifier",
                "name": "b"
              }
            ],
            "body": { // 函数体
              "type": "BinaryExpression", // 二项式
              "left": { // 二项式左边
                "type": "Identifier",
                "name": "a"
              },
              "operator": "+", // 二项式运算符
              "right": { // 二项式右边
                "type": "Identifier",
                "name": "b"
              }
            }
          }
        }
      ],
      "kind": "const"
    }
  ],
  "sourceType": "module"
}
```

> Babel的工作过程

- Parse解析: 将源代码转换成更加抽象的表示方法, 抽象语法树
- Transform转换: 对抽象语法树做一些特殊处理, 让它符合编译器的期望
- Generate代码生成, 将第二步转换过的树生成新的代码


1. Transform

Babel会维护一个**Visitor**对象, 这个对象定义了用于AST中获取具体节点的方法

```js
import * as t from "@babel/types";

// 替换箭头函数为FunctionDeclaration节点
var visitor = {
    ArrowFunction(path) {
        path.replaceWith(t.FunctionDeclaration(id, params, body));
    }
};
```

## Share

[React17新特性](https://mp.weixin.qq.com/s/BEDwLJkEEI9bvD-1E5RRjQ)

因为React在编译时的优化方面的先天不足, React的优化主要在运行时

- React15实现了**batchedUpdates**
- React16实现了**Fiber concurrentMode**
- React17替换了之前16使用的**启发式更新算法**


> 为什么启发式更新算法需要更新?

在React16、17中，在组件内执行this.setState后会在该组件对应的fiber节点内产生一种链表数据结构update。
其中，`update.expirationTimes`为类似时间戳的字段，表示优先级。
`expirationTimes`从字面意义理解为过期时间。
该值离当前时间越接近，该update 优先级越高。
当`update.expirationTimes`超过当前时间，则代表该update过期，优先级变为最高（即同步）。
一棵fiber树的多个fiber节点可能存在多个update。
每次`Fiber Reconciler`调度更新时，会在所有fiber节点的所有`update.expirationTimes`中选择一个`expirationTimes`（一般选择最大的），作为本次更新的优先级。
并从根fiber节点开始向下构建新的fiber树。
构建过程中如果某个fiber节点包含update，且`update.expirationTiems >= expirationTimes`

但这样的算法有缺陷, 如果只考虑中断/继续这样的`CPU操作`, 以`expirationTimes`大小作为衡量优先级依据的模型可以很好地工作, 但是这样的模型是不满足`IO操作(suspense)`, 高优先级IO任务会中断低优先级CPU操作, 每次更新，都是以某一优先级作为整棵树的优先级更新标准，而不仅仅是某一组件，即使更新的源头（update）确实是某个组件产生的。

> React17启发式更新算法

React17的解决方案是：指定一个连续的优先级区间，每次更新都会以区间内包含的优先级生成对应页面快照。

这种优先级区间模型被称为`lanes(车道模型)`

具体做法是：使用一个31位的二进制代表31种可能性。
- 其中每个bit被称为一个lane（车道），代表优先级
- 某几个lane组成的二进制数被称为一个lanes，代表一批优先级

```js
const InputDiscreteLanes: Lanes = 0b0000000000000000000000000011000;

// 包含两个lane
0b0000000000000000000000000010000
0b0000000000000000000000000001000
```

如果InputDiscreteLanes的两个lane都被占用，则该update的优先级会下降到InputContinuousLanePriority并继续寻找空余的lane。


> 更改事件委托

之前react的所有绑定事件会被被挂载到document上统一处理, 现在将挂载在根节点上


> 副作用清理时机

```js
useEffect(() => {
  return () => {
    // this is its cleanup
  }
})
```

大部分副作用不需要延迟刷新视图, 但是之前清楚函数是同步的, 会减缓视图的更新, 在React17中, 副作用清理函数会异步执行

```js
// 因为异步的关系, 现在可能ref在清除的时候, 已经被设置为null
useEffect(() => {
  someRef.current.someSetupMethod();
  return () => {
    someRef.current.someCleanupMethod();
  };
});

// 更改方案
useEffect(() => {
  const instance = someRef.current;
  instance.someSetupMethod();
  return () => {
    instance.someCleanupMethod();
  };
});
```