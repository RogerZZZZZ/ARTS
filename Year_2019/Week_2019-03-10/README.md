# Week 2019-03-10

## Algorithm

## Review

## Tips

[protobuf语法指南]

1. 指定字段规则

- required: 该值是必须要设置的，且在后续的修改中，不能改动
- optional: 该字段可以有0、1个值
- repeated: 可以重复很多次，相当于List

> 基本类型的repeated字段没有被尽可能搞笑编码，应该使用下面方式来确保高效

`repeated int32 samples = 4 [packed=true]`

2. Optional的字段和默认值

`optional int32 result_per_page = 3 [default = 10]`

> 对string来说，默认值是空字符串。对bool来说，默认值是false。对数值类型来说，默认值是0。对枚举来说，默认值是枚举类型定义中的第一个值

3. 扩展

```js
message Foo {
  // ...
  extensions 100 to 199
}
```

> 在消息Foo中，范围[100, 199]之内的子弹标识号被保留为扩展使用

```js
extend Foo {
  optional int32 bar = 126
}

// 扩展字段标识号需要在之前声明的范围内
```

4. 被预留的标识号

`[19000, 19999]`

5. 

## Share