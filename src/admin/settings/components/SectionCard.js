/**
 * External dependencies
 */
import React from 'react';
import { Card } from 'antd';

export default React.memo( ( { children, ...rest } ) => {
	return (
		<Card
			size="small"
			type="inner"
			style={ { marginBottom: 10 } }
			headStyle={ { backgroundColor: '#eaeaea' } }
			{ ...rest }
		>
			{ children }
		</Card>
	);
} );
