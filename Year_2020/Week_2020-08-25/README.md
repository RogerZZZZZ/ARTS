# Week 2020-08-25

## Algorithm

[115.distinct-subsequence]

[103.binary-tree-zigzag-level-order-traversal]

## Tips

[从图片裁剪来聊聊前端二进制](https://mp.weixin.qq.com/s/ukCcIZ1wdM9G1l1E1dnBPw)

> 前端根据后盾返回的二进制下载文件

```js
let blob = new Blob([res.data]);
let fileName = `Cosen.csv`;
// 兼容IE
if (window.navigator.msSaveOrOpenBlob) {
  navigator.msSaveBlob(blob, fileName);
} else {
  // 创建a标签, 模拟点击实现下载
  let link = document.createElement("a");
  let evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", false, false);
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  // 释放创建的对象
  window.URL.revokeObjectURL(link.href);
}
```

> FileReader

```js
const reader = new FileReader()

// 将一个文件的内容通过字符串的方式读取出来
<input type="file" id='upload' />

document.getElementById('upload').addEventListener('change', function (e) {
    var file = this.files[0];
    const reader = new FileReader();
    reader.onload = function () {
        const result = reader.result;
        console.log(result);
    }
    reader.readAsText(file);
}, false);
```

> ArrayBuffer/TypedArray/DataView 对象

ArrayBuffer是通用的, 固定长度的二进制数据缓冲区. ArrayBuffer 不能直接操作,而是要通过类型数组对象或 DataView 对象来操作,它们会将缓冲区中的数据表示为特定的格式,并通过这些格式来读写缓冲区的内容.

1. DataView对象

DataView视图是一个可以从二进制ArrayBuffer对象中读写多种数值类型的底层接口。

```js
let buffer = new ArrayBuffer(2);
console.log(buffer.byteLength); // 2
let dataView = new DataView(buffer);
dataView.setInt(0, 1);
dataView.setInt(1, 2);
console.log(dataView.getInt8(0)); // 1
console.log(dataView.getInt8(1)); // 2
console.log(dataView.getInt16(0)); // 258
```

2. TypedArray

另一种TypedArray视图, 他与DataView的区别为, 它不是一个构造函数, 而是一组构造函数代表不同的数据格式

```js
const buffer = new ArrayBuffer(8);
console.log(buffer.byteLength); // 8
const int8Array = new Int8Array(buffer);
console.log(int8Array.length); // 8
const int16Array = new Int16Array(buffer);
console.log(int16Array.length); // 4
```

> Blob

Blob是用来支持文件操作的, 在JS中, 有File和Blob, 而File继承了所有Blob的属性, 下面列举一些Blob的方法: 

- 文件下载: URL.createObjectURL(blob)赋值给a.download
- 图片展示: URL.createObjectURL(blob)赋值给img.src
- 分片上传: blob.slice可以分割二进制数据
- 本地读取文件: Filereader的API可以将Blob或File转化为文本/ArrayBuffer/Data URL等类型


> atob和btoa

```js
// Base64解码
var decodedData = window.atob(encodedData);

// Base64编码
var encodedData = window.btoa(stringToEncode);

```

> Canvas中的ImageData对象

1. 得到场景像素数据

```js
const imgData = ctx.getImageData(left, top, width, height)
```

2. 在场景中写入像素数据

```js
ctx.putImageData(imgData, dx, dy)
```

3. toDataURL将canvas转为data URL格式

```js
<canvas id="canvas" width="5" height="5"></canvas>

var canvas = document.getElementById("canvas");
var dataURL = canvas.toDataURL();
console.log(dataURL);
// "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNby
// blAAAADElEQVQImWNgoBMAAABpAAFEI8ARAAAAAElFTkSuQmCC"
```

> 裁剪图片demo

```js
drawImage = (left = this.state.lastX, top = this.state.lastY) => {
  let image = this.imageRef.current;
  let canvas = this.canvasRef.current;
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let imageWidth = image.width;
  let imageHeight = image.height;
  if (imageWidth > imageHeight) {
    let scale = canvas.width / canvas.height;
    imageWidth = canvas.width * this.state.times;
    imageHeight = imageHeight * scale * this.state.times;
  } else {
    let scale = canvas.height / canvas.width;
    imageHeight = canvas.height * this.state.times;
    imageWidth = imageWidth * scale * this.state.times;
  }
  ctx.drawImage(
    image,
    (canvas.width - imageWidth) / 2 + left,
    (canvas.height - imageHeight) / 2 + top,
    imageWidth,
    imageHeight
  );
};


// 再新建一个canvas用于截取
confirm = () => {
  let canvas = this.canvasRef.current;
  let ctx = canvas.getContext("2d");
  const imageData = ctx.getImageData(100, 100, 100, 100);
  let avatarCanvas = document.createElement("canvas");
  avatarCanvas.width = 100;
  avatarCanvas.height = 100;
  let avatarCtx = avatarCanvas.getContext("2d");
  avatarCtx.putImageData(imageData, 0, 0);
  let avatarDataUrl = avatarCanvas.toDataURL();
  this.setState({ avatarDataUrl });
  this.avatarRef.current.src = avatarDataUrl;
};

// 上传
upload = (event) => {
  // console.log("文件url", this.state.avatarDataUrl);
  let bytes = atob(this.state.avatarDataUrl.split(",")[1]);
  console.log("bytes", bytes);
  let arrayBuffer = new ArrayBuffer(bytes.length);
  let uInt8Array = new Uint8Array();
  for (let i = 0; i < bytes.length; i++) {
    uInt8Array[i] = bytes.charCodeAt[i];
  }
  let blob = new Blob([arrayBuffer], { type: "image/png" });
  let xhr = new XMLHttpRequest();
  let formData = new FormData();
  formData.append("avatar", blob);
  xhr.open("POST", "/upload", true);
  xhr.send(formData);
};
```

## Share