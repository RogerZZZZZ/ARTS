# Week 2019-04-07

## Algorithm

## Review

[Dart语法预览 2](http://dart.goodev.org/guides/language/language-tour)

> Constructor

```dart
class Point {
  num x;
  num y;

  Point(this.x, this.y)
}
```

- Redirecting constructors

```dart
// 使用冒号调用其他构造函数
class Point {
  num x;
  num y;

  // The main constructor for this class.
  Point(this.x, this.y);

  // Delegates to the main constructor.
  Point.alongXAxis(num x) : this(x, 0);
}
```

- Factory constructors

```dart
class Logger {
  final String name;
  bool mute = false;

  // _cache is library-private, thanks to the _ in front
  // of its name.
  static final Map<String, Logger> _cache =
      <String, Logger>{};

  factory Logger(String name) {
    if (_cache.containsKey(name)) {
      return _cache[name];
    } else {
      final logger = new Logger._internal(name);
      _cache[name] = logger;
      return logger;
    }
  }

  Logger._internal(this.name);

  void log(String msg) {
    if (!mute) {
      print(msg);
    }
  }
}
```

> getter and setter

```dart
class Rectangle {
  num left;
  num top;
  num width;
  num height;

  Rectangle(this.left, this.top, this.width, this.height);

  // Define two calculated properties: right and bottom.
  num get right             => left + width;
      set right(num value)  => left = value - width;
  num get bottom            => top + height;
      set bottom(num value) => top = value - height;
}
```


> Overridable operators

可以定义两个类之间的操作符操作逻辑,可以定义的操作符有: `<, +, -, |, [], >, /, ^, *`等等等

```dart
class Vector {
  final int x;
  final int y;
  const Vector(this.x, this.y);

  /// Overrides + (a + b).
  Vector operator +(Vector v) {
    return new Vector(x + v.x, y + v.y);
  }

  /// Overrides - (a - b).
  Vector operator -(Vector v) {
    return new Vector(x - v.x, y - v.y);
  }
}

main() {
  final v = new Vector(2, 3);
  final w = new Vector(2, 2);

  // v == (2, 3)
  assert(v.x == 2 && v.y == 3);

  // v + w == (4, 5)
  assert((v + w).x == 4 && (v + w).y == 5);

  // v - w == (0, 1)
  assert((v - w).x == 0 && (v - w).y == 1);
}
```

> Enumerated types

```dart
enum Color {
  red,
  green,
  blue
}

assert(Color.red.index == 0)
```

> Adding features to class: mixins

Mixins是一种在多类继承中重用一个类代码的方法,使用`with`关键字后面为一个或者多个mixins名字来使用mixins

```dart
class Musician extends Performer with Musical {
  // ...
}

class Maestro extends Person
    with Musical, Aggressive, Demented {
  Maestro(String maestroName) {
    name = maestroName;
    canConduct = true;
  }
}

// Mixins 可以继承其他类，不再限制为继承 Object
// Mixins 可以调用 super()。
```

## Tips

[React源码解析(四):事件系统](https://juejin.im/post/5a0cf54ff265da43333df2c4)



## Share