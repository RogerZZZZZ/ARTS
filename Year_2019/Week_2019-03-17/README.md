# Week 2019-03-17

## Algorithm

[485] Max Consecutive Ones

[492] Construct the Rectangle

## Review

[VueConf 上海 尤大大分享](https://juejin.im/post/5cf69021e51d4576bc1a0dbc)

移动端解决方案:

- Hybrid: Vant, Vux, Onsen UI, Ionic 4
- Native: Weex, NativeScript, Uni-app

**3.0改动**

- 更小

全局api和内置组件/功能支持tree-shaking

- 更快

1. 基于proxy的变动侦测，性能整体优于getter/setter (JS引擎会继续优化proxy)
2. Virtual Dom重构
3. 编译器架构重构，更多的编译时优化

- 提升自身可维护性

1. 采用monorepo结构，内部分层更清晰
2. Typescript重写

- 开放更多底层功能

Custom Renderer

```js
import { createRenderer } from '@vue/runtime-core'

const { render } = createRenderer({
  nodeOps,
  patchData,
})
```

- 传统vdom的性能瓶颈

1. 虽然Vue能够保证触发更新的组件最小化，但在单个组件内部依然需要遍历该组件的整个vdom树
2. 在一些组件整个模板内只有少量动态节点的情况下，这些遍历都是性能的浪费
3. 传统vdom的性能跟模板大小正相关，跟动态节点的数量无关

所以为了解决上述瓶颈
1. 将模板静态分析生成更优化的vdom渲染函数
2. 将模板切分为block，每个block内部动态节点位置都是固定的
3. 每个block的根节点会记录自己所包含的动态节点
4. 更新时只需要直接遍历动态节点



- Function-based API

```js
const App = {
  setup() {
    const count = value(0)

    const plusOne = computed(() => count.value + 1)

    const increment = () => {
      count.value++
    }

    watch(() => count.value * 2, v => console.log(v))

    onMounted(() => console.log('mounted'))

    return { count }
  }
}
```

对比Class API:

1. 更灵活的逻辑复用能力
2. 更好的typescript类型推导支持
3. 更好的性能
4. Tree-shaking友好
5. 代码更容易压缩

- React hooks的替代实现

```js
function useMousePosition() {
  const x = value(0)
  const y = value(0)

  const update = e => {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  onUnMounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return { x, y }
}
```

相比React Hooks的

1. 没有必报变量的问题
2. 没有内存/GC压力
3. 不存在内联回调导致子组件永远更新的问题

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