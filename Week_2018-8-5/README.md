# Week 2018-8-5
## Algorithm

[Array Nesting](https://leetcode.com/problems/array-nesting/description/)

[License ket Formatting](https://leetcode.com/problems/license-key-formatting/description/)

## Review

#### Topic
[Keeping Node.js Fast: Tools, Techniques, And Tips For Making High-Performance Node.js Servers](https://medium.com/@smashingmag/keeping-node-js-fast-tools-techniques-and-tips-for-making-high-performance-node-js-servers-8cfcb55e3d7)

#### Content


## Tips
### Content
[Pug (previously called jade)](https://pugjs.org/api/getting-started.html)

> **Code**
1. Unbuffered Code

```pug
- for (var x = 0; x < 3; x++)
  li item

//-   Also Pug supports block unbuffered code.
-
  var list = ["Uno", "Dos", "Tres",
          "Cuatro", "Cinco", "Seis"]
each item in list
  li= item

//-   After compile
<li>Uno</li>
<li>Dos</li>
<li>Tres</li>
<li>Cuatro</li>
<li>Cinco</li>
<li>Seis</li>
```

2. Buffered Code
```pug
p
  = 'This code is <escaped>!'

<p>This code is &lt;escaped&gt;!</p>

<!-- Also you could use != to generate the Unescaped Buffered Code -->
```

> **Conditional**

Pug provides the `unless`
```pug
unless user.isAnonymous
  p 您已经以 #{user.name} 的身份登录。

<!-- equals -->
if !user.isAnonymous
  p 您已经以 #{user.name} 的身份登录。
```

> **Include**

```pug
//- index.pug
doctype html
html
  head
    style
      include style.css
  body
    h1 我的网站
    p 欢迎来到我这简陋得不能再简陋的网站。
    script
      include script.js
```

> **Template Inheritance**

In a template, a block is simply a “block” of Pug that a child template may replace. This process is recursive.

Pug blocks can provide default content, if appropriate. Providing default content is purely optional, though. The example below defines `block scripts`, `block content,` and `block foot`

```pug
//- layout.pug
html
  head
    title My Site - #{title}
    block scripts
      script(src='/jquery.js')
  body
    block content
    block foot
      #footer
        p some footer content


//- page-a.pug
extends layout.pug

block scripts
  script(src='/jquery.js')
  script(src='/pets.js')

block content
  h1= title
  - var pets = ['cat', 'dog']
  each petName in pets
    p= petName
```

**Block append / prepend**
```pug
//- page.pug
extends layout.pug

block append head
  script(src='/vendor/three.js')
  script(src='/game.js')

//-   append two script files at the begining of the block
```

> **Interplolation**
```pug
- var title = "On Dogs: Man's Best Friend";
- var author = "enlore";
- var theGreat = "<span>escape!</span>";

h1= title
p Written with love by #{author}
p This will be safe: #{theGreat}
```

**Tag Interpolation**
```pug
p.
  This is a very long and boring paragraph that spans multiple lines.
  Suddenly there is a #[strong strongly worded phrase] that cannot be
  #[em ignored].
p.
  And here's an example of an interpolated tag with an attribute:
  #[q(lang="es") ¡Hola Mundo!]

//-   after compile
<p>This is a very long and boring paragraph that spans multiple lines. Suddenly there is a <strong>strongly worded phrase</strong> that cannot be
  <em>ignored</em>.</p>
<p>And here's an example of an interpolated tag with an attribute:
  <q lang="es">¡Hola Mundo!</q></p>
```

> **Mixin**
```pug
mixin article(title)
  .article
    .article-wrapper
      h1= title
      if block
        block
      else
        p No content provided

+article('Hello world')

+article('Hello world')
  p This is my
  p Amazing article

<!-- after compile -->
<div class="article">
  <div class="article-wrapper">
    <h1>Hello world</h1>
    <p>No content provided</p>
  </div>
</div>
<div class="article">
  <div class="article-wrapper">
    <h1>Hello world</h1>
    <p>This is my</p>
    <p>Amazing article</p>
  </div>
</div>
```

**Mixin Attribute**

Mixin also get an implicit `attribute` argument, which is taken from the attributes passed to the mixin:
```pug
mixin link(href, name)
  //- attributes == {class: "btn"}
  a(class!=attributes.class href=href)= name

+link('/foo', 'foo')(class="btn")

<a class="btn" href="/foo">foo</a>

<!-- or -->
mixin link(href, name)
  a(href=href)&attributes(attributes)= name

+link('/foo', 'foo')(class="btn")

<a class="btn" href="/foo">foo</a>
```

**Rest Arguments**
```pug
mixin list(id, ...items)
  ul(id=id)
    each item in items
      li= item

+list('my-list', 1, 2, 3, 4)
```

> **Plain Text**

**Block in a Tag**
Often you might want large blocks of text within a tag. A good example is writing JavaScript and CSS code in the script and style tags. To do this, just add a `. `right after the tag name, or after the closing parenthesis, if the tag has attributes.

```pug
div
  p This text belongs to the paragraph tag.
  br
  .
    This text belongs to the div tag.
```

> **Tags**

**Block Expansion**
```pug
a: img

<a><img/></a>
```

## Share

#### Vue data binding

1. Basic way.
```js
<div v-model="model"/>

// v-model is just one syntactic suger.
// =>
<div
  :value="text"
  @input="e => text = e.target.value"
/>

this.$emit('input', model)
```

2. .sync 
```js
<my-dialog :visible.sync="dialogVisible" />
// =>

<my-dialog
  :visible="dialogVisible"
  @update:visible="newVisible => dialogVisible = newVisible"
/>
```

3. getter and setter
```javascript
// child component
this.$emit('input', data)

//parent component
<child v-model="val"/>

computed: {
  val: {
    get: () => {

    },
    set: () => {
      // Every time the value of val changes. Will trigger set method.      
    }
  }
}
```

#### Vue的双向绑定和实现 [link](https://www.cnblogs.com/libin-1/p/6893712.html)

[code address](https://github.com/canfoo/self-vue/tree/master/v3)

```javascript
function SelfVue (options) {
    var self = this;
    this.data = options.data;
    this.methods = options.methods;

    Object.keys(this.data).forEach(function(key) {
        self.proxyKeys(key);
    });

    observe(this.data); // 首先进行node的绑定，也可以称为数据劫持
    new Compile(options.el, this);
    options.mounted.call(this); // 所有事情处理好后执行mounted函数
}
```


**Observer.js**
```javascript
function Observer(data) {
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    walk: function(data) {
        var self = this;
        Object.keys(data).forEach(function(key) {
            self.defineReactive(data, key, data[key]);
        });
    },
    defineReactive: function(data, key, val) {
        var dep = new Dep();
        var childObj = observe(val);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function getter () {
                // compile 部分会强制调用此处的get方法，将node添加到dep中 
                if (Dep.target) {
                    dep.addSub(Dep.target);
                }
                return val;
            },
            set: function setter (newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                dep.notify();
            }
        });
    }
};

function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
};

// 维持一个list 用于存储各种被监听的node
function Dep () {
    this.subs = [];
}
Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};
Dep.target = null;
```


**Wather.js**
```javascript
function Watcher(vm, exp, cb) {
    this.cb = cb; // callback
    this.vm = vm; // Vue
    this.exp = exp; // attribute name
    this.value = this.get();  // 将自己添加到订阅器的操作 node.name ---> trigger getter
}

Watcher.prototype = {
    update: function() {
        this.run();
    },
    run: function() {
        var value = this.vm.data[this.exp];
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    get: function() {
        Dep.target = this;  // 缓存自己
        var value = this.vm.data[this.exp]  // 强制执行监听器里的get函数
        Dep.target = null;  // 释放自己
        return value;
    }
};
```

**Compile.js**
```javascript
function Compile(el, vm) {
    this.vm = vm;
    this.el = document.querySelector(el); // root element
    this.fragment = null;
    this.init();
}

Compile.prototype = {
    init: function () {
        if (this.el) {
            this.fragment = this.nodeToFragment(this.el);
            this.compileElement(this.fragment);
            this.el.appendChild(this.fragment);
        } else {
            console.log('Dom元素不存在');
        }
    },
    nodeToFragment: function (el) {
        var fragment = document.createDocumentFragment();
        var child = el.firstChild;
        while (child) {
            // 将Dom元素移入fragment中
            fragment.appendChild(child);
            child = el.firstChild
        }
        return fragment;
    },
    compileElement: function (el) {
        var childNodes = el.childNodes;
        var self = this;
        [].slice.call(childNodes).forEach(function(node) {
            var reg = /\{\{(.*)\}\}/;
            var text = node.textContent;

            if (self.isElementNode(node)) {  
                self.compile(node);
            } else if (self.isTextNode(node) && reg.test(text)) {
                self.compileText(node, reg.exec(text)[1]);
            }

            if (node.childNodes && node.childNodes.length) {
                self.compileElement(node);
            }
        });
    },
    compile: function(node) {
        var nodeAttrs = node.attributes;
        var self = this;
        Array.prototype.forEach.call(nodeAttrs, function(attr) {
            var attrName = attr.name;
            if (self.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);
                if (self.isEventDirective(dir)) {  // 事件指令
                    self.compileEvent(node, self.vm, exp, dir);
                } else {  // v-model 指令
                    self.compileModel(node, self.vm, exp, dir);
                }
                node.removeAttribute(attrName);
            }
        });
    },
    compileText: function(node, exp) {
        var self = this;
        var initText = this.vm[exp];
        this.updateText(node, initText);
        new Watcher(this.vm, exp, function (value) {
            self.updateText(node, value);
        });
    },
    compileEvent: function (node, vm, exp, dir) {
        var eventType = dir.split(':')[1];
        var cb = vm.methods && vm.methods[exp];

        if (eventType && cb) {
            node.addEventListener(eventType, cb.bind(vm), false);
        }
    },
    compileModel: function (node, vm, exp, dir) {
        var self = this;
        var val = this.vm[exp];
        this.modelUpdater(node, val);
        new Watcher(this.vm, exp, function (value) {
            self.modelUpdater(node, value);
        });

        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }
            self.vm[exp] = newValue;
            val = newValue;
        });
    },
    updateText: function (node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    },
    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },
    isEventDirective: function(dir) {
        return dir.indexOf('on:') === 0;
    },
    isElementNode: function (node) {
        return node.nodeType == 1;
    },
    isTextNode: function(node) {
        return node.nodeType == 3;
    }
}
```