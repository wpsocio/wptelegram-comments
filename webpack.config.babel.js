/**
 * External dependencies
 */
import { resolve } from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin-with-rtl';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import WebpackRTLPlugin from 'webpack-rtl-plugin';
/**
 * Internal dependencies
 */
import { createConfig } from './tools/webpack';

const mainSettings = ( isDev ) =>
	createConfig( {
		entry: [ 'regenerator-runtime/runtime', './src/admin/settings/index.js' ],
		output: {
			path: resolve( __dirname, 'build/admin/settings' ),
			filename: 'main.js',
			chunkFilename: '[name].js',
		},
		module: {
			rules: [
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
			new MiniCssExtractPlugin( {
				filename: 'main.css',
				chunkFilename: '[name].css',
				rtlEnabled: true,
			} ),
			new WebpackRTLPlugin(),
		],
	} );

const configs = ( env, argv = {} ) => {
	const isDev = 'development' === argv.mode;
	return [ mainSettings( isDev ) ];
};

export default configs;
