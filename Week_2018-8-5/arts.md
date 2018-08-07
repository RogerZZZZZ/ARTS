# Week 2018-8-5
## Algorithm

[Array Nesting](https://leetcode.com/problems/array-nesting/description/)

[License ket Formatting](https://leetcode.com/problems/license-key-formatting/description/)

## Review

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