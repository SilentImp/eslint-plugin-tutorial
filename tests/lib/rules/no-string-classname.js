/**
 * @fileoverview Use React.PureComponent rather then pure function.
 * @author Anton Nemtsev
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-string-classname");
const RuleTester = require("eslint").RuleTester;

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({parserOptions});
ruleTester.run("no-string-classname", rule, {

    valid: [
      {
          code: `
            import React, { PureComponent } from 'react';
            import styles from './Cart.pcss';

            class Cart extends PureComponent {
              render() {
                return (<p className={styles.Cart}>cart</p>)
              }
            }

            export default Cart;
          `,
      },
      {
          code: `
          import React, { PureComponent } from 'react';
          import classnames from 'classnames';

          class Cart extends PureComponent {
            render() {
              return (<p className={classnames(styles.Cart, styles['Cart--sidebar'])}>cart</p>)
            }
          }

          export default Cart;
          `,
      }
    ],

    invalid: [
        {
            code: `
            import React, { PureComponent } from 'react';

            class Cart extends PureComponent {
              render() {
                return (<p className="Cart">cart</p>)
              }
            }

            export default Cart;
            `,
            errors: [{
                message: "You should use css modules instead",
                type: "JSXAttribute"
            }]
        },
        {
            code: `
            import React, { PureComponent } from 'react';
            import classnames from 'classnames';

            class Cart extends PureComponent {
              render() {
                return (<p className={classnames('cart', 'cart--sidebar')}>cart</p>)
              }
            }

            export default Cart;
            `,
            errors: [{
                message: "You should use css modules instead of 'cart'",
                type: "CallExpression"
            }]
        }
    ]
});
