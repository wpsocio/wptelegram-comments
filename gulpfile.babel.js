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
import potomo from 'gulp-potomo';
import path from 'path';
import isBinary from 'gulp-is-binary';
import gulpif from 'gulp-if';
import gulpIgnore from 'gulp-ignore';
import through2 from 'through2';
import fs from 'fs';
import debug from 'gulp-debug';

const pkg = JSON.parse( fs.readFileSync( './package.json', 'utf8' ) );

const getCommandArgs = () => {
	const argList = process.argv;

	const arg = {};
	let a, opt, thisOpt, curOpt;
	for ( a = 0; a < argList.length; a++ ) {
		thisOpt = argList[ a ].trim();
		opt = thisOpt.replace( /^\-+/, '' );

		if ( opt === thisOpt ) {
			// argument value
			if ( curOpt ) {
				arg[ curOpt ] = opt;
			}
			curOpt = null;
		} else {
			// argument name
			curOpt = opt;
			arg[ curOpt ] = true;
		}
	}
	return arg;
};
/**
 * Internal dependencies
 */
import webpackConfig from './webpack.config.babel';
import config from './gulp.config';

export const createTastCopy = (
	{ toCopy, toIgnore: ignore },
	watching = false
) => () => {
	let message = '\n\n✅  ===> COPY — completed!\n';
	if ( watching ) {
		message += '\nWatching...\n';
	}

	return (
		gulp
			.src( toCopy, { cwd: config.srcDir, base: config.srcDir, ignore } )
			.pipe( isBinary() )
			// Do not corrupt binary files.
			.pipe( gulpif( ( file ) => ! file.isBinary(), lineec() ) )
			.pipe( gulp.dest( config.buildDir ) )
			.pipe( notify( { message, onLast: true } ) )
	);
};
const copyChangelog = () => {
	return gulp
		.src( './changelog.md', { base: './' } )
		.pipe( lineec() )
		.pipe( gulp.dest( config.buildDir ) );
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
	return gulp
		.src( [ '*', '!.git' ], { cwd: config.buildDir, read: false } )
		.pipe( cleanUp() )
		.pipe(
			notify( {
				message: '\n\n✅  ===> CLEAN — completed!\n',
				onLast: true,
			} )
		);
};

export const webpack = () => {
	return gulp
		.src( './', { allowEmpty: true, read: false } )
		.pipe(
			webpackStream( {
				config: webpackConfig(),
			} )
		)
		.pipe( gulp.dest( ( file ) => file.base ) );
};

export const watchIt = () => {
	const { toCopy, toIgnore: ignored } = filesToGulp;

	const watcher = gulp.watch( toCopy, {
		cwd: config.srcDir,
		ignored,
		events: [ 'add', 'change', 'unlink' ],
	} );

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
			const copyFile = createTastCopy(
				{ toCopy: _path, toIgnore: [] },
				true
			);
			copyFile();
		};
	} else if ( 'delete' === type ) {
		return ( _path ) => {
			console.log( `File ${ _path } was deleted` );
		};
	}
};

export const jsPotToPhp = ( cb ) => {
	const cmd = `npx pot-to-php ${
		config.domainPath + '/' + config.JSPotFilename
	} ${ config.domainPath }/${ config.textDomain }-js-translations.php ${
		pkg.name
	}`;

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
			'Plural-Forms':
				'nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n',
			'x-generator': 'node-wp-i18n',
			'X-Poedit-KeywordsList':
				'__;_e;_x;esc_attr__;esc_attr_e;esc_html__;esc_html_e\n',
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
				if (
					'undefined' !==
					typeof pot.translations[ '' ][ translation ].comments
						.extracted
				) {
					if (
						excluded_meta.indexOf(
							pot.translations[ '' ][ translation ].comments
								.extracted
						) >= 0
					) {
						// console.log( 'Excluded meta: ' + pot.translations[''][ translation ].comments.extracted );
						delete pot.translations[ '' ][ translation ];
					}
				}
			}

			pot.headers[ 'report-msgid-bugs-to' ] = config.bugReport;
			pot.headers[ 'last-translator' ] = pkg.title;
			pot.headers[ 'language-team' ] = pkg.title;
			const today = new Date();
			pot.headers[ 'po-revision-date' ] =
				today.getFullYear() +
				'-' +
				( '0' + ( today.getMonth() + 1 ) ).slice( -2 ) +
				'-' +
				today.getDate() +
				' ' +
				today.getUTCHours() +
				':' +
				today.getUTCMinutes() +
				'+' +
				today.getTimezoneOffset();

			return pot;
		},
	};

	wpi18n
		.makepot( options )
		.then( function ( wpPackage ) {
			console.log(
				'POT file saved to ' +
					path.relative(
						wpPackage.getPath(),
						wpPackage.getPotFilename()
					)
			);
		} )
		.catch( function ( error ) {
			console.log( error );
		} )
		.finally( done );
};

export const generateMoFiles = () => {
	return gulp
		.src( [ '*.po' ], { cwd: config.domainPath } )
		.pipe( potomo( { verbose: false } ) )
		.pipe( gulp.dest( config.domainPath ) );
};

const createVersionUpdateCB = ( forFile, version ) => {
	let patterns = [];
	const replaceCB = ( match, p1 ) => match.replace( p1, version );

	switch ( forFile ) {
		case 'package':
			// replace only the first occurence
			patterns = [ /"version":\s*"(\d+\.\d+\.\d+)"/i ];
			break;
		case 'readme':
			patterns = [ /Stable tag:(?:\*\*)?[\s\t]*(\d+\.\d+\.\d+)/i ];
			break;
		case 'mainfile':
			// convert "plugin-name" to "PLUGIN_NAME_VER"
			const versionConst =
				pkg.name.replace( '-', '_' ).toUpperCase() + '_VER';
			patterns = [
				/Version:\s*(\d+\.\d+\.\d+)/i,
				new RegExp(
					"'" + versionConst + "',\\s*'(\\d+\\.\\d+\\.\\d+)'"
				),
			];
			break;
		case 'since-xyz':
			patterns = [ /@since[\s\t]*(x\.y\.z)/gi ];
			break;

		default:
			break;
	}
	return through2.obj( function ( file, _, cb ) {
		if ( file.isBuffer() ) {
			let contents = file.contents.toString();
			patterns.forEach( ( regex ) => {
				contents = contents.replace( regex, replaceCB );
			} );
			file.contents = Buffer.from( contents );
		}
		cb( null, file );
	} );
};

export const updateVersion = ( done ) => {
	const { to: version } = getCommandArgs();
	if ( ! version ) {
		done(
			new Error(
				'No version number supplied! usage: gulp updateVersion --to "x.y.z"'
			)
		);
	}

	const srcOptions = { base: './' };

	return (
		gulp
			.src( [ './package.json' ], srcOptions )
			.pipe( createVersionUpdateCB( 'package', version ) )
			.pipe( gulp.dest( './' ) )

			// remove all files from the stream
			.pipe( gulpIgnore.exclude( '**/*' ) )

			// add readme files
			.pipe(
				gulp.src(
					[ './README.md', config.srcDir + '/README.txt' ],
					srcOptions
				)
			)
			.pipe( createVersionUpdateCB( 'readme', version ) )
			.pipe( gulp.dest( './' ) )

			// remove all files from the stream
			.pipe( gulpIgnore.exclude( '**/*' ) )

			// add all php files
			.pipe( gulp.src( `${ config.srcDir }/**/*.php`, srcOptions ) )
			.pipe( createVersionUpdateCB( 'since-xyz', version ) )
			.pipe( gulp.dest( './' ) )

			// remove all files from the stream
			.pipe( gulpIgnore.exclude( '**/*' ) )

			// add main file
			.pipe(
				gulp.src( `${ config.srcDir }/${ pkg.name }.php`, srcOptions )
			)
			.pipe( createVersionUpdateCB( 'mainfile', version ) )
			.pipe( gulp.dest( './' ) )
	);
};

export const updateChangelog = ( done ) => {
	const { to: version } = getCommandArgs();
	if ( ! version ) {
		done(
			new Error(
				'No version number supplied! usage: gulp updateChangelog --to "x.y.z"'
			)
		);
	}

	const srcOptions = { cwd: './', base: './' };

	return (
		gulp
			.src( config.srcDir + '/README.txt', srcOptions )
			.pipe(
				through2.obj( function ( file, _, cb ) {
					if ( file.isBuffer() ) {
						const regex = /== Changelog ==([\s\S])/i;
						const contents = file.contents
							.toString()
							.replace( regex, ( match, p1 ) => {
								const changes = fs
									.readFileSync( './changelog.md', 'utf8' ) // get contents of changelog file
									.match(
										/(?<=\#\#\sUnreleased)[\s\S]+?(?=##\s?\[\d+\.\d+\.\d+)/i
									)[ 0 ] // match the changes in Unreleased section
									.replace( /(^|\n)(\#\#.+)/g, '' ) // remove headings like Enhancements, Bug fixes
									.replace( /\n[\s\t]*\n/g, '\n' ) // replace empty lines
									.trim(); // cleanup

								const replace = `\n\n= ${ version } =\n${ changes }\n`;
								return match.replace( p1, replace );
							} );
						file.contents = Buffer.from( contents );
					}
					cb( null, file );
				} )
			)
			.pipe( gulp.dest( './' ) )
			// remove all files from the stream
			.pipe( gulpIgnore.exclude( '**/*' ) )
			// add all php files
			.pipe( gulp.src( 'changelog.md', srcOptions ) )
			.pipe(
				through2.obj( function ( file, _, cb ) {
					if ( file.isBuffer() ) {
						const regex = /## (Unreleased)/i;
						const contents = file.contents
							.toString()
							.replace( regex, ( match, p1 ) => {
								const today = new Date();
								const replace = `[${ version } - ${ today.getFullYear() }-${ (
									'0' +
									( today.getMonth() + 1 )
								).slice(
									-2
								) }-${ today.getDate() }](https://github.com/manzoorwanijk/${
									pkg.name
								}/releases/tag/v${ version })`;

								return match.replace(
									p1,
									`Unreleased\n\n## ${ replace }`
								);
							} );
						file.contents = Buffer.from( contents );
					}
					cb( null, file );
				} )
			)
			.pipe( gulp.dest( './' ) )
	);
};

export const i18n = gulp.series( jsPotToPhp, translate, generateMoFiles );

export const dev = gulp.parallel( gulp.series( clean, copy ), watchIt );

export const build = gulp.series( clean, webpack, i18n, copy );

export const prerelease = gulp.parallel( build, copyChangelog );

export const precommit = gulp.series(
	updateVersion,
	updateChangelog,
	prerelease
);
