# Week 2018-12-02

## Algorithm

## Review

[Why Do React Elements Have a $$typeof Property?](https://overreacted.io/why-do-react-elements-have-typeof-property/)

本周的分享来自于Dan大神

首先我们看一下一个React element是什么样的。

```js
{
  type: 'marquee',
  props: {
    bgcolor: '#ffa7c4',
    children: 'hi',
  },
  key: null,
  ref: null,
  $$typeof: Symbol.for('react.element'), // 🧐 Who dis
}
```

那`$$typeof`是什么用处，又为什么要使用`Symbol`呢？

起初我们可以通过`innerHTML`来插入html片段到dom中。

```js
const messageEl = document.getElementById('message');
messageEl.innerHTML = '<p>' + message.text + '</p>';
```

但是这样的代码很容易被注入攻击，类似于插入 `<img src onerror="stealYourPassword()">`，于是React对这样的操作进行了限制

```js
// 无法插入tag到p标签之中
<p>
  {message.text}
</p>
```

但是React提供了一个API来插入dom节点。`dangerouslySetInnerHTML={{ __html: message.text }}`，但是仅仅进行简单的`escape the content`操作是完全不够的

```js
// Server could have a hole that lets user store JSON
let expectedTextButGotJSON = {
  type: 'div',
  props: {
    dangerouslySetInnerHTML: {
      __html: '/* put your exploit here */'
    },
  },
  // ...
};
let message = { text: expectedTextButGotJSON };

// Dangerous in React 0.13
<p>
  {message.text}
</p>
```

这样的写法虽说可以优化编译器，在worker之间传递UI元素，也能很好的将JSX从React包中解耦开，但是同时在React13之前存在上述漏洞。

所以在之后在所有React Element中都加入了$$typeof字段，value的类型也为Symbol，原因为JSON中不允许包含Sybmol类型。

但是在不支持Symbol的浏览器中怎么办呢，React的做法是将Symbo替换为 `0xeac7`

## Tips

## Share