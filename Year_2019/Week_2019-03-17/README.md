# Week 2019-03-17

## Algorithm

## Review

## Tips

[React源码解析：组件的实现与挂载](https://juejin.im/post/5983dfbcf265da3e2f7f32de)

```js
var React = {
  Component: ReactComponent,
  createElement: createElement,
  createClass: ReactClass.createClass,
}

module.exports = React
```

- 组件的初始化

```js
var A = function(_Component) {
  _inherits(A, _Component)

  function A() {
    _classCallCheck(this, A)

    var _this = _possibleConstructorReturn(this, _Component.call(this))

    _this.state = {}

    return _this
  }

  A.prototype.render = function() {
    return React.createElement('div', null)
  }

  return A
}(Component)
```

`_inherits()`是extends的函数实现


- 组件的挂载

可以通过`ReactDOM.render(component, mountNode)`的形式对自定义组件/原生DOM/字符串进行挂载

```js
_renderSubtreeIntoContainer: function(parentComponent, nextElement, container, callback) {
  var nextWrapperElement = ReactElement(TopLevelWrapper, null, null, null, null, nextElement)

  // 判断当前容器下是否存在组件
  var prevComponent = getTopLevelWrapperInContainer(container)

  if (prevComponent) {
    var prevWrappedElement = prevComponent._currentElement
    var prevElement = prevWrappedElement.props
    // 组件更新机制在生命周期部分进行解析
    if (shouldUpdateReactComponent(prevElement, nextElement)) {
      var publicInst = prevComponent._renderedComponent.getPublicInstance()
      var updatedCallback = callback && function() {
        callback.call(publicInst)
      }
    }

    ReactMount._updateRootComponent(prevComponent, nextWrappedElement, nextContext, container, updatedCallback)
  } else {
    // 卸载
    ReactMount.upmountComponentAtNode(container)
  }
}

// 不管是更新还是卸载，最终要挂载到真实DOM上
var component = ReactMount._renderNewRootComponent(nextWrappedElement, container, shouldReuseMarkup, nextContext)._renderedComponent.getPublicInstance()
```

renderNewRootComponent的源码如下

```js
_renderNewRootComponent: function(nextElement, container, shouldReuseMarkup, context) {
  var componentInstance = instantiateReactComponent(nextElement, false)

  // 以事务的形式调用mountComponentIntoNode，返回组件对应的HTML，记为变量markup
  ReactUpdates.batchedUpdates(batchedMountComponentIntoNode, componentInstance, container, shouldReuseMarkup, context)

  var wrapperID = componentInstance_.instance.rootID
  instancesByReactRootId[wrapperID] = componentInstance

  return componentInstance
}

```

`batchedMountComponentIntoNode`实际调用的是`mountImageIntoNode`

```js
_mountImageIntoNode = function(markup, container, instance, shouldReuseMarkup, transaction) {
  // 将markup设置为container的innerHTML属性，完成DOM的插入
  setInnerHTML(container, markup)
  // precacheNode方法是将处理好的组件对象存储在缓存中
  ReactDOMComponentTree.precacheNode(instance, container.firstChild)
}
```

instantiateReactComponent的作用是根据传入的node类型返回组件实例，

- null/false -> ReactEmptyComponent
- object && type === string 虚拟DOM -> ReactDOMComponent
- object && type !== string React组件 -> ReactCompositeComponent `也就是React组件`
- string -> ReactTextComponent
- number -> ReactTextComponent


根据`ReactDOM.render()`传入不同的参数，React内部会创建四大类封装组件，记为`componentInstance`。
而后将其作为参数传入`mountComponentIntoNode`方法中，由此获得组件对应的HTML，记为变量`markup`。
将真实的DOM的属性innerHTML设置为markup，即完成了DOM插入。


## Share