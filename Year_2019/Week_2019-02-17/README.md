# Week 2019-02-17

## Algorithm

[415] Add Strings
[429] N-ary Tree Level Order Traversal

## Review

[盘点浏览器的几种滚动行为](https://xiaotianxia.github.io/blog/vuepress/js/scroll_behaviors.html?_=2625346544)

> scroll-behavior: smooth

```css
scroll-behavior: smooth | auto;
```

```js
document.scrollingElement.scrollTop = 0;
// or window.scrollTo(0, 0);
```

> .scroll(), .scrollTo(), .scrollBy(), .scrollIntoView()

```js
this.scrollWrapper.scrollTo({
	top: this.queryParams.top,
	left: this.queryParams.left,
	behavior: this.queryParams.smooth ? 'smooth' : 'auto'
});
```

> .scrollIntoView()

让element滚动进可视区域中

```js
element.scrollIntoView(alignToTop);
element.scrollIntoView({
	block: 'start' | 'end' | 'center' | 'nearest', 
	inline: 'start' | 'end' | 'center' | 'nearest', 
	behavior: 'smooth' | 'auto'
});
```

> overscroll-behavior: contain

```css
overscroll-behavior: contain | auto | none;
overscroll-behavior-x: contain | auto | none;
overscroll-behavior-y: contain | auto | none;
```

- `auto` - 默认。元素的滚动会传播给祖先元素。
- `contain` - 阻止滚动链接，滚动不会传播给祖先。
- `none` - 和 contain 效果一样。

> scroll-snap-*

```css
.container.y-mandatory {
    scroll-snap-type: y mandatory; 
}
.container.y-proximity {
    scroll-snap-type: y proximity;
}
.container.x-mandatory {
    scroll-snap-type: x mandatory;
}
.container.x-proximity {
    scroll-snap-type: x proximity;
}
.y > .scroll-item {
	scroll-snap-align: start;
}
.x > .scroll-item {
	scroll-snap-align: center;
}
```

- mandatory： 强制，强制地定位到某个滚动元素
- proximity：邻近，个人理解是：只有当某个滚动元素“足够”进入滚动容器的时候才会控制定位这两个概念在使用上略有差异，可以多看几个例子感受一下

> history.scrollRestoration

在从页面跳转回来的时候，一般浏览器都会“贴心”地返回到该页面原来的滚动位置，该行为由 history.scrollRestoration 属性控制的，默认是“auto”，

若不想回到原来的位置，可将值设为“manual”，手动，即不返回原位置，而是手动返回，此时浏览器会返回到页面顶部。但据测试，“返回”都是瞬间的，即使设置了 scroll-behavior: smooth 也无效。

```js
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
}
```

## Tips

[typescript handbook]

- 模块解析

> 共有两种可用的模块解析策略: node & classic

Classic: (Typescript以前默认的解析策略，现在存在理由为向后兼容)

/root/src/folder/A.ts文件里的import { b } from "./moduleB"会使用下面的查找流程：

1. /root/src/folder/moduleB.ts
2. /root/src/folder/moduleB.d.ts

`如果本目录找不到，则依次向上级目录遍历`

Node: Node.js的模块解析机制

假设有一个文件路径为 /root/src/moduleA.js，包含了一个导入var x = require("./moduleB"); Node.js以下面的顺序解析这个导入：

1. 检查/root/src/moduleB.js文件是否存在。
2. 检查/root/src/moduleB目录是否包含一个package.json文件，且package.json文件指定了一个"main"模块。 在我们的例子里，如果Node.js发现文件 /root/src/moduleB/package.json包含了{ "main": "lib/mainModule.js" }，那么Node.js会引用/root/src/moduleB/lib/mainModule.js。
3. 检查/root/src/moduleB目录是否包含一个index.js文件。 这个文件会被隐式地当作那个文件夹下的"main"模块。
4. 若没有找到，则依次向上级目录寻找


- 声明合并

> 接口合并

```ts
interface Box {
  height: number
  width: number
}

interface Box {
  scale: number
}

let box: Box = {
  height: 5,
  width: 6,
  scale: 7,
}

// 同名的非函数成员需要类型相同
// 同名函数的话会被当做重载来处理

interface Cloner {
    clone(animal: Animal): Animal;
}

interface Cloner {
    clone(animal: Sheep): Sheep;
}

interface Cloner {
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
}

interface Cloner {
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
    clone(animal: Sheep): Sheep;
    clone(animal: Animal): Animal;
}
```

这个规则有一个例外是当出现特殊的函数签名时。 如果签名里有一个参数的类型是 单一的字符串字面量（比如，不是字符串字面量的联合类型），那么它将会被提升到重载列表的最顶端。

```ts
interface Document {
    createElement(tagName: any): Element;
}
interface Document {
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "span"): HTMLSpanElement;
}
interface Document {
    createElement(tagName: string): HTMLElement;
    createElement(tagName: "canvas"): HTMLCanvasElement;
}

interface Document {
    createElement(tagName: "canvas"): HTMLCanvasElement;
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "span"): HTMLSpanElement;
    createElement(tagName: string): HTMLElement;
    createElement(tagName: any): Element;
}
```

> 合并命名空间

```ts
namespace Animals {
    export class Zebra { }
}

namespace Animals {
    export interface Legged { numberOfLegs: number; }
    export class Dog { }
}

namespace Animals {
    export interface Legged { numberOfLegs: number; }

    export class Zebra { }
    export class Dog { }
}

// 但是如果命名空间中的变量没有被export，那它不能够在其他重名的命名空间种被使用
```

- 三斜线指令

三斜线指令是包含单个XML标签的单行注释，注释的内容回座位编译器的指令使用

`/// <reference path="..." />` 指令是三斜线指令中最常见的一种。 它用于声明文件间的`依赖`。


## Share