/**
 * 编码转换，将不可读字符串转换为可读字符串 \
 * "\u0068\u0061\u006e\u006c\u0069\u006e\u0067"  ==>  "hanling"
 * @type {{NumericLiteral({node: *}): void, StringLiteral({node: *}): void}}
 */
const {types} = require("@babel/core");

const encodingConversion =
    {
        NumericLiteral({node}) {
            if (node.extra && /^0[obx]/i.test(node.extra.raw)) {
                node.extra = undefined;
            }
        },
        StringLiteral({node}) {
            if (node.extra && /\\[ux]/gi.test(node.extra.raw)) {
                node.extra = undefined;
            }
        },
    }

/**
 *
 * @type {{"BinaryExpression|UnaryExpression|ConditionalExpression|CallExpression|MemberExpression|SequenceExpression"(*): void}}
 */
const ConstantCalculate =
    {
        "BinaryExpression|UnaryExpression|ConditionalExpression|CallExpression|MemberExpression|SequenceExpression"(path) {
            if (path.isUnaryExpression({operator: "-"}) || path.isUnaryExpression({operator: "void"})) {
                return;
            }
            const {confident, value} = path.evaluate();
            if (value == "Infinity" || !confident) return;
            path.replaceInline(types.valueToNode(value));
        },
    }

const resolveSequence = {
    SequenceExpression: {
        exit(path){
            let CondintionPath = path.findParent(p => p.isConditionalExpression());
            let statement = path.getStatementParent();
            if (!statement) return;
            if (CondintionPath)
            {
                let nextCondintionPath = statement.findParent(p => p.isConditionalExpression());
                if (nextCondintionPath != CondintionPath) return;
            }
            let expressions = path.get('expressions');
            let lastExpression = expressions.pop();
            for (let expression of expressions)
            {
                if(expression.isLiteral() ||expression.isIdentifier())
                {
                    expression.remove();
                    continue;
                }
                statement.insertBefore(types.ExpressionStatement(expression=expression.node));
            }
            path.replaceInline(lastExpression);
        }
    },
}

exports.encodingConversion = encodingConversion
exports.ConstantCalculate = ConstantCalculate
exports.resolveSequence = resolveSequence