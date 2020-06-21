const config = {
	presets: [
		[
			'@babel/preset-env',
		],
	],
	plugins: [
		[
			'@babel/plugin-proposal-class-properties',
			{
				loose: true,
			},
		],
		[
			'@babel/plugin-transform-react-jsx',
			{
				pragma: 'el',
			},
		],
		/* [
			'@wordpress/babel-plugin-makepot',
			{
				output: 'src/languages/wptelegram-comments.js.pot',
			},
		], */
		[
			'import',
			{
				libraryName: 'antd',
				libraryDirectory: 'es',
				style: true,
			},
		],
	],
};

module.exports = config;