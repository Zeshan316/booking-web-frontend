import React from 'react'
import {
	MDBContainer,
	MDBNavbar,
	MDBNavbarBrand,
	MDBBtn,
} from 'mdb-react-ui-kit'
import { useSelector } from 'react-redux'
import logo from '../../assets/bus.png'
import { RootState } from '../../../src/store'
import { clearUserData } from '../../store/reducers/auth-reducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = (): JSX.Element => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const authData = useSelector((state: RootState) => state.auth)

	function handleLogout() {
		dispatch(clearUserData())
		navigate('/login')
	}

	return (
		<>
			<MDBNavbar light className='px-3'>
				<MDBContainer fluid>
					<MDBNavbarBrand className='fs-4 fw-normal'>
						<img src={logo} height='50' alt='brand' loading='lazy' />
						DNA Cab Service
					</MDBNavbarBrand>

					<MDBBtn
						color='info'
						type='button'
						className='fw-bold fs-6  text-capitalize'
						onClick={handleLogout}
					>
						Logout
					</MDBBtn>
				</MDBContainer>
			</MDBNavbar>
		</>
	)
}

export default Header
