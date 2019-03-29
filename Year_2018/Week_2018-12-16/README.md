# Week 2018-12-16

## Algorithm

[1. two sum](https://leetcode.com/problems/two-sum/description/)

[7. reverse integer](https://leetcode.com/problems/reverse-integer/description/)

## Review

> How are function components different from Classes

1. state
2. lifecircle function

除此之外，还有一个区别在于 **Function components capture the rendered values.**

为什么这么说呢，这里有个例子:

```js
function ProfilePage(props) {
  const showMessage = () => {
    alert('Followed ' + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return (
    <button onClick={handleClick}>Follow</button>
  );
}
```

```js
class ProfilePage extends React.Component {
  showMessage = () => {
    alert('Followed ' + this.props.user);
  };

  handleClick = () => {
    setTimeout(this.showMessage, 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
```

以上两个组件，实现的功能相同，但是却有差别，差别在于，如果在setTimeout期间，改变props的值，Class component打印出的值为新的props，这显然是不对的，究其原因是`this.props`是`mutable`的。

有两个解决方法:

1. 参数传递
```js
class ProfilePage extends React.Component {
  showMessage = (user) => {
    alert('Followed ' + user);
  };

  handleClick = () => {
    const {user} = this.props;
    setTimeout(() => this.showMessage(user), 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
```

2. closure
```js
class ProfilePage extends React.Component {
  render() {
    // Capture the props!
    const props = this.props;

    // Note: we are *inside render*.
    // These aren't class methods.
    const showMessage = () => {
      alert('Followed ' + props.user);
    };

    const handleClick = () => {
      setTimeout(showMessage, 3000);
    };

    return <button onClick={handleClick}>Follow</button>;
  }
}
```

**With Hooks, the same principle applies to state as well**

## Tips

> react code splitting

```js
class DynamicImport extends Component {
  state = {
    component: null
  }
  componentDidMount () {
    this.props.load()
      .then((component) => {
        this.setState(() => ({
          component: component.default ? component.default : component
        }))
      })
  }
  render() {
    return this.props.children(this.state.component)
  }
}

const Settings = (props) => (
  <DynamicImport load={() => import('./Settings')}>
    {(Component) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)
```

```js
import A from 'B'
// 这样的语法只能够卸载文件最上端，importing and exporting at compile time, not runtime. 但是却可以使用promise的方法动态引入modules,在上面的例子中，只有调用Setting component开始render的时候，才会去下载该文件。从而减小首页文件加载的压力。
```

Recommend lib: `react-loadable`

官方实现为(但是不支持SSR):
```js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```

prefetching modules

```js
//...
import(/* webpackPrefetch: true */ 'LoginModal');
```
This will result in <link rel="prefetch" href="login-modal-chunk.js"> being appended in the head of the page, which will instruct the browser to prefetch in idle time the login-modal-chunk.js file.

splitChunkPlugin配置在`optimization`中

`Async Chunks`: Create separate files for code which can be lazy loaded. Like a file for every Route of React router which can be lazy loaded when route is changed. Webpack inject some code into main.js which takes care of lazy loading async chunks and stops from loading same chunks again and again. When route changes, React router calls a Webpack function to load a chunk file and Webpack after done loading runs it, which chunk would internally ask React to do something.

