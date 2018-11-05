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
### Topic
[ES Module](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)

### Content

#### How ES Model Work

For ES Module, this happens in three steps, This three steps could be asynchronous.
- `Contruction` - Find, download, and parse all of the files into module records
- `Instantiation` —find boxes in memory to place all of the exported values in (but don’t fill them in with values yet). Then make both exports and imports point to those boxes in memory. This is called linking.
- `Evaluation` —run the code to fill in the boxes with the variables’ actual values.

> About module instance combines two things, the code and state. Code is kind of sets of instructions, but you can not use this without the raw materials. State gives you those materials, it is the actual values of the variables.

##### Construction Phase

Three things happen for each module during this phase
- Figure out where to download the file containing the module from.
- Fetch the file.
- Parse the file into a module record.

> One part of the import statement is called the module specifier. And it uses something called a module resolution algorithm to differ the platform.

> If the main thread were to wait for each of these files to download, a lot of other tasks would pile up in its queue. Blocking the main thread like this would make an app that uses modules too slow to use. This is one of the reasons that the ES module spec splits the algorithm into multiple phases. Splitting out construction into its own phase allows browsers to fetch files and build up their understanding of the module graph before getting down to the synchronous work of instantiating.

> The CommonJS approach, use could use variables in module specifier. But it does not work in ES Module, because you're building up this whole module graph beforehand... you do not have the value yet. But there is a way to implment it in ES Module, called `dynamic import --- import ()`, the dynamic import creates a second graph.

> Provide the `module map` to cache modules.

#### Instantiation Phase

- JS engine creates a module environment record. Find boxes in memory for all of the exports.
- These boxes in memory won't get their values yet. After evaluation that their actual values will be filled in.
- To instantiate the module graph, engine will do depth first post-order traversal to set up their exports. Note that both the export and the import point to the same location in memory. Wiring up the exports first guarantees that all of the imports can be connected to matching exports. (`This is different from CommonJS modules. In CommonJS the entire export object is copied on export. This means that if the exporting module changes value later, the importing module will not see the changes.`)


> In contrast, ES modules use something called live bindings. Both modules point to the same location in memory. This means that when the exporting module changes a value, that change will show up in the importing module.

> The reason to have live bindings like this is then you can wire up all of the modules without running any code. This helps with evaluation when you have cyclic dependencies.

#### Evaluation

The final step is filling in these boxes in memory. The JS engine does this by executing the top-level code — the code that is outside of functions.


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

> Parent References

Mixins may utilize the parent reference character &, acting on the parent instead of further nesting.

```stylus
stripe(even = #fff, odd = #eee)
   tr
     background-color odd
     &.even
     &:nth-child(even)
       background-color even
```

> Multiple Return Values

```stylus
sizes()
     15px 10px

sizes()[0]
// => 15px

<!-- To disambiguate, we can either wrap with parentheses, or use the return keyword: -->
swap(a, b)
    (b a)

swap(a, b)
return b a
```

> Conditionals

Let’s say we want to create a function named stringish() to determine whether the argument can be transformed to a string. We check if val is a string, or an ident (which is string-like). Because undefined identifiers yield themselves as the value, we may compare them to themselves as shown below (where yes and no are used in place of true and false):
```stylus
stringish(val)
   if val is a 'string' or val is a 'ident'
     yes
   else
     no
```

> Anonymous functions

You can use anonymous functions where needed using @(){} syntax. 
```stylus
sort(list, fn = null)
  // default sort function
  if fn == null
    fn = @(a, b) {
      a > b
    }

  // bubble sort
  for $i in 1..length(list) - 1
    for $j in 0..$i - 1
      if fn(list[$j], list[$i])
        $temp = list[$i]
        list[$i] = list[$j]
        list[$j] = $temp
  return list

  sort('e' 'c' 'f' 'a' 'b' 'd')
  // => 'a' 'b' 'c' 'd' 'e' 'f'
```

> Hash Example
```stylus
get(hash, key)
    return pair[1] if pair[0] == key for pair in hash

hash = (one 1) (two 2) (three 3)
  
get(hash, two)
// => 2

get(hash, three)
// => 3

get(hash, something)
// => null
```

## Share