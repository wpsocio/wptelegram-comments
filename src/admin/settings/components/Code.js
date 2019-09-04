/**
 * External dependencies
 */
import React from 'react';

export default ( { children } ) => {
	return (
		<code style={ {
			whiteSpace: 'pre-wrap',
			color: '#bb0f3b',
			backgroundColor: '#fdfdfe',
		} }>
			{ children }
		</code>
	);
};
