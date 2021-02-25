<?php
/**
 * Utility methods.
 *
 * @link       https://t.me/manzoorwanijk
 * @since      x.y.z
 *
 * @package    WPTelegram\Comments
 * @subpackage WPTelegram\Comments\includes
 */

namespace WPTelegram\Comments\includes;

use WPTelegram\Comments\includes\restApi\RESTController;
use WP_Error;

/**
 * Utility methods.
 *
 * Utility methods.
 *
 * @package    WPTelegram\Comments
 * @subpackage WPTelegram\Comments\includes
 * @author     Manzoor Wani <@manzoorwanijk>
 */
class Utils {

	/**
	 * Check whether the template path is valid.
	 *
	 * @since x.y.z
	 * @param string $template The template path.
	 *
	 * @return bool
	 */
	public static function is_valid_template( $template ) {
		/**
		 * Only allow templates that are in the active theme directory,
		 * parent theme directory, or the /wp-includes/theme-compat/ directory
		 * (prevent directory traversal attacks)
		 */
		$valid_paths = array_map(
			'realpath',
			array(
				get_stylesheet_directory(),
				get_template_directory(),
				ABSPATH . WPINC . '/theme-compat/',
			)
		);

		$path = realpath( $template );

		foreach ( $valid_paths as $valid_path ) {
			if ( preg_match( '#\A' . preg_quote( $valid_path, '#' ) . '#', $path ) ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Returns Jed-formatted localization data.
	 *
	 * @source gutenberg_get_jed_locale_data()
	 *
	 * @since x.y.z
	 *
	 * @param  string $domain Translation domain.
	 *
	 * @return array
	 */
	public static function get_jed_locale_data( $domain ) {
		$translations = get_translations_for_domain( $domain );

		$locale = array(
			'' => array(
				'domain' => $domain,
				'lang'   => is_admin() ? get_user_locale() : get_locale(),
			),
		);

		if ( ! empty( $translations->headers['Plural-Forms'] ) ) {
			$locale['']['plural_forms'] = $translations->headers['Plural-Forms'];
		}

		foreach ( $translations->entries as $msgid => $entry ) {
			$locale[ $msgid ] = $entry->translations;
		}

		return $locale;
	}
}
