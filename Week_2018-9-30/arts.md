# Week 2018-9-30

## Algorithm

[883. Projection Area of 3D Shapes](https://leetcode.com/problems/projection-area-of-3d-shapes/description/)

[Transpose Matrix](https://leetcode.com/problems/transpose-matrix/description/)

## Review

translation: [JavaScript engine fundamentals: Shapes and Inline Caches](https://github.com/RogerZZZZZ/V8-blog/tree/master/Shapes-and-Inline-Caches)

## Tips

#### Browser

> **copyToClipboard**

```javascript
const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};
```

> **createElement**

Creates an element from a string (without appending it to the document). If the given string contains multiple elements, only the first one will be returned.

```javascript
const createElement = str => {
  const el = document.createElement('div');
  el.innerHTML = str;
  return el.firstElementChild;
};

const el = createElement(
  `<div class="container">
    <p>Hello!</p>
  </div>`
);
console.log(el.className); // 'container'
```

> **createEventHub**

Creates a pub/sub (publish–subscribe) event hub with emit, on, and off methods.

```javascript
const createEventHub = () => ({
  hub: Object.create(null),
  emit(event, data) {
    (this.hub[event] || []).forEach(handler => handler(data));
  },
  on(event, handler) {
    if (!this.hub[event]) this.hub[event] = [];
    this.hub[event].push(handler);
  },
  off(event, handler) {
    const i = (this.hub[event] || []).findIndex(h => h === handler);
    if (i > -1) this.hub[event].splice(i, 1);
  }
});
```

> **getImages**

Fetches all images from within an element and puts them into an array

```javascript
const getImages = (el, includeDuplicates = false) => {
  const images = [...el.getElementsByTagName('img')].map(img => img.getAttribute('src'));
  return includeDuplicates ? images : [...new Set(images)];
};
```

> **getScrollPosition**

Returns the scroll position of the current page.

```javascript
const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});
```

> **getStyle**

Returns the value of a CSS rule for the specified element.

```javascript
const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];
```

> **hasClass**

```javascript
const hasClass = (el, className) => el.classList.contains(className);
```

> **hashBrowser**

Creates a hash for a value using the SHA-256 algorithm. Returns a promise.

```javascript
const hashBrowser = val =>
  crypto.subtle.digest('SHA-256', new TextEncoder('utf-8').encode(val)).then(h => {
    let hexes = [],
      view = new DataView(h);
    for (let i = 0; i < view.byteLength; i += 4)
      hexes.push(('00000000' + view.getUint32(i).toString(16)).slice(-8));
    return hexes.join('');
  });
```

> **insertAfter**

Inserts an HTML string after the end of the specified element.

```javascript
const insertAfter = (el, htmlString) => el.insertAdjacentHTML('afterend', htmlString);

insertAfter(document.getElementById('myId'), '<p>after</p>'); // <div id="myId">...</div> <p>after</p>
```

> **insertBefore**

```javascript
const insertBefore = (el, htmlString) => el.insertAdjacentHTML('beforebegin', htmlString);
```

> **isBrowserTabFocused**

```javascript
const isBrowserTabFocused = () => !document.hidden;
```

> **observeMutations**

Returns a new MutationObserver and runs the provided callback for each mutation on the specified element.

```javascript
const observeMutations = (element, callback, options) => {
  const observer = new MutationObserver(mutations => mutations.forEach(m => callback(m)));
  observer.observe(
    element,
    Object.assign(
      {
        childList: true,
        attributes: true,
        attributeOldValue: true,
        characterData: true,
        characterDataOldValue: true,
        subtree: true
      },
      options
    )
  );
  return observer;
};

const obs = observeMutations(document, console.log); // Logs all mutations that happen on the page
obs.disconnect(); // Disconnects the observer and stops logging mutations on the page
```

> **recordAnimationFrames**

Invokes the provided callback on each animation frame.

```javascript
const recordAnimationFrames = (callback, autoStart = true) => {
  let running = true,
    raf;
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };
  const start = () => {
    running = true;
    run();
  };
  const run = () => {
    raf = requestAnimationFrame(() => {
      callback();
      if (running) run();
    });
  };
  if (autoStart) start();
  return { start, stop };
};

const cb = () => console.log('Animation frame fired');
const recorder = recordAnimationFrames(cb); // logs 'Animation frame fired' on each animation frame
recorder.stop(); // stops logging
recorder.start(); // starts again
const recorder2 = recordAnimationFrames(cb, false); // `start` needs to be explicitly called to begin recording frames
```

> **scrollToTop**

```javascript
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
```

> **smoothScroll**

Smoothly scrolls the element on which it's called into the visible area of the browser window.

```javascript
const smoothScroll = element =>
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  });

smoothScroll('#fooBar'); // scrolls smoothly to the element with the id fooBar
smoothScroll('.fooBar'); // scrolls smoothly to the first element with a class of fooBar
```

> **toggleClass**

```javascript
const toggleClass = (el, className) => el.classList.toggle(className);

toggleClass(document.querySelector('p.special'), 'special'); // The paragraph will not have the 'special' class anymore
```

> **triggerEvent**

Triggers a specific event on a given element, optionally passing custom data.

```javascript
const triggerEvent = (el, eventType, detail) =>
  el.dispatchEvent(new CustomEvent(eventType, { detail }));

triggerEvent(document.getElementById('myId'), 'click');
triggerEvent(document.getElementById('myId'), 'click', { username: 'bob' });
```

## Share