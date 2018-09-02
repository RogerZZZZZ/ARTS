# Week 8/19/2018
## Algorithm
[687. Longest Univalue Path](https://leetcode.com/problems/longest-univalue-path/description/)

[507. Perfect Number](https://leetcode.com/problems/perfect-number/description/)

## Review

> Article: [Avoid the async and await hell](https://medium.freecodecamp.org/avoiding-the-async-await-hell-c77a0fb71c4c)

#### Problem

Here is an example given in the article.
```javascript
(async () => {
  const pizzaData = await getPizzaData()    // async call
  const drinkData = await getDrinkData()    // async call
  const chosenPizza = choosePizza()    // sync call
  const chosenDrink = chooseDrink()    // sync call
  await addPizzaToCart(chosenPizza)    // async call
  await addDrinkToCart(chosenDrink)    // async call
  orderItems()    // async call
})()
```

The cons is very obvious, the task of chose drink actually has no relevant with choosing pizza, but in this whole task, it is blocked.

> IIFE (Immediately Invoked Function Expression)
```javascript
(function() {
    doSomething()
})()
```

#### Solution

Steps:
- Find statements which depend on the execution of other statements
- Group-dependent statements in async functions
- Execute these async functions concurrenctly

```javascript
// Fix the previous problem
async function selectPizza() {
  const pizzaData = await getPizzaData()    // async call
  const chosenPizza = choosePizza()    // sync call
  await addPizzaToCart(chosenPizza)    // async call
}

async function selectDrink() {
  const drinkData = await getDrinkData()    // async call
  const chosenDrink = chooseDrink()    // sync call
  await addDrinkToCart(chosenDrink)    // async call
}

(async () => {
  const pizzaPromise = selectPizza()
  const drinkPromise = selectDrink()
  await pizzaPromise
  await drinkPromise
  orderItems()    // async call
})()

// Although I prefer it this way 

(async () => {
  Promise.all([selectPizza(), selectDrink()]).then(orderItems)   // async call

```

Another example:
```javascript
async function orderItems() {
  const items = await getCartItems()    // async call
  const noOfItems = items.length
  for(var i = 0; i < noOfItems; i++) {
    await sendRequest(items[i])    // async call
  }
}

// -> optimize
async function orderItems() {
  const items = await getCartItems()    // async call
  const noOfItems = items.length
  const promises = []
  for(var i = 0; i < noOfItems; i++) {
    const orderPromise = sendRequest(items[i])    // async call
    promises.push(orderPromise)    // sync call
  }
  await Promise.all(promises)    // async call
}

// Although I prefer it this way 

async function orderItems() {
  const items = await getCartItems()    // async call
  const promises = items.map((item) => sendRequest(item))
  await Promise.all(promises)    // async call
}
```

## Tips

> Article: [A Simple Guide to ES6 Iterators in Javascript with Examples](https://codeburst.io/a-simple-guide-to-es6-iterators-in-javascript-with-examples-189d052c3d8e)

```javascript
const myFavouriteAuthors = {
  allAuthors: {
    fiction: [
      'Agatha Christie', 
      'J. K. Rowling',
      'Dr. Seuss'
    ],
    scienceFiction: [
      'Neal Stephenson',
      'Arthur Clarke',
      'Isaac Asimov', 
      'Robert Heinlein'
    ],
    fantasy: [
      'J. R. R. Tolkien',
      'J. K. Rowling',
      'Terry Pratchett'
    ],
  },
}
```

Here is an example, and we need to extract all author name from this object. Basically we can scan all fields in this object, but the con is that when the field name in object changed, we also need to change the logic in our code, which is actually disguesting. So here is the solution to simply get the all values from it by implementing the Iterator interface in this object.

```javascript
const myFavouriteAuthors = {
  allAuthors: {
    //...
  },
  [Symbol.iterator]() {
    // Get all the authors in an array
    const genres = Object.values(this.allAuthors);
    
    // Store the current genre and author index
    let currentAuthorIndex = 0;
    let currentGenreIndex = 0;
    
    return {
      // Implementation of next()
      next() {
        // authors according to current genre index
        const authors = genres[currentGenreIndex];
        
        // doNotHaveMoreAuthors is true when the authors array is exhausted.
        // That is, all items are consumed.
        const doNothaveMoreAuthors = !(currentAuthorIndex < authors.length);
        if (doNothaveMoreAuthors) {
          // When that happens, we move the genre index to the next genre
          currentGenreIndex++;
          // and reset the author index to 0 again to get new set of authors
          currentAuthorIndex = 0;
        }
        
        // if all genres are over, then we need tell the iterator that we 
        // can not give more values.
        const doNotHaveMoreGenres = !(currentGenreIndex < genres.length);
        if (doNotHaveMoreGenres) {
          // Hence, we return done as true.
          return {
            value: undefined,
            done: true
          };
        }
        
        // if everything is correct, return the author from the 
        // current genre and incerement the currentAuthorindex
        // so next time, the next author can be returned.
        return {
          value: genres[currentGenreIndex][currentAuthorIndex++],
          done: false
        }
      }
    };
  }
};
```

> Here is a hint that, there are some expression or method that need us to give the object that is iterable.

- for...of loop
- The spread operator (...)
- Maps and Sets
- Promise.all and Promise.race


So in this example, we can use above expression to traverse the attribute.

```javascript
for (const author of myFavouriteAuthors) {
  console.log(author);
}

console.log(...myFavouriteAuthors)

// It will output the array of all authors
```

## Share