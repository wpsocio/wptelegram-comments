/**
 * External dependencies
 */
import React from 'react';
import { List, ListItem } from '@chakra-ui/core';
/**
 * Internal dependencies
 */
import { __, sprintf } from '../i18n';
import SectionCard from './SectionCard';

export default React.memo( () => {
	return (
		<SectionCard
			title={ __( 'INSTRUCTIONS!' ) }
			headStyle={ {
				backgroundColor: '#343a40',
				color: '#fff',
			} }
		>
			<List as="ol" styleType="decimal">
				<ListItem dangerouslySetInnerHTML={ { __html: sprintf( __( 'Goto %s' ), '<a href="https://comments.app" target="_blank" rel="noopener noreferrer">comments.app</a>' ) } }></ListItem>
				<ListItem dangerouslySetInnerHTML={ { __html: sprintf( __( 'Under %1$s click on %2$s or %3$s.' ), '<b>Comments for websites</b>', '<b>LOG IN TO CONNECT</b>', '<b>CONNECT WEBSITE</b>' ) } }></ListItem>
				<ListItem dangerouslySetInnerHTML={ { __html: sprintf( __( 'Enter your site name in %1$s field and %2$s in %3$s field.' ), '<b>Site Name</b>', `<code>${ location.host }</code>`, '<b>Domains</b>' ) } }></ListItem>
				<ListItem dangerouslySetInnerHTML={ { __html: sprintf( __( 'Click on %s and customize the appearance if you want.' ), '<b>CONNECT WEBSITE</b>' ) } }></ListItem>
				<ListItem dangerouslySetInnerHTML={ { __html: sprintf( __( 'Click on %1$s and %2$s.' ), '<b>SAVE</b>', '<b>COPY CODE</b>' ) } }></ListItem>
				<ListItem>{ __( 'Paste the copied code in the field below.' ) }</ListItem>
				<ListItem>{ __( 'Save Changes' ) }</ListItem>
			</List>
		</SectionCard>
	);
} );
