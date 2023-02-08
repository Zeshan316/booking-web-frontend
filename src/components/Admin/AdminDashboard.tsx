import React, { useState } from 'react'
import { MDBCol, MDBRow } from 'mdb-react-ui-kit'
import Layout from 'src/components/Layout/Layout'
import UserTable from '../User/UserTable'
import Search from 'src/components/Toolbar/Search'
import CreateUser from '../User/CreateUser'
import UserService from '../../services/UserService'
import { useDispatch } from 'react-redux'
import { setUsers } from '../../store/reducers/users-reducer'
import {
	LISTING_ORDER,
	INITIAL_PAGE_OFFSET,
	ITEMS_PER_PAGE,
} from '../../common/constants'

const initialTableFilters: GenericObject = {
	order: LISTING_ORDER,
	from: INITIAL_PAGE_OFFSET,
	to: ITEMS_PER_PAGE,
}

export default function UserDashboard(): JSX.Element {
	const dispatch = useDispatch()

	const [itemsPerPage, setItemsPerPage] =
		useState<number>(ITEMS_PER_PAGE)
	const [selectedOptionValue, setSelectedOptionValue] =
		useState<string>('')
	const [options, setOptions] = useState<string[]>([
		'firstName',
		'email',
	])
	const [searchValue, setSearchValue] = useState<string>('')
	const [tableFilters, setTableFilters] = useState<GenericObject>(
		initialTableFilters
	)
	const [showUserFormModel, setShowUserFormModel] =
		useState<boolean>(false)
	const [formType, setFormType] = useState<string>('create')
	// const [updateUserId, setUpdateUserId] = useState<string>('')

	async function getUsers() {
		const data = await UserService.getUsers(tableFilters)
		dispatch(setUsers(data))
	}

	React.useEffect(() => {
		getUsers()
	}, [tableFilters.to])

	React.useEffect(() => {
		if (!searchValue) getUsers()
	}, [searchValue])

	function handleOption(event: React.ChangeEvent<any>) {
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
			...tableFilters,
			[selectedOptionValue]: searchValue,
		})

		if (!event.target.value.length)
			setTableFilters({ ...initialTableFilters })
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
		// if (userId) setUpdateUserId(userId)
	}

	return (
		<Layout>
			<MDBRow className='mt-5 px-3 py-2 text-start bg-light d-flex justify-content-start flex-1 '>
				<MDBCol className=''>
					<CreateUser
						getUsers={getUsers}
						showUserModel={showUserFormModel}
						showModel={false}
						handleUserFormModel={handleUserFormModel}
						formType={formType}
						handleFormType={handleFormType}
					/>
				</MDBCol>
			</MDBRow>
			<Search
				handleSearchClick={handleSearchClick}
				handleOption={handleOption}
				options={options}
				searchValue={searchValue}
				handleSearchField={handleSearchField}
				handleItemsPerPage={handleItemsPerPage}
			/>
			<UserTable
				perPageItems={itemsPerPage}
				handleFormType={handleFormType}
				handleUserFormModel={handleUserFormModel}
				// setUpdateUserId={setUpdateUserId}
			/>
		</Layout>
	)
}
