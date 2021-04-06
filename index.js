/**
 * 编码转换，将不可读字符串转换为可读字符串 \
 * "\u0068\u0061\u006e\u006c\u0069\u006e\u0067"  ==>  "hanling"
 * @type {{NumericLiteral({node: *}): void, StringLiteral({node: *}): void}}
 */
const encodingConversion = {
    NumericLiteral({node}) {
        if (node.extra && /^0[obx]/i.test(node.extra.raw)) {
            node.extra = undefined;
        }
    },
    StringLiteral({node})
    {
        if (node.extra && /\\[ux]/gi.test(node.extra.raw)) {
            node.extra = undefined;
        }
    },
}


exports = {
    encodingConversion,
}