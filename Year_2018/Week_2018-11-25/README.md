# Week 2018-11-25

## Algorithm

[953. Verifying an Alien Dictionary](https://leetcode.com/problems/verifying-an-alien-dictionary/)

[721. Accounts Merge](https://leetcode.com/problems/accounts-merge/)

## Review

[React Fiber架构](https://zhuanlan.zhihu.com/p/37095662)

React 16解决的一些痛点

- 组件不能返回数组,影响语义. 16.0支持组件返回任何类型的数组
- HOC带来的ref何context无法向下传递的问题. 16.3退出了createRef和forwordRef解决Ref传递问题,推出new Context API解决context传递问题.
- 16.0开始在使用时间分片技术进行性能优化

> 执行同样的任务,将任务切分为更小的任务执行,会得到更高的性能. 原因在于浏览器的单线程,它将GUI描绘，时间器处理，事件处理，JS执行，远程资源加载统统放在一起。当做某件事，只有将它做完才能做下一件事。如果有足够的时间，浏览器是会对我们的代码进行编译优化（JIT）及进行热代码优化，一些DOM操作，内部也会对reflow进行处理。reflow是一个性能黑洞，很可能让页面的大多数元素进行重新布局。

因为JSX是标签化的语言,所以在编译时需要递归执行, 这就得使用栈调度器, 虽然栈实现简单,但是也存在缺点,不能随意的break或者continue掉. 所以在16之后使用上了链表,好处在于断开后重连,不需要重新进入递归函数来获取上下文,变量对象.

在React15有虚拟DOM层，它只负责描述结构与逻辑;内部组件层，它们负责组件的更新, ReactDOM.render、 setState、 forceUpdate都是与它们打交道，能让你多次setState，只执行一次真实的渲染, 在适合的时机执行你的组件实例的生命周期钩子; 底层渲染层， 不同的显示介质有不同的渲染方法，比如说浏览器端，它使用元素节点，文本节点，在Native端，会调用oc， java的GUI， 在canvas中，有专门的API方法

在React16中将内部组件层改为Fiber这种数据结构，因此它的架构名也改叫Fiber架构。Fiber节点拥有return, child, sibling三个属性，分别对应父节点， 第一个孩子， 它右边的兄弟， 有了它们就足够将一棵树变成一个链表， 实现深度优化遍历.

React15中当发生setState时,就需要更新组件的整个子树, React16中呢首先将Vnode转换Fiber节点,之后在规定时间内, 尽可能多的更新FiberNode, 

#### 如何调度时间才能保证流畅

- requestAnimationFrame
- requestIdleCallback
- web worker
- IntersactionOberver

我们依次称为浏览器层面的帧数控制调用，闲时调用，多线程调用， 进入可视区调用。

> requestAnimationFrame在做动画时经常用到，jQuery新版本都使用它。web worker在angular2开始就释出一些包，实验性地用它进行diff数据。IntersectionObserver可以用到ListView中。而requestIdleCallback是一个生脸孔，而React官方恰恰看上它。

```js
function updateFiberAndView(dl) {
    updateView() //更新视图，这会耗时，因此需要check时间
    if (dl.timeRemaining() > 1) {
        var vdom = getVdomFormQueue()
        var fiber = vdom, firstFiber
        var hasVisited = {}
        do {//深度优先遍历
            var fiber = toFiber(fiber);//A处
            if(!firstFiber){
                fibstFiber = fiber
            }
            if (!hasVisited[fiber.uuid]) {
                hasVisited[fiber.uuid] = 1
                //根据fiber.type实例化组件或者创建真实DOM
                //这会耗时，因此需要check时间
                updateComponentOrElement(fiber);
                if (fiber.child) {
                    //向下转换
                     if (dl.timeRemaining() > 1) {
                        queue.push(fiber.child)//时间不够，放入栈
                        break
                    }
                    fiber = fiber.child;
                    continue  //让逻辑跑回A处，不断转换child, child.child, child.child.child
                }
            }
            //....略
        } while (1)
    }
    if (queue.length) {
        requetIdleCallback(updateFiberAndView, {
           timeout:new Date + 100
        }
      )
    }
}
```


#### 批量更新

```js
ReactDom.unstable_batchedUpdates
// 简单的实现为增加一个全局对象,控制是否可以更新view
```

React内部也大量使用batchedUpdates来优化用户代码，比如说在事件回调中setState，在commit阶段的钩子（componentDidXXX）中setState 。

可以说，setState是对单个组件的合并渲染，batchedUpdates是对多个组件的合并渲染。合并渲染是React最主要的优化手段。


#### 关于为什么要使用DFS

React通过Fiber将树的遍历变成了链表的遍历，在React16中实现了new Context API, 在15中需要维护一个`unmaskedContext`在不同组件中传递. 而在16中其实是维护了一个ContextStack, 开始时就push进一个空对象，到达某个组件需要实例化时，就取它第一个。当再次访问这个组件时， 就像它从栈中弹出。因此我们需要深度优先遍历，保证每点节点都访问两次。

![31](https://github.com/RogerZZZZZ/ARTS/raw/master/Week_2018-11-25/img/20.png)

但有一个问题，当第一次渲染完毕后，contextStack置为空了。然后我们位于虚拟DOM树的某个组件setState，这时它的context应该如何获取呢？React的解决方式是，每次都是从根开始渲染，通过updateQueue加速跳过没有更新的 节点——每个组件在setState或forceUpdate时，都会创建一个updateQueue属性在它的上面。


#### 任务系统

updateFiberAndView是位于一个requestIdleCallback中，因此它的时间很有限，分给DFS部分的时间也更少，因此它们不能做太多事情。这怎么办呢，标记一下，留给commit阶段做。于是产生了一个任务系统。

每个Fiber分配到新的任务时，就通过位操作，累加一个sideEffect。sideEffect字面上是副作用的意思，非常重FP流的味道，但我们理解为任务更方便我们的理解。

每个Fiber可能有多个任务，比如它要插入DOM或移动，就需要加上Replacement，需要设置样式，需要加上Update。

怎么添加任务呢？

```js
fiber.effectTag |= Update
```

怎么保证不会重复添加相同的任务？

```js
fiber.effectTag &= ~DidCapture;
```

在commit阶段，怎么知道它包含了某项任务？

```js
if(fiber.effectTag & Update){ /*操作属性*/}
```

> 此外，任务系统还有另一个存在意义，保证一些任务优先执行，某些任务是在另一些任务之前。我们称之为任务分拣。这就像快递的仓库管理一样，有了归类才好进行优化。比如说，元素虚拟DOM的插入移动操作必须在所有任务之前执行，移除操作必须在componentWillUnmount后执行。这些任务之所以是这个顺序，因为这样做才合理，都经过高手们的严密推敲，经过React15时代的大众验证。


#### Fiber的连体婴结构

Fiber有一个叫alternate的属性，你们称之为备胎，替死鬼，替身演员。你也可以视它为git的开发分支，稳定没错的那个则是master。每次 setState时，组件实例stateNode上有一个_reactInternalFiber的对象，就是master分支，然后立即复制一个一模一样的专门用来踩雷的alternate对象。

alternate对象会接受上方传递下来的新props，然后从getDerivedStateFromProps得到新state，于是render不一样的子组件，子组件再render，渐渐的，master与alternate的差异越来越大，当某一个子组件出错，于是我们又回滚到该边界组件的master分支。

[从错误边界到回滚到MWI](https://zhuanlan.zhihu.com/p/36476969)

## Tips

[Learn to combine RxJs sequences with super intuitive interactive diagrams](https://blog.angularindepth.com/learn-to-combine-rxjs-sequences-with-super-intuitive-interactive-diagrams-20fce8e6511)


> merge

![1](https://github.com/RogerZZZZZ/ARTS/raw/master/Week_2018-11-25/img/1.gif)


> concat

In the diagram below you can see the concat operator combining two streams A and B each producing 3 items and the values falling through to the resulting sequence first from the A and then from the B.

![2](https://github.com/RogerZZZZZ/ARTS/raw/master/Week_2018-11-25/img/2.gif)


> race

In the diagram below you can see the race operator combining two streams A and B each producing 3 items but only the values from the stream A are emitted since this stream starts emitting values first.

![3](https://github.com/RogerZZZZZ/ARTS/raw/master/Week_2018-11-25/img/3.gif)

> mergeAll

In the diagram below you can see the H higher-order stream that produces two inner streams A and B. The mergeAll operator combines values from these two streams and then passes them through to the resulting sequence as they occur.

![4](https://github.com/RogerZZZZZ/ARTS/raw/master/Week_2018-11-25/img/4.gif)

> concatAll

In the diagram below you can see the H higher-order stream that produces two inner streams A and B. The concatAll operator takes values from the A stream first and then from the stream B and passes them through the resulting sequence.

![5](https://github.com/RogerZZZZZ/ARTS/raw/master/Week_2018-11-25/img/5.gif)

> switchAll

In the diagram below you can see the H higher-order stream that produces two inner streams A and B. The switchAll operator takes values from the A stream first and then from the stream B and passes them through the resulting sequence.

![6](https://github.com/RogerZZZZZ/ARTS/raw/master/Week_2018-11-25/img/6.gif)

> concatMap, mergeMap and switchMap

Interestingly, the mapping operators concatMap, mergeMap and switchMap are used much more often than their counterparts concatAll, mergeAll and switchAll that operate on the stream of observables. Yet, if you think about it, they are almost the same thing. All *Map operators consist of two parts — producing a stream of observables through mapping and applying combination logic on the inner streams produced by this higher order observable.


```js
const a = stream('a', 200, 3);
const b = stream('b', 200, 3);
const h = interval(100).pipe(take(2), map(i => [a, b][i]));
h.pipe(mergeAll()).subscribe(fullObserver('mergeAll'));


const a = stream('a', 200, 3);
const b = stream('b', 200, 3);
const h = interval(100).pipe(take(2), mergeMap(i => [a, b][i]));

h.subscribe(fullObserver('mergeMap'));

// they are the same
```

> combineLatest

In the diagram below you can see the combineLatest operator combining two streams A and B. As soon as all streams have emitted at least one value each new emission produces a combined value through the result stream:

![7](https://github.com/RogerZZZZZ/ARTS/raw/master/Week_2018-11-25/img/7.gif)

> zip

In the diagram below you can see the zip operator combining two streams A and B. As soon as a corresponding pair is matched the resulting sequence produces a combined value:

![8](https://github.com/RogerZZZZZ/ARTS/raw/master/Week_2018-11-25/img/8.gif)

> forkJoin

In the diagram below you can see the forkJoin operator combining two streams A and B. As soon as a corresponding pair is matched the resulting sequence produces a combined value:

![9](https://github.com/RogerZZZZZ/ARTS/raw/master/Week_2018-11-25/img/9.gif)

> withLatestFrom

In the diagram below you can see the withLatestFrom operator combining two streams A and B with the stream B being the guiding stream. Every time the stream B emits a new value the resulting sequence produces a combined value using latest value from the stream A:

![10](https://github.com/RogerZZZZZ/ARTS/raw/master/Week_2018-11-25/img/10.gif)

## Share