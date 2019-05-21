# Week 2019-01-20

## Algorithm

[66.plus-one](https://leetcode.com/problems/plus-one/description/)

[67.add-binary](https://leetcode.com/problems/add-binary/description/)

[69.sqrt-x](https://leetcode.com/problems/sqrtx/description/)

## Review

[Advanced Static Types in Typesciprt]

1. null/undefined可以被赋值给任意类型

解决方法: tsconfig => `"strictNullCheck": "true"`

2. `const container = document.getElementById('container')!`


[Understand Typescript's Control Flow Based Type Analysis]

## Tips

[next.js]

- Link

```js
import Link from 'next/link'
```

> 实质是一个HOC，只要子组件支持onClick绑定，即可完成跳转

> `as` prop in Link component. It could make you link in browser cleaner

```js
<Link as={`/p/${post.id}`} href={`/post?title=${post.title}`}>
  <a>{post.title}</a>
</Link>
```

但是直接这么使用，不能支持页面的刷新，支持页面刷新的话，需要额外配置express的router

```js
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/p/:id', (req, res) => {
      const actualPage = '/post'
      const queryParams = { title: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
```

- css in js

```js
{/* global <style jsx global> */}
  <style jsx>{`
    h1,
    a {
      font-family: 'Arial';
    }

    ul {
      padding: 0;
    }

    li {
      list-style: none;
      margin: 5px 0;
    }

    a {
      text-decoration: none;
      color: blue;
    }

    a:hover {
      opacity: 0.6;
    }
  `}</style>
```

## Share

[JS中的内存管理]

#### JS中的内存回收

- 引用

垃圾回收算法主要依赖于引用的概念，在js种一个js对象具有对它原型的引用(`隐式`)和对它属性的引用(`显式`)

> 引用计数垃圾收集

```js
let arr = [1, 2, 3, 4];
arr = null; // [1,2,3,4]这时没有被引用, 会被自动回收
```

但是引用计数有个问题是，无法解决循环引用的问题

```js
function f() {
  var o1 = {};
  var o2 = {};
  o1.p = o2; // o1 引用 o2
  o2.p = o1; // o2 引用 o1. 这里会形成一个循环引用
}
f();
```

> 标记-清除算法

这个算法假定设置一个叫做根root的对象(在Javascript里，根是全局对象). 定期的, 垃圾回收器将从根开始, 找所有从根开始引用的对象, 然后找这些对象引用的对象, 从根开始,垃圾回收器将找到所有可以获得的对象和所有不能获得的对象.

**页面中的全局变量只有等到页面关闭才会被清除**

ES6中引入WeakSet 和 WeakMap两个新的概念, 来解决引用造成的内存回收问题. WeakSet 和 WeakMap对于值的引用可以忽略不计, 他们对于值的引用是弱引用,内存回收机制, 不会考虑这种引用. 当其他引用被消除后, 引用就会从内存中被释放.