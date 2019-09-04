/**
 * External dependencies
 */
import gulp from 'gulp';
import webpackStream from 'webpack-stream';
import cleanUp from 'gulp-clean';
// Utility related plugins.
import lineec from 'gulp-line-ending-corrector';
import notify from 'gulp-notify';
import { exec } from 'child_process';
import wpi18n from 'node-wp-i18n';
import path from 'path';

/**
 * Internal dependencies
 */
import webpackConfig from './webpack.config.babel';
import config from './gulp.config';
import pkg from './package.json';

export const createTastCopy = ( { toCopy, toIgnore: ignore }, watching = false ) => () => {
	let message = '\n\n✅  ===> COPY — completed!\n';
	if ( watching ) {
		message += '\nWatching...\n';
	}

	return gulp.src( toCopy, { cwd: config.srcDir, base: config.srcDir, ignore } )
		.pipe( lineec() )
		.pipe( gulp.dest( config.buildDir ) )
		.pipe( notify( { message, onLast: true } ) );
};

const filesToGulp = {
	toCopy: '**/*',
	toIgnore: [
		'admin/settings/**/*', // let webpack do that part
		'languages/*.js.pot', // to be converted to PHP
	],
};

export const copy = createTastCopy( filesToGulp );

export const clean = () => {
	return gulp.src( [ '*', '!.git' ], { cwd: config.buildDir, read: false } )
		.pipe( cleanUp() )
		.pipe( notify( { message: '\n\n✅  ===> CLEAN — completed!\n', onLast: true } ) );
};

export const webpack = () => {
	return gulp.src( './', { allowEmpty: true, read: false } )
		.pipe( webpackStream( {
			config: webpackConfig(),
		} ) )
		.pipe( gulp.dest( ( file ) => file.base ) );
};

export const watchIt = () => {
	const { toCopy, toIgnore: ignored } = filesToGulp;

	const watcher = gulp.watch(
		toCopy,
		{
			cwd: config.srcDir,
			ignored,
			events: [ 'add', 'change', 'unlink' ],
		}
	);

	const updateHandler = createWatchHanlder();

	watcher.on( 'add', updateHandler );
	watcher.on( 'change', updateHandler );

	const deleteHandler = createWatchHanlder( 'delete' );

	watcher.on( 'unlink', deleteHandler );
};

const createWatchHanlder = ( type = 'update' ) => {
	if ( 'update' === type ) {
		return ( _path ) => {
			console.log( `File ${ _path } was updated` );
			const copyFile = createTastCopy( { toCopy: _path, toIgnore: [] }, true );
			copyFile();
		};
	} else if ( 'delete' === type ) {
		return ( _path ) => {
			console.log( `File ${ _path } was deleted` );
		};
	}
};

export const jsPotToPhp = ( cb ) => {
	const cmd = `npx pot-to-php ${ config.domainPath + '/' + config.JSPotFilename } ${ config.domainPath }/${ config.textDomain }-js-translations.php ${ pkg.name }`;

	exec( cmd, ( err, stdout, stderr ) => {
		console.log( stdout );
		console.log( stderr );
		cb( err );
	} );
};

export const translate = ( done ) => {
	const options = {
		domainPath: 'languages/',
		potComments: '',
		potFilename: config.potFilename,
		type: 'wp-plugin',
		cwd: config.srcDir,
		mainFile: `${ config.srcDir }/${ pkg.name }.php`,
		updateTimestamp: true,
		updatePoFiles: true,
		potHeaders: {
			poedit: true,
			language: 'en_US',
			'X-Poedit-Basepath': '..\n',
			'Plural-Forms': 'nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n',
			'X-Poedit-KeywordsList': '__;_e;_x;esc_attr__;esc_attr_e;esc_html__;esc_html_e\n',
			'X-Poedit-SearchPath-0': '.\n',
		},
		processPot( pot ) {
			let translation;
			const excluded_meta = [
				'Plugin Name of the plugin/theme',
				'Plugin URI of the plugin/theme',
				'Author of the plugin/theme',
				'Author URI of the plugin/theme',
				'Description of the plugin/theme',
			];

			for ( translation in pot.translations[ '' ] ) {
				if ( 'undefined' !== typeof pot.translations[ '' ][ translation ].comments.extracted ) {
					if ( excluded_meta.indexOf( pot.translations[ '' ][ translation ].comments.extracted ) >= 0 ) {
						// console.log( 'Excluded meta: ' + pot.translations[''][ translation ].comments.extracted );
						delete pot.translations[ '' ][ translation ];
					}
				}
			}

			pot.headers[ 'report-msgid-bugs-to' ] = config.bugReport;
			pot.headers[ 'last-translator' ] = pkg.title;
			pot.headers[ 'language-team' ] = pkg.title;
			const today = new Date();
			pot.headers[ 'po-revision-date' ] = today.getFullYear() + '-' + ( '0' + ( today.getMonth() + 1 ) ).slice( -2 ) + '-' + today.getDate() + ' ' + today.getUTCHours() + ':' + today.getUTCMinutes() + '+' + today.getTimezoneOffset();

			return pot;
		},
	};

	wpi18n.makepot( options )
		.then( function( wpPackage ) {
			console.log( 'POT file saved to ' + path.relative( wpPackage.getPath(), wpPackage.getPotFilename() ) );
		} )
		.catch( function( error ) {
			console.log( error );
		} )
		.finally( done );
};

export const dev = gulp.parallel(
	gulp.series(
		clean,
		copy
	),
	watchIt
);

export const build = gulp.series(
	clean,
	jsPotToPhp,
	translate,
	copy,
	webpack
);
