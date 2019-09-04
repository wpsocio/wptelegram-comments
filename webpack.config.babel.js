
/**
 * External dependencies
 */
import { resolve } from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin-with-rtl';
import webpack from 'webpack';
// import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import WebpackRTLPlugin from 'webpack-rtl-plugin';
/**
 * Internal dependencies
 */
import { createConfig } from './tools/webpack';

const mainSettings = ( isDev ) => createConfig(
	{
		entry: [
			'regenerator-runtime/runtime',
			'./src/admin/settings/index.js',
		],
		output: {
			path: resolve( __dirname, 'build/admin/settings' ),
			filename: 'main.js',
			chunkFilename: '[name].js',
		},
		module: {
			rules: [
				{
					test: /\.less$/, // .less and .css
					use: [
						{
							loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
						},
						{
							loader: 'css-loader',
						},
						{
							loader: 'less-loader',
							options: {
								javascriptEnabled: true,
							},
						},
					],
				},
				{
					test: /\.css$/, // .less and .css
					use: [
						{
							loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
						},
						{
							loader: 'css-loader',
						},
					],
				},
			],
		},
		plugins: [
			// new BundleAnalyzerPlugin(),
			new webpack.ContextReplacementPlugin( /moment[\/\\]locale$/, /(en)$/ ),
			new MiniCssExtractPlugin( {
				filename: 'main.css',
				chunkFilename: '[name].css',
				rtlEnabled: true,
			} ),
			new WebpackRTLPlugin(),
		],
		resolve: {
			alias: { // optimize bundle size when using icons
				'@ant-design/icons/lib/dist$': resolve( __dirname, 'src/admin/settings/utils/icons.js' ),
			},
		},
		/* optimization: {
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/](moment|react|react-dom)[\\/]/,
						name: 'vendor',
						chunks: 'all',
					},
				},
			},
		}, */
	}
);

const configs = ( env, argv ) => {
	const isDev = argv && 'development' === argv.mode;
	return [
		mainSettings( isDev ),
	];
};

export default configs;
