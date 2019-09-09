/**
 * External dependencies
 */
import React from 'react';
import { Box } from '@chakra-ui/core';

export default ( props ) => {
	const {
		children,
		title,
		headStyle,
		bodyStyle,
		...rest
	} = props;
	return (
		<Box
			border="1px"
			roundedTop="md"
			borderColor="gray.200"
			overflow="hidden"
			mb={ 10 }
			{ ...rest }
		>
			<Box
				px={ 12 }
				py={ 8 }
				style={ { backgroundColor: '#eaeaea', ...headStyle } }
			>
				{ title }
			</Box>
			<Box
				px={ 24 }
				py={ 16 }
				style={ bodyStyle }
			>
				{ children }
			</Box>
		</Box>
	);
};
