<?php
/**
 * The main plugin file.
 *
 * @link              https://t.me/manzoorwanijk
 * @since             1.0.0
 * @package           WPTelegram_Comments
 *
 * @wordpress-plugin
 * Plugin Name:       WP Telegram Comments
 * Plugin URI:        https://t.me/WPTelegram
 * Description:       Add comments to posts/pages on your WordPress website by using Telegram Comments Widget.
 * Version:           1.0.1
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

/**
 * Currently plugin version.
 */
define( 'WPTELEGRAM_COMMENTS_VER', '1.0.1' );

define( 'WPTELEGRAM_COMMENTS_BASENAME', plugin_basename( __FILE__ ) );

define( 'WPTELEGRAM_COMMENTS_DIR', untrailingslashit( plugin_dir_path( __FILE__ ) ) );

defined( 'WPTELEGRAM_COMMENTS_URL' ) || define( 'WPTELEGRAM_COMMENTS_URL', untrailingslashit( plugins_url( '', __FILE__ ) ) );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-wptelegram-comments-activator.php
 */
function activate_wptelegram_comments() {
	require_once WPTELEGRAM_COMMENTS_DIR . '/includes/class-wptelegram-comments-activator.php';
	WPTelegram_Comments_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-wptelegram-comments-deactivator.php
 */
function deactivate_wptelegram_comments() {
	require_once WPTELEGRAM_COMMENTS_DIR . '/includes/class-wptelegram-comments-deactivator.php';
	WPTelegram_Comments_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_wptelegram_comments' );
register_deactivation_hook( __FILE__, 'deactivate_wptelegram_comments' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require WPTELEGRAM_COMMENTS_DIR . '/includes/class-wptelegram-comments.php';

/**
 * Begins execution of the plugin and acts as the main instance of WPTelegram_Comments.
 *
 * Returns the main instance of WPTelegram_Comments to prevent the need to use globals.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function WPTG_Comments() { // phpcs:ignore WordPress.NamingConventions.ValidFunctionName -- Ignore  snake_case

	return WPTelegram_Comments::instance();
}

// Fire.
WPTG_Comments();

define( 'WPTELEGRAM_COMMENTS_LOADED', true );
