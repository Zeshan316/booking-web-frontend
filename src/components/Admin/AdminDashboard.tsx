import React, { useState } from 'react'
import { MDBCol, MDBRow } from 'mdb-react-ui-kit'
import Layout from 'src/components/Layout/Layout'
import Listings from '../User/Listings'
import Search from 'src/components/Toolbar/Search'
import CreateUser from '../User/CreateUser'
import UserService from '../../services/UserService'
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from '../../store/reducers/users-reducer'
import {
	LISTING_ORDER,
	INITIAL_PAGE_OFFSET,
	ITEMS_PER_PAGE,
	USER_ROLES,
} from '../../common/constants'
import { RootState } from '../../store'
import NotFound from 'src/components/NotFound/NotFound'
import LoadingBar from 'react-top-loading-bar'

const initialTableFilters: GenericObject = {
	order: LISTING_ORDER,
	from: INITIAL_PAGE_OFFSET,
	to: ITEMS_PER_PAGE,
}

export default function UserDashboard(): JSX.Element {
	const dispatch = useDispatch()

	const authData = useSelector((state: RootState) => state.auth)

	const [itemsPerPage, setItemsPerPage] =
		useState<number>(ITEMS_PER_PAGE)
	const [selectedOptionValue, setSelectedOptionValue] =
		useState<string>('')
	const [options, setOptions] = useState<GenericObject[]>([
		{
			filterVal: 'firstName',
			readableValue: 'First Name',
		},
		{
			filterVal: 'lastName',
			readableValue: 'Last Name',
		},
		{
			filterVal: 'email',
			readableValue: 'Email',
		},
		{
			filterVal: 'phoneNumber',
			readableValue: 'Phone Number',
		},
	])
	const [searchValue, setSearchValue] = useState<string>('')
	const [tableFilters, setTableFilters] = useState<GenericObject>(
		initialTableFilters
	)
	const [selecetedFilterOption, setSelecetedFilterOption] =
		useState<GenericObject>({
			optionValue: '',
			optionName: '',
		})
	const [showUserFormModel, setShowUserFormModel] =
		useState<boolean>(false)
	const [formType, setFormType] = useState<string>('create')
	const [showLoader, setShowLoader] = useState<boolean>(false)

	async function getUsers() {
		setShowLoader(true)
		const data = await UserService.getUsers(tableFilters)
		dispatch(setUsers(data))
	}

	React.useEffect(() => {
		getUsers()
	}, [tableFilters.to])

	React.useEffect(() => {
		if (!searchValue) getUsers()
	}, [searchValue])

	const userRole = authData.user.role.name?.toLowerCase()
	const adminRole = USER_ROLES.Admin.toLowerCase()
	const sysAdminRole = USER_ROLES.SysAdmin.toLowerCase()
	if (![adminRole, sysAdminRole].includes(userRole)) {
		return <NotFound />
	}

	function handleOption(event: React.ChangeEvent<any>) {
		const option: any = options.find(
			(option) => option.filterVal === event.target.value
		)

		if (!option) return

		setSelecetedFilterOption({
			optionValue: option.filterVal,
			optionName: option.readableValue,
		})

		setSelectedOptionValue(event.target.value)
		setTableFilters({
			...initialTableFilters,
			[selectedOptionValue]: searchValue,
		})
	}

	function handleSearchField(
		event: React.ChangeEvent<HTMLInputElement>
	) {
		event.preventDefault()
		setSearchValue(event.target.value)
		setTableFilters({
			...initialTableFilters,
			[selectedOptionValue]: event.target.value,
		})

		if (!event.target.value.length) {
			setSelecetedFilterOption({
				optionName: '',
				optionValue: '',
			})
			setTableFilters({ ...initialTableFilters })
		}
	}

	async function handleSearchClick() {
		if (!searchValue || !selectedOptionValue) return

		await getUsers()
	}

	function handleItemsPerPage(event: React.ChangeEvent<any>): void {
		setItemsPerPage(event.target.value)
		setTableFilters({ ...tableFilters, to: event.target.value })
		return
	}

	function handleUserFormModel(showHideModel: boolean) {
		setShowUserFormModel(showHideModel)
	}

	function handleFormType(type: string, userId?: string) {
		setFormType(type)
	}

	async function handleDeleteUser(userId: string) {
		await UserService.deleteUser(userId)
		getUsers()
	}

	async function handleUserStatus(userId: string) {
		await UserService.updateUserStatus(userId)
		getUsers()
	}

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

			{userRole === sysAdminRole ? (
				<></>
			) : (
				<MDBRow className='mt-5 px-3 py-2 text-start bg-light d-flex justify-content-start flex-1 '>
					<MDBCol className=''>
						<CreateUser
							getUsers={getUsers}
							showUserModel={showUserFormModel}
							handleUserFormModel={handleUserFormModel}
							formType={formType}
							handleFormType={handleFormType}
						/>
					</MDBCol>
				</MDBRow>
			)}
			<Search
				handleSearchClick={handleSearchClick}
				handleOption={handleOption}
				options={options}
				searchValue={searchValue}
				handleSearchField={handleSearchField}
				handleItemsPerPage={handleItemsPerPage}
				selecetedFilterOption={selecetedFilterOption}
			/>
			<Listings
				perPageItems={itemsPerPage}
				handleFormType={handleFormType}
				handleUserFormModel={handleUserFormModel}
				handleDeleteUser={handleDeleteUser}
				handleUserStatus={handleUserStatus}
			/>
		</Layout>
	)
}
