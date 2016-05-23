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
         * Reports error for unnecessarily renamed assignments
         * @param {ASTNode} node - node to report
         * @param {ASTNode} initial - node with initial name value
         * @param {ASTNode} result - node with new name value
         * @param {string} type - the type of the offending node
         * @returns {void}
         */
        function reportError(node, initial, result, type) {
            return context.report({
                node: node,
                message: "{{type}} {{name}} unnecessarily renamed.",
                data: {
                    name: initial.name,
                    type: type
                },
                fix: function(fixer) {
                    return fixer.removeRange([
                        initial.range[1],
                        result.range[1]
                    ]);
                }
            });
        }

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
                    reportError(properties[i], properties[i].key, properties[i].value, "Destructuring assignment");
                }
            }
        }

        /**
         * Checks whether an import is unnecessarily renamed
         * @param {ASTNode} node - node to check
         * @returns {void}
         */
        function checkImport(node) {
            if (ignoreImport) {
                return;
            }

            if (node.imported.name === node.local.name) {
                reportError(node, node.imported, node.local, "Import");
            }
        }

        /**
         * Checks whether an export is unnecessarily renamed
         * @param {ASTNode} node - node to check
         * @returns {void}
         */
        function checkExport(node) {
            if (ignoreExport) {
                return;
            }

            if (node.local.name === node.exported.name) {
                reportError(node, node.local, node.exported, "Export");
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
