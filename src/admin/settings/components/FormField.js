/**
 * External dependencies
 */
import React from 'react';
import {
	Box,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
} from '@chakra-ui/core';
import { Field } from 'react-final-form';
/**
 * Internal dependencies
 */
import { MappedField } from './mapped-fields';
import { formatValue } from '../fields';

export default React.memo( ( props ) => {
	const { name, ...rest } = props;
	return (
		<Field
			name={ name }
			key={ name }
			render={ RenderField }
			format={ formatValue }
			formatOnBlur={ true }
			{ ...rest }
		/>
	);
} );

const RenderField = ( props ) => {
	const { meta: { touched, error, submitError }, controlProps } = props;
	const errorMessage = touched && ( error || submitError );
	return (
		<WrappedField { ...{ ...props, errorMessage } }>
			<MappedField { ...props } controlProps={ { ...controlProps, isInvalid: Boolean( errorMessage ) } } />
		</WrappedField>
	);
};

const WrappedField = ( props ) => {
	const {
		label,
		desc,
		before,
		after,
		controlProps,
		children,
		errorMessage,
		noBottomBorder,
	} = props;
	return (
		<FormControl
			display={ { lg: 'flex' } }
			justifyContent="space-between"
			py={ 20 }
			borderBottom={ noBottomBorder ? 0 : '1px' }
			borderColor="gray.200"
			isInvalid={ Boolean( errorMessage ) }
		>
			<Box width="30%">
				<FormLabel htmlFor={ controlProps.id ? controlProps.id : null }>
					{ label || null }
				</FormLabel>
			</Box>
			<Box width="70%">
				{ before }
				{ children }
				<FormErrorMessage>{ errorMessage }</FormErrorMessage>
				{ desc ? <FormHelperText>{ desc }</FormHelperText> : null }
				{ after }
			</Box>
		</FormControl>
	);
};
