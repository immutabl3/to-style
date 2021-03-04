# to-style

`to-style` is a small (`9.75KB` minified, `3.37KB` gzipped), fast object formatter for style objects for node, the browser and react.

## Installation

`$ npm i @immutabl3/to-style`

## Usage

General usage: 

```js
import toStyle from '@immutabl3/to-style';
const result = toStyle({
  x: 1,
  opacity: 0.0019,
  margin: 1,
  padding: '1rem',
  notValidCssProp: 1,
});

console.log(result.x);
// automatically generates 3d transforms 
// > matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,1,0,0,1)
console.log(result.opacity);
// reduces precision
// > 0.002
console.log(result.margin);
// turns numbers into unit values
// > '1px'
console.log(result.padding);
// to-style won't alter strings
// > '1rem'
console.log(result.notValidCssProp);
// wont apply non-css properties to the result
// > undefined
```

With React:

```js
import React from 'react';
import toStyle from '@immutabl3/to-style';

const Container = function(props) {
  return (
    // because toStyle removes invalid css properties,
    // we can store styles (e.g. opacity) flat on the
    // props object and pass it directly to "style"
    <div style={ toStyle(props) }>
      { props.children }
    </div>
  );
};
```

`to-style` is made to be used with [animations and tweens](https://github.com/tweenjs/tween.js/). 
Passing an object as a second value will use that object as the result.

```js
const coords = { x: 0, y: 0 };
const style = {};
const tween = new TWEEN.Tween(coords)
  .to({ x: 300, y: 200 }, 1000)
  .onUpdate(function() {
    const styled = toStyle(coords, style);
    console.log(style === style);
    // > true
    // do what you'd like with the style.transform 
  })
  .start();
```

`to-style` believes in staying out of your way, not doing too much and having smart defaults. 
Create your own custom styler by overriding the defaults (see options below):

```js
import toStyle from '@immutabl3/to-style';

const myStyler = toStyle.create({ transform3d: false });
const result = toStyle({
  x: 1,
});

console.log(result.x);
// > translateX(1px)
```

## Options

#### *`transform3d`* _default: *true*_

If any transformation properties are defined, they will be converted to a 3d matrix: `x`, `y`, 
`z`, `translateX`, `translateY`, `translateZ`, `scale`, `scaleX`, `scaleY`, `scaleZ`, `rotate`, 
`rotateX`, `rotateY`, `rotateZ`, `skew`, `skewX`, `skewY`.

Disabling this feature generates more verbose 2d code e.g. `x` => `translateX(1px)`

#### *`blacklist`* _default: *['x', 'y']*_

An array of keys to blacklist from applying to the style object. By default, `x` and `y` are valid
values in a [CSSStyleDeclaration](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration) 
but are being used as shorthand transformation properties.

#### *`format`* _type: *{}*_

An object defining which formats will be applied. By default, the following keys will be formatted: 
`opacity`, `top`, `right`, `bottom`, `left`, `width`, `height`, `perspective`, `willChange`, `margin`, 
`padding`, `size`.

#### *`units`* _type: *{}*_

An object defining the units for formatted properties.

#### *`precision`* _type: *{}*_

An object defining the percision for formatted properties when defined as numbers.

## Tests

Clone the repo, then:

1. `npm install`
1. `npm test`

A benchmark can also be run:

`npm run benchmark`

## Notes

As a design decision, this library optimizes for runtime speed in exchange for 
setup cost and greater (but stable) memory consumption. All functions to format 
the passed object are precomposed. This generally isn't a big tradeoff as runtime 
speed and preventing large garbage collections are more important when dealing with 
animation (e.g. tweening) and re-draws (react).

## License

The MIT License (MIT)

Copyright (c) 2021 Immutable, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
