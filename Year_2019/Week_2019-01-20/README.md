# Week 2019-01-20

## Algorithm

[66.plus-one](https://leetcode.com/problems/plus-one/description/)

[67.add-binary](https://leetcode.com/problems/add-binary/description/)

[69.sqrt-x](https://leetcode.com/problems/sqrtx/description/)

## Review

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
