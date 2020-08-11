# Week 2019-04-21

## Algorithm

[520] Detect Capital
[521] Longest Uncommon Subsequence I 

## Review

[Effective Dart](http://dart.goodev.org/guides/language/effective-dart/usage#do-place-the-super-call-last-in-a-constructor-initialization-list)

> 不要使用`.length`来判断集合是否为空

```dart
if (lunchBox.isEmpty) return 'so hungry...';
if (words.isNotEmpty) return words.join(' ');
```

> 要用方法声明的形式来给方法起个名字

```dart
void main() {
  localFunction() {
    ...
  }
}
// 而不是 var localFunction = () {}
```

> 避免保存可以计算的结果

```dart
class Circle {
  num radius;
  num area;
  num circumference;

  Circle(num radius)
      : radius = radius,
        area = math.PI * radius * radius,
        circumference = math.PI * 2.0 * radius;
}
```
上面代码的问题是,area和circumference都是可以计算出的, 没有必要将其保存在内存中,因为radius也有可能会修改,好的做法如下:

#如果父类不显示提供无名无参的构造函数，在子类中必须手动调用父类的一个构造函数。这种情况下，调用父类的构造函数的代码放在子类构造函数名后，子类构造函数体前，中间使用 : 分隔#

```dart
class Circle {
  num radius;

  num get area => math.PI * radius * radius;
  num get circumference => math.PI * 2.0 * radius;

  Circle(this.radius);
}
```

> 要用`;`来代替空函数体的构造函数`{}`

```dart
class Point {
  int x, y;
  Point(this.x, this.y);
}
```

> 要把`super()`调用放到构造函数初始化列表之后调用。

```dart
View(Style style, List children)
    : _children = children,
      super(style);
```

> 避免直接使用`Completer`

```dart
Future<bool> fileContainsBear(String path) {
  var completer = new Completer<bool>();

  new File(path).readAsString().then((contents) {
    completer.complete(contents.contains('bear'));
  });

  return completer.future;
}

// much better =======>
Future<bool> fileContainsBear(String path) {
  return new File(path).readAsString().then((contents) {
    return contents.contains('bear');
  });
}
```

> 避免使用`Function`类型

```dart
bool isValidString(String value, Function predicate) { ... }

// ======>
bool isValidString(String value, bool predicate(String string)) { ... }
```

## Tips

## Share