# Week 2018-8-12
## Algorithm
[Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/description/)

## Review
#### Closures

[1. I never understood Javascript closures](https://medium.com/dailyjs/i-never-understood-javascript-closures-9663703368e8)

After reading this articles, I found that I have already known the javascript closures, but there are still some points I need to take care.

> What happened after function encounters a `return` statement or `}`
- The local execution contexts pops off the execution stack
- The functions sends the return value back to the calling context. The calling context is the execution context that called this function, it could be the global execution context or another local execution context. It is up to the calling execution context to deal with the return value at that point. The returned value could be an object, an array, a function, a boolean, anything really. If the function has no return statement, undefined is returned.
- The local execution context is destroyed. This is important. Destroyed. All the variables that were declared within the local execution context are erased. They are no longer available. That’s why they’re called local variables.

> Not so trivial closures

Sometimes we did even find that we actually use closures in our daily work. Here is an example.

```javascript
let c = 4
const addX = x => n => n + x
const addThree = addX(3)
let d = addThree(c)
console.log('example partial application', d)
// The variable x is part of the closure. When the variable addThree gets declared in the local context, it is assigned a function definition and a closure. The closure contains the variable x.
```

> The backpack analogy

When a function gets created and passed around or returned from another function, it carries a backpack with it. And in the backpack are all the variables that were in scope when the function was declared.

[2. Lets learn javascript closures](https://medium.freecodecamp.org/lets-learn-javascript-closures-66feb44f6a44)

This article is mainly to explain the inner implementation for javascript closures. Followings are some tips I need to write down.

> About execution context

At any time, there can only be one execution context running, That's why javascript is "single threaded". And the browsers maintain the execution context using stack.

Each execution context has various state components that are used to keep track of the progress the code in each context has made.

- **Code evalution state**: Any state needed to perform, suspend, and resume evaluation of the code associated with this execution context
- **Function**: The function object which the execution context is evaluating (or null if the context being evaluated is a script or module)
- **Realm -> scope**: A set of internal objects, an ECMAScript global environment, all of the ECMAScript code that is loaded within the scope of that global environment, and other associated state and resources
- **Lexical Environment**: Used to resolve identifier references made by code within this execution context.
- **Variable Environment**: Lexical Environment whose EnvironmentRecord holds bindings created by VariableStatements within this execution context.

> Lexical Environment

What is Lexical Environment. 
- **Used to define the association of Identifiers**: The purpose of a lexical environment is to manage data within code. In other word is to find the value of variable.
- **Lexical Environment consists of an Environment Record**
- **Lexical nesting structure** This is the interesting part, which is basically saying that an inner environment references the outer environment that surrounds it, and that this outer environment can have its own outer environment as well

```javascript
LexicalEnvironment = {
  EnvironmentRecord: {
  // Identifier bindings go here
  },
  
  // Reference to the outer environment
  outer: < >
};
```

here is an example:
```javascript
var result = [];
 
for (var i = 0; i < 5; i++) {
  result[i] = function () {
    console.log(i);
  };
}

result[0](); // 5, expected 0
result[1](); // 5, expected 1
result[2](); // 5, expected 2
result[3](); // 5, expected 3
result[4](); // 5, expected 4
```

why it happens?

```javascript
environment: {
  EnvironmentRecord: {
    result: [...],
    i: 5
  },
  outer: null,
}
```
what’s actually happening is that the environment (or context/scope) is the same for all five functions within the result array. Therefore,` every time the variable i is incremented, it updates scope` — which is shared by all the functions. That’s why any of the 5 functions trying to access i returns 5 (i is equal to 5 when the for-loop exits).

How to fix it.
```javascript
// using the closure way to solve.
var result = [];
 
for (var i = 0; i < 5; i++) {
  result[i] = (function inner(x) {
    // additional enclosing context
    return function() {
      console.log(x);
    }
  })(i);
}

result[0](); // 0, expected 0
result[1](); // 1, expected 1
result[2](); // 2, expected 2
result[3](); // 3, expected 3
result[4](); // 4, expected 4

// using let
// since let is block-scoped and so a new identifier binding is created for each iteration in the for-loop.
var result = [];
 
for (let i = 0; i < 5; i++) {
  result[i] = function () {
    console.log(i);
  };
}

result[0](); // 0, expected 0
result[1](); // 1, expected 1
result[2](); // 2, expected 2
result[3](); // 3, expected 3
result[4](); // 4, expected 4
```

## Tips

## Share