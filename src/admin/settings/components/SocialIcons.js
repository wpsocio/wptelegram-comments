/**
 * External dependencies
 */
import React from 'react';
import { settings } from 'plugin-data';
import { Row, Col } from 'antd';

/**
 * Internal dependencies
 */
import { __, sprintf } from '../i18n';

export default React.memo( () => {
	const { assets } = settings;

	return (
		<Row gutter={ 10 } type="flex" justify="center" align="middle">
			<Col style={ { paddingBottom: '5px' } }>
				<div className="fb-like" data-href="https://www.facebook.com/WPTelegram" data-layout="button_count" data-action="like" data-size="small" data-show-faces="false" data-share="false"></div>
			</Col>
			<Col style={ { display: 'flex', paddingBottom: '5px' } }>
				<a href="https://twitter.com/WPTelegram" className="twitter-follow-button" data-show-count="false">{ sprintf( __( 'Follow %s' ), '@WPTelegram' ) }</a>
			</Col>
			<Col style={ { paddingBottom: '5px' } }>
				<a
					href="https://t.me/WPTelegram"
					rel="noopener noreferrer"
					target="_blank"
					className="social-link telegram"
				>
					<img
						src={ assets.tg_icon }
						style={ {
							display: 'inline-block',
							verticalAlign: 'middle',
						} }
						alt={ ' ' }
					/>
					<small style={ { color: '#fff' } }>{ sprintf( __( 'Join %s' ), '@WPTelegram' ) }</small>
				</a>
			</Col>
		</Row>
	);
} );
