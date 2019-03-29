# Week 2018-11-18

## Algorithm

[575. Distribute Candies](https://leetcode.com/problems/distribute-candies/)

[669. Trim a Binary Search Tree](https://leetcode.com/problems/trim-a-binary-search-tree/)

## Review

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

## Tips

### Rxjs

##### 纯净性 (Purity)

```js
var count = 0;
var button = document.querySelector('button');
button.addEventListener('click', () => console.log(`Clicked ${++count} times`));


var button = document.querySelector('button');
Rx.Observable.fromEvent(button, 'click')
  .scan(count => count + 1, 0)
  .subscribe(count => console.log(`Clicked ${count} times`));
```

##### Observable (可观察对象)

```js
var observable = Rx.Observable.create(function (observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(() => {
    observer.next(4);
    observer.complete();
  }, 1000);
});

console.log('just before subscribe');
observable.subscribe({
  next: x => console.log('got value ' + x),
  error: err => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
});
console.log('just after subscribe');

/**
just before subscribe
got value 1
got value 2
got value 3
just after subscribe
got value 4
done
*/
```

##### Observables 作为函数的泛化

> 订阅 Observable 类似于调用函数。

> 在某种意义上，可以认为是可以接受多个返回值

```js
var foo = Rx.Observable.create(function (observer) {
  console.log('Hello');
  observer.next(42);
  observer.next(100); // “返回”另外一个值
  observer.next(200); // 还可以再“返回”值
});

console.log('before');
foo.subscribe(function (x) {
  console.log(x);
});
console.log('after');
```

##### Observer (观察者)

> Subject 像是 Observable，但是可以多播给多个观察者。Subject 还像是 EventEmitters，维护着多个监听器的注册表。

```js
var subject = new Rx.Subject();

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(1);
subject.next(2);

/**
observerA: 1
observerB: 1
observerA: 2
observerB: 2
*/
```

> 支持多播

```js
var subject = new Rx.Subject();

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

var observable = Rx.Observable.from([1, 2, 3]);

observable.subscribe(subject); // 你可以提供一个 Subject 进行订阅
```

##### 多播的 Observables

> 多播 Observable 在底层是通过使用 Subject 使得多个观察者可以看见同一个 Observable 执行。

```js
var source = Rx.Observable.from([1, 2, 3]);
var subject = new Rx.Subject();
var multicasted = source.multicast(subject);

// 在底层使用了 `subject.subscribe({...})`:
multicasted.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
multicasted.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

// 在底层使用了 `source.subscribe(subject)`:
multicasted.connect();
```

##### 引用计数

手动调用 connect() 并处理 Subscription 通常太笨重。

> refCount 的作用是，当有第一个订阅者时，多播 Observable 会自动地启动执行，而当最后一个订阅者离开时，多播 Observable 会自动地停止执行。

```js
var source = Rx.Observable.interval(500);
var subject = new Rx.Subject();
var refCounted = source.multicast(subject).refCount();
var subscription1, subscription2, subscriptionConnect;

// 这里其实调用了 `connect()`，
// 因为 `refCounted` 有了第一个订阅者
console.log('observerA subscribed');
subscription1 = refCounted.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

setTimeout(() => {
  console.log('observerB subscribed');
  subscription2 = refCounted.subscribe({
    next: (v) => console.log('observerB: ' + v)
  });
}, 600);

setTimeout(() => {
  console.log('observerA unsubscribed');
  subscription1.unsubscribe();
}, 1200);

// 这里共享的 Observable 执行会停止，
// 因为此后 `refCounted` 将不再有订阅者
setTimeout(() => {
  console.log('observerB unsubscribed');
  subscription2.unsubscribe();
}, 2000);
```

##### BehaviorSubject

Subject 的其中一个变体就是 BehaviorSubject，它有一个“当前值”的概念。它保存了发送给消费者的最新值。并且当有新的观察者订阅时，会立即从 BehaviorSubject 那接收到“当前值”。

> BehaviorSubjects 适合用来表示“随时间推移的值”。举例来说，生日的流是一个 Subject，但年龄的流应该是一个 BehaviorSubject 

```js
var subject = new Rx.BehaviorSubject(0); // 0是初始值

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(3);


/**
observerA: 0
observerA: 1
observerA: 2
observerB: 2
observerA: 3
observerB: 3
 */
```

##### ReplaySubject

ReplaySubject 类似于 BehaviorSubject，它可以发送旧值给新的订阅者，但它还可以记录 Observable 执行的一部分。

> ReplaySubject 记录 Observable 执行中的多个值并将其回放给新的订阅者。

```js
var subject = new Rx.ReplaySubject(3); // 为新的订阅者缓冲3个值

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(5);

/**
observerA: 1
observerA: 2
observerA: 3
observerA: 4
observerB: 2
observerB: 3
observerB: 4
observerA: 5
observerB: 5
 */ 
```

还可以指定时间窗口来缓存数据。

```js
var subject = new Rx.ReplaySubject(100, 500 /* windowTime */);
```


##### AsyncSubject

> AsyncSubject 是另一个 Subject 变体，只有当 Observable 执行完成时(执行 complete())，它才会将执行的最后一个值发送给观察者。


##### Scheduler (调度器)

```js
var observable = Rx.Observable.create(function (observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
})
.observeOn(Rx.Scheduler.async);

console.log('just before subscribe');
observable.subscribe({
  next: x => console.log('got value ' + x),
  error: err => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
});
console.log('just after subscribe');

/**
just before subscribe
just after subscribe
got value 1
got value 2
got value 3
done
*/
```

- null	不传递任何调度器的话，会以同步递归的方式发送通知。用于定时操作或尾递归操作。
- Rx.Scheduler.queue	当前事件帧中的队列调度(蹦床调度器)。用于迭代操作。
- Rx.Scheduler.asap	微任务的队列调度，它使用可用的最快速的传输机制，比如 Node.js 的 process.nextTick() 或 Web Worker 的 MessageChannel 或 setTimeout 或其他。用于异步转换。
- Rx.Scheduler.async	使用 setInterval 的调度。用于基于时间的操作符。

## Share

这周末学习了rxjs的一些基本操作，给我最直观的感受是，相比redux来说，更加的优雅，直观的感觉是复用性会好更多。

而且能够很好的处理异步数据流