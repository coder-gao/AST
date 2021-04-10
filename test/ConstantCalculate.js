const {ConstantCalculate} = require("../index");

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
