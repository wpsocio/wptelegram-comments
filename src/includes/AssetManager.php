<?php
/**
 * The assets manager of the plugin.
 *
 * @link       https://manzoorwani.dev
 * @since      1.1.0
 *
 * @package    WPTelegram\Comments
 * @subpackage WPTelegram\Comments\includes
 */

namespace WPTelegram\Comments\includes;

use WPTelegram\Comments\includes\restApi\SettingsController;
use ReflectionClass;

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
	 * Register the assets.
	 *
	 * @since    x.y.z
	 */
	public function register_assets() {

		$request_check = new ReflectionClass( self::class );

		$constants = $request_check->getConstants();

		$assets = $this->plugin()->assets();

		$style_deps = [];

		foreach ( $constants as $handle ) {
			wp_register_script(
				$handle,
				$assets->get_asset_url( $handle ),
				$assets->get_asset_dependencies( $handle ),
				$assets->get_asset_version( $handle ),
				true
			);

			// Register styles only if they exist.
			if ( $assets->has_asset( $handle, Assets::ASSET_EXT_CSS ) ) {
				$deps = ! empty( $style_deps[ $handle ] ) ? $style_deps[ $handle ] : [];
				wp_register_style(
					$handle,
					$assets->get_asset_url( $handle, Assets::ASSET_EXT_CSS ),
					$deps,
					$assets->get_asset_version( $handle, Assets::ASSET_EXT_CSS ),
					'all'
				);
			}
		}

		if ( ! defined( 'WPTELEGRAM_LOADED' ) ) {
			wp_register_style(
				'wptelegram-menu',
				$assets->url( sprintf( '/css/admin-menu%s.css', wp_scripts_get_suffix() ) ),
				[],
				$this->plugin()->version(),
				'all'
			);
		}
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.1.0
	 * @param string $hook_suffix The current admin page.
	 */
	public function enqueue_admin_styles( $hook_suffix ) {

		if ( ! defined( 'WPTELEGRAM_LOADED' ) ) {
			wp_enqueue_style( 'wptelegram-menu' );
		}

		$handle = self::ADMIN_MAIN_JS_HANDLE;

		// Load only on settings page.
		if ( $this->is_settings_page( $hook_suffix ) && wp_style_is( $handle, 'registered' ) ) {
			wp_enqueue_style( $handle );
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
			$handle = self::ADMIN_MAIN_JS_HANDLE;

			wp_enqueue_script( $handle );

			// Pass data to JS.
			$data = $this->get_dom_data();
			// Not to expose bot token to non-admins.
			if ( current_user_can( 'manage_options' ) ) {
				$data['savedSettings'] = SettingsController::get_default_settings();
			}
			$data['uiData']['post_types'] = $this->get_post_type_options();

			self::add_dom_data( $handle, $data );
		}
	}

	/**
	 * Add the data to DOM.
	 *
	 * @since x.y.z
	 *
	 * @param string $handle The script handle to attach the data to.
	 * @param mixed  $data   The data to add.
	 * @param string $var    The JavaScript variable name to use.
	 *
	 * @return void
	 */
	public static function add_dom_data( $handle, $data, $var = 'wptelegram_comments' ) {
		wp_add_inline_script(
			$handle,
			sprintf( 'var %s = %s;', $var, wp_json_encode( $data ) ),
			'before'
		);
	}

	/**
	 * Get the common DOM data.
	 *
	 * @return array
	 */
	private function get_dom_data() {
		$data = [
			'pluginInfo' => [
				'title'       => $this->plugin()->title(),
				'name'        => $this->plugin()->name(),
				'version'     => $this->plugin()->version(),
				'description' => __( 'With this plugin, you can add comments to posts/pages on your WordPress website by using Telegram Comments Widget.', 'wptelegram-comments' ),
			],
			'api'        => [
				'admin_url'      => admin_url(),
				'nonce'          => wp_create_nonce( 'wptelegram-comments' ),
				'rest_namespace' => 'wptelegram-comments/v1',
				'wp_rest_url'    => esc_url_raw( rest_url() ),
			],
			'assets'     => [
				'logoUrl'   => $this->plugin()->assets()->url( '/icons/icon-128x128.png' ),
				'tgIconUrl' => $this->plugin()->assets()->url( '/icons/tg-icon.svg' ),
			],
			'uiData'     => [],
			'i18n'       => Utils::get_jed_locale_data( 'wptelegram-comments' ),
		];

		return $data;
	}

	/**
	 * Get the registered post types.
	 *
	 * @since  1.1.0
	 * @return array
	 */
	public function get_post_type_options() {

		$options = [];

		$post_types = get_post_types( [ 'public' => true ], 'objects' );

		foreach ( $post_types  as $post_type ) {

			if ( 'attachment' !== $post_type->name ) {

				$options[] = [
					'value' => $post_type->name,
					'label' => "{$post_type->labels->singular_name} ({$post_type->name})",
				];
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
		return ( false !== strpos( $hook_suffix, '_page_' . $this->plugin()->name() ) );
	}
}
