# Week 2019-02-10

## Algorithm

## Review

## Tips

[typescript handbook]

- 可辨别联合 (Discriminated Unions)

```ts
type Shape = Square | Rectangle | Circle | Triangle;
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
    // should error here - we didn't handle case "triangle"
}

// 如何保证覆盖了所有Shape的类型 ??

// 方法一:
function area(s: Shape): number { // error: returns number | undefined
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}

// 方法二: 使用never
function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
        default: return assertNever(s); // error here if there are missing cases
    }
}
```

- 索引类型 (Index Types)

```ts
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[m])
}

interface Person {
  name: string
  age: number
}

let person: Person = {
  name: 'Roger',
  age: 25,
}

let strings: string[] = pluck(person, ['name])
```

- 映射类型

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

type Partial<T> = {
  [P in keyof T]?: T[P]
}

type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
```

- 预定义的有条件类型

1. Exclude<T, U> -- 从T中剔除可以赋值给U的类型。
2. Extract<T, U> -- 提取T中可以赋值给U的类型。
3. NonNullable<T> -- 从T中剔除null和undefined。
4. ReturnType<T> -- 获取函数返回值类型。
5. InstanceType<T> -- 获取构造函数类型的实例类型。

```ts
type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"

type T02 = Exclude<string | number | (() => void), Function>;  // string | number
type T03 = Extract<string | number | (() => void), Function>;  // () => void

type T04 = NonNullable<string | number | undefined>;  // string | number
type T05 = NonNullable<(() => string) | string[] | null | undefined>;  // (() => string) | string[]

function f1(s: string) {
    return { a: 1, b: s };
}

class C {
    x = 0;
    y = 0;
}

type T10 = ReturnType<() => string>;  // string
type T11 = ReturnType<(s: string) => void>;  // void
type T12 = ReturnType<(<T>() => T)>;  // {}
type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]
type T14 = ReturnType<typeof f1>;  // { a: number, b: string }
type T15 = ReturnType<any>;  // any
type T16 = ReturnType<never>;  // any
type T17 = ReturnType<string>;  // Error
type T18 = ReturnType<Function>;  // Error

type T20 = InstanceType<typeof C>;  // C
type T21 = InstanceType<any>;  // any
type T22 = InstanceType<never>;  // any
type T23 = InstanceType<string>;  // Error
type T24 = InstanceType<Function>;  // Error
```

- 迭代器和生成器

```ts
let pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals";

for (let pet in pets) { // for...in 遍历属性
    console.log(pet); // "species"
}

for (let pet of pets) { // for...of 遍历值
    console.log(pet); // "Cat", "Dog", "Hamster"
}
```

- `export =` & `import = require()` 

为了支持CommonJS的exports，typescript提供了export = 的语法
> 若使用`export = `导出一个模块，则必须使用typescript的特定语法`import module = require('module')`

## Share