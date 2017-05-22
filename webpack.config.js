const webpack = require('webpack');
const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');

/**
 * Function to check if the given argument was passed to the script
 *
 * @param {string} argument
 * @returns {boolean} True if the given argument was passed to the script, false otherwise.
 */
function has(argument) {
	return process.argv.indexOf(argument) !== -1;
}

/**
 * Create the webpack config
 */
const webpackConfig = {
	// extesions to resolve
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	// entries to build
	entry: {
		typesome: path.join(__dirname, 'src/typesome/module.ts')
	},
	// location of output
	output: {
		path: path.join(__dirname, 'dist'),
		filename: "[name].js",
		sourceMapFilename: "[name].js.map"
	},
	// build ruless
	module: {
		rules: [
			// build all typescript files using the awesome-typescript-loader
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader'
			}
		]
	},
	// use source-map
	devtool: 'source-map',
	// plugins will be used for minify
	plugins: [
		// pack common vender files
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'vendor',
		// 	minChunks: Infinity
		// }),

		// check all files.
		new CheckerPlugin()
	]
};

// check if help was passed
if (has('--env.help')) {
	console.log(
		"Webpack Help\n\n",
		"Options:\n",
		"--env.help           Shows this help\n",
		"--env.minimize       Minimizes the result"
	);
	process.exit();
}

// check if minimized was passed (or production mode)
if (has('--env.minimize') || has("-p")) {
	// add uglify
	webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
		minimize: true,
		sourceMap: true
	}));
	webpackConfig.output.filename = "[name].min.js";
	webpackConfig.output.sourceMapFilename = "[name].min.js.map";
}

// export files
module.exports = webpackConfig;
