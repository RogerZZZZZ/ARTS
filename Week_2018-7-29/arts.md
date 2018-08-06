#Week 2018-7-29
## Algorithm
[Reverse Vowels of a String](https://leetcode.com/problems/reverse-vowels-of-a-string/description/)

[Power of Four](https://leetcode.com/problems/power-of-four/description/)

[Arranging Coins](https://leetcode.com/problems/arranging-coins/description/)


## Review

## Tips
### Contents

**About Java 8 Map Stream Api**

> Before we have Java 8
```java
for (Map.Entry<Integer, String> entry : HOSTING.entrySet()) {
    if ("aws.amazon.com".equals(entry.getValue())) {
        result = entry.getValue();
    }
}
```

> With new Api
```java
String result = HOSTING.entrySet().stream()
    .filter(x -> {
        if (!x.getValue().contains("amazon") && !x.getValue().contains("digital")) {
            return true;
        }
        return false;
    })
    .map(map -> map.getValue())
    .collect(Collectors.joining(","));


Map<Integer, String> collect2 = HOSTING.entrySet().stream()
    .filter(map -> map.getKey() <= 3)
    .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
```

> **Predicate**
```java
// Generic Map filterbyvalue, with predicate
public static <K, V> Map<K, V> filterByValue(Map<K, V> map, Predicate<V> predicate) {
    return map.entrySet()
        .stream()
        .filter(x -> predicate.test(x.getValue()))
        .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
}

Map<Integer, String> filteredMap3 = filterByValue(HOSTING, x -> (x.contains("aws") && !x.contains("aws2")));

Map<Integer, String> filteredMap4 = filterByValue(HOSTING, x -> (x.length() <= 10));
```

**Map Api**

> **computeIfAbsent Function**

如果指定的key不存在，则通过指定的K -> V计算出新的值设置为key的值，类似代码如下：
```java
if (map.get(key) == null) {
    V newValue = mappingFunction.apply(key);
    if (newValue != null)
        map.put(key, newValue);
}
```

> **computeIfPresent Function**

如果指定的`key`存在，则根据旧的`key`和`value`计算新的值`newValue`, 如果`newValue`不为`null`，则设置`key`新的值为newValue, 如果`newValue`为`null`, 则删除该key的值，类似代码如下：
```java
if (map.get(key) != null) {
    V oldValue = map.get(key);
    V newValue = remappingFunction.apply(key, oldValue);
    if (newValue != null)
        map.put(key, newValue);
    else
        map.remove(key);
}
```

> **merge(K key, V value, BiFunction<? super V, ? super V, ? extends V> remappingFunction)**

如果指定的key不存在，则设置指定的value值，否则根据key的旧的值oldvalue，value计算出新的值newValue, 如果newValue为null, 则删除该key，否则设置key的新值newValue。类似如下代码：
```java
V oldValue = map.get(key);
V newValue = (oldValue == null) ? value :
        remappingFunction.apply(oldValue, value);
if (newValue == null)
    map.remove(key);
else
    map.put(key, newValue);
```

## Share