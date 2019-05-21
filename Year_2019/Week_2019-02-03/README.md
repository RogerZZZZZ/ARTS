# Week 2019-02-03

## Algorithm

## Review

[What's new in Javascript (Google I/O 2019)](https://www.youtube.com/watch?v=c0oy0vQKEZE)

1. private property

```js
class IncreasingCounter {
  #count = 0
  get value() {
    return this.#count
  }

  increment() {
    this.#count++
  }
}
```

2. BigInt

```js
12345678901234567890n.toLocaleString('en')
// -> 12,345,678,901,234,567,890

1234567890123456789n * 123n
```

3. flat / flatMap

4. Object.fromEntries

5. globalThis variable

can help you to get the current global `this` no matter you in browser, node or modules

6. Intl.RelativeTimeFormat

```js
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

rtf.format(-1, 'day')
// -> yesterday

rtf.format(0, 'day')
// -> tody

rtf.format(1, 'week')
// -> next week
```

7. Intl.ListFormat

```js
const lfEnglish = new Intl.ListFormat('en', { type: 'disjunction' })

lfEnglish.format(['Ada', 'Grace'])
// -> Ada or Grace

lfEnglish.format(['Ada', 'Grace', 'Ida'])
// -> Ada, Grace, or Ida

```

8. Intl.DateTimeFormat

```js
const fmt = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

const output = fmt.formatRange(start, end)
// -> May 7 - 9, 2019
```

9. can use `await` in top-level

10. Promise.allSettled

give the signal when all promise are done, despite of the states of them

11. Promise.any

Any of the promises was fulfilled. Not like the Promise.race, will return the reject case.

12. WeakRef

```js
// the reason does not use weakMap is that the key is string
const cache = new Map()
function getImageCached(name) {
  let ref = cache.get(name)
  if (ref !== undefined) {
    let deref = ref.deref()
    if (deref !== undefined) return deref
  }
  const image = performExpensiveOperation(name)
  ref = new WeakRef(image)
  cache.set(name, ref)
  finializationGroup.register(image, name)
  return image
}

// because the key will not be garbage-collected
const finalizationGroup = new FinalizationGroup((iterator) => {
  for (const name of iterator) {
    const ref = cache.get(name)
    if (ref !== undefined && ref.deref === undefined) {
      cache.delete(name)
    }
  }
})
```

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