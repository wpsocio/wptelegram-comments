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
				// fontSize: '1.2em',
				// lineHeight: '1.6em',
				color: '#bb0f3b',
				// borderRadius: '5px',
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
