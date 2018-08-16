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

## Tips

## Share