/**
 * External dependencies
 */
import { settings } from 'plugin-data';
/**
 * WordPress dependencies
 */
import { setLocaleData } from '@wordpress/i18n';

export const initI18n = () => {
	const { i18n: locale_data } = settings;

	setLocaleData( locale_data );
};

export { __, sprintf } from '@wordpress/i18n';
