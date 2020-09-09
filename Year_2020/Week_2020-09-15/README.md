# Week 2020-09-15

## Algorithm

## Tips

[TypeScript泛型及应用](https://mp.weixin.qq.com/s/whjL0P0CqOUdAXyEu6_jWw)

> 泛型是什么

```js
function identity <T>(value: T) : T {
  return value;
}

console.log(identity<Number>(1)) // 1
```

- `T`: 代表Type
- `K(Key)`: 表示对象中的键类型
- `V(Value)`: 表示对象中的值类型
- `E(element)`: 表示元素类型

> 泛型接口

```js
interface Identities<V, M> {
  value: V,
  message: M
}
```

> 泛型类

```js
interface GenericInterface<U> {
  value: U
  getIdentity: () => U
}

class IdentityClass<T> implements GenericInterface<T> {
  value: T

  constructor(value: T) {
    this.value = value
  }

  getIdentity(): T {
    return this.value
  }

}

const myNumberClass = new IdentityClass<Number>(68);
console.log(myNumberClass.getIdentity()); // 68

const myStringClass = new IdentityClass<string>("Semlinker!");
console.log(myStringClass.getIdentity()); // Semlinker!
```

> 泛型约束

1. 确保属性存在

```js
function identity<T>(arg: T): T {
  console.log(arg.length); // Error
  return arg;
}

// 正确写法
interface Length {
  length: number;
}

function identity<T extends Length>(arg: T): T {
  console.log(arg.length); // 可以获取length属性
  return arg;
}
```

2. 检查对象上的键是否存在

`keyof`用于获取某种类型的所有键, 其返回类型是联合类型

```js
// K extends keyof T 确保参数 key 一定是对象中含有的键
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

> 泛型参数默认类型

```ts
interface A<T=string> {
  name: T;
}

const strA: A = { name: "Semlinker" };
const numB: A<number> = { name: 101 };
```

> 泛型条件类型

```ts
T extends U ? X : Y
```

```ts
interface Dictionary<T = any> {
  [key: string]: T;
}
 
type StrDict = Dictionary<string>

// infer实现类型抽取
type DictMember<T> = T extends Dictionary<infer V> ? V : never
type StrDictMember = DictMember<StrDict> // string
```

> 泛型工具类型

1. Partial

```ts
/**
 * node_modules/typescript/lib/lib.es5.d.ts
 * Make all properties in T optional
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};

interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: "organize desk",
  description: "clear clutter"
};
```

2. Record

```ts
/**
 * node_modules/typescript/lib/lib.es5.d.ts
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
    [P in K]: T;
};

interface PageInfo {
  title: string;
}

type Page = "home" | "about" | "contact";

const x: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" }
};
```

3. Pick

```ts
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false
};
```

4. Exclude

```ts
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;

type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number
```

5. ReturnType

作用是用于获取函数`T`的返回类型

```ts
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

type T0 = ReturnType<() => string>; // string
type T1 = ReturnType<(s: string) => void>; // void
type T2 = ReturnType<<T>() => T>; // {}
type T3 = ReturnType<<T extends U, U extends number[]>() => T>; // number[]
type T4 = ReturnType<any>; // any
type T5 = ReturnType<never>; // any
type T6 = ReturnType<string>; // Error
type T7 = ReturnType<Function>; // Error
```

> 使用泛型创建对象

```ts
class GenericCreator<T> {
  create<T>(c: { new (): T }): T {
    return new c();
  }
}

create<T>(c: { new(a: number): T; }, num: number): T {
  return new c(num);
}

const creator1 = new GenericCreator<FirstClass>();
const firstClass: FirstClass = creator1.create(FirstClass);

const creator2 = new GenericCreator<SecondClass>();
const secondClass: SecondClass = creator2.create(SecondClass);
```

## Share