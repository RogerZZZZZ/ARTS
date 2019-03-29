# Week 2018-12-23

## Algorithm

[9. Palindrome-number](https://leetcode.com/problems/palindrome-number/description/)

[35. Search insert position](https://leetcode.com/problems/search-insert-position/description/)

## Review

> 编写有弹性的组件

1. 不阻断数据流

简单来说就是避免`state`和`prop`的同步，也没有必要将props的值在初始化时赋值给state

有两种解决方法

```js
class Button extends React.PureComponent {
  render() {
    const textColor = slowlyCalculateTextColor(this.props.color);
    return (
      <button className={
        'Button-' + this.props.color +
        ' Button-text-' + textColor // ✅ 永远是新的
      }>
        {this.props.children}
      </button>
    );
  }
}
```

```js
class Button extends React.Component {
  state = {
    textColor: slowlyCalculateTextColor(this.props.color)
  };
  componentDidUpdate(prevProps) {
    if (prevProps.color !== this.props.color) {
      // 😔 额外的重复渲染
      this.setState({
        textColor: slowlyCalculateTextColor(this.props.color),
      });
    }
  }
  render() {
    return (
      <button className={
        'Button-' + this.props.color +
        ' Button-text-' + this.state.textColor // ✅ 在最后一次渲染后是新的
      }>
        {this.props.children}
      </button>
    );
  }
}
```

也可以使用`useMemo`来实现
```js
function Button({ color, children }) {
  const textColor = useMemo(
    () => slowlyCalculateTextColor(color),
    [color] // ✅ 除非 `color` 改变，不会重新计算
  );
  return (
    <button className={'Button-' + color + ' Button-text-' + textColor}>
      {children}
    </button>
  );
}
```

2. 时刻准备渲染

```js
class TextInput extends React.Component {
  state = {
    value: ''
  };
  // 🔴 每次父节点渲染时重置本地状态
  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };
  render() {
    return (
      <input
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}
```

出现的原因为，每当props改变，就会重置组件内部状态，导致状态丢失

解决方法是使用受控组件，或是非受控组件，用key强制render component

## Tips

> happypack

由于运行在 Node.js 之上的 Webpack 是单线程模型的，所以Webpack 需要处理的事情需要一件一件的做，不能多件事一起做。
我们需要Webpack 能同一时间处理多个任务，发挥多核 CPU 电脑的威力，HappyPack 就能让 Webpack 做到这点，`它把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。`

由于 JavaScript 是单线程模型，要想发挥多核 CPU 的能力，只能通过多进程去实现，而无法通过多线程实现。

提示：由于HappyPack 对file-loader、url-loader 支持的不友好，所以不建议对该loader使用。

```js
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
        loader: 'happypack/loader?id=happyBabel',
        //排除node_modules 目录下的文件
        exclude: /node_modules/
      },
    ]
  },
plugins: [
    new HappyPack({
        //用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      //如何处理  用法和loader 的配置一样
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true',
      }],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true,
    })
  ]
}
```

## Share

> why react hooks, 它到底解决了什么问题

Hooks have learned from the trade-offs of mixins, higher order components, and render props to bring us new ways to create contained, composable behaviors that can be consumed in a flat and declarative manner. 💪

- Mixins

It’s not obvious where this.state.x is coming from. With mixins, it’s also possible for the mixin to be blindly relying on that a property exists in the component.

That becomes a huge problem as people start including and extending tons of mixins. You can’t simply search in a single file and assume you haven’t broken something somewhere else.

- High Order Components

While this is more code, we are moving in the right direction. We have all the benefits of Mixins. Now we have a <MouseRender /> component that is no longer tightly coupled to the subscription behavior.

What if we wanted to render something different though? Do we always need to make a new component?

- Render Props & children as Function

This is the pattern that has been staring us in the face the entire time. All we want is a component that handles the mouse move behavior, and the ability to render whatever we want.

但是问题也非常明显，就是当你需要很多功能时，就需要嵌套很多层，然后将props一层一层传下去

- Hooks

1. Not only is the behavior in its own neat little package, useEffect stops it from being spread across three different lifecycle hooks
2. Where the component is getting this data from is incredibly clear, it’s nestled neatly inside the render function.
3. No matter how many of these I need to bring in, my code won’t become increasingly nested.

- By using State Hooks it’s possible to add state to functional components
- By using Effect Hooks you can add code to functional components which is executed in response to component’s lifecycle events