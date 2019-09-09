<?php
/**
 *
 * @link              https://t.me/manzoorwanijk
 * @since             1.0.0
 * @package           WPTelegram_Comments
 *
 * @wordpress-plugin
 * Plugin Name:       WP Telegram Comments Dev
 * Plugin URI:        https://t.me/WPTelegram
 * Description:       Development Environment for WP Telegram Comments
 * Version:           1.0.0
 * Author:            Manzoor Wani
 * Author URI:        https://t.me/manzoorwanijk
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       wptelegram-comments
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

if ( ! defined( 'WPTELEGRAM_DEV' ) ) {
	define( 'WPTELEGRAM_DEV', true );
}

$mainfile = plugin_dir_path( __FILE__ ) . 'build/wptelegram-comments.php';

if ( file_exists( $mainfile ) ) {
	require $mainfile;
} else {
	add_action( 'admin_notices', 'wptelegram_comments_npm_build_notice' );
}
/**
 * Display build admin notice.
 */
function wptelegram_comments_npm_build_notice() {
	$class   = 'notice notice-error';
	$message = sprintf(
		esc_html( '%1$s is active but requires a build. Please run %2$s and then %3$s or %4$s to create a build.' ),
		'WP Telegram Comments Dev',
		'<code>npm install</code>',
		'<code>npm run dev</code>',
		'<code>npm run build</code>'
	);

	printf( '<div class="%1$s"><p>%2$s</p></div>', esc_attr( $class ), $message );
}
