/**
 * External dependencies
 */
import React from 'react';

import {
	Textarea,
	Checkbox,
	CheckboxGroup,
} from '@chakra-ui/core';

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
		<Textarea { ...input } { ...controlProps } />
	);
};

const MultiCheckField = ( props ) => {
	const {
		input: {
			value: defaultValue,
			...restInput
		},
		controlProps,
		options,
	} = props;
	return (
		<CheckboxGroup
			{ ...restInput }
			{ ...controlProps }
			defaultValue={ defaultValue }
		>
			{ options.map( ( { value, label } ) => {
				return <Checkbox borderColor="gray.200" value={ value } key={ value }>{ label }</Checkbox>;
			} ) }
		</CheckboxGroup>
	);
};
