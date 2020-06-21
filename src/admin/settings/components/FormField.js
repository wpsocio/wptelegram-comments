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
	const { meta: { touched, error, submitError }, inputProps } = props;
	const errorMessage = touched && ( error || submitError );
	return (
		<WrappedField { ...{ ...props, errorMessage } }>
			<MappedField { ...props } inputProps={ { ...inputProps, isInvalid: !! errorMessage } } />
		</WrappedField>
	);
};

const WrappedField = ( props ) => {
	const {
		label,
		desc,
		before,
		after,
		inputProps = {},
		controlProps,
		children,
		errorMessage,
		noBottomBorder,
		labelColProps,
		wrapperColProps,
	} = props;
	return (
		<FormControl
			display={ { sm: 'flex', md: 'block', lg: 'flex' } }
			justifyContent="space-between"
			py={ 10 }
			borderBottom={ noBottomBorder ? 0 : '1px' }
			borderColor="gray.200"
			isInvalid={ !! errorMessage }
			{ ...controlProps }
		>
			<Box width={ { base: '100%', sm: '30%', md: '100%', lg: '30%' } } py={ 10 } { ...labelColProps }>
				<FormLabel htmlFor={ inputProps.id || null }>
					{ label || null }
				</FormLabel>
			</Box>
			<Box width={ { base: '100%', sm: '70%', md: '100%', lg: '70%' } } py={ 10 } { ...wrapperColProps }>
				{ before }
				{ children }
				<FormErrorMessage>{ errorMessage }</FormErrorMessage>
				{ desc ? <FormHelperText>{ desc }</FormHelperText> : null }
				{ after }
			</Box>
		</FormControl>
	);
};
