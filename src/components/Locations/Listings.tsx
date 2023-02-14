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

import { RootState } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { setUsers } from '../../store/reducers/users-reducer'
import {
	LISTING_ORDER,
	SERVER_BASE_URL,
	USER_ROLES,
} from '../../common/constants'
// import UserDetails from './LocationDetails'
import LocationService from '../../services/LocationService'
import {
	setLocationDetail,
	setLocations,
} from '../../store/reducers/locations-reducer'
import DeleteModal from '../Toolbar/DeleteModal'
import dayjs from 'dayjs'

interface LocationTableProps {
	perPageItems: number
	handleFormType: (type: string) => void
	handleLocationFormModel: (e: any) => void
	handleDeleteLocation: (e: string) => void
}

function Listings({
	perPageItems,
	handleFormType,
	handleLocationFormModel,
	handleDeleteLocation,
}: LocationTableProps): JSX.Element {
	const dispatch = useDispatch()
	const [pageOffset, setPageOffset] = useState<number>(0)
	const [tableFilters, setTableFilters] = useState<GenericObject>({
		order: LISTING_ORDER,
		from: pageOffset,
		to: perPageItems,
	})
	const [selectedLocationId, setSelectedLocationId] =
		useState<string>('')

	const [showDeleteModal, setShowDeleteModal] =
		useState<boolean>(false)
	const [deleteData, setDeleteData] = useState<string>('')
	// const [showLocationUpdateModel, setShowLocationUpdateModel] =
	// useState<boolean>(false)

	const locationReducer = useSelector(
		(state: RootState) => state.locationReducer
	)
	const authUser = useSelector((state: RootState) => state.auth.user)

	const currentUserRole = authUser.role.name.toLowerCase()
	const adminRole = USER_ROLES.Admin.toLowerCase()
	const sysAdminRole = USER_ROLES.SysAdmin.toLowerCase()

	async function getLocations() {
		const data = await LocationService.getLocations(tableFilters)
		dispatch(setLocations(data))
	}

	async function getLocationDetail(locationId: string) {
		const locationDetail = await LocationService.getLocation(
			locationId
		)
		dispatch(setLocationDetail(locationDetail))
	}

	useEffect(() => {
		if (selectedLocationId) getLocationDetail(selectedLocationId)
	}, [selectedLocationId])

	React.useEffect(() => {
		getLocations()
	}, [pageOffset])

	function handlePageChange({
		selected,
	}: {
		selected: number
	}): void {
		setTableFilters({
			...tableFilters,
			from: selected * perPageItems,
			to: perPageItems,
		})

		setPageOffset(selected)
	}

	function handleLocationEdit(locationId: string | undefined) {
		if (!locationId) return

		setSelectedLocationId(locationId)
		handleFormType('update')
		handleLocationFormModel(true)
	}

	return (
		<MDBContainer fluid>
			<section>
				<div className='shadow-4 mb-5 rounded-4 overflow-hidden bg-light'>
					<MDBTable hover>
						<MDBTableHead className='bg-info'>
							<tr>
								<th className='fw-bold text-white h6'>
									<MDBIcon className='sort-icon me-2' />
									Direction
								</th>
								<th className='fw-bold text-white h6'>
									<MDBIcon className='sort-icon me-2' />
									Location
								</th>
								<th className='fw-bold text-white h6'>
									<MDBIcon className='sort-icon me-2' />
									Created On
								</th>
								<th className='fw-bold text-white h6'>Actions</th>
							</tr>
						</MDBTableHead>
						<MDBTableBody
							style={{
								verticalAlign: 'middle',
							}}
						>
							{locationReducer.locations.length === 0 ? (
								<tr className='items'>
									<td colSpan={4}>
										There are no location/s to show...
									</td>
								</tr>
							) : (
								locationReducer.locations.map(
									(location: Pickup | Destination, index: any) => (
										<tr key={location?.id} className='items'>
											<td>
												<div className='d-flex align-items-center'>
													<div className='ms-3'>
														<p className='fw-bold mb-1'>
															{location.direction || 'N/A'}
														</p>
													</div>
												</div>
											</td>
											<td>
												<p className=' mb-1'>
													{location.locationName}
												</p>
											</td>
											<td>
												<p className='mb-0'>
													{dayjs(location.createdAt).format(
														'D MMM, YYYY'
													)}
												</p>
											</td>
											{authUser.role.name.toLowerCase() ===
											sysAdminRole ? (
												<td></td>
											) : (
												<td>
													{currentUserRole == adminRole && (
														<div>
															<MDBBtn
																key={location?.id}
																className='fs-6 p-2'
																color='light'
																size='sm'
																rippleColor='dark'
																onClick={async () => {
																	handleLocationEdit(location.id)
																}}
															>
																<MDBTooltip tag='a' title={'Edit'}>
																	<MDBIcon icon='edit' />
																</MDBTooltip>
															</MDBBtn>

															<MDBBtn
																key={location.id}
																className='fs-6 p-2'
																color='light'
																size='sm'
																rippleColor='dark'
																onClick={() => {
																	setShowDeleteModal(true)
																	setDeleteData(location.id as string)
																}}
															>
																<MDBTooltip tag='a' title={'Delete'}>
																	<MDBIcon icon='trash' />
																</MDBTooltip>
															</MDBBtn>
														</div>
													)}
												</td>
											)}
										</tr>
									)
								)
							)}
						</MDBTableBody>
						<tfoot>
							<tr>
								<td colSpan={4}>
									<MDBRow>
										<MDBCol className='d-flex justify-content-end align-items-end p-1 '>
											<ReactPaginate
												breakLabel='...'
												nextLabel='next >'
												onPageChange={handlePageChange}
												pageRangeDisplayed={2}
												pageCount={Math.ceil(
													locationReducer.totalLocations /
														perPageItems
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

						{showDeleteModal && (
							<DeleteModal
								message='Are you sure you want to delete this location?'
								show={showDeleteModal}
								onDelete={handleDeleteLocation}
								deleteData={deleteData}
								handleOnClose={() => setShowDeleteModal(false)}
								setShow={() => setShowDeleteModal(!showDeleteModal)}
							/>
						)}
					</MDBTable>
				</div>
			</section>
		</MDBContainer>
	)
}

export default Listings
