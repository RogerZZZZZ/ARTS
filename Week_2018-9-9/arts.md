# Week 2018-9-9

## Algorithm

## Review

## Tips

## Share

This week got two new thoughts of replacing the switch or if...else statements, which actually make code more readable and clean.

> Function twist

```javascript
const matched = x => ({
  on: () => matched(x),
  otherwise: () => x,
})

const match = x => ({  
  on: (pred, fn) => (pred(x) ? matched(fn(x)) : match(x)),
  otherwise: fn => fn(x),
})

// EXAMPLE 1
match(50)
 // we are now in match context
.on(x => x < 0, () => 0)
 // Since 50 is not < 0, we remain in match(50) context
.on(x => x >= 0 && x <= 1, () => 1)
 // Since 50 is not between 0 and 1, we remain in match(50) context
.otherwise(x => x * 10)
 // We are still in match(50), so otherwise callback is called,
 // and we get 500 back

// EXAMPLE 2
match(0)
 // we are now in match context
.on(x => x < 0, () => 0)
 // 0 is not <0 so we remain in match(0) context
.on(x => x >= 0 && x <= 1, () => 1)
 // Since 0 satisfies this guard, we use the return value of the
 // function and put it in matched context. We are now in
 // matched(1) context.
.otherwise(x => x * 10)
 // We are in matched context, so the callback is ignored, and
 // instead, we get 1 back
```

The core part is to change the context when the input is valid with the requirements. 

And there is another concept:

```javascript
const done = x => ({
  attempt: () => done(x),
  finally: fn => fn(x),
})
const until = (pred, x) => ({
  attempt: fn => {
    const y = fn(x)
    return pred(y) ? done(y) : until(pred, x)
  },
  finally: (_, fn) => fn(x),
})

// Example
const a = until(x => x > 10, 1)
  .attempt(x => x*2)
  .attempt(x => x*10)
  .finally(x => x*30, x => x + 2)

console.log(a) // 3

// Example
const a = until(x => x > 10, 1)
  .attempt(x => x*2)
  .attempt(x => x*20)
  .finally(x => x*30, x => x + 2)

console.log(a) // 600
```

> Another way

```javascript
parse: (data, pattern) => {
    const func = {
      function: (d) => {
        return d.call(this, data)
      },
      no: (d) => {
        return d
      },
      math: (d) => {
        return mathParser
          .parse(d.exp)
          .evaluate(objResolve(d.param, data))
      },
      object: (d) => {
        return match.parse(data, d)
      },
      param: (d) => {
        return expsResolve(data, d)
      },
    }
    return func[pattern.type](pattern.data)
  }

```