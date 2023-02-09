import React, { useState, useEffect } from 'react'
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardBody,
	MDBInput,
	MDBBtn,
	MDBIcon,
	MDBTooltip,
} from 'mdb-react-ui-kit'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { SERVER_BASE_URL } from '../../common/constants'
import UserService from '../../services/UserService'
import AuthService from '../../services/AuthService'
import { setUserData } from '../../store/reducers/auth-reducer'
import { useDispatch } from 'react-redux'

const ProfilePage: React.FC = () => {
	const dispatch = useDispatch()
	const [isEditing, setIsEditing] = useState(false)
	const [profileData, setProfileData] =
		useState<React.SetStateAction<any>>()

	const profile = useSelector((state: RootState) => {
		return state.auth?.user
	})

	console.log('profile', profile)

	useEffect(() => {
		if (profile) {
			setProfileData({
				firstName: profile.firstName,
				lastName: profile.lastName,
				email: profile.email,
				phoneNumber: profile.phoneNumber,
				oldPassword: '',
				newPassword: '',
				roleId: profile.role.id as string,
			})
		}
	}, [profile])

	const handleEdit = () => {
		setIsEditing(true)
	}

	const handleSave = async () => {
		setIsEditing(false)

		console.log('data', profileData)
		await UserService.updateUser(profile.id as string, profileData)
		const userData = await AuthService.getCurrentUser()
		dispatch(setUserData(userData))
	}

	return (
		<MDBContainer className='mt-4 w-50'>
			<MDBCard className='card'>
				<MDBCardBody className='card-body p-4 p-md-5'>
					<MDBRow>
						<MDBCol>
							<h4 className='fw-normal fs-3 mb-2 mt-3 pb-2'>
								Profile Details
							</h4>
						</MDBCol>
						<MDBCol className='float-end'>
							{!isEditing ? (
								<MDBBtn
									className='float-end align-start p-2'
									color='light'
									onClick={handleEdit}
								>
									<MDBTooltip tag='a' title='Edit Profile'>
										<MDBIcon
											icon='edit'
											className='float-end fs-2 fw-normal'
										></MDBIcon>
									</MDBTooltip>
								</MDBBtn>
							) : null}
						</MDBCol>
					</MDBRow>
					<img
						src={
							profile?.profileImgUrl
								? `${SERVER_BASE_URL}${profile.profileImgUrl}`
								: 'https://mdbootstrap.com/img/new/avatars/8.jpg'
						}
						alt=''
						crossOrigin='anonymous'
						className='rounded-circle align img-fluid w-25 mx-auto d-block'
					/>
					<form className='col-lg-9 col-md-9 m-auto text-align-start'>
						<label className='fw-bold'>First Name</label>
						<div className='mb-3'>
							<input
								type='text'
								disabled={!isEditing}
								className='form-control mb-2'
								value={profileData?.firstName}
								onChange={(event) =>
									setProfileData({
										...profileData,
										firstName: event.target.value,
									})
								}
							/>
						</div>

						<label className='fw-bold'>Last Name</label>
						<div className='mb-3'>
							<input
								type='text'
								disabled={!isEditing}
								className='form-control mb-2'
								value={profileData?.lastName}
								onChange={(event) =>
									setProfileData({
										...profileData,
										lastName: event.target.value,
									})
								}
							/>
						</div>

						<label className='fw-bold'>Role</label>
						<div className='mb-3'>
							<input
								type='text'
								disabled={!isEditing}
								className='form-control mb-2'
								readOnly
								value={profile.role.name}
							/>
						</div>

						<label className='fw-bold'>Email</label>
						<div className='mb-3'>
							<input
								type='text'
								disabled={!isEditing}
								className='form-control mb-2'
								value={profileData?.email}
								readOnly
							/>
						</div>

						<label className='fw-bold'>Phone no.</label>
						<div className='mb-3'>
							<input
								type='text'
								disabled={!isEditing}
								className='form-control mb-2'
								value={profileData?.phoneNumber}
								onChange={(event) =>
									setProfileData({
										...profileData,
										phoneNumber: event.target.value,
									})
								}
							/>
						</div>
						<label className='fw-bold'>Old Password</label>
						<div className='mb-3'>
							<input
								type='password'
								disabled={!isEditing}
								className='form-control mb-2'
								// value={}
								onChange={(event) =>
									setProfileData({
										...profileData,
										oldPassword: event.target.value,
									})
								}
							/>
						</div>
						<label className='fw-bold'>New Password</label>
						<div className='mb-3'>
							<input
								type='text'
								disabled={!isEditing}
								className='form-control mb-2'
								// value={profileData?.phoneNo}
								onChange={(event) =>
									setProfileData({
										...profileData,
										newPassword: event.target.value,
									})
								}
							/>
						</div>

						<label className='fw-bold'>Profile </label>
						<MDBInput
							type={'file'}
							className='mb-3'
							label=''
							disabled={!isEditing}
							onChange={(
								event: React.ChangeEvent<HTMLInputElement>
							) =>
								setProfileData({
									...profileData,
									profileImg: (event.target.files as FileList)[0],
								})
							}
						/>

						<MDBRow className='mt-3 mb-3 text-end'>
							<MDBCol>
								{isEditing ? (
									<MDBBtn
										color='info'
										className='float-end text-capitalize mt-3 fw-bold fs-6'
										type='button'
										onClick={handleSave}
									>
										Save
									</MDBBtn>
								) : (
									<MDBCol className='mb-5'></MDBCol>
								)}
							</MDBCol>
						</MDBRow>
					</form>
				</MDBCardBody>
			</MDBCard>
		</MDBContainer>
	)
}

export default ProfilePage
