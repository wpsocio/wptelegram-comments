/**
 * External dependencies
 */
import React from 'react';
import { Card } from 'antd';
import { title } from 'plugin-data';
/**
 * Internal dependencies
 */
import { __, sprintf } from '../i18n';
import Donate from './Donate';

export default () => {
	const gridStyle = {
		width: '100%',
		textAlign: 'center',
	};
	return (
		<Card title={ title }>
			<Card.Grid style={ gridStyle }>
				<p>{ __( 'Use Telegram Comments widget for your WordPress posts or pages.' ) }</p>
			</Card.Grid>
			<Card.Grid style={ gridStyle }>
				<div><span>{ sprintf( __( 'Do you like %s?' ), title ) }</span></div>
				<div><a href="https://wordpress.org/support/plugin/wptelegram-comments/reviews/#new-post" rel="noopener noreferrer" target="_blank" className="text-center text-info ml-1" style={ { textDecoration: 'none' } }><span style={ { color: 'orange', fontSize: '1.5rem' } }>★★★★★</span></a></div>
			</Card.Grid>
			<Card.Grid style={ gridStyle }>
				<Donate />
			</Card.Grid>
			<Card.Grid style={ gridStyle }>
				<div><span>{ __( 'Need help?' ) }</span></div>
				<div><span style={ { fontWeight: '600' } }>{ __( 'Get LIVE support on Telegram' ) }</span></div>
			</Card.Grid>
			<Card.Grid style={ { ...gridStyle, padding: '0px' } }>
				<a
					style={ {
						display: 'block',
						padding: '0.75rem 1.25rem',
						color: '#004085',
						backgroundColor: '#b8daff',
						fontWeight: 700,
						fontStyle: 'italic',
					} }
					href="https://t.me/WPTelegramChat"
					target="_blank"
					rel="noopener noreferrer"
				>@WPTelegramChat</a>
			</Card.Grid>
			<Card.Grid style={ gridStyle }>
				<span role="img" aria-label="Smile">🙂</span>
			</Card.Grid>

		</Card>
	);
};
