/**
 * External dependencies
 */
import { settings } from 'plugin-data';

const { view_opts: { plugin_url } } = settings;
/* eslint-disable no-unused-vars */
/* global __webpack_public_path__ */
__webpack_public_path__ = `${ plugin_url }/admin/settings/`;
