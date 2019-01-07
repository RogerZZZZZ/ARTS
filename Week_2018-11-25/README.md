# Week 2018-11-25

## Algorithm

[953. Verifying an Alien Dictionary](https://leetcode.com/problems/verifying-an-alien-dictionary/)

[721. Accounts Merge](https://leetcode.com/problems/accounts-merge/)

## Review

## Tips

[Learn to combine RxJs sequences with super intuitive interactive diagrams](https://blog.angularindepth.com/learn-to-combine-rxjs-sequences-with-super-intuitive-interactive-diagrams-20fce8e6511)


> merge

![1](https://github.com/RogerZZZZZ/ARTS/raw/master/Week_2018-11-25/img/1.gif)


> concat

In the diagram below you can see the concat operator combining two streams A and B each producing 3 items and the values falling through to the resulting sequence first from the A and then from the B.

![2](https://github.com/RogerZZZZZ/ARTS/raw/master/Week_2018-11-25/img/2.gif)


> race

In the diagram below you can see the race operator combining two streams A and B each producing 3 items but only the values from the stream A are emitted since this stream starts emitting values first.

![3](https://github.com/RogerZZZZZ/ARTS/raw/master/Week_2018-11-25/img/3.gif)

> mergeAll

In the diagram below you can see the H higher-order stream that produces two inner streams A and B. The mergeAll operator combines values from these two streams and then passes them through to the resulting sequence as they occur.

![4](https://github.com/RogerZZZZZ/ARTS/raw/master/Week_2018-11-25/img/4.gif)

> concatAll

In the diagram below you can see the H higher-order stream that produces two inner streams A and B. The concatAll operator takes values from the A stream first and then from the stream B and passes them through the resulting sequence.

![5](https://github.com/RogerZZZZZ/ARTS/raw/master/Week_2018-11-25/img/5.gif)

> switchAll

In the diagram below you can see the H higher-order stream that produces two inner streams A and B. The switchAll operator takes values from the A stream first and then from the stream B and passes them through the resulting sequence.

![6](https://github.com/RogerZZZZZ/ARTS/raw/master/Week_2018-11-25/img/6.gif)

> concatMap, mergeMap and switchMap

Interestingly, the mapping operators concatMap, mergeMap and switchMap are used much more often than their counterparts concatAll, mergeAll and switchAll that operate on the stream of observables. Yet, if you think about it, they are almost the same thing. All *Map operators consist of two parts — producing a stream of observables through mapping and applying combination logic on the inner streams produced by this higher order observable.


```js
const a = stream('a', 200, 3);
const b = stream('b', 200, 3);
const h = interval(100).pipe(take(2), map(i => [a, b][i]));
h.pipe(mergeAll()).subscribe(fullObserver('mergeAll'));


const a = stream('a', 200, 3);
const b = stream('b', 200, 3);
const h = interval(100).pipe(take(2), mergeMap(i => [a, b][i]));

h.subscribe(fullObserver('mergeMap'));

// they are the same
```

> combineLatest

In the diagram below you can see the combineLatest operator combining two streams A and B. As soon as all streams have emitted at least one value each new emission produces a combined value through the result stream:

![7](https://github.com/RogerZZZZZ/ARTS/raw/master/Week_2018-11-25/img/7.gif)

> zip

In the diagram below you can see the zip operator combining two streams A and B. As soon as a corresponding pair is matched the resulting sequence produces a combined value:

![8](https://github.com/RogerZZZZZ/ARTS/raw/master/Week_2018-11-25/img/8.gif)

> forkJoin

In the diagram below you can see the forkJoin operator combining two streams A and B. As soon as a corresponding pair is matched the resulting sequence produces a combined value:

![9](https://github.com/RogerZZZZZ/ARTS/raw/master/Week_2018-11-25/img/9.gif)

> withLatestFrom

In the diagram below you can see the withLatestFrom operator combining two streams A and B with the stream B being the guiding stream. Every time the stream B emits a new value the resulting sequence produces a combined value using latest value from the stream A:

![10](https://github.com/RogerZZZZZ/ARTS/raw/master/Week_2018-11-25/img/10.gif)

## Share