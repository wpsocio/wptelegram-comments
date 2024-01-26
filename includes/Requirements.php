<?php
/**
 * Handles the plugin requirements.
 *
 * @link      https://wpsocio.com
 * @since     1.1.8
 *
 * @package WPTelegram
 * @subpackage WPTelegram\Comments\includes
 */

namespace WPTelegram\Comments\includes;

/**
 * Handles the plugin requirements.
 *
 * @package WPTelegram
 * @subpackage WPTelegram\Comments\includes
 * @author   WP Socio
 */
class Requirements extends \WPSocio\WPUtils\Requirements {

	/**
	 * Display the requirements.
	 *
	 * @since 1.1.8
	 */
	public function display_requirements() {
		$env_details = $this->get_env_details();
		?>
		<tr class="plugin-update-tr">
			<td colspan="5" class="plugin-update colspanchange">
				<div class="update-message notice inline notice-error notice-alt" style="padding-block-end: 1rem;">
					<p>
						<?php esc_html_e( 'This plugin is not compatible with your website configuration.', 'wptelegram-comments' ); ?>
					</p>
					<span><?php esc_html_e( 'Missing requirements', 'wptelegram-comments' ); ?>&nbsp;👇</span>
					<ul style="list-style-type: disc; margin-inline-start: 2rem;">
						<?php
						foreach ( $env_details['data'] as $name => $requirement ) :
							if ( ! $requirement['satisfied'] ) :
								?>
								<li>
									<?php
									echo esc_html( $name );
									echo '&nbsp;&dash;&nbsp;';
									echo esc_html(
										sprintf(
										/* translators: %s: Version number */
											__( 'Current version: %s', 'wptelegram-comments' ),
											$requirement['version']
										)
									);
									echo '&nbsp;&comma;&nbsp;';
									echo esc_html(
										sprintf(
										/* translators: %s: Version number */
											__( 'Minimum required version: %s', 'wptelegram-comments' ),
											$requirement['min']
										)
									);
									?>
								</li>
								<?php
							endif;
						endforeach;
						?>
					</ul>
					<span>
						<?php esc_html_e( 'Please contact your hosting provider to ensure the above requirements are met.', 'wptelegram-comments' ); ?>
					</span>
				</div>
			</td>
		</tr>
		<?php
	}
}
