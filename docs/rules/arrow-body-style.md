# Require braces in arrow function body (arrow-body-style)

Arrow functions can omit braces when there is a single statement in the body. This rule enforces the consistent use of braces in arrow functions.

## Rule Details

This rule can enforce the use of braces around arrow function body.

## Options

The rule takes one or two options. The first is a string, which can be:

* `"always"` enforces braces around the function body
* `"as-needed"` enforces no braces where they can be omitted (default)

The second one is an object for more fine-grained configuration when the first option is `"as-needed"`. Currently, the only available parameter is `allowObjectLiteralBody`, which indicates if object literals should be declared using braces, thus requiring an explicit return.

```json
"arrow-body-style": ["error", "always"]
```

When the rule is set to `"always"` the following patterns are considered problems:

```js
/*eslint arrow-body-style: ["error", "always"]*/
/*eslint-env es6*/
let foo = () => 0;
```

The following patterns are not considered problems:

```js
let foo = () => {
    return 0;
};
let foo = (retv, name) => {
    retv[name] = true;
    return retv;
};
```

### "as-needed"

When the rule is set to `"as-needed"` the following patterns are considered problems:

```js
/*eslint arrow-body-style: ["error", "as-needed"]*/
/*eslint-env es6*/

let foo = () => {
    return 0;
};

let foo = () => { return { bar: 0 }; }
```

The following patterns are not considered problems:

```js
/*eslint arrow-body-style: ["error", "as-needed"]*/
/*eslint-env es6*/

let foo = () => 0;
let foo = (retv, name) => {
    retv[name] = true;
    return retv;
};
let foo = () => { bar(); };
let foo = () => {};
let foo = () => { /* do nothing */ };
let foo = () => {
    // do nothing.
};
let foo = () => ({ bar: 0 });
```

#### allowObjectLiteralBody

When the rule is set to `"as-needed", { allowObjectLiteralBody: true }` the following patterns are considered problems:

```js
/*eslint arrow-body-style: ["error", "as-needed", { allowObjectLiteralBody: true }]*/
/*eslint-env es6*/
let foo = () => ({});
let foo = () => ({ bar: 0 });
```

The following patterns are not considered problems:

```js
/*eslint arrow-body-style: ["error", "as-needed", { allowObjectLiteralBody: true }]*/
/*eslint-env es6*/

let foo = () => {};
let foo = () => { return { bar: 0 }; };
```
