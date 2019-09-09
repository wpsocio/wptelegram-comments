( function( $ ) {
	'use strict';

	const app1 = {};

	app1.configure = function() {
		app1.settings_block = $( '#wptelegram-comments-settings' );
	};

	app1.init = function() {
		app1.configure();
		if ( app1.settings_block.length ) {
			app1.remove_junk();
		}
	};

	app1.remove_junk = function() {
		$( '#forms-css' ).prop( 'disabled', true );
	};

	$( app1.init );
}( jQuery ) );
