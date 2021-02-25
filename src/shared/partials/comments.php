<?php
/**
 * Provide a public-facing view for the widget
 *
 * @link       https://t.me/manzoorwanijk
 * @since      1.0.0
 *
 * @package    WPTelegram_Comments
 * @subpackage WPTelegram_Comments/public/partials
 */

if ( ! defined( 'ABSPATH' ) ) {
	die;
}
global $post;

$attributes = apply_filters( 'wptelegram_comments_widget_attributes', '', $post );

?>
<div id="comments" class="comments-area">
	<?php do_action( 'wptelegram_comments_before_widget' ); ?>

	<?php // phpcs:ignore WordPress.WP.EnqueuedResources ?>
	<?php // phpcs:ignore WordPress.Security.EscapeOutput ?>
	<script <?php echo $attributes; ?>></script>

	<?php do_action( 'wptelegram_comments_after_widget' ); ?>
</div>
