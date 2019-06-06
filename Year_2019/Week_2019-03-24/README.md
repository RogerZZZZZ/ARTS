# Week 2019-03-24

## Algorithm

[453] Minimum Moves to Equal Array Elements

[455] Assign Cookies

## Review

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