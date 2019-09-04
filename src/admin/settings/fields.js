/**
 * External dependencies
 */
import { FORM_ERROR } from 'final-form';
/**
 * Internal dependencies
 */
import { __, sprintf } from './i18n';

export const validate = ( values ) => {
	const errors = {};

	const codeRegEx = /^<script[^>]+?data-comments-app-website="[^">]+?"[^>]+?><\/script>$/i;

	if ( ! values.code ) {
		errors.code = getErrorMessage( 'code', 'required' );
	} else if ( ! codeRegEx.test( values.code ) ) {
		errors.code = getErrorMessage( 'code', 'invalid' );
	}
	return errors;
};

export const getErrorMessage = ( fieldName, errorType = 'invalid' ) => {
	let message;

	switch ( errorType ) {
		case 'invalid':
			message = __( 'Invalid %s' );
			break;
		case 'required':
			message = __( '%s required.' );
			break;

		default:
			return { [ FORM_ERROR ]: __( 'Changes could not be saved.' ) };
	}

	return sprintf( message, getFieldLabel( fieldName ) );
};

const fieldLabels = {
	code: () => __( 'Code' ),
	exclude: () => __( 'Exclude' ),
	post_types: () => __( 'Post types' ),
};

export const getFieldLabel = ( name ) => {
	const { [ name ]: label } = fieldLabels;
	if ( label ) {
		return label();
	}
	return '';
};

export const formatValue = ( val ) => {
	if ( 'string' === typeof val ) {
		return val.trim();
	} else if ( Array.isArray( val ) ) {
		return val.map( formatValue );
	}
	return val;
};
