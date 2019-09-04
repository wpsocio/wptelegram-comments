<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://t.me/manzoorwanijk
 * @since      1.0.0
 *
 * @package    WPTelegram_Comments
 * @subpackage WPTelegram_Comments/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    WPTelegram_Comments
 * @subpackage WPTelegram_Comments/admin
 * @author     Manzoor Wani <@manzoorwanijk>
 */
class WPTelegram_Comments_Admin {

	/**
	 * The plugin class instance.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      WPTelegram_Comments $plugin The plugin class instance.
	 */
	private $plugin;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since 1.0.0
	 * @param WPTelegram_Comments $plugin The plugin class instance.
	 */
	public function __construct( $plugin ) {

		$this->plugin = $plugin;
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles( $hook_suffix ) {

		// Load only on settings page.
		if ( $this->is_settings_page( $hook_suffix ) ) {

			$style_path = '/admin/settings/main' . ( is_rtl() ? '.rtl' : '' ) . '.css';

			if ( file_exists( $this->plugin->dir( $style_path ) ) ) {

				// Avoid caching for development.
				$version = defined( 'WPTELEGRAM_DEV' ) && WPTELEGRAM_DEV ? date( 'y.m.d-is', filemtime( $this->plugin->dir( $path ) ) ) : $this->plugin->version();

				wp_enqueue_style( $this->plugin->name() . '-main', $this->plugin->url( $style_path ), array(), $version, 'all' );
			}
		}
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since 1.0.0
	 * @param string $hook_suffix The current admin page.
	 */
	public function enqueue_scripts( $hook_suffix ) {

		wp_enqueue_script(
			$this->plugin->name(),
			$this->plugin->url( '/admin/js/admin.js' ),
			array( 'jquery' ),
			$this->plugin->version(),
			false
		);

		// script localization.
		$translation_array = array(
			'title'   => $this->plugin->title(),
			'name'    => $this->plugin->name(),
			'version' => $this->plugin->version(),
			'api'     => array(
				'ajax' => array(
					'nonce' => wp_create_nonce( 'wptelegram-comments' ),
					'use'   => 'server', // or may be 'browser'?
					'url'   => admin_url( 'admin-ajax.php' ),
				),
				'rest' => array(
					'nonce' => wp_create_nonce( 'wp_rest' ),
					'url'   => esc_url_raw( rest_url( 'wptelegram-comments/v1' ) ),
				),
			),
		);

		wp_localize_script(
			$this->plugin->name(),
			'wptelegram_comments',
			$translation_array
		);

		// Load only on settings page.
		if ( $this->is_settings_page( $hook_suffix ) ) {

			// Avoid caching for development.
			$version = defined( 'WPTELEGRAM_DEV' ) && WPTELEGRAM_DEV ? date( 'y.m.d-is', filemtime( $this->plugin->dir( '/admin/settings/main.js' ) ) ) : $this->plugin->version();

			wp_enqueue_script( $this->plugin->name() . '-settings', $this->plugin->url( '/admin/settings/main.js' ), array( 'jquery' ), $version, true );

			// Pass data to JS.
			$data = array(
				'settings' => array(
					'view_opts'  => array(
						'plugin_url' => $this->plugin->url(),
						'post_types' => $this->get_post_type_options(),
					),
					'saved_opts' => current_user_can( 'manage_options' ) ? WPTelegram_Comments_Settings_Controller::get_default_settings() : array(), // Not to expose bot token to non-admins.
					'assets'     => array(
						'logo_url' => $this->plugin->url( '/admin/icons/icon-30x30.svg' ),
						'tg_icon'  => $this->plugin->url( '/admin/icons/tg-icon.svg' ),
					),
					'i18n'       => wptelegram_get_jed_locale_data( 'wptelegram-comments' ),
				),
			);

			wp_add_inline_script(
				$this->plugin->name(),
				sprintf( 'Object.assign(wptelegram_comments, %s);', json_encode( $data ) ), // phpcs:ignore WordPress.WP.AlternativeFunctions
				'before'
			);

			// For Facebook like button.
			wp_add_inline_script(
				$this->plugin->name() . '-settings',
				'(function(d, s, id) {'
				. '  var js, fjs = d.getElementsByTagName(s)[0];'
				. '  if (d.getElementById(id)) return;'
				. '  js = d.createElement(s); js.id = id;'
				. '  js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.9";'
				. '  fjs.parentNode.insertBefore(js, fjs);'
				. '}(document, "script", "facebook-jssdk"));',
				'after'
			);

			// For Twitter Follow button.
			wp_enqueue_script( $this->plugin->name() . '-twitter', 'https://platform.twitter.com/widgets.js', array(), $this->plugin->version(), true );
		}

		// If the block editor assets are loaded.
		/* if ( did_action( 'enqueue_block_editor_assets' ) ) {
			$data = array(
				'blocks' => array(
					'assets' => array(),
				),
			);

			wp_add_inline_script(
				$this->plugin->name(),
				sprintf( 'Object.assign(wptelegram_comments, %s);', json_encode( $data ) ), // phpcs:ignore WordPress.WP.AlternativeFunctions
				'before'
			);
		} */
	}

	/**
	 * Format the Twitter script.
	 *
	 * @since 1.0.0
	 *
	 * @param string $tag    The `<script>` tag for the enqueued script.
	 * @param string $handle The script's registered handle.
	 * @param string $src    The script's source URL.
	 *
	 * @return string
	 */
	public function format_twitter_script_tag( $tag, $handle, $src ) {
		if ( $this->plugin->name() . '-twitter' !== $handle ) {
			return $tag;
		}
		// phpcs:ignore WordPress.WP.EnqueuedResources
		return '<script async src="' . $src . '" charset="utf-8"></script>' . PHP_EOL;
	}

	/**
	 * Enqueue assets for the Gutenberg block
	 *
	 * @since 1.0.0
	 * @param string $hook_suffix The current admin page.
	 */
	public function is_settings_page( $hook_suffix ) {
		return ( current_user_can( 'manage_options' ) && false !== strpos( $hook_suffix, '_page_' . $this->plugin->name() ) );
	}

	/**
	 * Register WP REST API routes.
	 *
	 * @since 1.0.0
	 */
	public function register_rest_routes() {
		$controller = new WPTelegram_Comments_Settings_Controller();
		$controller->register_routes();
	}

	/**
	 * Get the registered post types.
	 *
	 * @since  1.0.0
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
	 * Register the admin menu.
	 *
	 * @since 1.0.0
	 */
	public function add_plugin_admin_menu() {

		if ( defined( 'WPTELEGRAM_LOADED' ) && WPTELEGRAM_LOADED ) {
			add_submenu_page(
				'wptelegram',
				esc_html( $this->plugin->title() ),
				esc_html__( 'Telegram Comments', 'wptelegram-comments' ),
				'manage_options',
				$this->plugin->name(),
				array( $this, 'display_plugin_admin_page' )
			);
		} else {
			add_menu_page(
				esc_html( $this->plugin->title() ),
				esc_html( $this->plugin->title() ),
				'manage_options',
				$this->plugin->name(),
				array( $this, 'display_plugin_admin_page' ),
				$this->plugin->url( '/admin/icons/icon-16x16-white.svg' )
			);
		}
	}

	/**
	 * Render the settings page for this plugin.
	 *
	 * @since 1.0.0
	 */
	public function display_plugin_admin_page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		include $this->plugin->dir( '/admin/partials/admin-display.php' );
	}

}
