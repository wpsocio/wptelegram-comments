/**
 * External dependencies
 */
import React, { useState } from 'react';
import { Box } from '@chakra-ui/core';

/**
 * Internal dependencies
 */
import './css/style.css';

import Header from './components/Header';
import Instructions from './components/Instructions';
import Pre from './components/Pre';
import SettingsForm from './SettingsForm';
import Sidebar from './components/Sidebar';

const App = React.memo( () => {
	const [ debugInfo, setDebugInfo ] = useState( {} );
	return (
		<Box mt={ 20 } pr={ 15 } display={ { md: 'flex' } } justifyContent="space-between">
			<Box p={ 5 } width={ [ '100%', '100%', 2 / 3, 2 / 3, 3 / 4 ] }>
				<Header />
				<Instructions />
				<SettingsForm setDebugInfo={ setDebugInfo } />
			</Box>
			<Box p={ 5 } width={ [ '100%', '100%', 1 / 3, 1 / 3, 1 / 4 ] }>
				<Sidebar />
				{
					'development' === process.env.NODE_ENV && <Pre>
						{ JSON.stringify( debugInfo, null, 2 ) }
					</Pre>
				}
			</Box>
		</Box>
	);
} );
export default App;
