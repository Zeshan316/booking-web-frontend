import React, { useState } from 'react'
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
	INITIAL_PAGE_OFFSET,
	ITEMS_PER_PAGE,
	LISTING_ORDER,
} from '../../common/constants'
import UserDetails from './UserDetails'
import UserService from '../../services/UserService'
import CreateUser from '../User/CreateUser'

function UserTable(): JSX.Element {
	const [pageOffset, setPageOffset] = useState<number>(0)
	const [tableFilters, setTableFilters] = useState<GenericObject>({
		order: LISTING_ORDER,
		from: pageOffset,
		to: ITEMS_PER_PAGE,
	})
	// const [isAscending, setIsAscending] = useState<boolean>(true)
	// const [edit, setEdit] = useState<boolean>(false)
	const [selectedUserId, setSelectedUserId] = useState<string>('')
	const [showUserDetail, setShowUserDetail] = useState<boolean>(false)
	const [showUserUpdateModel, setShowUserUpdateModel] =
		useState<boolean>(false)

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

	function handleUserDetail(userId: string | undefined) {
		if (!userId) return

		setShowUserDetail(!showUserDetail)
		setSelectedUserId(userId)
	}

	function handleUserEdit(userId: string | undefined) {
		if (!userId) return

		setShowUserDetail(false)
		setShowUserUpdateModel(true)
		setSelectedUserId(userId)
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
									<tr key={user?.id} className='items'>
										<td
											onClick={() => handleUserDetail(user?.userId)}
										>
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
											<p className='mb-1'>
												{user?.isActive ? (
													<MDBBadge
														light
														color='success'
														pill
														className='status'
													>
														Active
													</MDBBadge>
												) : (
													<MDBBadge
														light
														color='warning'
														pill
														className='status'
													>
														In-Active
													</MDBBadge>
												)}
											</p>
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
												onClick={() => handleUserEdit(user?.userId)}
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
								<td colSpan={7}>
									<MDBRow>
										<MDBCol className='d-flex justify-content-end align-items-end p-1'>
											<ReactPaginate
												breakLabel='...'
												nextLabel='next >'
												onPageChange={handlePageChange}
												pageRangeDisplayed={2}
												pageCount={Math.ceil(
													userReducer.totalUsers / ITEMS_PER_PAGE
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
						{showUserDetail && (
							<UserDetails
								userId={selectedUserId}
								show={showUserDetail}
								setShow={() => setShowUserDetail(!showUserDetail)}
							/>
						)}

						{showUserUpdateModel && <CreateUser />}
					</MDBTable>
				</div>
			</section>
		</MDBContainer>
	)
}

export default UserTable
