/**
 * External dependencies
 */
import React from 'react';
import { title, version, settings } from 'plugin-data';
import { Box, Heading, Text } from '@chakra-ui/core';
/**
 * Internal dependencies
 */
import { __ } from '../i18n';
import SectionCard from './SectionCard';
import SocialIcons from './SocialIcons';

export default () => {
	const { assets } = settings;

	return (
		<SectionCard
			title={ <>
				<Box
					as="img"
					src={ assets.logo_url }
					alt={ title }
					d="inline-block"
					verticalAlign="middle"
					className="header-logo"
				/>
				<Box
					d="inline-flex"
					verticalAlign="middle"
					alignItems="baseline"
					justifyContent="center'"
				>
					<Heading
						as="h4"
						size="md"
						fontWeight={ 600 }
						d="inline-block"
						m={ 0 }
					>
						{ title }
					</Heading>
					<Text as="span" fontStyle="italic" color="gray.500" >
						&nbsp;v{ version }
					</Text>
				</Box>
			</> }
		>
			<Text
				as="p"
				fontStyle="italic"
				textAlign="justify"
			>
				{ __( 'With this plugin, you can add comments to posts/pages on your WordPress website by using Telegram Comments Widget.' ) }
			</Text>

			<SocialIcons />
		</SectionCard>
	);
};
