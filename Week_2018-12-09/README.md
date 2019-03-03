# Week 2018-12-09

## Algorithm

## Review

## Tips

## Share

[https://overreacted.io/why-do-hooks-rely-on-call-order/](Why Do React Hooks Rely on Call Order?)

本文章主要讲的是hooks为什么要选用现在的实现方式，以及实现的一些细节。

1. 为什么不规定一个component中只能使用一个`useState`： 原因是，这样就无法实现`customer hook`了，而这恰好是hooks的核心。

2. 解决命名冲突，为什么不适用`Symbol`，而是依赖它的调用顺序。原因为如果使用`symbol`,那么同一个hook只能调用一次,会产生命名冲突，因为每次 调用 useState() 会获得单独的state。依赖于固定顺序调用使我们免于担心命名冲突

3. 钻石问题，多层继承。 `遗留的 React createClass() 的 mixins 不允许你这样做，有时你会有两个 mixins，它们都是你想要的，但由于扩展了同一个 “base” mixin，因此互不兼容。`，因此解决的问题与上面的方法一样，就是每个useState都返回独立的state


hooks会根据不同的调用顺序来获得不同的state，因此hook的调用顺序十分的重要。