# require or disallow line breaks inside braces (object-curly-newline)

(fixable) The `--fix` option on the [command line](../user-guide/command-line-interface#fix) automatically fixes problems reported by this rule.

A number of style guides require or disallow line breaks inside of object braces and other tokens.
This rule applies to both object literals and destructuring assignments.

## Rule Details

This rule enforces consistent line breaks inside braces.

## Options

```json
{
    "object-curly-newline": ["error", {"multiline": true}]
}
```

This rule has a string or an object option:

* `"always"` - requires line breaks always.
* `"never"` - disallows line breaks always.
* An object - requires line breaks if any of the following condition is satisfied. Otherwise, disallows line breaks.
    * `multiline` (default is `false`) - requires line breaks if the content is multiline. If this is `false`, this condition is disabled.
    * `minProperties` (default is `0`) - requires line breaks if the number of properties is more than the given integer. If this is `0`, this condition is disabled.

If options is omitted, this rule would address as `{"multiline": true}`.

Also, we can separate configuration for each object literal and destructuring assignment:

```json
{
    "object-curly-newline": ["error", {
        "literal": "always",
        "pattern": {"multiline": true}
    }]
}
```

* `"literal"` - configuration for object literals.
* `"pattern"` - configuration for object patterns of destructuring assignments.

### always

Examples of **incorrect** code for this rule with the `"always"` option:

```js
/*eslint object-curly-newline: ["error", "always"]*/
/*eslint-env es6*/

let a = {};
let b = {foo: 1};
let c = {foo: 1, bar: 2};
let d = {foo: 1,
    bar: 2};
let e = {foo() {
    dosomething();
}};

let {} = obj;
let {f} = obj;
let {g, h} = obj;
let {i,
    j} = obj;
let {k = function() {
    dosomething();
}} = obj;
```

Examples of **correct** code for this rule with the `"always"` option:

```js
/*eslint object-curly-newline: ["error", "always"]*/
/*eslint-env es6*/

let a = {
};
let b = {
    foo: 1
};
let c = {
    foo: 1, bar: 2
};
let d = {
    foo: 1,
    bar: 2
};
let e = {
    foo: function() {
        dosomething();
    }
};

let {
} = obj;
let {
    f
} = obj;
let {
    g, h
} = obj;
let {
    i,
    j
} = obj;
let {
    k = function() {
        dosomething();
    }
} = obj;
```

### never

Examples of **incorrect** code for this rule with the `"never"` option:

```js
/*eslint object-curly-newline: ["error", "never"]*/
/*eslint-env es6*/

let a = {
};
let b = {
    foo: 1
};
let c = {
    foo: 1, bar: 2
};
let d = {
    foo: 1,
    bar: 2
};
let e = {
    foo: function() {
        dosomething();
    }
};

let {
} = obj;
let {
    f
} = obj;
let {
    g, h
} = obj;
let {
    i,
    j
} = obj;
let {
    k = function() {
        dosomething();
    }
} = obj;
```

Examples of **correct** code for this rule with the `"never"` option:

```js
/*eslint object-curly-newline: ["error", "never"]*/
/*eslint-env es6*/

let a = {};
let b = {foo: 1};
let c = {foo: 1, bar: 2};
let d = {foo: 1,
    bar: 2};
let e = {foo: function() {
    dosomething();
}};

let {} = obj;
let {f} = obj;
let {g, h} = obj;
let {i,
    j} = obj;
let {k = function() {
    dosomething();
}} = obj;
```

### multiline

Examples of **incorrect** code for this rule with the default `{"multiline": true}` option:

```js
/*eslint object-curly-newline: ["error", {"multiline": true}]*/
/*eslint-env es6*/

let a = {
};
let b = {
    foo: 1
};
let c = {
    foo: 1, bar: 2
};
let d = {foo: 1,
    bar: 2};
let e = {foo: function() {
    dosomething();
}};

let {
} = obj;
let {
    f
} = obj;
let {
    g, h
} = obj;
let {i,
    j} = obj;
let {k = function() {
    dosomething();
}} = obj;
```

Examples of **correct** code for this rule with the default `{"multiline": true}` option:

```js
/*eslint object-curly-newline: ["error", {"multiline": true}]*/
/*eslint-env es6*/

let a = {};
let b = {foo: 1};
let c = {foo: 1, bar: 2};
let d = {
    foo: 1,
    bar: 2
};
let e = {
    foo: function() {
        dosomething();
    }
};

let {} = obj;
let {f} = obj;
let {g, h} = obj;
let {
    i,
    j
} = obj;
let {
    k = function() {
        dosomething();
    }
} = obj;
```

### minProperties

Examples of **incorrect** code for this rule with the `{"minProperties": 2}` option:

```js
/*eslint object-curly-newline: ["error", {"minProperties": 2}]*/
/*eslint-env es6*/

let a = {
};
let b = {
    foo: 1
};
let c = {foo: 1, bar: 2};
let d = {foo: 1,
    bar: 2};
let e = {
    foo: function() {
        dosomething();
    }
};

let {
} = obj;
let {
    f
} = obj;
let {g, h} = obj;
let {i,
    j} = obj;
let {
    k = function() {
        dosomething();
    }
} = obj;
```

Examples of **correct** code for this rule with the `{"minProperties": 2}` option:

```js
/*eslint object-curly-newline: ["error", {"minProperties": 2}]*/
/*eslint-env es6*/

let a = {};
let b = {foo: 1};
let c = {
    foo: 1, bar: 2
};
let d = {
    foo: 1,
    bar: 2
};
let e = {foo: function() {
    dosomething();
}};

let {} = obj;
let {f} = obj;
let {
    g, h
} = obj;
let {
    i,
    j
} = obj;
let {k = function() {
    dosomething();
}} = obj;
```

### a combination of multiline and minProperties

Examples of **incorrect** code for this rule with the `{"multiline": true, "minProperties": 2}` option:

```js
/*eslint object-curly-newline: ["error", {"multiline": true, "minProperties": 2}]*/
/*eslint-env es6*/

let a = {
};
let b = {
    foo: 1
};
let c = {foo: 1, bar: 2};
let d = {foo: 1,
    bar: 2};
let e = {foo: function() {
    dosomething();
}};

let {
} = obj;
let {
    f
} = obj;
let {g, h} = obj;
let {i,
    j} = obj;
let {k = function() {
    dosomething();
}} = obj;
```

Examples of **correct** code for this rule with the `{"multiline": true, "minProperties": 2}` option:

```js
/*eslint object-curly-newline: ["error", {"multiline": true, "minProperties": 2}]*/
/*eslint-env es6*/

let a = {};
let b = {foo: 1};
let c = {
    foo: 1, bar: 2
};
let d = {
    foo: 1,
    bar: 2
};
let e = {
    foo: function() {
        dosomething();
    }
};

let {} = obj;
let {f} = obj;
let {
    g, h
} = obj;
let {
    i,
    j
} = obj;
let {
    k = function() {
        dosomething();
    }
} = obj;
```

### separating configuration

Examples of **incorrect** code for this rule with the `{"literal": "always", "pattern": "never"}` option:

```js
/*eslint object-curly-newline: ["error", {"literal": "always", "pattern": "never"}]*/
/*eslint-env es6*/

let a = {};
let b = {foo: 1};
let c = {foo: 1, bar: 2};
let d = {foo: 1,
    bar: 2};
let e = {foo: function() {
    dosomething();
}};

let {
} = obj;
let {
    f
} = obj;
let {
    g, h
} = obj;
let {
    i,
    j
} = obj;
let {
    k = function() {
        dosomething();
    }
} = obj;
```

Examples of **correct** code for this rule with the `{"literal": "always", "pattern": "never"}` option:

```js
/*eslint object-curly-newline: ["error", {"literal": "always", "pattern": "never"}]*/
/*eslint-env es6*/

let a = [
];
let b = [
    1
];
let c = [
    1, 2
];
let d = [
    1,
    2
];
let e = [
    function() {
        dosomething();
    }
];

let [] = obj;
let [f] = obj;
let [g, h] = obj;
let [i,
    j] = obj;
let [k = function() {
    dosomething();
}] = obj;
```

## When Not To Use It

If you don't want to enforce consistent line breaks inside braces, then it's safe to disable this rule.

## Related Rules

* [comma-spacing](key-spacing.md)
* [key-spacing](key-spacing.md)
* [object-curly-spacing](object-curly-spacing.md)
* [object-property-newline](object-property-newline.md)
