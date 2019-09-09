/**
 * External dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@chakra-ui/core';
/**
 * Internal dependencies
 */
import './publicPath';
import theme from './theme';
import App from './App';
import { initI18n } from './i18n';
initI18n();

const ThemedApp = () => (
	<ThemeProvider theme={ theme }>
		<App />
	</ThemeProvider>
);

const root = document.getElementById( 'wptelegram-comments-settings' );

ReactDOM.render( <ThemedApp />, root );
