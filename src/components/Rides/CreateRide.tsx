import React, { useEffect, useState } from 'react'
import {
	MDBBtn,
	MDBModalBody,
	MDBModalFooter,
} from 'mdb-react-ui-kit'
import ModalButton from '../Toolbar/ModalButton'
import './CreateRide.css'
import dayjs from 'dayjs'
import LocationService from '../../services/LocationService'
import { setLocations } from '../../store/reducers/locations-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import RideService from '../../services/RideService'
import { notify } from '../../common/utils'

interface RideProps {
	getRides: () => void
	edit?: any
	showRideFormModel: boolean
	formType: string
	handleFormType: (type: string) => void
	handleRideFormModel: (e: boolean) => void
}

export default function CreateRide({
	edit,
	getRides,
	showRideFormModel,
	formType,
	handleFormType,
	handleRideFormModel,
}: RideProps): JSX.Element {
	const dispatch = useDispatch()
	const locations = useSelector(
		(state: RootState) => state.locationReducer.locations
	)
	const rideDetail = useSelector(
		(state: RootState) => state.ride.ride
	)

	const [tripDate, setTripDate] = useState<string>(
		dayjs().format('YYYY-MM-DD')
	)

	const [tripTime, setTripTime] = useState<string>(
		dayjs().format('HH:mm')
	)
	console.log(
		'tripTime',
		tripTime,
		tripDate,
		dayjs().format('YYYY-MM-DD')
	)
	const [shuttleDirection, setShuttleDirection] = useState<string>('')
	const [selectedLocations, setSelectedLocations] = useState<
		Pickup[] | Destination[]
	>([])
	const [pickup, setPickup] = useState<string>('')
	const [destination, setDestination] = useState<string>('')

	const now = new Date()
	const [error, setError] = useState('')

	async function getLocations() {
		const locations = await LocationService.getLocations()
		dispatch(setLocations(locations))
	}

	const handleOnClose = () => {
		handleRideFormModel(false)
		resetForm()
	}

	const getSelectedLocations = () => {
		const currentLocations = locations.filter(
			(location) =>
				location.direction.toLocaleLowerCase() ===
				shuttleDirection.toLocaleLowerCase()
		)

		setSelectedLocations(currentLocations)
	}

	useEffect(() => {
		getLocations()
		getSelectedLocations()
	}, [])

	useEffect(() => {
		getSelectedLocations()
	}, [shuttleDirection])

	useEffect(() => {
		const dt = dayjs(rideDetail.tripDateTime)
		if (rideDetail.tripDateTime) {
			setTripDate(dt.format('YYYY-MM-DD'))
			setTripTime(dt.format('HH:mm'))
		}
		rideDetail.direction && setShuttleDirection(rideDetail.direction)
		getSelectedLocations()
		rideDetail.pickupId && setPickup(rideDetail.pickupId as string)
		rideDetail.destinationId &&
			setDestination(rideDetail.destinationId as string)
	}, [rideDetail])

	const handleTimeChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const time = e.target.value

		if (dayjs().isAfter(dayjs(`${tripDate} ${time}`))) {
			setError(
				'Invalid time, please select a time after the current time.'
			)
			return
		}

		setTripTime(time)
		setError('')
	}

	const handleSaveDate = async (formData: RideFormProps) => {
		await RideService.createRide(formData)
		await getRides()
	}

	const handleUpdateDate = async (
		rideId: string,
		formData: RideFormProps
	) => {
		await RideService.updateRide(rideId, formData)
		await getRides()
	}

	const submitRide = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (error) {
			notify('Please resolve error first', 'warning')
			return
		}
		if (shuttleDirection === '') {
			alert('Please select shuttle type')
			return
		}
		const rideData = {
			tripDate: tripDate,
			tripTime: tripTime,
			direction: shuttleDirection.toLocaleLowerCase(),
			pickupId: pickup,
			destinationId: destination,
		}

		console.log('rideData', rideData)
		if (formType === 'update') {
			handleUpdateDate(rideDetail.id, rideData)
		} else {
			handleSaveDate(rideData)
		}

		handleOnClose()
	}

	const resetForm = () => {
		setTripDate('')
		setShuttleDirection('')
		setPickup('')
		setDestination('')
	}

	return (
		<>
			<ModalButton
				isOpen={showRideFormModel}
				handleOpenModal={() => handleRideFormModel(true)}
				handleOnClose={handleOnClose}
				modalTitle={
					formType === 'update' ? 'Update Ride' : 'Create Ride'
				}
				iconname={'bus'}
				modalBody={
					<MDBModalBody className='mx-3'>
						<form className='mb-4'>
							<div className='fw-bold'>
								<label className='fw-bold py-1'>Trip Date</label>
								<input
									type='date'
									name='date'
									// min={new Date().toISOString().split('T')[0]}
									min={dayjs().format('YYYY-MM-DD')}
									max={dayjs().add(1, 'day').format('YYYY-MM-DD')}
									onChange={(e) =>
										setTripDate(
											dayjs(e.target.value).format('YYYY-MM-DD')
										)
									}
									className='form-control mb-2 '
									placeholder='Enter Date'
									value={tripDate}
								/>

								<label className='form-check-label py-1 '>
									Shift Time
								</label>

								<input
									type='time'
									name='time'
									className='form-control mb-2'
									placeholder='Enter Time'
									/* value={
										tripTime
											? tripTime.toTimeString().slice(0, 5)
											: ''
									} */
									// value={dayjs().format('YYYY-MM-DD hh:mm A')}
									value={tripTime}
									onChange={handleTimeChange}
								/>
								{error && <span className='error_msg'>{error}</span>}

								<label className='form-check-label py-1 d-block mt-2'>
									{' '}
									Shuttle Direction
								</label>

								<div className='form-check form-check-inline mb-2'>
									<input
										type='radio'
										className='form-check-input'
										name='direction'
										checked={
											shuttleDirection.toLocaleLowerCase() ==
												'north' ||
											rideDetail.direction?.toLocaleLowerCase() ===
												'north'
										}
										onChange={(e) =>
											setShuttleDirection(e.target.value)
										}
										value='North'
									/>
									<label className='fw-normal'>North</label>
								</div>
								<div className='form-check form-check-inline mb-2'>
									<input
										type='radio'
										className='form-check-input'
										name='Direction'
										checked={
											shuttleDirection.toLocaleLowerCase() ==
												'South' ||
											rideDetail?.direction?.toLocaleLowerCase() ===
												'south'
										}
										onChange={(e) =>
											setShuttleDirection(e.target.value)
										}
										value='South'
									/>
									<label className='fw-normal'>South</label>
								</div>

								<label className='fw-bold py-1 d-block'>
									{' '}
									Pick-up
								</label>
								<select
									className='form-select mb-2'
									aria-label='Default select example'
									onChange={(e) => setPickup(e.target.value)}
									value={rideDetail.pickupId}
								>
									<option value=''>Select Pick up</option>
									{selectedLocations.map((location) => (
										<option key={location.id} value={location.id}>
											{location.locationName}
										</option>
									))}
								</select>

								<label className='fw-bold py-1'> Destination</label>
								{
									<select
										className='form-select'
										aria-label='Default select example'
										onChange={(e) => setDestination(e.target.value)}
										value={rideDetail.destinationId}
									>
										<option value=''>Select Destination</option>
										{selectedLocations.map((location) => (
											<option key={location.id} value={location.id}>
												{location.locationName}
											</option>
										))}
									</select>
								}
								{/* {pickup === 'DNA' ? (
									<select
										className='form-select'
										aria-label='Default select example'
										onChange={(e) => setDestination(e.target.value)}
									>
										<option value=''>Select Destination</option>
										{selectedLocations.map((location) => (
											<option key={location.id} value={location.id}>
												{location.locationName}
											</option>
										))}
									</select>
								) : (
									<input
										type='text'
										className='form-control mb-2'
										defaultValue={'DNA Micro'}
										disabled
									/>
								)} */}
							</div>
						</form>
						<MDBModalFooter>
							<MDBBtn
								color='secondary'
								className='button_style px-4 border-0'
								onClick={handleOnClose}
							>
								Close
							</MDBBtn>
							<MDBBtn
								color='info'
								className='button_style px-4'
								onClick={(e: any) => submitRide(e)}
							>
								{formType === 'update' ? 'Update' : 'Save'}
							</MDBBtn>
						</MDBModalFooter>
					</MDBModalBody>
				}
			>
				<MDBBtn onClick={() => handleFormType('create')}>
					Create Ride
				</MDBBtn>
			</ModalButton>
		</>
	)
}
