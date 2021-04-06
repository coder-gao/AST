# ast
ast 工具包，封装了一些常用的方法，如字符串还原等 \
项目基于 babel \
[babel](https://babeljs.io/)

节点查看网站 \
[astexplorer](https://astexplorer.net/)

# 使用方法
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
```