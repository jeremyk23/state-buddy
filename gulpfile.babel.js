import _ from 'lodash';
import del from 'del';
import gulp from 'gulp';
import path from 'path';
import gutil from 'gulp-util';
import webpack from 'webpack';
import { exec } from 'child_process';
import WebpackDevServer from 'webpack-dev-server';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const baseConfig = {
	entry: {
		entry: './src/entry',
		content: './src/content'
	},
	output: {
		path: __dirname + '/build',
		filename: '[name].js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.less']
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel-loader'
		}, {
			test: /\.less$/,
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
		}, {
			test: /\.woff[2]?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'url-loader?limit=10000&minetype=application/font-woff'
		}, {
			test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'file-loader'
		}, {
			test: /\.json$/,
			loader: 'json-loader'
		}]
	},
	plugins: [
		new ExtractTextPlugin('app.css', {
			allChunks: true
		})
	]
};

gulp.task('clean', function () {
	return del(['build/**/*']);
});

gulp.task('copy:root', ['clean'], function () {
	gulp.src([
		'./src/manifest.json',
		'./src/popup.html'
	]).pipe(gulp.dest('./build'));
});

gulp.task('copy:images', ['clean'], function () {
	gulp.src([
		'./src/img/**/*'
	]).pipe(gulp.dest('./build/img'));
});

gulp.task('dev', ['copy:root', 'copy:images'], function (done) {
	webpack(_.assign({}, baseConfig, {
		watch: true,
		devtool: '#source-map'
	}), function (err, stats) {
		if (err) throw new gutil.PluginError('webpack', err);
		gutil.log('[webpack]', stats.toString({
			colors: true,
			version: false,
			hash: false,
			timings: false,
			chunks: false,
			chunkModules: false
		}));
	});
});

gulp.task('build', ['copy:root', 'copy:images'], function (done) {
	webpack(_.assign({}, baseConfig, {
	}), function (err, stats) {
		if (err) throw new gutil.PluginError('webpack', err);
		gutil.log('[webpack]', stats.toString({
			colors: true,
			version: false,
			hash: false,
			timings: false,
			chunks: false,
			chunkModules: false
		}));
		done();
	});
});

gulp.task('build:extension', (done) => {
	const buildPath = path.join(__dirname, '/build');
	const pemPath = path.join(__dirname, '/console-admin-chrome-ext.pem');
	const chromeBinaryPath = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome';

	setTimeout(() => {
		console.log(`Building extension into '${buildPath}'`);
		exec(`\$('${chromeBinaryPath}' --pack-extension=${buildPath} --pack-extension-key=${pemPath})`, (error, stdout, stderr) => {
			console.log('Done');

			if (stdout) {
				console.log('stdout: ' + stdout);
			}

			if (stderr) {
				console.log('stderr: ' + stderr);
			}

			if (error !== null) {
				console.log('exec error: ' + error);
			}

			done();
		});
	}, 1000);
});
