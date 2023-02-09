import React, { useEffect, useState } from 'react'
import {
	MDBContainer,
	MDBTable,
	MDBTableHead,
	MDBTableBody,
	MDBBtn,
	MDBIcon,
	MDBTooltip,
	MDBBadge,
	MDBRow,
	MDBCol,
} from 'mdb-react-ui-kit'

import ReactPaginate from 'react-paginate'
import dayjs from 'dayjs'

import { RootState } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { setUsers } from '../../store/reducers/users-reducer'
import {
	LISTING_ORDER,
	SERVER_BASE_URL,
} from '../../common/constants'
import RideDetails from './RideDetails'
import RideService from '../../services/RideService'
import CreateUser from '../User/CreateUser'
import { setRideDetail } from '../../store/reducers/rides-reducer'

interface UserTableProps {
	perPageItems: number
	handleFormType: (type: string) => void
	handleRideFormModel: (e: any) => void
	handleDeleteRide: (e: string) => void
}

function Listings({
	perPageItems = 10,
	handleFormType,
	handleRideFormModel,
	handleDeleteRide,
}: UserTableProps): JSX.Element {
	const dispatch = useDispatch()
	const [pageOffset, setPageOffset] = useState<number>(0)
	const [tableFilters, setTableFilters] = useState<GenericObject>({
		order: LISTING_ORDER,
		from: pageOffset,
		to: perPageItems,
	})
	const [selectedRideId, setSelectedRideId] = useState<string>('')
	const [showRideDetail, setShowRideDetail] = useState<boolean>(false)
	const [showRideUpdateModel, setShowRideUpdateModel] =
		useState<boolean>(false)

	const rideReducer = useSelector((state: RootState) => state.ride)

	async function getRideDetail(rideId: string) {
		const rideDetail = await RideService.getRide(rideId)
		dispatch(setRideDetail(rideDetail))
	}

	useEffect(() => {
		if (selectedRideId) getRideDetail(selectedRideId)
	}, [selectedRideId])

	function handlePageChange({
		selected,
	}: {
		selected: number
	}): void {
		setPageOffset(selected)
		setTableFilters({
			...tableFilters,
			from: selected * perPageItems,
		})
	}

	function handleRideDetail(rideId: string | undefined) {
		if (!rideId) return

		setShowRideDetail(!showRideDetail)
		setSelectedRideId(rideId)
	}

	function handleRideEdit(rideId: string | undefined) {
		if (!rideId) return

		setShowRideDetail(false)
		setShowRideUpdateModel(true)
		setSelectedRideId(rideId)
	}

	return (
		<MDBContainer fluid>
			<section>
				<div className='shadow-4 rounded-4 overflow-hidden bg-light'>
					<MDBTable hover>
						<MDBTableHead className='bg-info'>
							<tr>
								<th className='fw-bold text-white h6'>
									<MDBIcon
										// icon={isAscending ? 'sort-up' : 'sort-down'}
										// onClick={() => setIsAscending(!isAscending)}
										className='sort-icon me-2'
									/>
									Trip Date
								</th>
								<th className='fw-bold text-white h6'>
									<MDBIcon
										// icon={isAscending ? 'sort-up' : 'sort-down'}
										// onClick={() => setIsAscending(!isAscending)}
										className='sort-icon me-2'
									/>
									Trip Time
								</th>
								<th className='fw-bold text-white h6'>
									<MDBIcon
										// icon={isAscending ? 'sort-up' : 'sort-down'}
										// onClick={() => setIsAscending(!isAscending)}
										className='sort-icon me-2'
									/>
									Direction
								</th>
								<th className='fw-bold text-white h6'>
									<MDBIcon
										// icon={isAscending ? 'sort-up' : 'sort-down'}
										// onClick={() => setIsAscending(!isAscending)}
										className='sort-icon me-2'
									/>
									Pick Up
								</th>
								<th className='fw-bold text-white h6'>Destination</th>
								<th className='fw-bold text-white h6'>
									<MDBIcon
										// icon={isAscending ? 'sort-up' : 'sort-down'}
										// onClick={() => setIsAscending(!isAscending)}
										className='sort-icon me-2'
									/>
									Status
								</th>

								<th className='fw-bold text-white h6'>Actions</th>
							</tr>
						</MDBTableHead>
						<MDBTableBody
							style={{
								verticalAlign: 'middle',
							}}
						>
							{rideReducer.rides.length === 0 ? (
								<tr className='items'>
									<td colSpan={6}>There are no rides to show...</td>
								</tr>
							) : (
								rideReducer.rides.map((ride: Ride, index: any) => (
									<tr key={ride?.id} className='items'>
										<td onClick={() => handleRideDetail(ride?.id)}>
											<div className='d-flex align-items-center'>
												<div className='ms-3'>
													<p className='fw-bold mb-1'>
														{dayjs(ride?.tripDateTime).format(
															'YYYY-MM-DD'
														)}
													</p>
												</div>
											</div>
										</td>
										<td>
											<p className=' mb-1'>
												{dayjs(ride?.tripDateTime).format('hh:mm A')}
											</p>
										</td>
										<td>
											<p className='mb-0'>{ride.pickup.direction}</p>
										</td>
										<td>
											<p className='mb-1'>
												{ride.pickup.locationName}
											</p>
										</td>
										<td>
											<p className='mb-1'>
												{ride.destination.locationName}
											</p>
										</td>
										<td>
											<p className='mb-1'>{ride.status}</p>
										</td>
										<td>
											<MDBBtn
												key={index}
												className='fs-6 p-2'
												color='light'
												size='sm'
												rippleColor='dark'
												onClick={() => handleRideEdit(ride.id)}
											>
												<MDBTooltip tag='a' title={'Edit'}>
													<span
														key={index}
														onClick={() => {
															handleFormType('update')
															setSelectedRideId(ride.id)
															handleRideFormModel(true)
														}}
													>
														<MDBIcon icon='edit' />
													</span>
												</MDBTooltip>
											</MDBBtn>
											<MDBBtn
												key={index}
												className='fs-6 p-2'
												color='light'
												size='sm'
												rippleColor='dark'
											>
												<MDBTooltip tag='a' title={'Delete'}>
													<span
														key={index}
														onClick={() => handleDeleteRide(ride.id)}
													>
														<MDBIcon icon='trash' />
													</span>
												</MDBTooltip>
											</MDBBtn>
										</td>
									</tr>
								))
							)}
						</MDBTableBody>
						<tfoot>
							<tr>
								<td colSpan={7}>
									<MDBRow>
										<MDBCol className='d-flex justify-content-end align-items-end p-1 '>
											<ReactPaginate
												breakLabel='...'
												nextLabel='next >'
												onPageChange={handlePageChange}
												pageRangeDisplayed={2}
												pageCount={Math.ceil(
													rideReducer.totalRides / perPageItems
												)}
												previousLabel='< previous'
												// renderOnZeroPageCount={3}
												pageClassName='page-item'
												pageLinkClassName='page-link'
												previousClassName='page-item'
												previousLinkClassName='page-link'
												nextClassName='page-item'
												nextLinkClassName='page-link'
												breakClassName='page-item'
												breakLinkClassName='page-link'
												containerClassName='pagination'
												activeClassName='active'
											/>
										</MDBCol>
									</MDBRow>
								</td>
							</tr>
						</tfoot>
						{showRideDetail && (
							<RideDetails
								show={showRideDetail}
								setShow={() => setShowRideDetail(!showRideDetail)}
							/>
						)}
					</MDBTable>
				</div>
			</section>
		</MDBContainer>
	)
}

export default Listings
