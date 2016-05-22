# Disallow mixes of different operators (no-mixed-operators)

Enclosing complex expressions by parentheses makes developer's intention clarifying, then the code would get more readability.
This rule warns that there are different operators consecutively without parentheses *in AST*.

```js
var foo = a && b || c || d;    /*BAD: Unexpected a mix of '&&' and '||'.*/
var foo = (a && b) || c || d;  /*GOOD*/
var foo = a && (b || c || d);  /*GOOD*/
```

## Rule Details

This rule checks `BinaryExpression` and `LogicalExpression`.

This rule would conflict with [no-extra-parens] rule.
If you use both this and [no-extra-parens] rule together, you need to use `nestedBinaryExpressions` option of [no-extra-parens] rule.

Examples of **incorrect** code for this rule:

```js
/*eslint no-mixed-operators: "error"*/

var foo = a && b < 0 || c > 0 || d + 1 === 0;
var foo = a + b * c;
```

Examples of **correct** code for this rule:

```js
/*eslint no-mixed-operators: "error"*/

var foo = a || b || c;
var foo = a && b && c;
var foo = (a && (b < 0)) || (c > 0) || ((d + 1) === 0);
var foo = a && ((b < 0) || (c > 0) || ((d + 1) === 0));
var foo = a + (b * c);
var foo = (a + b) * c;
```

## Options

```json
{
    "no-mixed-operators": [
        "error",
        {
            "groups": [],
            "ignoreSamePrecedence": false
        }
    ]
}
```

This rule has 2 options.

* `groups` (`string[][]`) - specifies groups to compare operators.
  When this rule compares two operators, if both operators are included in a same group, this rule checks it. Otherwise, this rule ignores it.
  This value is a list of groups. The group is a list of binary operators.
  Default is a group which includes all operators.
* `ignoreSamePrecedence` (`boolean`) - specifies to ignore a mix of 2 operators if those have the same precedence. Default is `false`.

### groups

The following operators can be used in `groups` option:

* Arithmetic Operators: `"+"`, `"-"`, `"*"`, `"/"`, `"%"`, `"**"`
* Bitwise Operators: `"&"`, `"|"`, `"^"`, `"~"`, `"<<"`, `">>"`, `">>>"`
* Comparison Operators: `"=="`, `"!="`, `"==="`, `"!=="`, `">"`, `">="`, `"<"`, `"<="`
* Logical Operators: `"&&"`, `"||"`
* Relational Operators: `"in"`, `"instanceof"`

Default is a group which includes all operators, i.e. `{"groups": [["+", "-", "*", "/", "%", "**", "&", "|", "^", "~", "<<", ">>", ">>>", "==", "!=", "===", "!==", ">", ">=", "<", "<=", "&&", "||", "in", "instanceof"]]}`.

Now, considers about `{"groups": [["&", "|", "^", "~", "<<", ">>", ">>>"], ["&&", "||"]]}` configure.
This configure has 2 groups: bitwise operators and logical operators.
This rule checks only if both operators are included in a same group.
So, in this case, this rule comes to check between bitwise operators and between logical operators.
This rule ignores other operators.

Examples of **incorrect** code for this rule with `{"groups": [["&", "|", "^", "~", "<<", ">>", ">>>"], ["&&", "||"]]}` option:

```js
/*eslint no-mixed-operators: ["error", {"groups": [["&", "|", "^", "~", "<<", ">>", ">>>"], ["&&", "||"]]}]*/

var foo = a && b < 0 || c > 0 || d + 1 === 0;
var foo = a & b | c;
```

Examples of **correct** code for this rule with `{"groups": [["&", "|", "^", "~", "<<", ">>", ">>>"], ["&&", "||"]]}` option:

```js
/*eslint no-mixed-operators: ["error", {"groups": [["&", "|", "^", "~", "<<", ">>", ">>>"], ["&&", "||"]]}]*/

var foo = a || b > 0 || c + 1 === 0;
var foo = a && b > 0 && c + 1 === 0;
var foo = (a && b < 0) || c > 0 || d + 1 === 0;
var foo = a && (b < 0 ||  c > 0 || d + 1 === 0);
var foo = (a & b) | c;
var foo = a & (b | c);
var foo = a + b * c;
var foo = a + (b * c);
var foo = (a + b) * c;
```

### ignoreSamePrecedence

Examples of **correct** code for this rule with `{"ignoreSamePrecedence": true}` option:

```js
/*eslint no-mixed-operators: ["error", {"ignoreSamePrecedence": true}]*/

// + and - have the same precedence.
var foo = a + b - c;
```

## When Not To Use It

If you don't want to be notified about mixed operators, then it's safe to disable this rule.

## Related Rules

* [no-extra-parens]

[no-extra-parens]: no-extra-parens.md
