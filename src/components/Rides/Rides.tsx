import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit'

import Layout from '../Layout/Layout'
import Listings from './Listings'
import Search from '../Toolbar/Search'
import RideService from '../../services/RideService'
import CreateRide from './CreateRide'
import './Rides.css'
import {
	LISTING_ORDER,
	INITIAL_PAGE_OFFSET,
	ITEMS_PER_PAGE,
	USER_ROLES,
	RIDE_STATUSES,
} from '../../common/constants'
import LoadingBar from 'react-top-loading-bar'
import { setRides } from '../../store/reducers/rides-reducer'
import { RootState } from '../../store'
import dayjs from 'dayjs'

const initialTableFilters: GenericObject = {
	order: LISTING_ORDER,
	from: INITIAL_PAGE_OFFSET,
	to: ITEMS_PER_PAGE,
}

export default function Rides(): JSX.Element {
	const dispatch = useDispatch()

	const [itemsPerPage, setItemsPerPage] =
		useState<number>(ITEMS_PER_PAGE)
	const [pageOffset, setPageOffset] = useState<number>(0)
	const [options, setOptions] = useState<GenericObject[]>([
		{
			filterVal: 'firstName',
			readableValue: 'First Name',
		},
		{
			filterVal: 'email',
			readableValue: 'Email',
		},
	])
	const [rideDirection, setRideDirection] = useState<string>('')
	const [searchValue, setSearchValue] = useState<string>('')
	const [ridesStartDateTime, setRidesStartDateTime] = useState<Date>(
		dayjs().subtract(1, 'hour').toDate()
	)
	const [ridesEndDateTime, setRidesEndDateTime] = useState<Date>(
		dayjs().set('hour', 23).set('minute', 59).toDate()
	)
	const [formType, setFormType] = useState<string>('create')
	const [showRideFormModel, setShowRideFormModel] =
		useState<boolean>(false)
	const [showLoader, setShowLoader] = useState<boolean>(false)

	const [tableFilters, setTableFilters] = useState<GenericObject>({
		...initialTableFilters,
		tripStartDateTime: dayjs(ridesStartDateTime).format(
			'YYYY-MM-DD HH:mm'
		),
		tripEndDateTime: dayjs(ridesEndDateTime).format(
			'YYYY-MM-DD HH:mm'
		),
	})

	async function getRides(reqTableFilters = tableFilters) {
		setShowLoader(true)
		const allRides = await RideService.getRides(reqTableFilters)
		await dispatch(setRides(allRides))
	}

	const authReducer = useSelector((state: RootState) => state.auth)

	useEffect(() => {
		getRides()
	}, [])

	React.useEffect(() => {
		getRides()
	}, [tableFilters.to, pageOffset])

	function handleOption(event: React.ChangeEvent<any>) {}

	function handleStartDateTime(e: any) {
		setRidesStartDateTime(dayjs(e).toDate())
		setTableFilters({
			...tableFilters,
			tripStartDateTime: dayjs(dayjs(e).toDate()).format(
				'YYYY-MM-DD HH:mm'
			),
		})
	}

	function handleEndDateTime(e: any) {
		setRidesEndDateTime(dayjs(e).toDate())

		setTableFilters({
			...tableFilters,
			tripEndDateTime: dayjs(dayjs(e).toDate()).format(
				'YYYY-MM-DD HH:mm'
			),
		})
	}

	function handleDirectionFilter(e: React.ChangeEvent<any>) {
		setRideDirection(e.target.value)
		setTableFilters({
			...tableFilters,
			direction: e.target.value,
		})
	}

	async function handleChangeRideStatus(
		checked: boolean,
		rideId: string
	) {
		//await RideServe
		const rideStatus = checked
			? RIDE_STATUSES.completed
			: RIDE_STATUSES.awaited

		await RideService.updateRideStaus(rideId, rideStatus)
		getRides()
	}

	function handleFilterRides() {
		getRides()
	}

	function handleSearchField(
		event: React.ChangeEvent<HTMLInputElement>
	) {
		event.preventDefault()
	}

	async function handleSearchClick() {}

	function handleItemsPerPage(event: React.ChangeEvent<any>): void {
		setItemsPerPage(event.target.value)
		setTableFilters({ ...tableFilters, to: event.target.value })
		setPageOffset(0)
		return
	}

	function handlePageChange({
		selected,
	}: {
		selected: number
	}): void {
		setPageOffset(selected)
		setTableFilters({
			...tableFilters,
			from: selected * itemsPerPage,
			to: itemsPerPage,
		})
	}

	function handleFormType(type: string, userId?: string) {
		setFormType(type)
	}

	function handleRideFormModel(showHideModel: boolean) {
		setShowRideFormModel(showHideModel)
	}

	async function handleDeleteRide(rideId: string) {
		await RideService.deleteRide(rideId)
		await getRides()
	}

	async function handleCancelRide(
		rideId: string,
		rideStatus: string
	) {
		await RideService.updateRideStaus(rideId, rideStatus)
		getRides()
	}

	const currentUserRole = authReducer.user.role.name.toLowerCase()
	const userRole = USER_ROLES.User.toLowerCase()

	return (
		<Layout>
			{showLoader && (
				<LoadingBar
					color='#f11946'
					progress={100}
					waitingTime={1000}
					onLoaderFinished={() => setShowLoader(false)}
				/>
			)}
			{currentUserRole == userRole &&
				Boolean(authReducer.user.isActive) && (
					<MDBRow className='mt-5 px-3 py-2 text-start bg-light d-flex justify-content-start flex-1 '>
						<MDBCol className=''>
							<CreateRide
								getRides={getRides}
								showRideFormModel={showRideFormModel}
								formType={formType}
								handleFormType={handleFormType}
								handleRideFormModel={handleRideFormModel}
							/>
						</MDBCol>
					</MDBRow>
				)}
			{currentUserRole == userRole &&
				!Boolean(authReducer.user.isActive) && (
					<MDBRow>
						<MDBCol className='mt-5 px-3 py-2 text-start bg-light d-flex justify-content-start flex-1 '>
							<div className='moving-text-container'>
								<p className='moving-text'>
									<MDBIcon
										icon='exclamation-triangle'
										size='lg'
										className='me-2'
									/>
									You are currently inactive, please contact admin to
									activate your account.
								</p>
							</div>
						</MDBCol>
					</MDBRow>
				)}
			<Search
				page={'rides'}
				handleSearchClick={handleSearchClick}
				handleOption={handleOption}
				options={options}
				searchValue={searchValue}
				handleSearchField={handleSearchField}
				handleItemsPerPage={handleItemsPerPage}
				ridesStartDateTime={ridesStartDateTime}
				ridesEndDateTime={ridesEndDateTime}
				handleStartDateTime={handleStartDateTime}
				handleEndDateTime={handleEndDateTime}
				handleFilterRides={handleFilterRides}
				handleDirectionFilter={handleDirectionFilter}
			/>
			<Listings
				perPageItems={itemsPerPage}
				handleFormType={handleFormType}
				handleRideFormModel={handleRideFormModel}
				handleDeleteRide={handleDeleteRide}
				handleCancelRide={handleCancelRide}
				handlePageChange={handlePageChange}
				handleChangeRideStatus={handleChangeRideStatus}
			/>
		</Layout>
	)
}
