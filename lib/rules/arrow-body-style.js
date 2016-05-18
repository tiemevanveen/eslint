/**
 * @fileoverview Rule to require braces in arrow function body.
 * @author Alberto Rodríguez
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "require braces around arrow function bodies",
            category: "ECMAScript 6",
            recommended: false
        },

        schema: {
            anyOf: [
                {
                    type: "array",
                    items: [
                        {
                            enum: ["always"]
                        }
                    ],
                    minItems: 0,
                    maxItems: 1
                },
                {
                    type: "array",
                    items: [
                        {
                            enum: ["as-needed"]
                        },
                        {
                            type: "object",
                            properties: {
                                allowObjectLiteralBody: {type: "boolean"}
                            },
                            additionalProperties: false
                        }
                    ],
                    minItems: 0,
                    maxItems: 2
                }
            ]
        }
    },

    create: function(context) {
        var always = context.options[0] === "always";
        var asNeeded = !context.options[0] || context.options[0] === "as-needed";
        var allowObjectLiteralBody = context.options[1] && context.options[1].allowObjectLiteralBody === true;

        /**
         * Determines whether a arrow function body needs braces
         * @param {ASTNode} node The arrow function node.
         * @returns {void}
         */
        function validate(node) {
            var arrowBody = node.body;

            if (arrowBody.type === "BlockStatement") {
                var blockBody = arrowBody.body;

                if (blockBody.length !== 1) {
                    return;
                }

                if (asNeeded && allowObjectLiteralBody && blockBody[0].type === "ReturnStatement" &&
                    blockBody[0].argument.type === "ObjectExpression") {
                    return;
                }

                if (asNeeded && blockBody[0].type === "ReturnStatement") {
                    context.report({
                        node: node,
                        loc: arrowBody.loc.start,
                        message: "Unexpected block statement surrounding arrow body."
                    });
                }
            } else {
                if (always || (asNeeded && allowObjectLiteralBody && arrowBody.type === "ObjectExpression")) {
                    context.report({
                        node: node,
                        loc: arrowBody.loc.start,
                        message: "Expected block statement surrounding arrow body."
                    });
                }
            }
        }

        return {
            ArrowFunctionExpression: validate
        };
    }
};
