/**
 * @fileoverview Use React.PureComponent rather then pure function.
 * @author Anton Nemtsev
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Use css modules instead of string classes",
            category: "Best Practices",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {

      // console.log(context);

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            "CallExpression": function (node) {
              const argument = node.arguments && node.arguments.find(element => (element.type === 'Literal'));
              if (
                (node.callee.name === 'classnames')
                && ( argument !== undefined)
              ){
                context.report({
                  node,
                  message: "You should use css modules instead of {{identifier}}",
                  data: {
                    identifier: argument.raw,
                  }
                })
              }
            },
            "JSXAttribute": function (node) {
              if (
                (node.name.name === 'className')
                && (node.value.type === 'Literal')
              ) {
                context.report({
                  node,
                  message: 'You should use css modules instead'
                })
              }
            },
            // give me methods

        };
    }
};
