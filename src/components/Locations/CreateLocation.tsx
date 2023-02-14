import React, { useRef, useState, useEffect } from 'react'
import {
	MDBBtn,
	MDBModalBody,
	MDBModalFooter,
} from 'mdb-react-ui-kit'
import { useForm } from 'react-hook-form'
import ModalButton from '../Toolbar/ModalButton'
import LocationService from '../../services/LocationService'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import {
	clearLocationDetail,
	setLocationDetail,
} from '../../store/reducers/locations-reducer'
import { match } from 'assert'
import { getValue } from '@testing-library/user-event/dist/utils'

interface ModelProps {
	showModal?: boolean
	showUserModel: boolean
	formType: string
	handleLocationFormModel: (e: any) => void
	handleFormType: (type: string) => void
	getLocations: () => void
}

export default function CreateUser({
	handleLocationFormModel,
	showUserModel,
	formType,
	handleFormType,
	getLocations,
}: ModelProps): JSX.Element {
	const dispatch = useDispatch()
	const [defaultValues, setDefaultValues] = useState<GenericObject>({
		values: {},
	})
	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm<LocationFormProps>(defaultValues)

	const [modalstate, setModalstate] = useState<boolean>(false)
	const [direction, setDirection] = useState<string>('')

	const locationDetail = useSelector(
		(state: RootState) => state.locationReducer.location
	)

	const handleOnClose = () => {
		handleLocationFormModel(false)

		reset({
			direction: '',
			locationName: '',
		})
		setDirection('')
		handleFormType('')
	}

	function handleDirectionChange(
		e: React.ChangeEvent<HTMLSelectElement>
	) {
		setDirection(e.target.value)
	}

	useEffect(() => {
		if (formType === 'update') {
			setDefaultValues({
				values: {
					direction: locationDetail.direction,
					locationName: locationDetail.locationName,
				},
			})

			setDirection(locationDetail.direction)
		} else if (formType === 'create') {
			dispatch(clearLocationDetail())

			setDefaultValues({
				values: {
					direction: '',
					locationName: '',
				},
			})
		}
	}, [formType, locationDetail?.id])

	async function getLocationDetail(locationId: string) {
		const locationDetail = await LocationService.getLocation(
			locationId
		)
		dispatch(setLocationDetail(locationDetail))
	}

	const onSubmit = async (data: LocationFormProps) => {
		if (formType === 'update') {
			const { ...formData } = data
			await LocationService.updateLocation(
				locationDetail.id as string,
				formData
			)
			getLocationDetail(locationDetail.id as string)
		} else {
			await LocationService.createLocation(data)
		}

		getLocations()
		handleOnClose()
	}

	return (
		<>
			<ModalButton
				isOpen={showUserModel}
				setIsOpen={setModalstate}
				handleOpenModal={() => {
					handleLocationFormModel(true)
				}}
				modalTitle={
					formType === 'update'
						? 'Update Location'
						: 'Create Location'
				}
				iconname={'location-arrow'}
				handleOnClose={handleOnClose}
				modalBody={
					<MDBModalBody className='mx-3'>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='form-group'>
								<label className='fw-bold py-1 d-block'>
									Direction
									<span className='text-danger'>*</span>
								</label>

								<select
									className='form-select mb-2'
									{...register('direction', {
										required: true,
									})}
									value={direction}
									onChange={(e) => handleDirectionChange(e)}
								>
									<option value=''>Select Direction</option>
									<option
										key={Math.ceil(Math.random() * 1000000)}
										value={'south'}
									>
										South
									</option>
									<option
										key={Math.ceil(Math.random() * 1000000)}
										value={'north'}
									>
										North
									</option>
								</select>

								{errors.direction && (
									<span className='error_msg'>
										Please select direction
									</span>
								)}

								<label className='fw-bold py-1 d-block'>
									Location Name
									<span className='text-danger'>*</span>
								</label>
								<input
									placeholder='Location Name'
									type='text'
									className='form-control mb-2'
									{...register('locationName', {
										required: true,
										maxLength: 100,
									})}
								/>

								{errors.locationName && (
									<span className='error_msg'>
										Please enter location name
									</span>
								)}
							</div>

							<MDBModalFooter>
								<MDBBtn
									color='secondary'
									className='button_style px-4 border-0'
									type='button'
									onClick={handleOnClose}
								>
									Close
								</MDBBtn>
								<MDBBtn
									color='info'
									className='button_style px-4'
									type='submit'
								>
									Save
								</MDBBtn>
							</MDBModalFooter>
						</form>
					</MDBModalBody>
				}
			>
				<span onClick={() => handleFormType('create')}>
					Create Location
				</span>
			</ModalButton>
		</>
	)
}
