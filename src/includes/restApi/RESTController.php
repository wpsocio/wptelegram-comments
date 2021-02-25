<?php
/**
 * WP REST API functionality of the plugin.
 *
 * @link       https://t.me/manzoorwanijk
 * @since      x.y.z
 *
 * @package    WPTelegram\Comments
 * @subpackage WPTelegram\Comments\includes
 */

namespace WPTelegram\Comments\includes\restApi;

/**
 * Base class for all the endpoints.
 *
 * @since x.y.z
 *
 * @package    WPTelegram\Comments
 * @subpackage WPTelegram\Comments\includes
 * @author     Manzoor Wani <@manzoorwanijk>
 */
abstract class RESTController extends \WP_REST_Controller {

	/**
	 * The namespace of this controller's route.
	 *
	 * @var string
	 * @since x.y.z
	 */
	const NAMESPACE = 'wptelegram-comments/v1';

	/**
	 * The base of this controller's route.
	 *
	 * @var string
	 */
	const REST_BASE = '';
}
