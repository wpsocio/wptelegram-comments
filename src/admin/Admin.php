<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://manzoorwani.dev
 * @since      1.0.0
 *
 * @package    WPTelegram\Comments
 * @subpackage WPTelegram\Comments\admin
 */

namespace WPTelegram\Comments\admin;

use WPTelegram\Comments\includes\BaseClass;

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    WPTelegram\Comments
 * @subpackage WPTelegram\Comments\admin
 * @author     Manzoor Wani <@manzoorwanijk>
 */
class Admin extends BaseClass {

	/**
	 * Register WP REST API routes.
	 *
	 * @since 1.0.0
	 */
	public function register_rest_routes() {
		$controller = new \WPTelegram\Comments\includes\restApi\SettingsController();
		$controller->register_routes();
	}

	/**
	 * Register the admin menu.
	 *
	 * @since 1.0.0
	 */
	public function add_plugin_admin_menu() {

		if ( defined( 'WPTELEGRAM_LOADED' ) ) {
			add_submenu_page(
				'wptelegram',
				esc_html( $this->plugin()->title() ),
				esc_html__( 'Telegram Comments', 'wptelegram-comments' ),
				'manage_options',
				$this->plugin()->name(),
				[ $this, 'display_plugin_admin_page' ]
			);
		} else {
			add_menu_page(
				esc_html( $this->plugin()->title() ),
				esc_html( $this->plugin()->title() ),
				'manage_options',
				$this->plugin()->name(),
				[ $this, 'display_plugin_admin_page' ]
			);
		}
	}

	/**
	 * Render the settings page for this plugin.
	 *
	 * @since 1.0.0
	 */
	public function display_plugin_admin_page() {
		?>
			<div id="wptelegram-comments-settings"></div>
		<?php
	}
}
