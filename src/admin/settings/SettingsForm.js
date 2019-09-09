/**
 * External dependencies
 */
import React from 'react';
import { Form, FormSpy } from 'react-final-form';
import { settings } from 'plugin-data';
/**
 * Internal dependencies
 */
import { validate } from './fields';
import { submitForm } from './utils/FormUtils';
import * as mutators from './mutators';
import FormRenderer from './FormRenderer';

const { saved_opts: initialValues } = settings;

export default React.memo( ( { setDebugInfo } ) => {
	return (
		<Form
			initialValues={ initialValues }
			onSubmit={ submitForm }
			validate={ validate }
			mutators={ {
				...mutators,
			} }
			render={ ( props ) => <>
				<FormSpy onChange={ ( state ) => {
					if ( setDebugInfo ) {
						setDebugInfo( state );
					}
				} } />

				<FormRenderer { ...props } />
			</> }
		/>
	);
} );
