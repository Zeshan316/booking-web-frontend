import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MDBInputGroup } from 'mdb-react-ui-kit'

import Layout from '../Layout/Layout'
import Listings from './Listings'
import RoleService from '../../services/RoleService'
import NotFound from 'src/components/NotFound/NotFound'
import {
	LISTING_ORDER,
	INITIAL_PAGE_OFFSET,
	ITEMS_PER_PAGE,
	USER_ROLES,
} from '../../common/constants'
import { setRoles } from '../../store/reducers/roles-reducer'
import { RootState } from '../../store'
import LoadingBar from 'react-top-loading-bar'

const initialTableFilters: GenericObject = {
	order: LISTING_ORDER,
	from: INITIAL_PAGE_OFFSET,
	to: ITEMS_PER_PAGE,
}

export default function Rides(): JSX.Element {
	const dispatch = useDispatch()

	const [tableFilters, setTableFilters] = useState<GenericObject>(
		initialTableFilters
	)
	const [showLoader, setShowLoader] = useState<boolean>(false)

	async function getRoles() {
		setShowLoader(true)
		const allRoles = await RoleService.getRoles(tableFilters)
		await dispatch(setRoles(allRoles))
	}

	useEffect(() => {
		getRoles()
	}, [])

	const authData = useSelector((state: RootState) => state.auth)

	const userRole = authData.user.role.name?.toLowerCase()
	const adminRole = USER_ROLES.Admin.toLowerCase()
	const sysAdminRole = USER_ROLES.SysAdmin.toLowerCase()
	if (![adminRole, sysAdminRole].includes(userRole)) {
		return <NotFound />
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
			<MDBInputGroup className='mb-3 d-flex justify-content-center mt-3 p-3'>
				<Listings />
			</MDBInputGroup>
		</Layout>
	)
}
