/**
 * @fileoverview Disallow renaming import, export, and destructured assignments to the same name.
 * @author Kai Cataldo
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "disallow renaming import, export, and destructured assignments to the same name.",
            category: "ECMAScript 6",
            recommended: false
        },
        fixable: "code",
        schema: [
            {
                type: "object",
                properties: {
                    ignoreDestructuring: { type: "boolean" },
                    ignoreImport: { type: "boolean" },
                    ignoreExport: { type: "boolean" },
                },
                additionalProperties: false
            }
        ]
    },

    create: function(context) {
        var options = context.options[0] || {},
            ignoreDestructuring = options.ignoreDestructuring === true,
            ignoreImport = options.ignoreImport === true,
            ignoreExport = options.ignoreExport === true;

        //--------------------------------------------------------------------------
        // Helpers
        //--------------------------------------------------------------------------

        /**
         * Checks whether a destructured assignment is unnecessarily renamed
         * @param {ASTNode} node - node to check
         * @returns {void}
         */
        function checkDestructured(node) {
            var properties,
                i;

            if (ignoreDestructuring) {
                return;
            }

            properties = node.properties;

            for (i = 0; i < properties.length; i++) {
                if (properties[i].shorthand) {
                    return;
                }

                if (properties[i].key.name === properties[i].value.name) {
                    context.report({
                        node: properties[i],
                        loc: {
                            line: properties[i].value.loc.start.line,
                            column: properties[i].value.loc.start.column
                        },
                        message: "Destructured assignment {{name}} unnecessarily renamed.",
                        data: {
                            name: properties[i].key.name,
                        },
                        fix: function(fixer) {
                            return fixer.removeRange([
                                properties[i].key.range[1],
                                properties[i].value.range[1]
                            ]);
                        }
                    });
                }
            }
        }

        /**
         * Checks whether a destructured assignment is unnecessarily renamed
         * @param {ASTNode} node - node to check
         * @returns {void}
         */
        function checkImport(node) {
            if (ignoreImport) {
                return;
            }

            if (node.imported.name === node.local.name) {
                context.report({
                    node: node,
                    loc: {
                        line: node.local.loc.start.line,
                        column: node.local.loc.start.column
                    },
                    message: "Import {{name}} unnecessarily renamed.",
                    data: {
                        name: node.imported.name
                    },
                    fix: function(fixer) {
                        return fixer.removeRange([
                            node.imported.range[1],
                            node.local.range[1]
                        ]);
                    }
                });
            }
        }

        /**
         * Checks whether a destructured assignment is unnecessarily renamed
         * @param {ASTNode} node - node to check
         * @returns {void}
         */
        function checkExport(node) {
            if (ignoreExport) {
                return;
            }

            if (node.local.name === node.exported.name) {
                context.report({
                    node: node,
                    loc: {
                        line: node.exported.loc.start.line,
                        column: node.exported.loc.start.column
                    },
                    message: "Export {{name}} unnecessarily renamed.",
                    data: {
                        name: node.local.name
                    },
                    fix: function(fixer) {
                        return fixer.removeRange([
                            node.local.range[1],
                            node.exported.range[1]
                        ]);
                    }
                });
            }

        }
        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            ObjectPattern: checkDestructured,
            ImportSpecifier: checkImport,
            ExportSpecifier: checkExport
        };
    }
};
