/**
 * External dependencies
 */
import React from 'react';
import { Form } from 'antd';
import { Field } from 'react-final-form';
/**
 * Internal dependencies
 */
import { MappedField } from './antd-mapped';
import { formatValue } from '../fields';

const FormItem = Form.Item;

export default React.memo( ( props ) => {
	const { name, ...rest } = props;
	return (
		<Field
			name={ name }
			key={ name }
			component={ WrappedField }
			format={ formatValue }
			formatOnBlur={ true }
			{ ...rest }
		/>
	);
} );

const WrappedField = ( props ) => {
	const {
		label,
		desc,
		meta,
		before,
		after,
		htmlType,
		component: Component = MappedField,
	} = props;

	const colProps = getColProps( props );

	const validateStatus = getValidateStatus( meta );
	return (
		<FormItem
			label={ label }
			extra={ desc }
			validateStatus={ validateStatus }
			hasFeedback={ meta.touched && Boolean( meta.error || meta.submitError ) }
			help={ meta.touched && ( meta.error || meta.submitError ) }
			{ ...colProps }
			className={ `form-item form-item-${ htmlType }` }
		>
			{ before && before( props ) }
			<Component { ...props } />
			{ after && after( props ) }
		</FormItem>
	);
};

const getColProps = ( props ) => {
	const { labelCol, wrapperCol } = props;
	const colProps = {};
	// Avoid passing labelCol && wrapperCol when undefined.
	// to main tain the parent form layout.
	if ( labelCol ) {
		colProps.labelCol = labelCol;
	}
	if ( wrapperCol ) {
		colProps.wrapperCol = wrapperCol;
	}
	return colProps;
};

const getValidateStatus = ( meta ) => {
	if ( meta.touched ) {
		if ( ! ( meta.error || meta.submitError ) ) {
			return 'success';
		}
		if ( meta.submitError ) {
			return 'error';
		}
		if ( meta.error ) {
			return 'error'; //'warning';
		}
	}
	return '';
};
