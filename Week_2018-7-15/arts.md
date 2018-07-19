# Week 2018-7-15
## Algorithm
`Question`: Given a non-empty string check if it can be constructed by taking a substring of it and appending multiple copies of the substring together. You may assume the given string consists of lowercase English letters only and its length will not exceed 10000.

```
Example:
Input: "abab"

Output: True

Explanation: It's the substring "ab" twice.
```

### Solution

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function(s) {
    let length = s.length
    if (length < 2) return false
    for (let i = 1; i <= length/2; i++) {
        if (length % i === 0) {
            let j = i
            while(j < length && s[j] === s[j % i]) {
                j++
            }
            if (j === length) return true
        }
    }
    return false
};
```

## Review
### Topic
[Facebook Cache Strategy](https://medium.com/@shagun/scaling-memcache-at-facebook-1ba77d71c082)

### Related Paper
[Scaling Memcache in Facebook](http://www.cs.utah.edu/~stutsman/cs6963/public/papers/memcached.pdf)

## Tips
### Topic
[Apollo Client Cache Policies](https://quip.com/BxU7A5nRM4JW)

### Content
In Order to make Apollo Clinet more suitable for apps that want to show data while offline.

And when user use Apollo, it provides `fetchPolicy` and `cachePolicy` to optimize.

**fetchPolicy**

* `cache-first`
    * look up from cache
    * if cached result fould. use it
    * Else fetch from network
    * If network result successds, cache it (If `cachePolicy` is not `no-cache`) and use it
    * Else fail

* `cache-only`
    * Look up from cache
    * If cached result found, use it
    * Else fail

* `network-first`
    * Fetch from network
    * If network result succeeds, cache it (if cachePolicy is not no-cache) and use it
    * Else look up from cache
    * If cached result found, use it (reporting network failure)
    * Else fail

* `network-only`
    * Fetch from network
    * If network result succeeds, cache it (if cachePolicy is not no-cache) and use it
    * Else fail

* `cache-and-network`
    * Look up from cache
    * If cached result found, use it
    * Fetch from network (technically in parallel with cache lookup)
    * If network result succeeds, cache it (if cachePolicy is not no-cache) and use it
    * Else if cached result already being used, report network failure
    * Else fail


**cachePolicy**

There are three `cachePolicy` options:
* `no-cache`: the query result is not stored in the cache.
* `normal (as default)`: the query result is stored in the cache indefinitely, but can be evicted if the cache grows beyond a certain size threshold.
* `offline-critical`: the query result is stored in the cache indefinitely, and is not evicted at the normal threshold cache size. It is only evicted when the cache reaches a system resource-determined threshold, and only after all the data stored with the `normal cachePolicy` is evicted.

**Best Practise**

In an environment where cache data persists for a very long time, it's important that query results be kept up-to-date somehow. Notably, this proposal does **not** introduce the notion of cache expiration for that purpose (though it was heavily considered). We also don't recommend polling as a general go-to strategy (although certainly it has its uses).

* **In most cases when a new view is displayed, use cache-and-network.** Display cached data right away, along with a subtle non-intrusive loading indicator while the network request is going. Replace the cached data with the fresh data when it arrives. If the network request fails, continue displaying the cached data along with an offline warning, such as a banner.

* **In cases where you really want to avoid displaying potentially-misleading cached data when a new view is displayed, use network-first.** Display a loading indicator while the network request is outbound. Replace the loading indicator with your fresh content when it arrives. If the network request fails, then display the cached content along with an offline warning, such as a banner. 

* **In the network-first scenario, if some “preview” subset of your cached data can safely be used initially, query for just that subset using** `cache-only`.


**About `cache-and-network`**

Here is an example:
```javascript
job: {
      query: gql`
          query ($jobId: ID!){
            jobInfo(id: $jobId){
                jobName
            }
          }`,
      variables () {
        return {
          jobId: this.jobId,
        }
      },
      fetchPolicy: 'cache-and-network',
      result (result) {
      },
    }
```
If you use `cache-and-network`. It will call result function twice. But the `result data is totally different`. First is from `cache`, the other is `network`. And the `networkStatus` is `1` and `7`, respectively.

There is an attribute named `networkStatus`:
- `1: loading`: The query has never been run before and the request is now pending. A query will still have this network status even if a result was returned from the cache, but a query was dispatched anyway.
- `2. setVariables`: If a query’s variables change and a network request was fired then the network status will be setVariables until the result of that query comes back. React users will see this when options.variables changes on their queries.
- `3. fetchMore`: Indicates that fetchMore was called on this query and that the network request created is currently in flight.
- `4. refetch`: It means that refetch was called on a query and the refetch request is currently in flight.
- `5. Unused.`
- `6. poll`: Indicates that a polling query is currently in flight. So for example if you are polling a query every 10 seconds then the network status will switch to poll every 10 seconds whenever a poll request has been sent but not resolved.
- `7. ready`: No request is in flight for this query, and no errors happened. Everything is OK.
- `8. error`: No request is in flight for this query, but one or more errors were detected.

## Share
### About Front-end Modularization
[前端模块化开发那点历史](https://github.com/seajs/seajs/issues/588)

**AMD**
- 依赖前置
- 主函数的执行在所有依赖调用之后
- 异步加载
- 加载依赖即执行依赖

```javascript
define(
    //The name of this module
    "types/Manager",

    //The array of dependencies
    ["types/Employee"],

    //The function to execute when all dependencies have loaded. The
    //arguments to this function are the array of dependencies mentioned
    //above.
    function (Employee) {
        function Manager () {
            this.reports = [];
        }

        //This will now work
        Manager.prototype = new Employee();

        //return the Manager constructor function so it can be used by
        //other modules.
        return Manager;
    }
);
```

弊端
- 依赖提前声明在代码书写上不是那么友好
- 模块内部与 NodeJS 的 Modules 有一定的差异 (关于第二点的问题需要特别说明下。其实无论是 CMD 还是 AMD 的异步模块，都无法与同步模块规范保持一致（NodeJS 的 Modules），只有谁比谁更像同步模块而已。AMD 要转换为同步模块，除了去掉define函数的包裹外，只需要在头部使用require把依赖声明好，而 CMD 只需要去掉define函数的包裹即可。)


**CMD**
- 依赖就近
- 异步加载
- require处才执行依赖

```javascript
define(function(require, exports, module) {
  var a = require('a')
  var b = require('b')
  // do sth
  ...
})
```

弊端
- 不能直接压缩：`require`是局部变量，意味着不能直接的通过压缩工具进行压缩，若`require`这个变量被替换，加载器与自动化工具将无法获取模块的依赖。

解决方案
```javascript
define(['a', 'b'], function(require, exports, module) {
   // ...
})
```

**ES Modules**

[A cartoon deep-live](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
