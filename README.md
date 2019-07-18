# jest-tutorial
A tutorial for setting up jest testing to use ES6 modules.

# webpack-tutorial

## TLDR
TODO ??
```
npm install
npm run test
```
should run all the tests in the command line with them passing

## Walkthrough
This is my notes from going through a jest starting documentation.  https://jestjs.io/docs/en/getting-started

### Jest Basic Setup
There is some dependencies we need to install before starting


```
npm init -y
npm install --save-dev jest
```

Now you will be able to run for a basic function using CommonJs for import/export.

Creating a function like _fibonacci.js_:
```
/**
 * Returns a fibonacci F_n = F_(n-1) + F_(n-2)
 * where F_1 = 1 and F_0 = 1
 * @param n {int} the number in the fibonacci sequence to calculate
 */
function fibonacci(n) {
  if (n < 0){
    return -1;
  } else if (n == 0  || n == 1){
    return 1;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

module.exports = fibonacci;
```

can be tested in a file _fibonacci.test.js_:
```
const fibonacci = require('./fibonacci');


test('Fibonacci F(3) = 2', () => {
  expect(fibonacci(3)).toBe(3);
});

test('Fibonacci F(1) = 1', () => {
  expect(fibonacci(1)).toBe(1);
});

test('Fibonacci F(0) = 1', () => {
  expect(fibonacci(0)).toBe(1);
});

test('Fibonacci F(2) = 2', () => {
  expect(fibonacci(2)).toBe(2);
});
```
Now just need to tell npm how to run our tests so add to _package.json_:
```
"scripts": {
 "test": "jest"
}
```


Now running with a command like `npm run tests` will run the above test and pass.
However, this is a simple function and what if we want to test a class object.



### ES6 Classes and Babel
Creating class _rectangle.js_
```
export class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  area(){
    return this.height * this.width;
  }

  perimeter(){
    return this.height * 3 + this.width * 3;
  }
}
```

Now trying to test the above class with _rectangle.test.js_
```
const Rectangle = require('./Rectangle').Rectangle;

test('1 X 1 Rectangle area is 1', () => {
  const rectangle = new Rectangle(1, 1);
  expect(rectangle.area()).toBe(1);
});
```
Now running `npm run test` will result in some console errors

```
 FAIL  src/rectangle.test.js
  ● Test suite failed to run

    Jest encountered an unexpected token

    This usually means that you are trying to import a file which Jest cannot parse, e.g. it's not plain JavaScript.

    By default, if Jest sees a Babel config, it will use that to transform your files, ignoring "node_modules".

    Here's what you can do:
     • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/en/configuration.html

    Details:

    C:\Users\dfraser\Documents\GitHub\jest-tutorial\src\Rectangle.js:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){export class Rectangle {
                                                                                             ^^^^^^

    SyntaxError: Unexpected token export

    > 1 | var Rectangle = require('./Rectangle');
        | ^
      2 |
      3 | test('1 X 1 Rectangle area is 1', () => {
      4 |   const rectangle = new Rectangle(1, 1);

      at ScriptTransformer._transformAndBuildScript (node_modules/@jest/transform/build/ScriptTransformer.js:471:17)
      at Object.<anonymous> (src/rectangle.test.js:1:1)
```

This is caused since jest runs on Node and only understands CommonJS.
Luckily, Babel to the rescue. It will transpile our classes so that jest
can understand them and able to run our tests.


```
npm install --save-dev babel-jest @babel/core @babel/preset-env
```

Now need to create a _babel.config.js_
```
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
```

Now running `npm run test` will run our tests and successfully.


Further can even change _rectangle.test.js_ to use ES6 imports
```
import {Rectangle} from "./rectangle";

test('1 X 1 Rectangle area is 1', () => {
  const rectangle = new Rectangle(1, 1);
  expect(rectangle.area()).toBe(1);
});
```
