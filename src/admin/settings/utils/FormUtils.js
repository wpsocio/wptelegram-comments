/**
 * External dependencies
 */
import { settings, api } from 'plugin-data';
import { setIn } from 'final-form';
/**
 * Internal dependencies
 */
import { getErrorMessage } from '../fields';
import { sendAjaxRequest } from './ajax';

const { rest } = api;

export const fetchInitialValues = () => {
	const options = {
		type: 'GET',
		url: rest.url + '/settings',
	};

	return sendAjaxRequest( options );
};

export const fetchRuleValues = ( params ) => {
	const {
		setInProgress,
		setResult,
		...data
	} = params;

	setInProgress( true );

	const options = {
		type: 'GET',
		url: rest.url + '/rules',
		data,
		error: ( jqXHR ) => {
			console.log( 'ERROR', jqXHR );

			setResult( [] );
		},
		success: ( _data ) => {
			setResult( _data );
		},
		complete: () => setInProgress( false ),
	};

	return sendAjaxRequest( options );
};

export const submitForm = async ( values, form ) => {
	return await new Promise( ( resolve ) => {
		console.log( values );
		// return resolve( {} );
		const options = {
			url: rest.url + '/settings',
			data: JSON.stringify( values ),
			error: ( jqXHR ) => {
				console.log( 'ERROR', jqXHR );

				const { code, data } = JSON.parse( jqXHR.responseText );
				const errors = {};

				if ( code ) {
					if ( 'rest_invalid_param' === code ) {
						const { params = {} } = data;

						for ( const key in params ) {
							if ( params.hasOwnProperty( key ) ) {
								const { message, param } = params[ key ];
								Object.assign( errors, setIn( errors, param, message ) );
							}
						}
					} else if ( 'rest_missing_callback_param' === code ) {
						data.params.forEach( ( key ) => {
							errors[ key ] = getErrorMessage( key, 'required' );
						} );
					}
				}

				Object.assign( errors, getErrorMessage( 'form', 'unknown' ) );

				resolve( errors );
			},
			success: ( data ) => {
				form.initialize( data );

				resolve( {} );
			},
		};

		return sendAjaxRequest( options );
	} );
};

export const getErrorStrings = ( errors ) => {
	const bucket = [];
	mineErrorStrings( errors, bucket );
	return bucket;
};

const mineErrorStrings = ( error, bucket ) => {
	if ( 'object' === typeof error ) {
		for ( const key in error ) {
			mineErrorStrings( error[ key ], bucket );
		}
	} else if ( 'string' === typeof error ) {
		bucket.push( error );
	}
};

export const setEvent = ( evt ) => {
	settings.info.event = evt.nativeEvent || evt;
};
