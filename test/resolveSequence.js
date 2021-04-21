const {resolveSequence} = require("../index");

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
