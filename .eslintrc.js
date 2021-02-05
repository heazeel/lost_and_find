/*
 * "off"或者0，不启用这个规则
 * "warn"或者1，出现问题会有警告
 * "error"或者2，出现问题会报错
 */
module.exports = {
  root: true,//此项是用来告诉eslint找当前配置文件不能往父级查找
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  env: {//环配置 如 "browser": true, node: true,
    browser: true,
    node: true,
    es6: true
  },
  extends: ["plugin:vue/recommended", "eslint:recommended"],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    "arrow-parens": ["error", "as-needed"], // 箭头函数的参数可以不使用圆括号
    "camelcase": 1, //变量声明时中间有_时 字母大写  Bad:do_something 正确:MY_FAVORITE_COLOR ,_myFavoriteColor
    "comma-dangle": 0, //尾部没有,
    "eqeqeq": 0, //强制全等
    "global-require": 0, // 取消对require的验证，使得可以使用require来加载图片的相对路径
    "import/extensions": 0, // 取消对文件扩展名的验证
    "import/no-cycle": 0, // 文件循环引用
    "indent": 0, //强制执行一致的缩进风格
    "import/no-unresolved": 0, // 取消自动解析路径，以此开启alias的别名路径设置
    "linebreak-style": 0, // 取消换行符\n或\r\n的验证
    "max-len": 0, //代码过长是否换行
    "no-unused-expressions": 0, // 允许使用未使用过的表达式，以此来支持a && a()的代码形式
    "no-restricted-syntax": 1, //不允许指定（即用户定义）语法
    "no-plusplus": 0, // 不允许一元运算符++和--
    "no-underscore-dangle": 0, // 允许在标识符中使用下划线
    "no-bitwise": 1, //不允许按位运算符 Bad: y | z; y & z; 正确: y || z; y && z;
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-cond-assign": 2, //禁止在条件表达式中使用赋值语句  Bad: if(x = 0) 正确if(x == 0)
    "no-shadow": [1, { allow: ["resolve", "reject", "done", "cb"] }],
    "no-param-reassign": 0, // 禁止对 function 的参数进行重新赋值
    "no-nested-ternary": 0, // 禁止嵌套三元表达式
    "no-unused-vars": 1, //
    "prefer-const": 2, //未被赋值的常量 使用const
    "template-curly-spacing": 1, //强制使用大括号内的间距 Bad: {people.name} 正确{ people.name }

    //it is base on https://eslint.vuejs.org/rules/name-property-casing.html
    "vue/singleline-html-element-content-newline": "off", // html 标签是不换行
    "vue/name-property-casing": ["error", "PascalCase"], // Bad:<MyComponent></MyComponent><my-component/> Good: <MyComponent/> <my-component></my-component>

    "array-bracket-spacing": [2, "never"], //是否允许非空数组里面有多余的空格 Bad:[ 'foo', 'bar' ] Good:['foo', 'bar'];
    "arrow-spacing": [
      2,
      {
        // 箭头函数=>的前/后括号
        before: true,
        after: true
      }
    ],
    "block-spacing": [2, "always"],
    "brace-style": [
      2,
      "1tbs",
      {
        allowSingleLine: true
      }
    ],
    "comma-spacing": [
      2,
      {
        before: false,
        after: true
      }
    ],
    "comma-style": [2, "last"],
    "constructor-super": 2,
    "curly": [2, "multi-line"],
    "dot-location": [2, "property"],
    "eol-last": 2,
    "generator-star-spacing": [
      2,
      {
        before: true,
        after: true
      }
    ],
    "handle-callback-err": [2, "^(err|error)$"],
    "jsx-quotes": [2, "prefer-single"],
    "key-spacing": [
      2,
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    "keyword-spacing": [
      2,
      {
        before: true,
        after: true
      }
    ],
    "new-cap": [
      2,
      {
        newIsCap: true,
        capIsNew: false
      }
    ],
    "new-parens": 2,
    "no-array-constructor": 2,
    "no-caller": 2,
    "no-class-assign": 2,
    "no-const-assign": 2,
    "no-control-regex": 0,
    "no-delete-var": 2,
    "no-dupe-args": 2,
    "no-dupe-class-members": 2,
    "no-dupe-keys": 2,
    "no-duplicate-case": 2,
    "no-empty-character-class": 2,
    "no-empty-pattern": 2,
    "no-eval": 2,
    "no-ex-assign": 2,
    "no-extend-native": 2,
    "no-extra-bind": 2,
    "no-extra-boolean-cast": 2,
    "no-extra-parens": [2, "functions"],
    "no-fallthrough": 2,
    "no-floating-decimal": 2,
    "no-func-assign": 2,
    "no-implied-eval": 2,
    "no-inner-declarations": [2, "functions"],
    "no-invalid-regexp": 2,
    "no-irregular-whitespace": 2,
    "no-iterator": 2,
    "no-label-var": 2,
    "no-labels": [
      2,
      {
        allowLoop: false,
        allowSwitch: false
      }
    ],
    "no-lone-blocks": 2,
    "no-mixed-spaces-and-tabs": 2,
    "no-multi-spaces": 2,
    "no-multi-str": 2,
    "no-multiple-empty-lines": [
      2,
      {
        max: 1
      }
    ],
    "no-native-reassign": 2,
    "no-negated-in-lhs": 2,
    "no-new-object": 2,
    "no-new-require": 2,
    "no-new-symbol": 2,
    "no-new-wrappers": 2,
    "no-obj-calls": 2,
    "no-octal": 2,
    "no-octal-escape": 2,
    "no-path-concat": 2,
    "no-proto": 2,
    "no-redeclare": 2,
    "no-regex-spaces": 2,
    "no-return-assign": [2, "except-parens"],
    "no-self-assign": 2,
    "no-self-compare": 2,
    "no-sequences": 2,
    "no-spaced-func": 2,
    "no-sparse-arrays": 2,
    "no-this-before-super": 2,
    "no-throw-literal": 2,
    "no-trailing-spaces": 2,
    "no-undef": 2,
    "no-undef-init": 2,
    "no-unexpected-multiline": 2,
    "no-unmodified-loop-condition": 2,
    "no-unneeded-ternary": [
      2,
      {
        defaultAssignment: false
      }
    ],
    "no-unreachable": 2,
    "no-unsafe-finally": 2,
    "no-useless-call": 2,
    "no-useless-computed-key": 2,
    "no-useless-constructor": 2,
    "no-useless-escape": 0,
    "no-whitespace-before-property": 2,
    "no-with": 2,
    "one-var": [
      2,
      {
        initialized: "never"
      }
    ],
    "operator-linebreak": [
      2,
      "after",
      {
        overrides: {
          "?": "before",
          ":": "before"
        }
      }
    ],
    "object-curly-spacing": [
      2,
      "always",
      {
        objectsInObjects: false
      }
    ],
    "padded-blocks": [2, "never"],
    "quotes": [
      2,
      "single",
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    "semi": [0, "never"],
    "semi-spacing": [
      2,
      {
        before: false,
        after: true
      }
    ],
    "space-before-blocks": [2, "always"],
    "space-before-function-paren": [2, "never"],
    "space-in-parens": [2, "never"],
    "space-infix-ops": 2,
    "space-unary-ops": [
      2,
      {
        words: true,
        nonwords: false
      }
    ],
    "spaced-comment": [
      2,
      "always",
      {
        markers: [
          "global",
          "globals",
          "eslint",
          "eslint-disable",
          "*package",
          "!",
          ","
        ]
      }
    ],
    "use-isnan": 2,
    "valid-typeof": 2,
    "wrap-iife": [2, "any"],
    "yield-star-spacing": [2, "both"],
    "yoda": [2, "never"]
  }
};