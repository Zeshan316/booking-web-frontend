import React, { useState, useEffect } from 'react'
import {
	MDBRow,
	MDBCol,
	MDBModalBody,
	MDBModalFooter,
	MDBBtn,
} from 'mdb-react-ui-kit'
import dayjs from 'dayjs'
import './UserDetails.css'
import ModalButton from '../Toolbar/ModalButton'
import UserService from '../../services/UserService'
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetail } from '../../store/reducers/users-reducer'
import { RootState } from '../../store'

interface ModalProps {
	show: boolean
	setShow: () => void
	userId: string
}

function UserDetails({
	show,
	setShow,
	userId,
}: ModalProps): JSX.Element {
	const dispatch = useDispatch()
	const userDetail = useSelector(
		(state: RootState) => state.user.user
	)

	async function getUserDetail(userId: string) {
		const userDetail = await UserService.getUser(userId)
		dispatch(setUserDetail(userDetail))
	}

	useEffect(() => {
		if (userId) getUserDetail(userId)
	}, [userId])

	return (
		<ModalButton
			isOpen={show}
			handleOpenModal={setShow}
			modalTitle='User Detail'
			iconname={'bus'}
			modalBody={
				<MDBModalBody className='px-4 mx-3 mt-1'>
					<MDBCol>
						<MDBRow className='mb-4'>
							<MDBCol>
								<h5 className='fw-bold'>First Name</h5>
								<p className='text-style'>{userDetail.firstName}</p>
							</MDBCol>

							<MDBCol>
								<h5 className='fw-bold'>Last Name</h5>
								<p className='text-style'>
									{userDetail.lastName || 'N/A'}
								</p>
							</MDBCol>
						</MDBRow>

						<MDBRow className='mb-4'>
							<MDBCol>
								<h5 className='fw-bold'>Email</h5>
								<p className='text-style'>{userDetail.email}</p>
							</MDBCol>

							<MDBCol>
								<h5 className='fw-bold'>Creation Date</h5>
								<p className='text-style'>
									{dayjs(userDetail.createdAt).format('YYYY-MM-DD') ||
										'N/A'}
								</p>
							</MDBCol>
						</MDBRow>

						<MDBRow className='mb-4'>
							<MDBCol>
								<h5 className='fw-bold'>Role</h5>
								<p className='text-style'>North</p>
							</MDBCol>
							<MDBCol>
								<h5 className='fw-bold'>Status</h5>
								<p className='text-style'>Completed</p>
							</MDBCol>
						</MDBRow>
					</MDBCol>

					<MDBModalFooter>
						<MDBBtn
							color='info'
							className=' fw-bold'
							onClick={setShow}
						>
							OK
						</MDBBtn>
					</MDBModalFooter>
				</MDBModalBody>
			}
		></ModalButton>
	)
}

export default UserDetails
