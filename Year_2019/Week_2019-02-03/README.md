# Week 2019-02-03

## Algorithm

## Review

## Tips

[typescript handbook]

> 泛型

在泛型里使用类类型

```ts
function create<T>(c: {new(): T}): T {
  return new c()
}
```

```ts
class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!
```

> 枚举

- 数字枚举

```ts
enum Direction {
  UP = 1,
  DOWN,
  LEFT,
  RIGHT
}

// 默认开始值为1
```

- 字符串枚举

```ts
enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}
```

- 反向映射

```ts
enum Enum {
  A
}

let a = Enum.A
let nameOfA = Enum[a]
```

```js
// 生成的js代码
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
})(Enum || (Enum = {}));
var a = Enum.A;
var nameOfA = Enum[a]; // "A"
```

**需要注意的是不会为字符串枚举成员生成反向映射**

> 类型兼容性

- 比较两个函数

```ts
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error
```

> 高级类型

- 交叉类型(Intersection Types)

同事拥有几种类型的成员

```ts
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}

class Person {
    constructor(public name: string) { }
}
interface Loggable {
    log(): void;
}
class ConsoleLogger implements Loggable {
    log() {
        // ...
    }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();
```

- 类型保护与区分类型(Type Guards and Differentiating Types)

1. 第一种方式是使用断言

```ts
let pet = getSmallPet();

if ((<Fish>pet).swim) {
    (<Fish>pet).swim();
}
else {
    (<Bird>pet).fly();
}
```

2. 第二种方式是用户自定义类型保护

```ts
function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}
```

3. 使用typeof(ts已经将typeof识别为一种类型保护)

4. instanceof类型保护

- 类型别名

与交叉类型一起使用

```ts
type LinkedList<T> = T & { next: LinkedList<T> }

interface Person {
  name: string
}

let people: LinkedList<Person>
var s = people.name;
var s = people.next.name;
var s = people.next.next.name;
var s = people.next.next.next.name;
```



## Share