/**
 * External dependencies
 */
import React from 'react';
import {
	Checkbox,
	Input,
} from 'antd';

export const MappedField = ( { htmlType, ...rest } ) => {
	let Component;
	switch ( htmlType ) {
		case 'textarea':
			Component = TextAreaField;
			break;
		case 'multicheck':
			Component = MultiCheckField;
			break;

		default:
			Component = () => null;
			break;
	}
	return Component && <Component { ...rest } />;
};

export const TextAreaField = ( props ) => {
	const { input, controlProps = {} } = props;

	return (
		<Input.TextArea { ...input } { ...controlProps } />
	);
};

const MultiCheckField = ( { input: { value, ...rest }, controlProps, options } ) => <Checkbox.Group { ...rest } { ...controlProps } options={ options } value={ value || [] } className="checkbox-group" />;
