<?php
/**
 * The assets manager of the plugin.
 *
 * @link       https://t.me/manzoorwanijk
 * @since      1.1.0
 *
 * @package    WPTelegram\Comments
 * @subpackage WPTelegram\Comments\includes
 */

namespace WPTelegram\Comments\includes;

/**
 * The assets manager of the plugin.
 *
 * Loads the plugin assets.
 *
 * @package    WPTelegram\Comments
 * @subpackage WPTelegram\Comments\includes
 * @author     Manzoor Wani <@manzoorwanijk>
 */
class AssetManager extends BaseClass {

	const ADMIN_MAIN_JS_HANDLE = 'wptelegram-comments--main';
	const PUBLIC_JS_HANDLE     = 'wptelegram-comments--public';

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.1.0
	 * @param string $hook_suffix The current admin page.
	 */
	public function enqueue_admin_styles( $hook_suffix ) {

		if ( ! defined( 'WPTELEGRAM_LOADED' ) ) {
			wp_enqueue_style(
				$this->plugin->name() . '-menu',
				$this->plugin->assets()->url( sprintf( '/css/admin-menu%s.css', wp_scripts_get_suffix() ) ),
				array(),
				$this->plugin->version(),
				'all'
			);
		}

		$entrypoint = self::ADMIN_MAIN_JS_HANDLE;

		// Load only on settings page.
		if ( $this->is_settings_page( $hook_suffix ) && $this->plugin->assets()->has_asset( $entrypoint, Assets::ASSET_EXT_CSS ) ) {
			wp_enqueue_style(
				$entrypoint,
				$this->plugin->assets()->get_asset_url( $entrypoint, Assets::ASSET_EXT_CSS ),
				array(),
				$this->plugin->assets()->get_asset_version( $entrypoint, Assets::ASSET_EXT_CSS ),
				'all'
			);
		}
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.1.0
	 * @param string $hook_suffix The current admin page.
	 */
	public function enqueue_admin_scripts( $hook_suffix ) {
		// Load only on settings page.
		if ( $this->is_settings_page( $hook_suffix ) ) {
			$entrypoint = self::ADMIN_MAIN_JS_HANDLE;

			wp_enqueue_script(
				$entrypoint,
				$this->plugin->assets()->get_asset_url( $entrypoint ),
				$this->plugin->assets()->get_asset_dependencies( $entrypoint ),
				$this->plugin->assets()->get_asset_version( $entrypoint ),
				true
			);

			// Pass data to JS.
			$data = $this->get_dom_data();
			// Not to expose bot token to non-admins.
			if ( current_user_can( 'manage_options' ) ) {
				$data['savedSettings'] = \WPTelegram\Comments\includes\restApi\SettingsController::get_default_settings();
			}
			$data['uiData']['post_types'] = $this->get_post_type_options();

			wp_add_inline_script(
				$entrypoint,
				sprintf( 'var wptelegram_comments = %s;', json_encode( $data ) ), // phpcs:ignore WordPress.WP.AlternativeFunctions
				'before'
			);
		}
	}

	/**
	 * Get the common DOM data.
	 *
	 * @return array
	 */
	private function get_dom_data() {
		$data = array(
			'pluginInfo' => array(
				'title'       => $this->plugin->title(),
				'name'        => $this->plugin->name(),
				'version'     => $this->plugin->version(),
				'description' => __( 'With this plugin, you can add comments to posts/pages on your WordPress website by using Telegram Comments Widget.', 'wptelegram-comments' ),
			),
			'api'        => array(
				'admin_url'      => admin_url(),
				'nonce'          => wp_create_nonce( 'wptelegram-comments' ),
				'rest_namespace' => 'wptelegram-comments/v1',
				'wp_rest_url'    => esc_url_raw( rest_url() ),
			),
			'assets'     => array(
				'logoUrl'   => $this->plugin->assets()->url( '/icons/icon-128x128.png' ),
				'tgIconUrl' => $this->plugin->assets()->url( '/icons/tg-icon.svg' ),
			),
			'uiData'     => array(),
			'i18n'       => Utils::get_jed_locale_data( 'wptelegram-comments' ),
		);

		return $data;
	}

	/**
	 * Get the registered post types.
	 *
	 * @since  1.1.0
	 * @return array
	 */
	public function get_post_type_options() {

		$options = array();

		$post_types = get_post_types( array( 'public' => true ), 'objects' );

		foreach ( $post_types  as $post_type ) {

			if ( 'attachment' !== $post_type->name ) {

				$options[] = array(
					'value' => $post_type->name,
					'label' => "{$post_type->labels->singular_name} ({$post_type->name})",
				);
			}
		}

		return apply_filters( 'wptelegram_comments_post_type_options', $options, $post_types );
	}

	/**
	 * Enqueue assets for the Gutenberg block
	 *
	 * @since 1.1.0
	 * @param string $hook_suffix The current admin page.
	 */
	public function is_settings_page( $hook_suffix ) {
		return ( false !== strpos( $hook_suffix, '_page_' . $this->plugin->name() ) );
	}
}
