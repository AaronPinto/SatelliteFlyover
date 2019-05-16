const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT = path.resolve( __dirname);
const DESTINATION = path.resolve( __dirname, 'dist' );

module.exports = {
	context: ROOT,

	entry: {
		'main': './index.ts'
	},

	output: {
		filename: '[name].bundle.js',
		path: DESTINATION
	},

	resolve: {
		extensions: ['.ts', '.js'],
		modules: [
			ROOT,
			'node_modules'
		]
	},

	module: {
		rules: [
			/****************
			 * LOADERS
			 *****************/
			{
				test: /\.ts$/,
				exclude: [ /node_modules/ ],
				use: 'ts-loader'
			}
		]
	},

	plugins: [new HtmlWebpackPlugin({
		template: './index.html'
	})],

	devtool: 'cheap-module-source-map',
	devServer: {}
};