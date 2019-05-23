# Week 2019-03-03

## Algorithm

## Review

## Tips

[autod](https://github.com/node-modules/autod)

A lib that can update the dependencies and devDependencies lib.

[四种Obervers](https://xiaotianxia.github.io/blog/vuepress/js/four_kinds_of_observers.html)

> Intersection Observer

当你想监听某个元素 它在视口可见的时候希望得到通知，可以使用这个api，有以下两个优势

- 性能比监听onScroll要好
- 可以监听到iframe中的元素

```js
const observer = new IntersectionObserver(callback[, options])
```

callback是一个回调函数，里面返回监听目标元素的实时数据组成的数组
- time 时间戳
- rootBounds 根元素的位置信息
- boundingClientRect 目标元素的位置信息
- intersectionRect 交叉部分的位置信息
- IntersectionRatio 目标元素的可见比例
- target

options的一些配置
- root 目标元素的祖先元素，及该元素必须是目标元素的直接或间接父级
- rootMargin 一个在计算交叉值时添加至root的边界盒中的一组偏移量
- threshold 规定了一个监听目标与边界盒交叉区域的比例值，可以是一个具体的数值或一组0，0到1.0之前的数值

```js
observer.observe(target)

observer.unobserve(target)

observer.disconnect()
```

> Mutation Observer

```js
const observer = new MutationObserver(callback)

observer.observe(target, config)
```

config 填写需要监听属性
- attributes 布尔类型 属性的变动
- childList 布尔类型 子节点的变动（指新增，删除或者更改）
- characterData 布尔类型 节点内容或节点文本的变动。
- subtree 布尔类型 是否将该观察器应用于该节点的所有后代节点
- attributeOldValue 布尔类型 观察attributes变动时，是否需要记录变动前的属性值
- characterDataOldValue 布尔类型 观察characterData变动时，是否需要记录变动前的值
- attributeFilter 数组 需要观察的特定属性（比如['class','src']）

> Resize Observer

```js
var observer = new ResizeObserver(callback);
observer.observe(target);
```

触发
- 元素被插入或移除触发
- 元素display显示变成none或相反过程时触发

触发
- 对于不可替换内联元素不触发
- css transform操作不触发

> Performance Observer

```js
const observer = new PerformanceObserver((list) => {
   let output;
   for (const item of list.getEntries()) {
       //业务代码
   }
});

observer.observe({
    //按需要填写
    entryTypes: ['mark', 'measure', 'longtask', 'paint', 'navigation', 'resource'] 
});
```

- entryTypes: 需要监控的指标名，这些指标都可以通过 performance.getEntries() 获取到，此外还可以通过 performance.getEntriesByName() 、performance.getEntriesByType() 分别针对 name 和 entryType 来过滤。

- mark 获取所有通过 performance.mark(markName) 做的所有标记
- measure 获取通过 performance.measure(measureName, markName_start, markName_end) 得到的所有测量值
- longtask 监听长任务（超过50ms 的任务）（不足：只能监控到长任务的存在，貌似不能定位到具体任务）
- paint 获取绘制相关的性能指标，分为两种：“first-paint”、“first-contentful-paint”
- navigation 各种与页面有关的时间，可通过 performance.timing 获取resource 各种与资源加载相关的信息

## Share