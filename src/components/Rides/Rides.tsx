import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MDBCol, MDBRow } from 'mdb-react-ui-kit'

import Layout from '../Layout/Layout'
import Listings from './Listings'
import Search from '../Toolbar/Search'
import RideService from '../../services/RideService'
import CreateRide from './CreateRide'
import {
	LISTING_ORDER,
	INITIAL_PAGE_OFFSET,
	ITEMS_PER_PAGE,
} from '../../common/constants'
import { setRides } from '../../store/reducers/rides-reducer'
import { RootState } from '../../store'

const initialTableFilters: GenericObject = {
	order: LISTING_ORDER,
	from: INITIAL_PAGE_OFFSET,
	to: ITEMS_PER_PAGE,
}

export default function Rides(): JSX.Element {
	const dispatch = useDispatch()

	const [isUserActive, setIsUserActive] = useState<boolean>(true)
	const [itemsPerPage, setItemsPerPage] =
		useState<number>(ITEMS_PER_PAGE)
	const [formType, setFormType] = useState<string>('create')
	const [showRideFormModel, setShowRideFormModel] =
		useState<boolean>(false)

	const [tableFilters, setTableFilters] = useState<GenericObject>(
		initialTableFilters
	)

	async function getRides() {
		const allRides = await RideService.getRides(tableFilters)
		dispatch(setRides(allRides))
	}

	const authReducer = useSelector((state: RootState) => state.auth)
	useEffect(() => {
		getRides()
		setIsUserActive(Boolean(authReducer.user.isActive))
	}, [])

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

	return (
		<Layout>
			{authReducer.user.isActive && (
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
			{/* <Search /> */}
			<Listings
				perPageItems={itemsPerPage}
				handleFormType={handleFormType}
				handleRideFormModel={handleRideFormModel}
				handleDeleteRide={handleDeleteRide}
			/>
		</Layout>
	)
}
