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
import { LISTING_ORDER } from '../../common/constants'
import RideDetails from './RideDetails'
import RideService from '../../services/RideService'
import { setRideDetail } from '../../store/reducers/rides-reducer'
import DeleteModal from '../Toolbar/DeleteModal'

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

	const [showConfirmBox, setShowConfirBox] = useState<boolean>(false)
	const [deleteRideId, setDeleteRideId] = useState<string>('')

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

	async function handleRideEdit(rideId: string | undefined) {
		if (!rideId) return

		await getRideDetail(rideId)
		handleFormType('update')
		handleRideFormModel(true)
	}

	return (
		<MDBContainer fluid>
			<section>
				<div className='shadow-4 mt-4 rounded-4 overflow-hidden bg-light'>
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
											<>
												{ride.status == 'awaiting' ? (
													<MDBBadge
														light
														color='warning'
														pill
														className='status'
													>
														<p className='mb-1'>{ride.status}</p>
													</MDBBadge>
												) : ride.status == 'completed' ? (
													<MDBBadge
														light
														color='success'
														pill
														className='status'
													>
														<p className='mb-1'>{ride.status}</p>
													</MDBBadge>
												) : (
													<MDBBadge
														light
														color='secondary'
														pill
														className='status'
													>
														<p className='mb-1'>{ride.status}</p>
													</MDBBadge>
												)}
											</>
										</td>
										<td>
											<MDBTooltip tag='a' title={'Edit'}>
												<MDBBtn
													key={ride?.id}
													className='fs-6 p-2'
													color='light'
													size='sm'
													rippleColor='dark'
													onClick={() => {
														handleRideEdit(ride.id)
													}}
												>
													<MDBIcon icon='edit' />
												</MDBBtn>
											</MDBTooltip>

											<MDBTooltip tag='a' title={'Delete'}>
												<MDBBtn
													key={ride?.id}
													className='fs-6 p-2'
													color='light'
													size='sm'
													rippleColor='dark'
													onClick={() => {
														setShowConfirBox(true)
														setDeleteRideId(ride.id)
													}}
												>
													<MDBIcon icon='trash' />
												</MDBBtn>
											</MDBTooltip>
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

						{showConfirmBox && (
							<DeleteModal
								show={showConfirmBox}
								message={'Are you sure you want to delete this ride?'}
								onDelete={handleDeleteRide}
								deleteData={deleteRideId}
								handleOnClose={() => setShowConfirBox(false)}
								setShow={() => setShowConfirBox(!showConfirmBox)}
							/>
						)}
					</MDBTable>
				</div>
			</section>
		</MDBContainer>
	)
}

export default Listings
