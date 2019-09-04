<?php
/**
 * WP REST API functionality of the plugin.
 *
 * @link       https://t.me/manzoorwanijk
 * @since      1.0.0
 *
 * @package    WPTelegram_Comments
 * @subpackage WPTelegram_Comments/includes
 */

/**
 * Base class for all the endpoints.
 *
 * @since 1.0.0
 *
 * @package    WPTelegram_Comments
 * @subpackage WPTelegram_Comments/includes
 * @author     Manzoor Wani <@manzoorwanijk>
 */
abstract class WPTelegram_Comments_REST_Controller extends WP_REST_Controller {

	/**
	 * The namespace of this controller's route.
	 *
	 * @since 1.0.0
	 * @var string
	 */
	protected $namespace = 'wptelegram-comments/v1';

	/**
	 * The base of this controller's route.
	 *
	 * @var string
	 */
	protected $rest_base;
}
