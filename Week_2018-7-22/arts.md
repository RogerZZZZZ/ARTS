#Week 2018-7-22
## Algorithm
`Question`:Given a positive integer num, write a function which returns True if num is a perfect square else False.
Note: Do not use any built-in library function such as sqrt.
```
Input: 16
Returns: True
```

`Solution`: (Use binary search)

```javascript
/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function(num) {
    if (num < 0) return false
    if (num === 1) return true
    let left = 0,
        right = Math.floor(num/2)
    
    while(left <= right) {
        let mid = Math.floor((left + right) / 2)
        let count = mid * mid
        if (count === num) {
            return true
        } else if (count < num) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return false
    
};
```

`Question`:Given an array consisting of n integers, find the contiguous subarray of given length k that has the maximum average value. And you need to output the maximum average value.
```
// Example
Input: [1,12,-5,-6,50,3], k = 4
Output: 12.75
Explanation: Maximum average is (12-5-6+50)/4 = 51/4 = 12.75
```

`Solution`:
```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function(nums, k) {
    for (let i = 1; i < nums.length; i++) {
        nums[i] = nums[i] + nums[i-1]
    }
    
    let max = nums[k - 1]
    for (let i = 1; i < nums.length-k+1; i++) {
        max = Math.max(nums[k+i-1] - nums[i - 1], max)
    }
    return max/k
};
```

## Review

## Tips
### Topic

**[Stylus](http://stylus-lang.com/try.html#?code=body%20%7B%0A%20%20font%3A%2014px%2F1.5%20Helvetica%2C%20arial%2C%20sans-serif%3B%0A%20%20%23logo%20%7B%0A%20%20%20%20border-radius%3A%205px%3B%0A%20%20%7D%0A%7D)**

### Content

> Transparent Mixins

```stylus
border-radius()
  -webkit-border-radius: arguments
  -moz-border-radius: arguments
  border-radius: arguments

button {
  border-radius: 5px 10px;
}
```

> Robust feature-rich language

```stylus
-pos(type, args)
  i = 0
  position: unquote(type)
  {args[i]}: args[i + 1] is a 'unit' ? args[i += 1] : 0
  {args[i += 1]}: args[i + 1] is a 'unit' ? args[i += 1] : 0

absolute()
  -pos('absolute', arguments)

#prompt
  absolute: top 150px left 5px
  width: 200px
  margin-left: -(@width / 2)

/* after compile */
#prompt {
  position: absolute;
  top: 150px;
  left: 5px;
}
```

> Interpolation
```stylus
vendors = webkit moz o ms official

border-radius()
  for vendor in vendors
    if vendor == official
      border-radius: arguments
    else
      -{vendor}-border-radius: arguments
#content
  border-radius: 5px

/* after compile */
#content {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -o-border-radius: 5px;
  -ms-border-radius: 5px;
  border-radius: 5px;
}
```

#### Selector

> Partial Reference

`^[N]` anywhere in a selector, where `N` can be a number, represents a partial reference.

```stylus
.foo
  &__bar
    width: 10px

    ^[0]:hover &
      width: 20px


.foo__bar {
  width: 10px;
}
.foo:hover .foo__bar {
  width: 20px;
}
```

> Initial & Relative Reference

The `~/` characters at the start of a selector can be used to point at the selector at the first nesting and could be considered as a shortcut to `^[0]`. The only drawback is that you can use initial reference only at the start of a selector:

```stylus
.block
  &__element
    ~/:hover &
      color: red

.block:hover .block__element {
  color: #f00;
}
```

The `../` characters at the start of a selector mark a relative reference, which points to the previous to the & compiled selector. You can nest relative reference: `../../` to get deeper levels, but note that it can be used only at the start of the selector.

```stylus
.foo
  .bar
    width: 10px

    &,
    ../ .baz
      height: 10px

.foo .bar {
  width: 10px;
}
.foo .bar,
.foo .baz {
  height: 10px;
}
```

> selector() bif

You can use `selector()` function to get the current compiled selector.
```stylus
.foo
  selector()
// => '.foo'

.foo
  &:hover
    selector()
// '.foo:hover'
```

## Share