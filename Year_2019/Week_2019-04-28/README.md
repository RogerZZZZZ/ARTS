# Week 2019-04-28

## Algorithm

[530] Minimum Absolute Difference in BST

[532] K-diff Pairs in an Array

## Tips

[Nodejs 流编程入门]

Nodejs区别于传统的应用有一个重要的特点就是非阻塞I/O, 而实现这一重要特性的正是nodejs的事件机制. 目前作为nodejs重要模块之一的Stream正是继承于EventEmitter.

第一次接触到流的概念是在使用gulp的时候, 两个字优雅, 可以清楚的看出每个task的功能以及其工作的流程.

```js
// 一个简单的gulp🌰
const { src, dest } = require('gulp');
const babel = require('gulp-babel');

exports.default = function() {
  return src('src/*.js')
    .pipe(babel())
    .pipe(dest('output/'));
}
```

那Stream相比于通常的编程范式, 一次接收所有数据缓存进内存中, 最后一次性处理的优势就在于流机制可以边接收数据边处理数据, 也使得我们能有更加高效且实时的IO操作.


1. 流的类型

Nodejs中有四种基本的流类型:

Writable Streams: 可写入数据的流 (`fs.createWriteStream()`) 
Readable Streams: 可读数据的流 (`fs.createReadStream()`)
Duplex Streams: 可读可写的流 (`net.socket`)
Transform Streams: 在读写过程中可以修改和做转换的流 (`比如在传输数据之前做压缩的操作`)



## Share