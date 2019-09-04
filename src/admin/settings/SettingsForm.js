/**
 * External dependencies
 */
import React from 'react';
// import { Form } from 'antd';
import { Form, FormSpy } from 'react-final-form';
import { settings } from 'plugin-data';
// import $ from 'jquery';
/**
 * Internal dependencies
 */
// import { __ } from './i18n';
// import FormField from './components/FormField';
import { validate } from './fields';
// import SectionCard from './components/SectionCard';
import { submitForm } from './utils/FormUtils';
import * as mutators from './mutators';
// import SubmitInfo from './components/SubmitInfo';
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
						const {
						// values,
							initialValues,
							modified,
							touched,
							visited,
							dirtyFields,
							// errors,
							...rest
						} = state;
						// const state = { values, errors };
						setDebugInfo( rest );
					}
				} } />

				<FormRenderer { ...props } />
			</> }
		/>
	);
} );
