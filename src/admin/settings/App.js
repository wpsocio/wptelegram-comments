/**
 * External dependencies
 */
import React, { useState, lazy, Suspense } from 'react';
import {
	Col,
	Row,
} from 'antd';

/**
 * Internal dependencies
 */
import './css/style.css';

import Header from './components/Header';
import Instructions from './components/Instructions';
// import Pre from './components/Pre';
import Loader from './components/Loader';
const SettingsForm = lazy( () => import( /* webpackChunkName: "settings-form" */ './SettingsForm' ) );
const Sidebar = lazy( () => import( /* webpackChunkName: "sidebar" */ './components/Sidebar' ) );

const App = React.memo( () => {
	const [ debugInfo, setDebugInfo ] = useState( {} );
	return (
		<div
			style={ {
				marginTop: 20,
				paddingRight: 15,
				paddingLeft: 15,
			} }
		>
			<Row gutter={ 10 }>
				<Col { ...{ xs: 24, sm: 24, md: 24, lg: 16, xl: 18, xxl: 18 } }>
					<Header />
					<Instructions />
					<Suspense fallback={ <Loader /> }>
						<SettingsForm setDebugInfo={ setDebugInfo } />
					</Suspense>
				</Col>
				<Col { ...{ xs: 24, sm: 24, md: 24, lg: 8, xl: 6, xxl: 6 } }>
					<Suspense fallback={ <Loader /> }>
						<Sidebar />
					</Suspense>
					{ /* <Pre>{ JSON.stringify( debugInfo, null, 2 ) }</Pre> */ }
				</Col>
			</Row>
		</div>
	);
} );
export default App;
