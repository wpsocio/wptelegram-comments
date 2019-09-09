/**
 * External dependencies
 */
import React from 'react';

export default ( { children } ) => {
	return (
		<pre
			dir="ltr"
			style={ {
				padding: '2px 4px',
				color: '#bb0f3b',
				fontStyle: 'normal',
				overflow: 'hidden',
				wordWrap: 'break-word',
				whiteSpace: 'pre-wrap',
			} }
		>
			{ children }
		</pre>
	);
};
