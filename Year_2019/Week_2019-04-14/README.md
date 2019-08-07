# Week 2019-04-14

## Algorithm

## Review

[Dart语法预览 3](http://dart.goodev.org/guides/language/language-tour)


> Libraries and visibility

import 必须参数为库 的 URI。 对于内置的库，URI 使用特殊的 dart: scheme。

```dart
import 'dart:io';
import 'package:mylib/mylib.dart';
```

- Importing only part of a library

```dart
// Import only foo.
import 'package:lib1/lib1.dart' show foo;

// Import all names EXCEPT foo.
import 'package:lib2/lib2.dart' hide foo;
```

- Lazily loading a library

```dart
import 'package:deferred/hello.dart' deferred as hello;

greet() async {
  await hello.loadLibrary();
  hello.printGreeting();
}

// 调用是可以使用await
```

> Asynchrony support

有两种方式可以使用 Future 对象中的 数据：
- 使用 async 和 await
- 使用 Future API (类似promise)

同样，从 Stream 中获取数据也有两种 方式：
- 使用 async 和一个 异步 for 循环 (await for)
- 使用 Stream API


> Using asynchronous for loops with Streams

```dart
await for (variable declaration in expression) {
  // Executes each time the stream emits a value.
}
```

上面 expression 返回的值必须是 Stream 类型的。 执行流程如下：

- 等待直到 stream 返回一个数据
- 使用 stream 返回的参数 执行 for 循环代码，
- 重复执行 1 和 2 直到 stream 数据返回完毕。
- 使用 break 或者 return 语句可以 停止接收 stream 的数据， 这样就跳出了 for 循环并且 从 stream 上取消注册了。


> Metadata

```dart
library todo;

class todo {
  final String who;
  final String what;

  const todo(this.who, this.what);
}
```

```dart
import 'todo.dart';

@todo('seth', 'make this do something')
void doSomething() {
  print('do something');
}
```

元数据可以在 library、 class、 typedef、 type parameter、 constructor、 factory、 function、 field、 parameter、或者 variable 声明之前使用，也可以在 import 或者 export 指令之前使用。 使用反射可以在运行时获取元数据 信息。


## Tips

## Share