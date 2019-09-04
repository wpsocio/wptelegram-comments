/**
 * External dependencies
 */
import React from 'react';
import { Spin } from 'antd';

export default () => {
	return (
		<div style={ { display: 'flex', justifyContent: 'center' } }>
			<Spin />
		</div>
	);
};
