# Week 2019-03-10

## Algorithm

[447] Number of Boomerangs

[448] Find All Numbers Disappeared in an Array

## Review

[React 源码分析 - render(2)](https://juejin.im/post/5ce21cfb6fb9a07eec599b9f)

- ReactRoot.prototype.render

我们知道多个`setState`一起执行，不会触发多次渲染，也就是`batchedUpdate`，对于root来说没有必要进行批量更新，所以调用`unbatchedUpdates`

```js
ReactRoot.prototype.render = function(
  children: ReactNodeList,
  callback: ?() => mixed,
): Work {
  // 这里指 FiberRoot
  const root = this._internalRoot;
  // ReactWork 的功能就是为了在组件渲染或更新后把所有传入
  // ReactDom.render 中的回调函数全部执行一遍
  const work = new ReactWork();
  callback = callback === undefined ? null : callback;
  if (__DEV__) {
    warnOnInvalidCallback(callback, 'render');
  }
  // 如果有 callback，就 push 进 work 中的数组
  if (callback !== null) {
    work.then(callback);
  }
  // work._onCommit 就是用于执行所有回调函数的
  updateContainer(children, root, null, work._onCommit);
  return work;
};
```

```js
export function updateContainer(
  element: ReactNodeList,
  container: OpaqueRoot,
  parentComponent: ?React$Component<any, any>,
  callback: ?Function,
): ExpirationTime {
  // 取出容器的 fiber 对象，也就是 fiber root
  const current = container.current;
  // 计算时间
  const currentTime = requestCurrentTime();
  // expirationTime 代表优先级，数字越大优先级越高
  // sync 的数字是最大的，所以优先级也是最高的
  const expirationTime = computeExpirationForFiber(currentTime, current);
  return updateContainerAtExpirationTime(
    element,
    container,
    parentComponent,
    expirationTime,
    callback,
  );
}
```

`expirationTime`指的就是一个任务的过期时间，React根据任务的优先级和当前时间计算出一个任务的执行截止时间，当这个值比当前时间大就可以让React延后这个任务的执行，以便让更高优先级的任务执行，但是一旦过了任务的截止时间，就必须让这个任务马上执行。简单来说`expirationTime`就是currentTime加上一个常量，常量的大小试优先级而定。

下面先计算currentTime

```js
// requestCurrentTime 函数内部计算时间的核心函数
function recomputeCurrentRendererTime() {
  // now() => performance.now()
  // originalStartTimeMs是应用开始时生成的一个变量，值也是performance.now()
  const currentTimeMs = now() - originalStartTimeMs
  currentRendererTime = msToExpirationTime(currentTimeMs)
}
```

```js
const UNIT_SIZE = 10
const MAGIC_NUMBER_OFFSET = 1073741823 - 1

export function msExpirationTime(ms: number): ExpirationTime {
  // | 0 是为了取整
  return MAGIC_NUMBER_OFFSET - ((ms / UNIT_SIZE) | 0)
}
```

接下来试计算expirationTime，这个时间和优先级有关，值越大，优先级越高，并且同步是优先级最高的，它的值为 1073741823，也就是之前我们看到的常量 MAGIC_NUMBER_OFFSET 加一。

```js
// computeExpirationForFiber函数中有很多分支
// 同步
expirationTime = Sync
// 交互事件，优先级较高
expirationTime = computeInteractiveExpiration(currentTime)
// 异步，优先级较低
expirationTime = computeAsyncExpiration(currentTime)
```

```js
// computeInteractiveExpiration

export const HIGH_PRIORITY_EXPIRATION = __DEV__ ? 500 : 150
export const HIGH_PRIORITY_BATCH_SIZE = 100

export function computeInteractiveExpiration(currentTime: ExpirationTime) {
  return computeExpirationBucket(
    currentTime,
    HIGH_PRIORITY_EXPIRATION,
    HIGH_PRIORITY_BATCH_SIZE
  )
}

function computeExpirationBucket(
  currentTime,
  expirationInMs,
  bucketSizeMs
) {
  return (
    MAGIC_NUMBER_OFFSET - 
    ceiling(
      MAGIC_NUMBER_OFFSET - currentTime + expirationInMs / UNIT_SIZE,
      bucketSizeMs / UNIT_SIZE,
    )
  )
}

function ceiling(num: number, precision: number): number {
  // 是为了抹平一段时间内的时间差，在抹平时间差内不管有多少个任务需要执行，他们的过期时间都是同一个，帮助渲染页面行为节流
  return (((num / precision) | 0) + 1) + precision
}
```

- scheduleRootUpdate

它是updateContainerAtExpirationTime的核心函数

```js
function sheduleRootUpdate(
  current: Fiber,
  element: ReactNodeList,
  expirationTime: ExpirationTime,
  callback: ?Function,
) {
  const update = createUpdate(expirationTime)
  update.payload = { element }

  callback = callback === undefined ? null : callback
  if (callback !== null) {
    // 这里的callback是ReactDom.render的第三个参数
    update.callback = callback
  }

  // 核心作用是创建或者获取一个队列，然后把update对象入队
  enqueueUdpate(current, update)
  // 调度相关内容
  scheduleWork(current, expirationTime)

  return expirationTime
}
```

update对象和`setState`息息相关

```js
udpate = {
  expirationTime: expirationTime,
  tag: UpdateState,

  // setState的第一二各参数
  payload: null,
  callback: null,

  // 用于队列中找到下一个节点
  next: null,
  nextEffect: null,
}
```

`update`其实是一个队列中的节点，next属性帮助我们找到下一个节点，对于批量更新来说，我们可能会创建多个update，因此我们需要将这些update串联存储蕲艾，在必要的时候拿出来用于更新state.

render过程中也是一次更新操作，但是我们没有`setState`，因此就把payload赋值为`{ element }`



## Tips

[10个Ajax同时发起请求，全部返回展示结果，并且至多允许三次失败]

```js
// 以下是不完整代码，着重于思路 非 Promise 写法
let successCount = 0
let errorCount = 0
let datas = []
ajax(url, (res) => {
     if (success) {
         success++
         if (success + errorCount === 10) {
             console.log(datas)
         } else {
             datas.push(res.data)
         }
     } else {
         errorCount++
         if (errorCount > 3) {
            // 失败次数大于3次就应该报错了
             throw Error('失败三次')
         }
     }
})
// Promise 写法
let errorCount = 0
let p = new Promise((resolve, reject) => {
    if (success) {
         resolve(res.data)
     } else {
         errorCount++
         if (errorCount > 3) {
            // 失败次数大于3次就应该报错了
            reject(error)
         } else {
             resolve(error)
         }
     }
})
Promise.all([p]).then(v => {
  console.log(v);
});
```

[基于Localstorage设计一个1M的缓存系统]

- 存储每个对象需要添加两个属性：过期时间和存储时间
- 利用一个属性保存系统中目前所占空间大小，每次存储都增加该属性。当大于1M时，则按时间排序删除一定量的数据保证能够存储下目前需要存储的数据
- 每次去数据时，需要判断过期时间，如果过期则删除

```js
class Store {
  constructor() {
    let store = localStorage.getItem('cache')
    if (!store) {
      store = {
        maxSize: 1024 * 1024,
        size: 0
      }
      this.store = store
    } else {
      this.store = JSON.parse(store)
    }
  }
  set(key, value, expire) {
    this.store[key] = {
      date: Date.now(),
      expire,
      value
    }
    let size = this.sizeOf(JSON.stringify(this.store[key]))
    if (this.store.maxSize < size + this.store.size) {
      console.log('超了-----------');
      var keys = Object.keys(this.store);
      // 时间排序
      keys = keys.sort((a, b) => {
        let item1 = this.store[a], item2 = this.store[b];
        return item2.date - item1.date;
      });
      while (size + this.store.size > this.store.maxSize) {
        let index = keys[keys.length - 1]
        this.store.size -= this.sizeOf(JSON.stringify(this.store[index]))
        delete this.store[index]
      }
    }
    this.store.size += size

    localStorage.setItem('cache', JSON.stringify(this.store))
  }
  get(key) {
    let d = this.store[key]
    if (!d) {
      console.log('找不到该属性');
      return
    }
    if (d.expire > Date.now) {
      console.log('过期删除');
      delete this.store[key]
      localStorage.setItem('cache', JSON.stringify(this.store))
    } else {
      return d.value
    }
  }
  sizeOf(str, charset) {
    var total = 0,
      charCode,
      i,
      len;
    charset = charset ? charset.toLowerCase() : '';
    if (charset === 'utf-16' || charset === 'utf16') {
      for (i = 0, len = str.length; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode <= 0xffff) {
          total += 2;
        } else {
          total += 4;
        }
      }
    } else {
      for (i = 0, len = str.length; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode <= 0x007f) {
          total += 1;
        } else if (charCode <= 0x07ff) {
          total += 2;
        } else if (charCode <= 0xffff) {
          total += 3;
        } else {
          total += 4;
        }
      }
    }
    return total;
  }
}
```

## Share