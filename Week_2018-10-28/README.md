# Week 2018-10-28

## Algorithm

[821. Shortest Distance to a Character](https://leetcode.com/problems/shortest-distance-to-a-character/solution/)

[500. Keyboard Row](https://leetcode.com/problems/keyboard-row/description/)

## Review

[对React Hooks的一些思考](https://zhuanlan.zhihu.com/p/48264713)

```javascript
const FunctionComponent = props => {
    // 对所有Hooks的调用，声明前置条件

    // 对props及hooks提供的内容的运算处理，数据加工

    // 将数据转变为JSX并返回
};
```

使用`useEffect`来取代`componentDidMount`和`componentDidUpdate`，因为对于状态管理来说其实并不关心试图的更新进度。

**Time Slicing**

Problem Today

- Wrapper Hell
- Huge components
- Confusing classes

**React Hook**

`useEffect`

useEffect optionally return a function, if return a function, then when useEffect run, will call the return function to clean up, e.g. remove some listeners.

```js
useEffect(() => {
  // ...
  return () => {
    // some clean up operations
  }
})
```

`Customer Hook`

## Tips

## Share

React Hooks一些相关的思考

- 状态和更新状态的两两配对，可以用更好的代码结构组织它们
- 状态的更加细粒度的切分，没有联动的的状态放在不同的组件中单独管理
- 状态的管理和视图渲染的隔离，把一个带有复杂`render`实现的类组件拆分为一个`单独管理状态的类组件`和一个`实现渲染逻辑的纯函数组件`，其实也就是HOC的思想


之前React如果需要对state进行操作，需要在class component进行操作。现在有了React Hook之后，可以在任何function component中进行。
