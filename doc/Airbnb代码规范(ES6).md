## Airbnb代码规范(ES6)

### 1 [引用](#refrence)

- 1.1 所用引用使用`const`,避免使用`var`.

> 为什么？这能确保你无法对引用重新赋值，也不会导致出现 bug 或难以理解。

```
  // bad
  var a = 1;
  var b = 2;

 // twj test
  // good
  const a = 1;
  const b = 2;
```

- 1.2 如果一定要使用可变动的引用，使用`let`代替`var`.

> 为什么？因为 let 是块级作用域，而 var 是函数作用域。

```
  // bad
  var count = 1;
  if (true) {
    count += 1;
  }

  // good, use the let.
  let count = 1;
  if (true) {
    count += 1;
  }
```

- 1.3 注意`let`和`const`，都是块级作用域。

```
// const 和 let 只存在于它们被定义的区块内。
{
  let a = 1;
  const b = 1;
}
console.log(a); // ReferenceError
console.log(b); // ReferenceError
```

### 2 [对象](#object)

- 2.1 使用字面值创建对象

```
// bad
const item = new Object();

// good
const item = {};
```

- 2.2 如果你的代码在浏览器环境下执行，别使用保留字作为键值。这样的话在 IE8 不会运行。 但在 ES6 模块和服务器端中使用没有问题。

```
// bad
const superman = {
  default: { clark: 'kent' },
  private: true,
};

// good
const superman = {
  defaults: { clark: 'kent' },
  hidden: true,
};
```
- 2.3 创建有动态属性名的对象时，使用可被计算的属性名称。

> 为什么？因为这样可以让你在一个地方定义所有的对象属性。

```
  function getKey(k) {
    return `a key named ${k}`;
  }

  // bad
  const obj = {
    id: 5,
    name: 'San Francisco',
  };
  obj[getKey('enabled')] = true;

  // good
  const obj = {
    id: 5,
    name: 'San Francisco',
    [getKey('enabled')]: true,
  };
```

- 2.4 使用对象方法简写。

```
  // bad
const atom = {
  value: 1,

  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  value: 1,

  addValue(value) {
    return atom.value + value;
  },
};
```

### 3 [数组](#array)

- 3.1 使用字面值创建数组

```
// bad
const items = new Array();

// good
const items = [];
```

- 3.2 向数组添加元素时使用 Arrary.push 替代直接赋值。

```
const someStack = [];

// bad
someStack[someStack.length] = 'abracadabra';

// good
someStack.push('abracadabra');
```

- 3.3 使用拓展运算符 `...` 复制数组。

```
// bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];
```

- 3.4 使用 Array.from 把一个类数组对象转换成数组。

```
const bar = ["a", "b", "c"];
Array.from(bar);
// ["a", "b", "c"]

Array.from('foo');
// ["f", "o", "o"]
```

### 4 [解构](#deconstrucion)

- 4.1 使用解构存取和使用多属性对象。

> 为什么？因为解构能减少临时引用属性。

```
  // bad
  function getFullName(user) {
    const firstName = user.firstName;
    const lastName = user.lastName;

    return `${firstName} ${lastName}`;
  }

  // good
  function getFullName(obj) {
    const { firstName, lastName } = obj;
    return `${firstName} ${lastName}`;
  }

  // best
  function getFullName({ firstName, lastName }) {
    return `${firstName} ${lastName}`;
  }
```

- 4.2 对数组使用解构赋值。

```
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```

- 4.3 需要回传多个值时，使用对象解构，而不是数组解构.

>为什么？增加属性或者改变排序不会改变调用时的位置。

```
  // bad
  function processInput(input) {
    // then a miracle occurs
    return [left, right, top, bottom];
  }

  // 调用时需要考虑回调数据的顺序。
  const [left, __, top] = processInput(input);

  // good
  function processInput(input) {
    // then a miracle occurs
    return { left, right, top, bottom };
  }

  // 调用时只选择需要的数据
  const { left, right } = processInput(input);
```

### 5 [字符串](#string)

- 5.1 字符串使用单引号 ''

```
// bad
const name = "Capt. Janeway";

// good
const name = 'Capt. Janeway';
```

- 5.2 字符串过长不便于阅读时，应该使用字符串连接号换行。

> 注：过度使用字串连接符号可能会对性能造成影响

```
// bad
const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';

// bad
const errorMessage = 'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.';

// good
const errorMessage = 'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.';
```

- 5.3 程序化生成字符串时，使用模板字符串代替字符串连接。

>为什么？模板字符串更为简洁，更具可读性。

```
  // bad
  function sayHi(name) {
    return 'How are you, ' + name + '?';
  }

  // bad
  function sayHi(name) {
    return ['How are you, ', name, '?'].join();
  }

  // good
  function sayHi(name) {
    return `How are you, ${name}?`;
  }
```

### 6 [函数](#function)

- 6.1  使用函数声明代替函数表达式

>为什么？因为函数声明是可命名的，所以他们在调用栈中更容易被识别。此外，函数声明会把整个函数提升（hoisted），而函数表达式只会把函数的引用变量名提升

```
    // bad
  const foo = function () {
  };

  // good
  function foo() {
  }
```

- 6.2 永远不要在一个非函数代码块（if、while 等）中声明一个函数，把那个函数赋给一个变量。浏览器允许你这么做，但它们的解析表现不一致。

>注意: ECMA-262 把 block 定义为一组语句。函数声明不是语句。

```
  // bad
if (currentUser) {
  function test() {
    console.log('Nope.');
  }
}

// good
let test;
if (currentUser) {
  test = () => {
    console.log('Yup.');
  };
}
```

- 6.3 永远不要把参数命名为 arguments。这将取代原来函数作用域内的 arguments 对象。

```
// bad
function nope(name, options, arguments) {
  // ...stuff...
}

// good
function yup(name, options, args) {
  // ...stuff...
}
```

- 6.4 不要使用 arguments。可以选择 rest 语法 `...` 替代。

>为什么？使用 `...` 能明确你要传入的参数。另外 rest 参数是一个真正的数组，而 arguments是一个类数组。

```
  // bad
  function concatenateAll() {
    const args = Array.prototype.slice.call(arguments);
    return args.join('');
  }

  // good
  function concatenateAll(...args) {
    return args.join('');
  }
```

- 6.5 直接给函数的参数指定默认值，不要使用一个变化的函数参数。

```
// really bad
function handleThings(opts) {
  // 不！我们不应该改变函数参数。
  // 更加糟糕: 如果参数 opts 是 false 的话，它就会被设定为一个对象。
  // 但这样的写法会造成一些 Bugs。
  //（译注：例如当 opts 被赋值为空字符串，opts 仍然会被下一行代码设定为一个空对象。）
  opts = opts || {};
  // ...
}

// still bad
function handleThings(opts) {
  if (opts === void 0) {
    opts = {};
  }
  // ...
}

// good
function handleThings(opts = {}) {
  // ...
}
```

### 7 [箭头函数](#arrow)

- 7.1 当你必须使用函数表达式（或传递一个匿名函数）时，使用箭头函数符号。

>为什么?因为箭头函数创造了新的一个 this 执行环境，通常情况下都能满足你的需求，而且这样的写法更为简洁。

>为什么不？如果你有一个相当复杂的函数，你或许可以把逻辑部分转移到一个函数声明上。

```
  // bad
  [1, 2, 3].map(function (x) {
    return x * x;
  });

  // good
  [1, 2, 3].map((x) => {
    return x * x;
  });
```

- 7.2 如果一个函数适合用一行写出并且只有一个参数，那就把花括号、圆括号和 return 都省略掉。如果不是，那就不要省略。

>为什么？语法糖。在链式调用中可读性很高。

>为什么不？当你打算回传一个对象的时候。

```
    // good
  [1, 2, 3].map(x => x * x);

  // good
  [1, 2, 3].reduce((total, n) => {
    return total + n;
  }, 0);
```

### 8 [构造函数](#consturor)

- 8.1  总是使用`class`。避免直接操作`prototype`。

>为什么? 因为 class 语法更为简洁更易读。

```
    // bad
  function Queue(contents = []) {
    this._queue = [...contents];
  }
  Queue.prototype.pop = function() {
    const value = this._queue[0];
    this._queue.splice(0, 1);
    return value;
  }

  // good
  class Queue {
    constructor(contents = []) {
      this._queue = [...contents];
    }
    pop() {
      const value = this._queue[0];
      this._queue.splice(0, 1);
      return value;
    }
  }
```

- 8.2 使用`extends`继承。

>为什么？因为 extends 是一个内建的原型继承方法并且不会破坏 instanceof。

```
  // bad
  const inherits = require('inherits');
  function PeekableQueue(contents) {
    Queue.apply(this, contents);
  }
  inherits(PeekableQueue, Queue);
  PeekableQueue.prototype.peek = function() {
    return this._queue[0];
  }

  // good
  class PeekableQueue extends Queue {
    peek() {
      return this._queue[0];
    }
  }
```

- 8.3 方法可以返回 this 来帮助链式调用。

```
  // bad
Jedi.prototype.jump = function() {
  this.jumping = true;
  return true;
};

Jedi.prototype.setHeight = function(height) {
  this.height = height;
};

const luke = new Jedi();
luke.jump(); // => true
luke.setHeight(20); // => undefined

// good
class Jedi {
  jump() {
    this.jumping = true;
    return this;
  }

  setHeight(height) {
    this.height = height;
    return this;
  }
}

const luke = new Jedi();

luke.jump()
  .setHeight(20);
```

- 8.4 可以写一个自定义的 toString() 方法，但要确保它能正常运行并且不会引起副作用。

```
class Jedi {
  constructor(options = {}) {
    this.name = options.name || 'no name';
  }

  getName() {
    return this.name;
  }

  toString() {
    return `Jedi - ${this.getName()}`;
  }
}
```

### 9 [模块](#module)

- 9.1总是使用模组 (import/export) 而不是其他非标准模块系统。你可以编译为你喜欢的模块系统。

>为什么？模块就是未来，让我们开始迈向未来吧。

```
  // bad
  const AirbnbStyleGuide = require('./AirbnbStyleGuide');
  module.exports = AirbnbStyleGuide.es6;

  // ok
  import AirbnbStyleGuide from './AirbnbStyleGuide';
  export default AirbnbStyleGuide.es6;

  // best
  import { es6 } from './AirbnbStyleGuide';
  export default es6;
```

- 9.2不要使用通配符 import。

>为什么？这样能确保你只有一个默认 export。

```
  // bad
  import * as AirbnbStyleGuide from './AirbnbStyleGuide';

  // good
  import AirbnbStyleGuide from './AirbnbStyleGuide';
```

- 9.3 不要从 import 中直接 export。

>为什么？虽然一行代码简洁明了，但让 import 和 export 各司其职让事情能保持一致。

```
  // bad
  // filename es6.js
  export { es6 as default } from './airbnbStyleGuide';

  // good
  // filename es6.js
  import { es6 } from './AirbnbStyleGuide';
  export default es6;
```

### 10 [迭代器](#iterator)

- 10.1 不要使用 iterators。使用高阶函数例如 map() 和 reduce() 替代 for-of。

>为什么？这加强了我们不变的规则。处理纯函数的回调值更易读，这比它带来的副作用更重要。

```
  const numbers = [1, 2, 3, 4, 5];

  // bad
  let sum = 0;
  for (let num of numbers) {
    sum += num;
  }

  sum === 15;

  // good
  let sum = 0;
  numbers.forEach((num) => sum += num);
  sum === 15;

  // best (use the functional force)
  const sum = numbers.reduce((total, num) => total + num, 0);
  sum === 15;
```

- 10.2 现在还不要使用 generators。

>为什么？因为它们现在还没法很好地编译到 ES5。

### 11 [属性](#attr)

- 11.1 使用`.`来访问对象的属性。

```
const luke = {
  jedi: true,
  age: 28,
};

// bad
const isJedi = luke['jedi'];

// good
const isJedi = luke.jedi;
```

- 11.2 当通过变量访问属性时使用中括号`[]`。

```
const luke = {
  jedi: true,
  age: 28,
};

function getProp(prop) {
  return luke[prop];
}

const isJedi = getProp('jedi');
```

### 12 [变量](#var)

- 12.1 一直使用 const 来声明变量，如果不这样做就会产生全局变量。我们需要避免全局命名空间的污染。地球队长已经警告过我们了。（译注：全局，global 亦有全球的意思。地球队长的责任是保卫地球环境，所以他警告我们不要造成「全球」污染。）

```
// bad
superPower = new SuperPower();

// good
const superPower = new SuperPower();
```

- 12.2 连续声明变量时，使用`const`或`let`声明每个变量。

>为什么？增加新变量将变的更加容易，而且你永远不用再担心调换错`;` 跟 `,`。

```
// bad
const items = getItems(),
    goSportsTeam = true,
    dragonball = 'z';

// bad
// (compare to above, and try to spot the mistake)
const items = getItems(),
    goSportsTeam = true;
    dragonball = 'z';

// good
const items = getItems();
const goSportsTeam = true;
const dragonball = 'z';
```

- 12.3 将所有的 const 和 let 分组

>为什么？当你需要把已赋值变量赋值给未赋值变量时非常有用。

```
  // bad
  let i, len, dragonball,
      items = getItems(),
      goSportsTeam = true;

  // bad
  let i;
  const items = getItems();
  let dragonball;
  const goSportsTeam = true;
  let len;

  // good
  const goSportsTeam = true;
  const items = getItems();
  let dragonball;
  let i;
  let length;
```

- 12.4 在你需要的地方给变量赋值，但请把它们放在一个合理的位置。

>为什么？let 和 const 是块级作用域而不是函数作用域。

```
  // good
  function() {
    test();
    console.log('doing stuff..');

    //..other stuff..

    const name = getName();

    if (name === 'test') {
      return false;
    }

    return name;
  }

  // bad - unnecessary function call
  function(hasName) {
    const name = getName();

    if (!hasName) {
      return false;
    }

    this.setFirstName(name);

    return true;
  }

  // good
  function(hasName) {
    if (!hasName) {
      return false;
    }

    const name = getName();
    this.setFirstName(name);

    return true;
  }
```

- 12.5 不要使用链式变量赋值。

>为什么？链式变量赋值会产生全局作用域污染

```
// bad
(function example() {
  // JavaScript interprets this as
  // let a = ( b = ( c = 1 ) );
  // The let keyword only applies to variable a; variables b and c become
  // global variables.
  let a = b = c = 1;
}());

console.log(a); // throws ReferenceError
console.log(b); // 1
console.log(c); // 1

// good
(function example() {
  let a = 1;
  let b = a;
  let c = a;
}());

console.log(a); // throws ReferenceError
console.log(b); // throws ReferenceError
console.log(c); // throws ReferenceError

// the same applies for `const`
```

- 12.6 避免使用一员递增和递减(`++`,`--`)

>根据eslint文档，一元递增和递减语句会受到自动分号插入的影响，并且可能导致应用程序中的值递增或递减，从而导致无提示错误。 使用诸如num + = 1而不是num ++或num ++之类的语句来更改您的值也更具表现力。 禁止一元递增和递减语句也会阻止您无意中预先递增/预递减值，这也会导致程序中的意外行为。

```
// bad

const array = [1, 2, 3];
let num = 1;
num++;
--num;

let sum = 0;
let truthyCount = 0;
for (let i = 0; i < array.length; i++) {
  let value = array[i];
  sum += value;
  if (value) {
    truthyCount++;
  }
}

// good

const array = [1, 2, 3];
let num = 1;
num += 1;
num -= 1;

const sum = array.reduce((a, b) => a + b, 0);
const truthyCount = array.filter(Boolean).length;
```

### 13 [提升](#hoisting)

- 13.1 var 声明会被提升至该作用域的顶部，但它们赋值不会提升。let 和 const 被赋予了一种称为「暂时性死区（Temporal Dead Zones, TDZ）」的概念。这对于了解为什么 `type of` 不再安全相当重要。

```
// 我们知道这样运行不了
// （假设 notDefined 不是全局变量）
function example() {
  console.log(notDefined); // => throws a ReferenceError
}

// 由于变量提升的原因，
// 在引用变量后再声明变量是可以运行的。
// 注：变量的赋值 `true` 不会被提升。
function example() {
  console.log(declaredButNotAssigned); // => undefined
  var declaredButNotAssigned = true;
}

// 编译器会把函数声明提升到作用域的顶层，
// 这意味着我们的例子可以改写成这样：
function example() {
  let declaredButNotAssigned;
  console.log(declaredButNotAssigned); // => undefined
  declaredButNotAssigned = true;
}

// 使用 const 和 let
function example() {
  console.log(declaredButNotAssigned); // => throws a ReferenceError
  console.log(typeof declaredButNotAssigned); // => throws a ReferenceError
  const declaredButNotAssigned = true;
}
```

- 13.2 匿名函数表达式的变量名会被提升，但函数内容并不会。

```
function example() {
  console.log(anonymous); // => undefined

  anonymous(); // => TypeError anonymous is not a function

  var anonymous = function() {
    console.log('anonymous function expression');
  };
}
```

- 13.3 命名的函数表达式的变量名会被提升，但函数名和函数函数内容并不会。

```
function example() {
  console.log(named); // => undefined

  named(); // => TypeError named is not a function

  superPower(); // => ReferenceError superPower is not defined

  var named = function superPower() {
    console.log('Flying');
  };
}

// the same is true when the function name
// is the same as the variable name.
function example() {
  console.log(named); // => undefined

  named(); // => TypeError named is not a function

  var named = function named() {
    console.log('named');
  }
}
```

- 13.4 函数声明的名称和函数体都会被提升。

```
function example() {
  superPower(); // => Flying

  function superPower() {
    console.log('Flying');
  }
}
```

### 14 [比较运算符和等号](#compress)

- 14.1 优先使用 === 和 !== 而不是 == 和 !=.

- 14.2 条件表达式例如 if 语句通过抽象方法 ToBoolean 强制计算它们的表达式并且总是遵守下面的规则：

***
对象 被计算为 true
Undefined 被计算为 false
Null 被计算为 false
布尔值 被计算为 布尔的值
数字 如果是 +0、-0、或 NaN 被计算为 false, 否则为 true
字符串 如果是空字符串 '' 被计算为 false，否则为 true
***

```
if ([0]) {
  // true
  // An array is an object, objects evaluate to true
}

// bad
if (name !== '') {
  // ...stuff...
}

// good
if (name) {
  // ...stuff...
}

// bad
if (collection.length > 0) {
  // ...stuff...
}

// good
if (collection.length) {
  // ...stuff...
}
```

- 14.3 在`switch`语句中，使用括号把`case`和`default`语句块包裹起来。

>为什么?词法声明在整个`switch`块中都是可见的，但只有在赋值时才会被初始化。 所以当多个case子句试图定义相同的变量时，可以能会出现bug。

```
// bad
switch (foo) {
  case 1:
    let x = 1;
    break;
  case 2:
    const y = 2;
    break;
  case 3:
    function f() {
      // ...
    }
    break;
  default:
    class C {}
}

// good
switch (foo) {
  case 1: {
    let x = 1;
    break;
  }
  case 2: {
    const y = 2;
    break;
  }
  case 3: {
    function f() {
      // ...
    }
    break;
  }
  case 4:
    bar();
    break;
  default: {
    class C {}
  }
}
```

- 14.4 避免不必要的三元运算。

```
// bad
const foo = a ? a : b;
const bar = c ? true : false;
const baz = c ? false : true;

// good
const foo = a || b;
const bar = !!c;
const baz = !c;
```

### 15 [逗号](#commas)

- 15.1 行首逗号：不需要。

```
// bad
const story = [
    once
  , upon
  , aTime
];

// good
const story = [
  once,
  upon,
  aTime,
];

// bad
const hero = {
    firstName: 'Ada'
  , lastName: 'Lovelace'
  , birthYear: 1815
  , superPower: 'computers'
};

// good
const hero = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  birthYear: 1815,
  superPower: 'computers',
};
```

- 15.2 增加结尾的逗号: 需要。

>为什么? 这会让 git diffs 更干净。另外，像 babel 这样的转译器会移除结尾多余的逗号，也就是说你不必担心老旧浏览器的尾逗号问题。

```
  // bad - git diff without trailing comma
  const hero = {
       firstName: 'Florence',
  -    lastName: 'Nightingale'
  +    lastName: 'Nightingale',
  +    inventorOf: ['coxcomb graph', 'modern nursing']
  }

  // good - git diff with trailing comma
  const hero = {
       firstName: 'Florence',
       lastName: 'Nightingale',
  +    inventorOf: ['coxcomb chart', 'modern nursing'],
  }
```

```
  // bad
  const hero = {
    firstName: 'Dana',
    lastName: 'Scully'
  };

  const heroes = [
    'Batman',
    'Superman'
  ];

  // good
  const hero = {
    firstName: 'Dana',
    lastName: 'Scully',
  };

  const heroes = [
    'Batman',
    'Superman',
  ];
```

### 16 [类型转换](#typecasting)

- 16.1 字符串：

```
//  => this.reviewScore = 9;

// bad
const totalScore = this.reviewScore + '';

// good
const totalScore = String(this.reviewScore);
```

- 16.2 对数字使用 parseInt 转换，并带上类型转换的基数。

```
const inputValue = '4';

// bad
const val = new Number(inputValue);

// bad
const val = +inputValue;

// bad
const val = inputValue >> 0;

// bad
const val = parseInt(inputValue);

// good
const val = Number(inputValue);

// good
const val = parseInt(inputValue, 10);
```

- 16.3 如果因为某些原因 parseInt 成为你所做的事的瓶颈而需要使用位操作解决性能问题时，留个注释说清楚原因和你的目的。

```
// good
/**
 * 使用 parseInt 导致我的程序变慢，
 * 改成使用位操作转换数字快多了。
 */
const val = inputValue >> 0;
```

- 16.4 注: 小心使用位操作运算符。数字会被当成 64 位值，但是位操作运算符总是返回 32 位的整数（参考）。位操作处理大于 32 位的整数值时还会导致意料之外的行为。关于这个问题的讨论。最大的 32 位整数是 2,147,483,647：

```
2147483647 >> 0 //=> 2147483647
2147483648 >> 0 //=> -2147483648
2147483649 >> 0 //=> -2147483647
```

- 16.5 布尔:

```
const age = 0;

// bad
const hasAge = new Boolean(age);

// good
const hasAge = Boolean(age);

// good
const hasAge = !!age;
```

### 17 [命名规则](#namerule)

- 17.1 使用驼峰式命名对象、函数和实例。

```
// bad
const OBJEcttsssss = {};
const this_is_my_object = {};
function c() {}

// good
const thisIsMyObject = {};
function thisIsMyFunction() {}
```

- 17.2 使用帕斯卡式命名构造函数或类。

```
// bad
function user(options) {
  this.name = options.name;
}

const bad = new user({
  name: 'nope',
});

// good
class User {
  constructor(options) {
    this.name = options.name;
  }
}

const good = new User({
  name: 'yup',
});
```

- 17.3 使用下划线 _ 开头命名私有属性。

```
// bad
this.__firstName__ = 'Panda';
this.firstName_ = 'Panda';

// good
this._firstName = 'Panda';
```

- 17.4 别保存 this 的引用。使用箭头函数或 Function#bind。

```
// bad
function foo() {
  const self = this;
  return function() {
    console.log(self);
  };
}

// bad
function foo() {
  const that = this;
  return function() {
    console.log(that);
  };
}

// good
function foo() {
  return () => {
    console.log(this);
  };
}
```

- 17.5 如果你的文件只输出一个类，那你的文件名必须和类名完全保持一致。

```
// file contents
class CheckBox {
  // ...
}
export default CheckBox;

// in some other file
// bad
import CheckBox from './checkBox';

// bad
import CheckBox from './check_box';

// good
import CheckBox from './CheckBox';
```

- 17.6 当你导出默认的函数时使用驼峰式命名。你的文件名必须和函数名完全保持一致。

```
function makeStyleGuide() {
}

export default makeStyleGuide;
```

- 17.7 当你导出单例、函数库、空对象时使用帕斯卡式命名。

```
const AirbnbStyleGuide = {
  es6: {
  }
};

export default AirbnbStyleGuide;
```