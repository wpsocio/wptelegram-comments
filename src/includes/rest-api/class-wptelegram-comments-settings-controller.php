<?php
/**
 * Plugin settings endpoint for WordPress REST API.
 *
 * @link       https://t.me/manzoorwanijk
 * @since      1.0.0
 *
 * @package    WPTelegram_Comments
 * @subpackage WPTelegram_Comments/includes
 */

/**
 * Class to handle the settings endpoint.
 *
 * @since 1.0.0
 *
 * @package    WPTelegram_Comments
 * @subpackage WPTelegram_Comments/includes
 * @author     Manzoor Wani <@manzoorwanijk>
 */
class WPTelegram_Comments_Settings_Controller extends WPTelegram_Comments_REST_Controller {

	/**
	 * The plugin settings/options.
	 *
	 * @var string
	 */
	protected $settings;

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		$this->rest_base = 'settings';
		$this->settings  = WPTG_Comments()->options();
	}

	/**
	 * Register the routes for the objects of the controller.
	 *
	 * @since 1.0.0
	 */
	public function register_routes() {

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_settings' ),
					'permission_callback' => array( $this, 'settings_permissions' ),
					'args'                => self::get_settings_params( 'view' ),
				),
				array(
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'update_settings' ),
					'permission_callback' => array( $this, 'settings_permissions' ),
					'args'                => self::get_settings_params( 'edit' ),
				),
			)
		);
	}

	/**
	 * Check request permissions.
	 *
	 * @since 1.0.0
	 *
	 * @return bool
	 */
	public function settings_permissions() {
		return current_user_can( 'manage_options' );
	}

	/**
	 * Get the default settings.
	 *
	 * @return array
	 */
	public static function get_default_settings() {

		$settings = WPTG_Comments()->options()->get_data();

		// If we have somethings saved.
		if ( ! empty( $settings ) ) {
			return $settings;
		}

		// Get the default values.
		$settings = self::get_settings_params();

		foreach ( $settings as $key => $args ) {
			$settings[ $key ] = isset( $args['default'] ) ? $args['default'] : '';
		}

		return $settings;
	}

	/**
	 * Get settings via API.
	 *
	 * @since 1.0.0
	 */
	public function get_settings() {
		return rest_ensure_response( self::get_default_settings() );
	}

	/**
	 * Update settings.
	 *
	 * @since 1.0.0
	 *
	 * @param WP_REST_Request $request WP REST API request.
	 */
	public function update_settings( WP_REST_Request $request ) {

		$settings = array();

		foreach ( self::get_settings_params() as $key => $args ) {
			$value = $request->get_param( $key );

			if ( null !== $value || isset( $args['default'] ) ) {

				$settings[ $key ] = null === $value ? $args['default'] : $value;
			}
		}

		WPTG_Comments()->options()->set_data( $settings )->update_data();

		return rest_ensure_response( $settings );
	}

	/**
	 * Retrieves the query params for the settings.
	 *
	 * @since 1.0.0
	 *
	 * @param string $context The context for the values.
	 * @return array Query parameters for the settings.
	 */
	public static function get_settings_params( $context = 'edit' ) {
		return array(
			'code'       => array(
				'type'              => 'string',
				'required'          => ( 'edit' === $context ),
				'sanitize_callback' => array( __CLASS__, 'sanitize_param' ),
				'validate_callback' => array( __CLASS__, 'validate_param' ),
			),
			'attributes' => array(
				'type'                 => 'object',
				'additionalProperties' => true,
				'default'              => array( 'async' => 'async' ),
				'sanitize_callback'    => array( __CLASS__, 'sanitize_param' ),
				'validate_callback'    => 'rest_validate_request_arg',
			),
			'post_types' => array(
				'type'              => 'array',
				'items'             => array(
					'type' => 'string',
				),
				'default'           => array( 'post' ),
				'sanitize_callback' => array( __CLASS__, 'sanitize_param' ),
				'validate_callback' => 'rest_validate_request_arg',
			),
			'exclude'    => array(
				'type'              => 'string',
				'sanitize_callback' => array( __CLASS__, 'sanitize_param' ),
				'validate_callback' => 'rest_validate_request_arg',
			),
		);
	}

	/**
	 * Validate the params.
	 *
	 * @since 1.0.0
	 *
	 * @param mixed           $value   Value of the param.
	 * @param WP_REST_Request $request WP REST API request.
	 * @param string          $key     Param key.
	 */
	public static function validate_param( $value, WP_REST_Request $request, $key ) {
		switch ( $key ) {
			case 'code':
				$pattern = '/\A<script[^>]+?><\/script>\Z/';
				break;
		}

		return (bool) preg_match( $pattern, $value );
	}

	/**
	 * Sanitize the params before saving to DB.
	 *
	 * @since 1.0.0
	 *
	 * @param mixed           $value   Value of the param.
	 * @param WP_REST_Request $request WP REST API request.
	 * @param string          $key     Param key.
	 */
	public static function sanitize_param( $value, WP_REST_Request $request, $key ) {
		switch ( $key ) {
			case 'code':
				return trim( $value );
			case 'attributes':
			case 'post_types':
				return array_map( 'sanitize_text_field', $value );
			case 'exclude':
				return implode( ',', array_filter( array_map( 'sanitize_text_field', explode( ',', $value ) ) ) );
		}
	}
}
