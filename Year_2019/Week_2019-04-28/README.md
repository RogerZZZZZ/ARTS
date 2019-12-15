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

 下面对每个类型进行详细介绍：

1.1 可写流

从可写流中读取数据有两种形式，流动模式以及非流动模式。首先我们需要知道的一点是，资源的数据挺不是直接流向消费者的，而是先被push到一个缓存池中。

虽然说从可读流中读取数据的默认方式都是添加一个对于readable的监听器，但是在非流动模式情况下，需要消费者手动去调用`readable.read([size])`来拉取数据。

[pic 1]

```js
process.stdin
  .on('readable', () => {
    let chunk
    console.log('New Data is available')
    while((chunk = process.stdin.read()) !== null) {
      console.log(`Chunk read: ${chunk.length} ${chunk.toString()}`)
    }
  })
  .on('end', () => process.stdout.write('End of stream'))
```

我们还需要注意的是水位标记`highWatermark`, 当缓存池的数据量大于这个阈值时，将无法再push数据到池中，有什么情况会导致这样的情况呢：
- 消费者主动执行了`pause()`
- 消费速度低于数据进入缓存池的速度

而对于流动模式来说，只要流中的数据可读，便会立刻被推送到data事件的监听器

[pic 2]

```js
process.stdin
  .on('data', chunk => {
    console.log('New data available')
    console.log(`Chunk read: ${chunk.length} ${chunk.toString()}`)
  })
  .on('end', () => process.stdout.write('End of stream'))
```

1.2 可写流

[pic 3]

```js
writable.write(chunk, [encoding], [callback])

writable.end([chunk], [encoding], [callback])
```

当数据过来的时候，会直接写入到资源池，当写入速度比较缓慢或者写入暂停时，数据流会进入对列池缓存起来，当生产者写入速度过快把队列池装满以后，就会出现`背压`。当缓存被清空以后，会触发`drain`事件告诉生产者现在已经安全了。

```js
function writeOneMillionTimes(writer, data, encoding, callback) {
  let i = 10000;
  write();
  function write() {
    let ok = true;
    while(i-- > 0 && ok) {
      // 写入结束时回调
      if(i===0){
          writer.write(data, encoding, callback)//当最后一次写入数据即将结束时，再调用callback
      }else{
          ok = writer.write(data, encoding)// 写数据还没有结束，不能调用callback，这里可能会返回false，代表背压出现
      }
     
    }
    if (i > 0) {
      // 这里提前停下了，'drain' 事件触发后才可以继续写入  
      console.log('drain', i);
      writer.once('drain', write);
    }
  }
}
```

1.3 双向流

双向流有非常广泛的引用，比如说套接字Socket。双向流同时继承了stream.Readable以及stream.Writable，所以这并不是一个全新的概念，在调用构造函数传入的options对象会被同时传入到可写流和可读流的构造函数中，与之前两个唯一不同的是增加了一个新的配置选项,`allowHalfOpen(默认为true)`，若被设置为false，只要读或者写一方停止，整个流将会停止。


1.4 变换流

变换流其实是双向流的一个扩展，但是不同的是需要实现其他两个接口， _transform(chunk, encoding, callback)以及_flush(callback)，下面有一个简单的例子

```js
class ReplaceStream extends stream.Transform {
  constructor(searchString, replaceString) {
    this.searchString = searchString
    this.replaceString = replaceString
    this.tailPiece = ''
  }

  // 并不是将数据直接写到资源中，而是借助.push方法推送到缓存中
  _transform(chunk, encoding, callback) {
    const pieces = (this.tailPiece + chunk).split(this.searchString)
    const lastPiece = pieces[pieces.length - 1]
    const tailPieceLen = this.searchString.length - 1

    this.tailPiece = lastPiece.slice(-tailPieceLen)
    pieces[pieces.length - 1] = lastPiece.slice(0, -tailPieceLen)

    this.push(pieces.join(this.replaceString))
    callback()
  }

  // 保证所有操作完成之后调用它
  _flush(callback) {
    this.push(this.tailPiece)
    callback()
  }
}
```

2. 管道模式

管道允许一个程序的输出被连接起来，作为下一个程序的输入。

```js
readable.pipe(writable, [options])
```

例如我们使用上面的替换字符串的transform流

```js
process.stdin
  .pipe(new ReplaceStream(process.argv[2], process.argv[3]))
  .pipe(process.stdout)
```

或者是使用`stream.pipeline(...streams, callback)`

```js
const { pipeline } = require('stream')
const fs = require('fs');
const zlib = require('zlib');

// 使用 pipeline API 轻松地将一系列的流通过管道一起传送，并在管道完全地完成时获得通知。
// 使用 pipeline 可以有效地压缩一个可能很大的 tar 文件：
pipeline(
  fs.createReadStream('archive.tar'),
  zlib.createGzip(),
  fs.createWriteStream('archive.tar.gz'),
  (err) => {
    if (err) {
      console.error('管道传送失败', err);
    } else {
      console.log('管道传送成功');
    }
  }
);
```

3. 错误处理

1. `stream.finished(stream[, options], callback)`

options:
- error <boolean> 如果设置为 false，则对 emit('error', err) 的调用不会被视为已完成。 默认值: true。
- readable <boolean> 当设置为 false 时，即使流可能仍然可读，当流结束时也将会调用回调。默认值: true。
- writable <boolean> 当设置为 false 时，即使流可能仍然可写，当流结束时也将会调用回调。默认值: true。

当流不再可读，可写，或遇到错误，或过早关闭事件时，则该函数会获得通知。

```js
const { finished } = require('stream');

const rs = fs.createReadStream('archive.tar');

finished(rs, (err) => {
  if (err) {
    console.error('流读取失败', err);
  } else {
    console.log('流已完成读取');
  }
});

rs.resume(); // 排空流。
```


2. error事件不会在管道中自动传递

```js
stream1
  .pipe(stream2)
  .on('error', function() {})
```

上面的例子中，只能捕捉到stream2的错误，如果想对stream1进行错误监听，则需要对其添加错误监听器。

解决的方法有使用组合流。

```js
const zlib = require('zlib')
const crypto = require('crypto')
const combine = require('multipipe')

combine(
  fs.createReadStream(process.argv[3])
    .pipe(.....)
    .pipe(....)
).on('error', function() {})
```

## Share