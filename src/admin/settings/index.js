/**
 * External dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
/**
 * Internal dependencies
 */
import './publicPath';
import App from './App';
import { initI18n } from './i18n';
initI18n();

const root = document.getElementById( 'wptelegram-comments-settings' );

ReactDOM.render( <App />, root );
