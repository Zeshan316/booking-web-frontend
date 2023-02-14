import React, { SetStateAction, useEffect, useState } from 'react'
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
	MDBSwitch,
} from 'mdb-react-ui-kit'

import ReactPaginate from 'react-paginate'
import dayjs from 'dayjs'

import { RootState } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import RideDetails from './RideDetails'
import RideService from '../../services/RideService'
import { setRideDetail } from '../../store/reducers/rides-reducer'
import DeleteModal from '../Toolbar/DeleteModal'
import { USER_ROLES, RIDE_STATUSES } from '../../common/constants'
import { setRides } from '../../store/reducers/rides-reducer'

interface UserTableProps {
	perPageItems: number
	handleFormType: (type: string) => void
	handleRideFormModel: (e: any) => void
	handleDeleteRide: (e: string) => void
	handlePageChange: (e: any) => void
	handleChangeRideStatus: (e: any, rideId: string) => void
	handleCancelRide: (rideId: string, rideStatus: string) => void
}

function Listings({
	perPageItems = 10,
	handleFormType,
	handleRideFormModel,
	handleDeleteRide,
	handleCancelRide,
	handlePageChange,
	handleChangeRideStatus,
}: UserTableProps): JSX.Element {
	const dispatch = useDispatch()

	const [selectedRideId, setSelectedRideId] = useState<string>('')
	const [showRideDetail, setShowRideDetail] = useState<boolean>(false)
	/* const [showRideUpdateModel, setShowRideUpdateModel] =
		useState<boolean>(false) */

	const [showConfirmBox, setShowConfirBox] = useState<boolean>(false)
	const [deleteRideId, setDeleteRideId] = useState<string>('')
	const [showCancelConfirmBox, setShowCancelConfirmBox] =
		useState<boolean>(false)
	const [cancelRideData, setCancelRideData] = useState<string>('')

	const [showRideCompleteModal, setShowRideCompleteModal] =
		useState<boolean>(false)
	const [rideCompleteId, setRideCompleteId] = useState<string | null>(
		null
	)
	const [rideStatusEvent, setRideStatusEvent] = useState<string>('')
	const [cancelStatusEvent, setCancelStatusEvent] =
		useState<string>('')

	const rideReducer = useSelector((state: RootState) => state.ride)
	const authReducer = useSelector((state: RootState) => state.auth)

	const userRole = authReducer?.user?.role?.name.toLowerCase()
	const RoleOfUser = USER_ROLES.User.toLowerCase()
	const driverRole = USER_ROLES.Driver.toLowerCase()

	async function getRideDetail(rideId: string) {
		const rideDetail = await RideService.getRide(rideId)
		dispatch(setRideDetail(rideDetail))

		return rideDetail
	}

	useEffect(() => {
		if (selectedRideId) getRideDetail(selectedRideId)
	}, [selectedRideId])

	function handleRideDetail(rideId: string | undefined) {
		if (!rideId) return

		setShowRideDetail(!showRideDetail)
		setSelectedRideId(rideId)
	}

	async function handleRideEdit(rideId: string | undefined) {
		if (!rideId) return

		const rideDetail = await getRideDetail(rideId)

		const rideMinutesDiff = dayjs(rideDetail.tripDateTime).diff(
			dayjs(),
			'minute'
		)

		if (rideMinutesDiff < 59) {
			alert(
				'Rides can be updated at least one hour before the scheduled time.'
			)
			return
		}

		handleFormType('update')
		handleRideFormModel(true)
	}

	return (
		<MDBContainer fluid>
			<section>
				<div className='shadow-4 mt-1 rounded-4 overflow-hidden bg-light'>
					<MDBTable hover>
						<MDBTableHead className='bg-info'>
							<tr>
								<th className='fw-bold text-white h6'>
									{/* <MDBIcon
                    icon={isAscending ? 'sort-up' : 'sort-down'}
                    onClick={() => setIsAscending(!isAscending)}
                    className="sort-icon me-2"
                  /> */}
									Trip Date
								</th>
								<th className='fw-bold text-white h6'>
									{/* <MDBIcon
                    icon={isAscending ? 'sort-up' : 'sort-down'}
                    onClick={() => setIsAscending(!isAscending)}
                    className="sort-icon me-2"
                  /> */}
									Trip Time
								</th>
								<th className='fw-bold text-white h6'>
									{/* <MDBIcon
                    icon={isAscending ? 'sort-up' : 'sort-down'}
                    onClick={() => setIsAscending(!isAscending)}
                    className="sort-icon me-2"
                  /> */}
									Request By
								</th>
								<th className='fw-bold text-white h6'>
									{/* <MDBIcon
                    icon={isAscending ? 'sort-up' : 'sort-down'}
                    onClick={() => setIsAscending(!isAscending)}
                    className="sort-icon me-2"
                  /> */}
									Direction
								</th>
								<th className='fw-bold text-white h6'>
									{/* <MDBIcon
                    icon={isAscending ? 'sort-up' : 'sort-down'}
                    onClick={() => setIsAscending(!isAscending)}
                    className="sort-icon me-2"
                  /> */}
									Pick Up
								</th>
								<th className='fw-bold text-white h6'>Destination</th>
								<th className='fw-bold text-white h6'>
									{/* <MDBIcon
                    icon={isAscending ? 'sort-up' : 'sort-down'}
                    onClick={() => setIsAscending(!isAscending)}
                    className="sort-icon me-2"
                  /> */}
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
									<td colSpan={8}>There are no rides to show...</td>
								</tr>
							) : (
								rideReducer.rides.map((ride: Ride, index: any) => (
									<tr key={ride?.id} className='items'>
										<td onClick={() => handleRideDetail(ride?.id)}>
											<MDBRow className='d-flex align-items-center'>
												<MDBCol className='ms-0'>
													<p className='fw-bold mb-1'>
														{dayjs(ride?.tripDateTime).format(
															'D MMM, YYYY'
														)}
													</p>
												</MDBCol>
											</MDBRow>
										</td>
										<td onClick={() => handleRideDetail(ride?.id)}>
											<p className=' mb-1'>
												{dayjs(ride?.tripDateTime).format('hh:mm A')}
											</p>
										</td>
										<td onClick={() => handleRideDetail(ride?.id)}>
											<p className=' mb-1'>
												{`${ride.user.firstName} ${ride.user.lastName}`}
											</p>
										</td>
										<td onClick={() => handleRideDetail(ride?.id)}>
											<p className='mb-0 text-capitalize'>
												{ride.pickup.direction}
											</p>
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
												{ride.status.toLowerCase() ==
												RIDE_STATUSES.awaiting ? (
													<MDBBadge
														light
														color='warning'
														pill
														className='status'
													>
														<p className='my-1 text-capitalize'>
															{ride.status}
														</p>
													</MDBBadge>
												) : ride.status.toLowerCase() ===
												  RIDE_STATUSES.completed ? (
													<MDBBadge
														light
														color='success'
														pill
														className='status'
													>
														<p className='my-1 text-capitalize'>
															{ride.status}
														</p>
													</MDBBadge>
												) : (
													<MDBBadge
														light
														color='danger'
														pill
														className='status'
													>
														<p className='my-1 text-capitalize'>
															{ride.status}
														</p>
													</MDBBadge>
												)}
											</>
										</td>
										{userRole === driverRole ? (
											<td>
												{ride.status.toLowerCase() ==
												RIDE_STATUSES.awaiting ? (
													<MDBTooltip
														tag='a'
														title={'Mark ride as completed'}
													>
														<MDBSwitch
															checked={
																ride.status.toLowerCase() ===
																RIDE_STATUSES.completed
															}
															onChange={(e: any) => {
																setShowRideCompleteModal(true)
																setRideStatusEvent(e.target.checked)
																setRideCompleteId(ride.id)
															}}
														/>
													</MDBTooltip>
												) : (
													<MDBSwitch
														defaultChecked={
															ride.status.toLowerCase() ===
															RIDE_STATUSES.completed
														}
														disabled={
															ride.status.toLowerCase() ===
																RIDE_STATUSES.completed ||
															ride.status.toLowerCase() ===
																RIDE_STATUSES.cancelled
														}
														id='flexSwitchCheckChecked'
														// label='Change status'
													/>
												)}
											</td>
										) : userRole === RoleOfUser ? (
											<td>
												{authReducer.user.isActive
													? ride.status.toLowerCase() !==
															RIDE_STATUSES.completed &&
													  ride.status.toLowerCase() !==
															RIDE_STATUSES.cancelled && (
															<>
																<MDBTooltip
																	tag='a'
																	title={'Cancel Ride'}
																>
																	<MDBBtn
																		key={ride?.id}
																		className='fs-6 p-2'
																		color='light'
																		size='sm'
																		rippleColor='dark'
																		onClick={() => {
																			setShowCancelConfirmBox(true)
																			setCancelStatusEvent(ride.id)
																			setCancelRideData(
																				RIDE_STATUSES.cancelled
																			)
																		}}
																	>
																		<MDBIcon icon='ban' />
																	</MDBBtn>
																</MDBTooltip>
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
															</>
													  )
													: null}

												{!authReducer.user.isActive &&
													ride.status.toLowerCase() !==
														RIDE_STATUSES.completed && (
														<MDBTooltip
															tag='a'
															title={'You are currently inactive'}
														>
															<MDBIcon
																className='ms-3'
																icon='exclamation-triangle'
																size='lg'
																color='warning'
															/>
														</MDBTooltip>
													)}
											</td>
										) : (
											<td></td>
										)}
									</tr>
								))
							)}
						</MDBTableBody>
						<tfoot>
							<tr>
								<td colSpan={8}>
									<MDBRow>
										<MDBCol className='d-flex justify-content-end align-items-end p-1'>
											<ReactPaginate
												breakLabel='...'
												nextLabel='next >'
												onPageChange={handlePageChange}
												pageRangeDisplayed={5}
												pageCount={Math.ceil(
													rideReducer.totalRides / perPageItems
												)}
												previousLabel='< previous'
												// renderOnZeroPageCount={3}
												// forcePage={perPageItems && 0}
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

						{showCancelConfirmBox && (
							<DeleteModal
								title={'Cancel Ride'}
								show={showCancelConfirmBox}
								message={'Are you sure you want to cancel this ride?'}
								onDelete={handleCancelRide}
								statusEvent={cancelStatusEvent}
								deleteData={cancelRideData}
								handleOnClose={() => setShowCancelConfirmBox(false)}
								setShow={() =>
									setShowCancelConfirmBox(!showCancelConfirmBox)
								}
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

						{showRideCompleteModal && (
							<DeleteModal
								show={showRideCompleteModal}
								icon={'car-side'}
								title={'Mark as Complete'}
								message={
									'Are you sure you want to mark this ride as completed?'
								}
								message2={'Note: This action cannot be undone.'}
								onDelete={handleChangeRideStatus}
								statusEvent={rideStatusEvent}
								deleteData={rideCompleteId}
								handleOnClose={() => setShowRideCompleteModal(false)}
								setShow={() =>
									setShowRideCompleteModal(!showRideCompleteModal)
								}
							/>
						)}
					</MDBTable>
				</div>
			</section>
		</MDBContainer>
	)
}

export default Listings
