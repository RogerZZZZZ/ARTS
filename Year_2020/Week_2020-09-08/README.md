# Week 2020-09-08

## Algorithm

## Tips

[JS原型-显式原型+隐式原型]

- 每个函数都有一个prototype属性, 它默认指向一个Object空对象
- 原型对象中有一个属性constructor, 它指向函数对象

```js
function Fun () {}
console.log(Fun.prototype)  // 默认指向一个Object空对象(没有我们的属性)
//输出 object 里面有constructor+__proto__

// 原型对象中有一个属性constructor, 它指向函数对象
console.log(Date.prototype.constructor===Date)   //ture
console.log(Fun.prototype.constructor===Fun)  
```

> 显式原型与隐式原型

- 每个函数function都有一个prototype, 即显式原型
- 每个实例对象都有一个__proto__, 即隐式原型
- 对象的隐式原型的值等于其对应构造函数显式原型的值
- 函数的prototype属性是在定义函数时自动添加的, 默认为一个空的object对象
- 对象的__proto__属性是创建对象时自动添加的

```js
fn.__proto__ === Fn.prototype
```

```js
Function.__proto__ === Function.prototype // true

Object.__proto__ === Function.prototype // true

Function.prototype.__proto___ === Object.prototype // true

Fn.prototype.__proto__ === Object.prototype // true
```

## Share

[说说对Options请求的理解](https://mp.weixin.qq.com/s/zHxpII3LeePfTl4EOjcgCQ)

> Options请求是什么

用于获取目的资源所支持的通信选项, options请求就是预检请求, 可用于检测服务器允许的http方法, 当发起跨域请求时，由于安全原因，触发一定条件时浏览器会在正式请求之前自动先发起 OPTIONS 请求，即 CORS 预检请求，服务器若接受该跨域请求，浏览器才继续发起正式请求。

> Options请求的触发时机

在跨域的情况下, 浏览器发起的"复杂请求"时主动发起的

> 简单请求与复杂请求

是否会触发CORS预检请求, 如果是则为复杂请求

#### 简单请求

- 请求方法为GET、HEAD、POST时发的请求
- 人为设置了规范集合之内的首部字段，如Accept/Accept-Language/Content-Language/Content-Type/DPR/Downlink/Save-Data/Viewport-Width/Width
- Content-Type 的值仅限于下列三者之一,即application/x-www-form-urlencoded、multipart/form-data、text/plain
- 请求中的任意 XMLHttpRequestUpload 对象均没有注册任何事件监听器；
- 请求中没有使用 ReadableStream 对象。

#### 复杂请求

- 使用了下面任一 HTTP 方法，PUT/DELETE/CONNECT/OPTIONS/TRACE/PATCH
- 人为设置了以下集合之外首部字段，即简单请求外的字段
- Content-Type 的值不属于下列之一，即application/x-www-form-urlencoded、multipart/form-data、text/plain

> Options请求优化

- 转为简单请求，如用 JSONP 做跨域请求
- 对 options 请求进行缓存，服务器端设置 Access-Control-Max-Age 字段，那么当第一次请求该 URL 时会发出 OPTIONS 请求，浏览器会根据返回的 Access-Control-Max-Age 字段缓存该请求的 OPTIONS 预检请求的响应结果（具体缓存时间还取决于浏览器的支持的默认最大值，取两者最小值，一般为 10 分钟）。在缓存有效期内，该资源的请求（URL 和 header 字段都相同的情况下）不会再触发预检。（chrome 打开控制台可以看到，当服务器响应 Access-Control-Max-Age 时只有第一次请求会有预检，后面不会了。注意要开启缓存，去掉 disable cache 勾选。）