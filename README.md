# ast
ast 工具包，封装了一些常用的方法，如字符串还原等 \
项目基于 babel \
[babel](https://babeljs.io/)

节点查看网站 \
[astexplorer](https://astexplorer.net/)

# 使用方法
## encodingConversion
```js
const {encodingConversion} = require('ast')
const parser    = require("@babel/parser");
const traverse  = require("@babel/traverse").default;
const generator = require("@babel/generator").default;

let sourceCode = "\u0068\u0061\u006e\u006c\u0069\u006e\u0067"

let ast = parser.parse(sourceCode);
traverse(ast, encodingConversion)

let {code} = generator(ast,opts = {jsescOption:{"minimal":true}});

console.log(code);

output:
hanling
```

## ConstantCalculate
```js
const {ConstantCalculate} = require("ast");

const {parse} = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;

let jscode = "var a = 123 + 456;\n" +
    "var b = 456 - 123;\n" +
    "var ab= a + b;\n" +
    "var c = !![];";

let ast = parse(jscode);

traverse(ast, ConstantCalculate);
let {code} = generator(ast);
console.log(code);


output:
var a = 579;
var b = 333;
var ab = 912;
var c = true;
```

## resolveSequence
```js
const {resolveSequence} = require("ast");

const {parse} = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;

let jscode =
    `
function func() {
  return a = 1, b = 2, a + b;
}
`
let ast = parse(jscode);

traverse(ast, resolveSequence);
let {code} = generator(ast);
console.log(code);


output:
function func() {
    a = 1;
    b = 2;
    return a + b;
}
```