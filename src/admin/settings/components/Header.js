/**
 * External dependencies
 */
import React from 'react';
import { title, version, settings } from 'plugin-data';
import { Typography } from 'antd';
/**
 * Internal dependencies
 */
import { __ } from '../i18n';
import SectionCard from './SectionCard';
import SocialIcons from './SocialIcons';

const { Title, Text, Paragraph } = Typography;

export default () => {
	const { assets } = settings;

	return (
		<SectionCard
			title={ <>
				<img
					src={ assets.logo_url }
					className="header-logo"
					style={ {
						display: 'inline-block',
						verticalAlign: 'middle',
					} }
					alt={ title }
				/>
				<div
					style={ {
						display: 'inline-flex',
						verticalAlign: 'middle',
						alignItems: 'baseline',
						justifyContent: 'center',
					} }
				>
					<Title
						level={ 4 }
						style={ {
							display: 'inline-block',
							marginBottom: '0px',
						} }
					>{ title }</Title>
					<Text
						type="secondary"
						style={ { fontStyle: 'italic' } }
					>&nbsp;v{ version }</Text>
				</div>
			</> }
		>
			<Paragraph
				type="secondary"
				style={ {
					fontStyle: 'italic',
					textAlign: 'justify',
				} }
			>
				{ __( 'With this plugin, you can add comments to posts/pages on your WordPress website by using Telegram Comments Widget.' ) }
			</Paragraph>

			<SocialIcons />
		</SectionCard>
	);
};
