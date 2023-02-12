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
import { clearRideDetail } from '../../store/reducers/rides-reducer'
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
	const [isModelOpen, setIsModelOpen] = useState<boolean>(false)

	const now = new Date()
	const [error, setError] = useState('')

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
	}, [shuttleDirection])

	useEffect(() => {
		getLocations()
		if (formType !== 'update') return

		const dt = dayjs(rideDetail.tripDateTime)
		if (rideDetail.tripDateTime) {
			setTripDate(dt.format('YYYY-MM-DD'))
			setTripTime(dt.format('HH:mm'))
		}
		setShuttleDirection(rideDetail.direction)
		getSelectedLocations()
		setPickup(rideDetail.pickupId as string)
		setDestination(rideDetail.destinationId as string)
		getDesinationsList(rideDetail?.pickupId as string)
	}, [rideDetail, formType])

	const handlePickupChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		const pickupId = e.target.value
		setPickup(pickupId)
		setDestination('')
		setDestinationLocations([])
		getDesinationsList(pickupId)
	}

	const getDesinationsList = (pickupId: string) => {
		const pickupLocation: Pickup | undefined = selectedLocations.find(
			(location) => location.id === pickupId
		)

		const pickupLocationName = pickupLocation?.locationName
			.toLowerCase()
			.trim()

		console.log(
			'pickupLocationName',
			pickupLocationName,
			pickupLocation
		)

		if (
			pickupLocationName !== 'dna' &&
			pickupLocationName !== 'dna micro'
		) {
			const destinations = selectedLocations.filter(
				(location) =>
					location.locationName.toLowerCase() == 'dna' ||
					location.locationName.toLowerCase() == 'dna micro'
			)

			setDestinationLocations(destinations)
		} else if (
			pickupLocationName == 'dna' ||
			pickupLocationName == 'dna micro'
		) {
			const destinations = selectedLocations.filter(
				(location) =>
					location.locationName.toLowerCase() !== 'dna' &&
					location.locationName.toLowerCase() !== 'dna micro'
			)

			setDestinationLocations(destinations)
		}
	}

	const handleTimeChange = (
		e: React.ChangeEvent<HTMLInputElement>
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

	const submitRide = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!validateTime(tripTime)) return

		if (error) {
			notify('Please resolve error first', 'warning')
			return
		}
		if (shuttleDirection === '') {
			alert('Please select shuttle direction')
			return
		}

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
	}

	const resetForm = () => {
		setError('')
		setShuttleDirection('')
		setPickup('')
		setDestination('')
		setDestinationLocations([])
	}

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
						<form className='mb-4'>
							<div className='fw-bold'>
								<label className='fw-bold py-1'>Trip Date</label>
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

								<label className='form-check-label py-1 '>
									Shift Time
								</label>

								<input
									type='time'
									name='time'
									className='form-control mb-2'
									placeholder='Enter Time'
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
											rideDetail.direction?.toLocaleLowerCase() ===
												'north' ||
											shuttleDirection.toLowerCase() === 'north'
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
										name='direction'
										checked={
											rideDetail?.direction?.toLocaleLowerCase() ===
												'south' ||
											shuttleDirection.toLowerCase() === 'south'
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
									value={pickup}
									onChange={(e) => handlePickupChange(e)}
									defaultValue={pickup}
								>
									<option>Select Pick up</option>
									{selectedLocations?.length &&
										selectedLocations.map((location) => (
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
										value={destination}
										onChange={(e) => setDestination(e.target.value)}
									>
										<option value=''>Select Destination</option>
										{destinationLocations.map((location) => (
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
