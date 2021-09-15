module.exports = {
	'root': true,
	'env': {
		'node': true,
	},
	'extends': [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
	],
	'parserOptions': {
		'parser': '@babel/eslint-parser',
	},
	'rules': {
		'quotes': [2, 'single', {
			'avoidEscape': true,
			'allowTemplateLiterals': true,
		}],
		'comma-dangle': [2, 'always-multiline'],
		'eol-last': 2,
		'space-before-blocks': [2, 'always'],
		'space-before-function-paren': [2, 'never'],
		'space-in-parens': [2, 'never'],
		'space-infix-ops': 2,
		'space-unary-ops': [2, {
			'words': true,
			'nonwords': false,
		}],
		'comma-spacing': [2, {
			'before': false,
			'after': true,
		}],
	},
}
