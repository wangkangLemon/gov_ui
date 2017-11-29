module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        "ecmaVersion": 6,
        sourceType: 'module'
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    rules: {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // change indent to 4 spaces
        'indent': ['error', 4],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        "no-unexpected-multiline": 0,
        "no-sequences": 0,
        "comma-dangle": 0,
        "eqeqeq": 0,
        "curly": [0, 'multi'],
        "space-before-function-paren": 0,
        'prefer-promise-reject-errors': 0,
        'camelcase': 0,
        'spaced-comment':0,
        'no-unused-vars':0,
        'no-whitespace-before-property':0,
        'semi':0,
        'no-trailing-spaces':0,
        'space-infix-ops ':0,
        'key-spacing':0,
        'comma-spacing':0,
        'standard%2Fobject-curly-even-spacing':0,
        'space-infix-ops':0
    },
    globals: {
        'xm': true,
        'alert': true,
        'fetch': true,
        'xmview': true,
        'localStorage': true,
        'xmrouter': true,
        "ignoreComments": true,
        "skipBlankLines": true,
        'no-useless-return':true
    }
}
