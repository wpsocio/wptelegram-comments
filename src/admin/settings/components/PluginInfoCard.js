/**
 * External dependencies
 */
import React from 'react';
import { title } from 'plugin-data';
import { Box, Stack, Heading, Text } from '@chakra-ui/core';
/**
 * Internal dependencies
 */
import { __, sprintf } from '../i18n';
import Donate from './Donate';

function StackItem( props ) {
	return (
		<Box
			p={ 20 }
			textAlign="center"
			borderBottom="1px"
			borderBottomColor="gray.200"
			{ ...props }
		/>
	);
}

export default () => {
	return (
		<Box border="1px" borderColor="gray.200">
			<Box
				px={ 24 }
				py={ 16 }
				borderBottom="1px"
				borderBottomColor="gray.200"
			>
				<Heading
					as="h4"
					size="sm"
					fontWeight={ 600 }
					m={ 0 }
				>
					{ title }
				</Heading>
			</Box>

			<Stack spacing={ 1 } align="center">
				<StackItem>
					<Text as="p">{ __( 'Use Telegram Comments widget for your WordPress posts or pages.' ) }</Text>
				</StackItem>

				<StackItem>
					<Box mb={ 10 }>
						<Text as="span">
							{ sprintf( __( 'Do you like %s?' ), title ) }
						</Text>
					</Box>
					<Box>
						<Box
							as="a"
							href="https://wordpress.org/support/plugin/wptelegram-comments/reviews/#new-post"
							rel="noopener noreferrer"
							target="_blank"
							className="text-center text-info"
							textDecoration="none"
							mb={ 3 }
						>
							<Text
								as="span"
								color="orange.300"
								fontSize="1.5rem"
							>{ '★★★★★' }</Text>
						</Box>
					</Box>
				</StackItem>

				<StackItem>
					<Donate />
				</StackItem>

				<StackItem borderBottom={ 0 }>
					<Box>
						<Text as="span">
							{ __( 'Need help?' ) }
						</Text>
					</Box>
					<Box>
						<Text as="span" fontWeight={ 600 }>
							{ __( 'Get LIVE support on Telegram' ) }
						</Text>
					</Box>
				</StackItem>

				<StackItem p={ 0 } borderBottom={ 0 } w="100%">
					<Box
						as="a"
						d="block"
						p="0.75rem 1.25rem"
						color="#004085"
						bg="#b8daff"
						fontWeight={ 700 }
						fontStyle="italic"
						href="https://t.me/WPTelegramChat"
						target="_blank"
						rel="noopener noreferrer"
						textDecoration="none"
					>{ '@WPTelegramChat' }</Box>
				</StackItem>

				<StackItem>
					<Box><span role="img" aria-label="Smile">🙂</span></Box>
				</StackItem>
			</Stack>
		</Box>
	);
};
