/**
 * External dependencies
 */
import { theme } from '@chakra-ui/core';
/**
 * Internal dependencies
 */
import { customIcons } from './utils/icons';

const breakpoints = [
	'576px', // sm
	'782px', // md
	'960px', // lg
	'1200px', // xl
	'1500px', // xxl
];
// aliases
breakpoints.sm = breakpoints[ 0 ];
breakpoints.md = breakpoints[ 1 ];
breakpoints.lg = breakpoints[ 2 ];
breakpoints.xl = breakpoints[ 3 ];
breakpoints.xxl = breakpoints[ 4 ];

export default {
	...theme,
	breakpoints,
	space: {},
	icons: {
		...theme.icons,
		...customIcons,
	},
};
