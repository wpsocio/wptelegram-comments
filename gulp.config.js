/**
 * Gulp Configuration File
 */
/**
 * Internal dependencies
 */
import pkg from './package.json';

const srcDir = './src';
const name = pkg.name;

const config = {
	srcDir,
	buildDir: './build',
	watchPhp: srcDir + '/**/*.php',
	// Translation options.
	textDomain: name,
	potFilename: `${ name }.pot`,
	JSPotFilename: 'js-translations.pot',
	domainPath: srcDir + '/languages',
	packageName: 'WP Telegram Comments',
	bugReport: 'http://wordpress.org/support/plugin/' + name,
	lastTranslator: 'Manzoor Wani <@manzoorwanijk>',
	team: 'WP Telegram Team',
};

export default config;
