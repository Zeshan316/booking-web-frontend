import React, { useEffect, useState } from 'react'
import {
	MDBCol,
	MDBBtn,
	MDBModalBody,
	MDBModalFooter,
} from 'mdb-react-ui-kit'
import ModalButton from '../Toolbar/ModalButton'
import './CreateRide.css'
import dayjs from 'dayjs'
import LocationService from '../../services/LocationService'
import { setLocations } from '../../store/reducers/locations-reducer'
import { clearRideDetail } from '../../store/reducers/rides-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import RideService from '../../services/RideService'
import { notify } from '../../common/utils'
import { CURRENT_COMPANY_NAME } from '../../common/constants'

interface RideProps {
	getRides: () => void
	showRideFormModel: boolean
	formType: string
	handleFormType: (type: string) => void
	handleRideFormModel: (e: boolean) => void
}

interface Errors {
	direction?: string
	dropoff?: string
	pickup?: string
}

export default function CreateRide({
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
		dayjs(new Date()).format('YYYY-MM-DD')
	)

	const [tripTime, setTripTime] = useState<string>(
		dayjs(new Date()).format('HH:mm')
	)
	const [shuttleDirection, setShuttleDirection] = useState<string>('')
	const [selectedLocations, setSelectedLocations] = useState<
		Pickup[] | Destination[]
	>([])
	const [pickup, setPickup] = useState<string>('')
	const [destinationLocations, setDestinationLocations] = useState<
		GenericObject[]
	>([])
	const [destination, setDestination] = useState<string>('')
	const [forHomeTimeView, setForHomeTimeView] =
		useState<string>('custom')
	const [isModelOpen, setIsModelOpen] = useState<boolean>(false)
	const [companyName, setCompanyName] = useState<string>(
		CURRENT_COMPANY_NAME.toLocaleLowerCase().trim()
	)
	const [destinationLocationName, setDestinationLocationName] =
		useState<string>('')

	const now = new Date()
	const [error, setError] = useState('')

	const [err, setErr] = useState<Errors>({})

	async function getLocations() {
		const locations = await LocationService.getLocations()
		getSelectedLocations()
		dispatch(setLocations(locations))
	}

	const getSelectedLocations = () => {
		const selectedDirection = shuttleDirection
			? shuttleDirection
			: rideDetail.direction

		const currentLocations = locations.filter(
			(location) =>
				location.direction.toLocaleLowerCase() ===
				selectedDirection.toLocaleLowerCase()
		)

		setSelectedLocations(currentLocations)

		return currentLocations
	}

	useEffect(() => {
		if (formType !== 'update') {
			dispatch(clearRideDetail())
			setTripDate(dayjs().format('YYYY-MM-DD'))
			setTripTime(dayjs().format('HH:mm'))
		}
	}, [formType])

	useEffect(() => {
		getSelectedLocations()
		setDestination('')
		setDestinationLocationName('')
		setDestinationLocations([])
	}, [shuttleDirection])

	useEffect(() => {
		getLocations()
		if (formType !== 'update') return

		const dt = dayjs(rideDetail.tripDateTime)
		if (rideDetail.tripDateTime) {
			setTripDate(dt.format('YYYY-MM-DD'))
			setTripTime(dt.format('HH:mm'))
		}
		setShuttleDirection(rideDetail.direction.toLocaleLowerCase())
		setPickup(rideDetail.pickupId as string)
		setDestination(rideDetail.destinationId as string)
		getDesinationsList(rideDetail?.pickupId as string)
		toggleShiftTimeInputTime(rideDetail.destinationId as string)
		setForHomeTimeView('custom')
	}, [rideDetail, formType])

	const handlePickupChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		const pickupId = e.target.value
		setPickup(pickupId)
		setDestination('')
		setDestinationLocations([])
		getDesinationsList(pickupId)
		setErr({ ...err, pickup: '' })
	}

	const handleDestinationChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		const destinationId = e.target.value
		setDestination(destinationId)
		toggleShiftTimeInputTime(destinationId)
		setErr({ ...err, dropoff: '' })
	}

	const toggleShiftTimeInputTime = (destinationId: string) => {
		const selectedLocations = getSelectedLocations()
		const location = selectedLocations.find(
			(location) => location.id === destinationId
		)

		if (location?.locationName.toLowerCase() === companyName) {
			setDestinationLocationName('dna')
			return
		}

		setDestinationLocationName(
			location?.locationName.toLowerCase() as string
		)
	}

	const getDesinationsList = (pickupId: string) => {
		const selectedLocations = getSelectedLocations()
		const pickupLocation: Pickup | undefined = selectedLocations.find(
			(location) => location.id === pickupId
		)

		const pickupLocationName = pickupLocation?.locationName
			.toLowerCase()
			.trim()
		if (
			pickupLocationName !== companyName &&
			pickupLocationName !== companyName
		) {
			const destinations = selectedLocations.filter(
				(location) =>
					location.locationName.toLowerCase() == companyName ||
					location.locationName.toLowerCase() == companyName
			)

			setDestinationLocations(destinations)
		} else if (
			pickupLocationName == companyName ||
			pickupLocationName == companyName
		) {
			const destinations = selectedLocations.filter(
				(location) =>
					location.locationName.toLowerCase() !== companyName &&
					location.locationName.toLowerCase() !== companyName
			)

			setDestinationLocations(destinations)
		}
	}

	const handleTimeChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const time = e.target.value
		setTripTime(time)
		setError('')
	}

	const validateTime = (time: any) => {
		const difference = dayjs(`${tripDate} ${time}`).diff(
			dayjs(new Date())
		)

		if (difference < 1) {
			setError(
				'Invalid time, please select a time after the current time.'
			)
			return false
		}
		return true
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

	const handleOnClose = () => {
		handleRideFormModel(false)
		handleFormType('')
		resetForm()
	}

	const validateForm = (): Errors => {
		const errors: Errors = {}
		if (!shuttleDirection) {
			errors.direction = 'Shuttle direction is required'
		}
		if (!destination) {
			errors.dropoff = 'Dropoff location is required'
		}
		if (!pickup) {
			errors.pickup = 'Pickup location is required'
		}
		return errors
	}

	const submitRide = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const errors = validateForm()
		setErr(errors)
		if (Object.keys(errors).length === 0 && validateTime(tripTime)) {
			const rideData = {
				tripDate: tripDate,
				tripTime: tripTime,
				direction: shuttleDirection.toLocaleLowerCase(),
				pickupId: pickup,
				destinationId: destination,
			}

			if (formType === 'update') {
				handleUpdateDate(rideDetail.id, rideData)
			} else {
				handleSaveDate(rideData)
			}
			handleOnClose()
		} else {
			notify('Please resolve error first', 'warning')
			return
		}
	}

	const resetForm = () => {
		setError('')
		setErr({})
		setShuttleDirection('')
		setPickup('')
		setDestination('')
		setForHomeTimeView('')
		setDestinationLocations([])
	}

	const shiftTimeSlots = [
		{
			show: '6:00 AM',
			value: '6:00',
		},
		{
			show: '7:00 AM',
			value: '7:00',
		},
		{
			show: '8:00 AM',
			value: '8:00',
		},
		{
			show: '9:00 AM',
			value: '9:00',
		},
		{
			show: '10:00 AM',
			value: '10:00',
		},
		{
			show: '03:00 PM',
			value: '15:00',
		},
	]

	return (
		<>
			<ModalButton
				setIsOpen={setIsModelOpen}
				isOpen={showRideFormModel}
				handleOpenModal={() => handleRideFormModel(true)}
				handleOnClose={handleOnClose}
				modalTitle={
					formType === 'update' ? 'Update Ride' : 'Create Ride'
				}
				iconname={'bus'}
				modalBody={
					<MDBModalBody className='mx-3'>
						<form
							className='mb-4'
							onSubmit={(e: any) => e.preventDefault()}
						>
							<div className='fw-bold'>
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
											shuttleDirection.toLowerCase() === 'north'
										}
										onChange={(e) => {
											setShuttleDirection(e.target.value)
											setErr({ ...err, direction: '' })
										}}
										value='north'
									/>
									<label className='fw-normal'>North</label>
								</div>
								<div className='form-check form-check-inline mb-2'>
									<input
										type='radio'
										className='form-check-input'
										name='direction'
										checked={
											shuttleDirection.toLowerCase() === 'south'
										}
										onChange={(e) => {
											setShuttleDirection(e.target.value)
											setErr({ ...err, direction: '' })
										}}
										value='south'
									/>
									<label className='fw-normal'>South</label>
								</div>
								{err.direction && (
									<span className='error_msg d-block'>
										{err.direction}
									</span>
								)}

								<label className='fw-bold py-1 d-block'>
									{' '}
									Pick-up
								</label>
								<select
									className='form-select mb-2'
									aria-label='Default select example'
									value={pickup}
									onChange={(e) => handlePickupChange(e)}
									defaultValue={pickup}
								>
									<option value=''>Select Pick up</option>
									{selectedLocations?.length &&
										selectedLocations.map((location) => (
											<option key={location.id} value={location.id}>
												{location.locationName}
											</option>
										))}
								</select>
								{err.pickup && (
									<span className='error_msg d-block'>
										{err.pickup}
									</span>
								)}

								<label className='fw-bold py-1'>Destination</label>
								{
									<select
										className='form-select'
										aria-label='Default select example'
										value={destination}
										onChange={(e) => handleDestinationChange(e)}
									>
										<option value=''>Select Destination</option>
										{destinationLocations.map((location) => (
											<option key={location.id} value={location.id}>
												{location.locationName}
											</option>
										))}
									</select>
								}
								{err.dropoff && (
									<span className='error_msg d-block'>
										{err.dropoff}
									</span>
								)}
								<label className='fw-bold py-2'>Trip Date</label>
								<input
									type='date'
									name='date'
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

								<label className='form-check-label py-1 d-block'>
									Shift Time{' '}
								</label>
								{destinationLocationName === companyName && (
									<MDBCol>
										<input
											type='radio'
											className='form-check-input mb-2'
											name='shifttime'
											checked={forHomeTimeView === 'custom'}
											onClick={() => setForHomeTimeView('custom')}
											value='custom'
										/>
										<label className='fw-normal'>Custom Time</label>

										<input
											type='radio'
											className='form-check-input ms-3 mb-2'
											name='shifttime'
											checked={forHomeTimeView === 'shift'}
											onClick={() => setForHomeTimeView('shift')}
											value='shift'
										/>
										<label className='fw-normal'>
											Defined Shift Time
										</label>
									</MDBCol>
								)}

								{destinationLocationName === companyName &&
									forHomeTimeView === 'shift' && (
										<select
											className='form-select mb-2'
											aria-label='Default select example'
											name='time'
											onChange={handleTimeChange}
										>
											<option value=''>Select Shift Time</option>
											{shiftTimeSlots.map((shiftTime, index) => (
												<option
													key={index}
													selected={tripTime === shiftTime.value}
													value={shiftTime.value}
												>
													{shiftTime.show}
												</option>
											))}
										</select>
									)}

								{destinationLocationName === companyName &&
									forHomeTimeView === 'custom' && (
										<input
											type='time'
											name='time'
											className='form-control mb-2'
											placeholder='Enter Time'
											value={tripTime}
											onChange={handleTimeChange}
										/>
									)}

								{destinationLocationName !== companyName && (
									<input
										type='time'
										name='time'
										className='form-control mb-2'
										placeholder='Enter Time'
										value={tripTime}
										onChange={handleTimeChange}
									/>
								)}

								{error && <span className='error_msg'>{error}</span>}
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
								onClick={(e: any) => {
									submitRide(e)
								}}
							>
								{formType === 'update' ? 'Update' : 'Save'}
							</MDBBtn>
						</MDBModalFooter>
					</MDBModalBody>
				}
			>
				<span onClick={() => handleFormType('create')}>
					Create Ride
				</span>
			</ModalButton>
		</>
	)
}
