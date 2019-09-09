/**
 * External dependencies
 */
import React from 'react';
import { settings } from 'plugin-data';
import { Box, Flex, Text } from '@chakra-ui/core';

/**
 * Internal dependencies
 */
import { __, sprintf } from '../i18n';

export default React.memo( () => {
	const { assets } = settings;

	return (
		<>
			<Flex justify="space-evenly" align="middle" wrap="wrap">
				<Box pb={ 5 }>
					<Box className="fb-like" data-href="https://www.facebook.com/WPTelegram" data-layout="button_count" data-action="like" data-size="small" data-show-faces="false" data-share="false"></Box>
				</Box>
				<Box pb={ 5 }>
					<Box
						as="a"
						href="https://twitter.com/WPTelegram"
						className="twitter-follow-button"
						data-show-count="false">
						{ sprintf( __( 'Follow %s' ), '@WPTelegram' ) }
					</Box>
				</Box>
				<Box pb={ 5 }>
					<Box
						as="a"
						href="https://t.me/WPTelegram"
						rel="noopener noreferrer"
						target="_blank"
						className="social-link telegram"
					>
						<Box
							as="img"
							src={ assets.tg_icon }
							d="inline-block"
							verticalAlign="middle"
							alt={ ' ' }
						/>
						<Text
							as="small"
							color="#fff">
							{ sprintf( __( 'Join %s' ), '@WPTelegram' ) }
						</Text>
					</Box>
				</Box>
			</Flex>
		</>
	);
} );
