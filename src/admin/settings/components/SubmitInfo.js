/**
 * External dependencies
 */
import React, { useState } from 'react';
import {
	Affix,
	Alert,
	Button,
	Col,
	Row,
} from 'antd';
import { FormSpy } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
/**
 * Internal dependencies
 */
import { __ } from '../i18n';
import { getErrorStrings } from '../utils/FormUtils';

export default () => {
	const [ closedValidionAlert, setClosedValidionAlert ] = useState( false );
	const [ closedSubmitAlert, setClosedSubmitAlert ] = useState( false );
	const [ closedSuccessAlert, setClosedSuccessAlert ] = useState( false );
	return (
		<Affix className="submit-wrap" >
			<FormSpy subscription={ {
				// active: true,
				submitting: true,
				pristine: true,
				errors: true,
				submitSucceeded: true,
				submitFailed: true,
				hasValidationErrors: true,
				hasSubmitErrors: true,
				submitError: true,
				submitErrors: true,
			} }>
				{ ( {
					errors,
					submitting,
					pristine,
					submitSucceeded,
					submitFailed,
					hasSubmitErrors,
					hasValidationErrors,
					submitError,
					submitErrors = {},
				} ) => {
					const validationErrorStrings = getErrorStrings( errors );
					delete submitErrors[ FORM_ERROR ];
					const submitErrorStrings = getErrorStrings( submitErrors );

					return (
						<Row
							gutter={ 10 }
							type="flex"
							justify="end"
							align="bottom"
							style={ { flexFlow: 'row' } }
						>
							<Col style={ { maxWidth: 400 } }>
								{ submitFailed && hasSubmitErrors && ! closedSubmitAlert && submitErrorStrings.length && (
									<>
										<Alert
											closable
											showIcon
											type="warning"
											message={ submitError }
											onClose={ () => setClosedSubmitAlert( true ) }
										/>
										{ submitErrorStrings.map( ( str, i ) => {
											return (
												<Alert
													key={ i + str }
													// closable
													showIcon
													type="error"
													message={ str }
													style={ { marginTop: '5px' } }
												/>
											);
										} ) }
									</>
								) }

								{ submitFailed && hasValidationErrors && ! closedValidionAlert && validationErrorStrings.length && (
									<>
										<Alert
											closable
											showIcon
											type="warning"
											message={ __( 'Lets fix these errors fist.' ) }
											onClose={ () => setClosedValidionAlert( true ) }
										/>
										{ validationErrorStrings.map( ( str, i ) => {
											return (
												<Alert
													key={ i + str }
													// closable
													showIcon
													type="error"
													message={ str }
													style={ { marginTop: '5px' } }
												/>
											);
										} ) }
									</>
								) }

								{ pristine && submitSucceeded && ! closedSuccessAlert && (
									<Alert
										closable
										showIcon
										type="success"
										message={ __( 'Changes saved successfully.' ) }
										onClose={ () => setClosedSuccessAlert( true ) }
									/>
								) }
							</Col>
							<Col>
								<Button
									icon="save"
									shape="circle-outline"
									size="large"
									htmlType="submit"
									disabled={ submitting }
									title={ __( 'Save Changes' ) }
									className="submit-button"
									onClick={ () => {
										setClosedValidionAlert( false );
										setClosedSubmitAlert( false );
										setClosedSuccessAlert( false );
									} }
								/>
							</Col>
						</Row>
					);
				} }
			</FormSpy>
		</Affix>
	);
};
