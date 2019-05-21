# Week 2019-01-27

## Algorithm

## Review

[A Cartoon Intro to Fiber](https://www.youtube.com/watch?v=ZCuYPiUIONs)

Fiber是一个新的reconciliation algorithm，防止阻塞主线程

其中有几个重要的phases

1. render/reconciliation

- build fiber tree, work-in-prograss tree.
- list changes, but does not make the change

> could be interrupted by main thread to do other things else

2. commit

- make changes to the dom

> could not be interrupted


react又是如何知道什么时候main thread有时间处理update，有多长时间可以使用的呢，答案是`requestIdleCallback`

> work loop (cooperation scheduling)

- next unit of work
- time remaining


> Priorities

- Synchronous // same as stack rec.
- Task // before next tick
- Animation // before next frame
- High
- Low
- Offscreen // like hidden

## Tips

[typescript handbook]

interface和type的区别

- interface创建了一种新的类型，type仅仅是别名，是一种引用
- 如果type使用了`union |` 操作符，则不能将type implements到class上
- 如果type使用`union |`财政以反映，则不能被用以extends interface
- type不能像interface那样合并，骑在作用域内唯一

```js
interface Person {
  name: string;
  age: number;
}

type PartialPerson = { [P in keyof Person]?: Person[P] }

// <===>

type PartialPerson = Partial<Person>
```

- Tuple

```js
let x: [string, number]
x = ['Hello', 1000]
```

- never

表示永不存在的值的类型。例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。

- 类型断言

```js
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length
// <===>
let strLength: number = (<string>someValue).length;
```

- interface可以带有任意数量的其它属性

```js
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
```

- 定义函数类型

```js
interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc = function(source: string, subString: string) {
  // ....
  return false
}
```

- 可索引的类型

```js
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ['Bob', 'Fred']
```

- 定义构造器的接口

```js
interface ClockConstructor {
  new (hour: number, minute: number)
}

class Clock implements ClockConstructor {
  currentTime: Date;
  constructor(h: number, m: number) { }
}
```

```ts
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}

let digital = createClock(DigitalClock, 12, 17);
```

- 混合类型

```ts
interface Counter {
  (start: number): string
  interval: number
  reset(): void
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) { }
  counter:interval = 123
  counter.reset = function () { }
}

let c = getCounter()
c(10)
c.reset()
c.interval = 5.0
```

- private/protected

如果其中一个类型里包含一个 private成员，那么只有当另外一个类型中也存在这样一个 private成员， 并且它们都是来自同一处声明时，我们才认为这两个类型是兼容的。 对于 protected成员也使用这个规则。

```ts
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

class Rhino extends Animal {
    constructor() { super("Rhino"); }
}

class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
animal = employee; // 错误: Animal 与 Employee 不兼容.
```

- 理解protected

protected修饰符与 private修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问。

```ts
class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name)
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // 错误
```

- readonly 修饰符

`readonly`关键字将属性设置为只读的，只读属性必须在声明时或构造函数里被初始化

## Share

[为什么专家不再关心技术细节](https://github.com/dt-fe/weekly/blob/v2/103.%E7%B2%BE%E8%AF%BB%E3%80%8A%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%93%E5%AE%B6%E4%B8%8D%E5%86%8D%E5%85%B3%E5%BF%83%E6%8A%80%E6%9C%AF%E7%BB%86%E8%8A%82%E3%80%8B.md)

- 只有技术无法成为专家，视野同样重要
- 技术最终为业务服务，懂技术细节和让业务先赢没有必然的关系，所以在深入技术细节之前，要先理解业务，把握方向，防止技术细节出现路线问题。