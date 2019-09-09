/**
 * External dependencies
 */
import React, { useState } from 'react';

import {
	Box,
	Flex,
	Alert,
	AlertIcon,
	AlertTitle,
	CloseButton,
	IconButton,
} from '@chakra-ui/core';
import { FormSpy } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
/**
 * Internal dependencies
 */
import { __ } from '../i18n';
import { getErrorStrings } from '../utils/FormUtils';

export default React.memo( () => {
	const [ closedValidionAlert, setClosedValidionAlert ] = useState( false );
	const [ closedSubmitAlert, setClosedSubmitAlert ] = useState( false );
	const [ closedSuccessAlert, setClosedSuccessAlert ] = useState( false );
	return (
		<Box className="submit-wrap" >
			<FormSpy subscription={ {
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
						<Flex
							justify="end"
							align="bottom"
							flexFlow="row"
						>
							<Flex
								maxW={ 400 }
								px={ 10 }
								direction="column"
								justify="center"
							>
								{ submitFailed && hasSubmitErrors && ! closedSubmitAlert && submitErrorStrings.length && (
									<>
										<Alert status="warning">
											<AlertIcon size={ 3 } />
											<AlertTitle mr={ 2 }>{ submitError }</AlertTitle>
											<CloseIcon onClick={ () => setClosedSubmitAlert( true ) } />
										</Alert>
										{ submitErrorStrings.map( ( str, i ) => {
											return (
												<Alert mt={ 5 } status="error" key={ i + str }>
													<AlertIcon size={ 3 } />
													<AlertTitle mr={ 2 }>{ str }</AlertTitle>
												</Alert>
											);
										} ) }
									</>
								) }

								{ submitFailed && hasValidationErrors && ! closedValidionAlert && validationErrorStrings.length && (
									<>
										<Alert status="warning">
											<AlertIcon size={ 3 } />
											<AlertTitle>{ __( 'Lets fix these errors first.' ) }</AlertTitle>
											<CloseIcon onClick={ () => setClosedValidionAlert( true ) } />
										</Alert>
										{ validationErrorStrings.map( ( str, i ) => {
											return (
												<Alert mt={ 5 } status="error" key={ i + str }>
													<AlertIcon size={ 3 } />
													<AlertTitle mr={ 2 }>{ str }</AlertTitle>
												</Alert>
											);
										} ) }
									</>
								) }

								{ pristine && submitSucceeded && ! closedSuccessAlert && (
									<Alert status="success">
										<AlertIcon size={ 3 } />
										<AlertTitle mr={ 2 }>{ __( 'Changes saved successfully.' ) }</AlertTitle>
										<CloseIcon onClick={ () => setClosedSuccessAlert( true ) } />
									</Alert>
								) }
							</Flex>
							<Box>
								<IconButton
									isRound
									size="lg"
									w="5rem"
									h="5rem"
									fontSize="3rem"
									bg="white"
									variantColor="gray"
									variant="outline"
									cursor="pointer"
									aria-label="Save Changes"
									icon="save"
									type="submit"
									// disabled={ submitting }
									isLoading={ submitting }
									onClick={ () => {
										setClosedValidionAlert( false );
										setClosedSubmitAlert( false );
										setClosedSuccessAlert( false );
									} }
									title={ __( 'Save Changes' ) }
								/>
							</Box>
						</Flex>
					);
				} }
			</FormSpy>
		</Box>
	);
} );

const CloseIcon = ( props ) => <CloseButton cursor="pointer" bg="transparent" border="none" variant="ghost" size="sm" { ...props } />;
