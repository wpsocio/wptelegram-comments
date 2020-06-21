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
	const { input, inputProps = {} } = props;
	return (
		<Textarea { ...input } { ...inputProps } />
	);
};

const MultiCheckField = ( props ) => {
	const {
		input: {
			value: defaultValue,
			...restInput
		},
		inputProps = {},
		options,
	} = props;
	return (
		<CheckboxGroup
			{ ...restInput }
			{ ...inputProps }
			defaultValue={ defaultValue }
		>
			{ options.map( ( { value, label } ) => {
				return <Checkbox borderColor="gray.200" value={ value } key={ value } mb={ inputProps.isInline ? 8: 0 }>{ label }</Checkbox>;
			} ) }
		</CheckboxGroup>
	);
};
