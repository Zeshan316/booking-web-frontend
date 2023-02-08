import React, { useState } from 'react'
import {
	MDBContainer,
	MDBTable,
	MDBTableHead,
	MDBTableBody,
	MDBBtn,
	MDBIcon,
	MDBTooltip,
} from 'mdb-react-ui-kit'

import ReactPaginate from 'react-paginate'

import { RootState } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { setUsers } from '../../store/reducers/users-reducer'
import {
	INITIAL_PAGE_OFFSET,
	ITEMS_PER_PAGE,
	LISTING_ORDER,
} from '../../common/constants'
import UserDetails from './UserDetails'
import RideDetails from '../TabularView/RideDetails'

import UserService from '../../services/UserService'

function UserTable(): JSX.Element {
	const [pageOffset, setPageOffset] = useState<number>(0)
	const [tableFilters, setTableFilters] = useState<GenericObject>({
		order: LISTING_ORDER,
		from: pageOffset,
		to: ITEMS_PER_PAGE,
	})
	// const [isAscending, setIsAscending] = useState<boolean>(true)
	const [showUserDetail, setShowUserDetail] = useState<boolean>(false)
	// const [edit, setEdit] = useState<boolean>(false)

	const userReducer = useSelector((state: RootState) => state.user)

	const dispatch = useDispatch()

	async function getUsers() {
		const data = await UserService.getUsers(tableFilters)
		dispatch(setUsers(data))
	}

	React.useEffect(() => {
		getUsers()
	}, [pageOffset])

	function handlePageChange({
		selected,
	}: {
		selected: number
	}): void {
		setPageOffset(selected)
		setTableFilters({
			...tableFilters,
			from: selected * ITEMS_PER_PAGE,
		})
	}

	return (
		<MDBContainer fluid>
			<section>
				<div className='shadow-4 rounded-4 overflow-hidden bg-light '>
					<MDBTable hover>
						<MDBTableHead className='bg-info'>
							<tr>
								<th className='fw-bold text-white h6'>
									<MDBIcon
										// icon={isAscending ? 'sort-up' : 'sort-down'}
										// onClick={() => setIsAscending(!isAscending)}
										className='sort-icon me-2'
									/>
									Last Name
								</th>
								<th className='fw-bold text-white h6'>
									<MDBIcon
										// icon={isAscending ? 'sort-up' : 'sort-down'}
										// onClick={() => setIsAscending(!isAscending)}
										className='sort-icon me-2'
									/>
									First Name
								</th>
								<th className='fw-bold text-white h6'>
									<MDBIcon
										// icon={isAscending ? 'sort-up' : 'sort-down'}
										// onClick={() => setIsAscending(!isAscending)}
										className='sort-icon me-2'
									/>
									Email
								</th>
								<th className='fw-bold text-white h6'>Status</th>
								<th className='fw-bold text-white h6'>
									<MDBIcon
										// icon={isAscending ? 'sort-up' : 'sort-down'}
										// onClick={() => setIsAscending(!isAscending)}
										className='sort-icon me-2'
									/>
									Phone #
								</th>
								<th className='fw-bold text-white h6'>
									<MDBIcon
										// icon={isAscending ? 'sort-up' : 'sort-down'}
										// onClick={() => setIsAscending(!isAscending)}
										className='sort-icon me-2'
									/>
									Role
								</th>
								<th className='fw-bold text-white h6'>Actions</th>
							</tr>
						</MDBTableHead>
						<MDBTableBody
							style={{
								verticalAlign: 'middle',
							}}
						>
							{userReducer.users.length === 0 ? (
								<tr className='items'>
									<td colSpan={7}>There are no user to show...</td>
								</tr>
							) : (
								userReducer.users.map((user: User, index: any) => (
									<tr
										key={user?.id}
										className='items'
										onClick={() => setShowUserDetail(!showUserDetail)}
									>
										<td>
											<div className='d-flex align-items-center'>
												<img
													src='https://mdbcdn.b-cdn.net/img/new/avatars/2.webp'
													alt=''
													style={{ width: '45px', height: '45px' }}
													className='rounded-circle'
												/>
												<div className='ms-3'>
													<p className='fw-bold mb-1'>
														{user?.lastName || 'N/A'}
													</p>
												</div>
											</div>
										</td>
										<td>
											<p className=' mb-1'>{user?.firstName}</p>
										</td>
										<td>
											<p className='mb-0'>{user?.email}</p>
										</td>
										<td>
											<p className='mb-1'>{user?.isActive}</p>
										</td>
										<td>
											<p className='mb-1'>
												{user?.phoneNumber || 'N/A'}
											</p>
										</td>
										<td>
											<p className='mb-1'>{user?.role?.name}</p>
										</td>
										<td>
											<MDBBtn
												key={index}
												className='fs-6 p-2'
												color='light'
												size='sm'
												rippleColor='dark'
											>
												<MDBTooltip tag='a' title={'Edit'}>
													<span
														key={index}
														// onClick={() => setEdit(true)}
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
												<MDBTooltip tag='a' title={'Edit'}>
													<span
														key={index}
														// onClick={() => setEdit(true)}
													>
														<MDBIcon icon='trash' />
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
												<MDBTooltip tag='a' title='Unlock'>
													<MDBIcon icon='lock' color='muted' />
												</MDBTooltip>
											</MDBBtn>
										</td>
									</tr>
								))
							)}
						</MDBTableBody>
						<tfoot>
							<tr>
								<td colSpan={8}>
									<ReactPaginate
										breakLabel='...'
										nextLabel='next >'
										onPageChange={handlePageChange}
										pageRangeDisplayed={5}
										pageCount={userReducer.totalUsers}
										previousLabel='< previous'
										// renderOnZeroPageCount={3}
									/>
								</td>
							</tr>
						</tfoot>
						{showUserDetail && (
							<UserDetails
								show={true}
								setShow={() => setShowUserDetail(!showUserDetail)}
							/>
						)}
					</MDBTable>
				</div>
			</section>
		</MDBContainer>
	)
}

export default UserTable
