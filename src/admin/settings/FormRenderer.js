/**
 * External dependencies
 */
import React, { lazy, Suspense } from 'react';
import { Form } from 'antd';
import { settings } from 'plugin-data';
import $ from 'jquery';
/**
 * Internal dependencies
 */
import { __ } from './i18n';
import FormField from './components/FormField';
import { getFieldLabel } from './fields';
import SectionCard from './components/SectionCard';
import Loader from './components/Loader';

const { view_opts: { post_types } } = settings;

const SubmitInfo = lazy( () => import( /* webpackChunkName: "submit-info" */ './components/SubmitInfo' ) );

export default ( props ) => {
	const { handleSubmit, form: { mutators: { updateFieldValue } } } = props;

	return (
		<Form
			labelCol={ { span: 5 } }
			wrapperCol={ { span: 14 } }
			labelAlign="left"
			colon={ false }
			onSubmit={ handleSubmit }
			onKeyPress={ ( e ) => {
				/* If Enter is pressed */
				if ( 13 === e.which && 'TEXTAREA' !== e.nativeEvent.target.nodeName ) {
					e.preventDefault();
				}
			} }
		>

			<SectionCard title={ __( 'Configuration' ) }>
				<FormField
					name="code"
					htmlType="textarea"
					label={ getFieldLabel( 'code' ) }
					desc={ __( 'Please read the instructions above.' ) }
					parse={ ( value ) => {
						if ( value ) {
							const el = $( value.trim() );
							if ( el.length && 'SCRIPT' === el[ 0 ].nodeName ) {
								const attributes = {};
								$.each( el[ 0 ].attributes, ( i, attr ) => {
									attributes[ attr.name ] = attr.value;
								} );
								updateFieldValue( 'attributes', attributes );
							}
							return value.trim();
						}
						return value;
					} }
					controlProps={ {
						rows: 3,
						cols: 60,
						style: {
							resize: 'none',
							fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
							fontSize: '13px',
							paddingTop: '8px',
							paddingBottom: '8px',
							whiteSpace: 'pre-wrap',
							wordBreak: 'break-all',
							wordWrap: 'break-word',
							textAlign: 'left',
							WebkitAppearance: 'none',
							backgroundColor: 'rgba(0, 0, 0, 0.05)',
						},
						spellCheck: 'false',
						dir: 'ltr',
					} }
				/>

				<FormField
					name="post_types"
					htmlType="multicheck"
					desc={ __( 'The comments widget will be shown on the selected post types.' ) }
					label={ getFieldLabel( 'post_types' ) }
					options={ post_types }
				/>

				<FormField
					name="exclude"
					htmlType="textarea"
					label={ getFieldLabel( 'exclude' ) }
					desc={ __( 'To exclude the specific posts, enter the post or page IDs separated by comma.' ) }
					controlProps={ {
						rows: 4,
						cols: 60,
						spellCheck: 'false',
						placeholder: '53,281',
					} }
				/>
			</SectionCard>
			<Suspense fallback={ <Loader /> }>
				<SubmitInfo />
			</Suspense>
		</Form>
	);
};
