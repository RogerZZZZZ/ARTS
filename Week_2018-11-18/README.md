# Week 2018-11-18

## Algorithm

[575. Distribute Candies](https://leetcode.com/problems/distribute-candies/)

[669. Trim a Binary Search Tree](https://leetcode.com/problems/trim-a-binary-search-tree/)

## Review

## Tips

[精读typescript 2.0 -2.9](https://github.com/dt-fe/weekly/blob/master/58.%E7%B2%BE%E8%AF%BB%E3%80%8ATypescript2.0%20-%202.9%E3%80%8B.md)

当一个函数无法执行完，或者理解为中途中断时，TS 2.0 认为它是 never 类型。

#### 增加了修饰类型

TS 在 2.0 版本支持了 readonly 修饰符，被它修饰的变量无法被修改。

在 TS 2.8 版本，又增加了 - 与 + 修饰修饰符，有点像副词作用于形容词。举个例子，readonly 就是 +readonly，我们也可以使用 -readonly 移除只读的特性；也可以通过 -?: 的方式移除可选类型，因此可以延伸出一种新类型：Required<T>，将对象所有可选修饰移除，自然就成为了必选类型：

```js
type Required<T> = { [P in keyof T]-?: T[P] };
```

#### 泛型默认参数

```js
// ts的函数重载
declare function createStore(
  reducer: Reducer,
  preloadedState: PreloadedState,
  enhancer: Enhancer
);
declare function createStore(reducer: Reducer, enhancer: Enhancer);
```

```js
declare function create(): Container<HTMLDivElement, HTMLDivElement[]>;
declare function create<T extends HTMLElement>(element: T): Container<T, T[]>;
declare function create<T extends HTMLElement, U extends HTMLElement>(
  element: T,
  children: U[]
): Container<T, U[]>;
```

#### 自动类型推导

```js
interface A {
  a: number;
}
interface B {
  b: string;
}

function foo(x: A | B) {
  if ("a" in x) {
    return x.a;
  }
  return x.b;
}
```

## Share