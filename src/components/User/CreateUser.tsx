import React, { useRef, useState, useEffect } from 'react'
import {
	MDBBtn,
	MDBModalBody,
	MDBModalFooter,
	MDBTooltip,
} from 'mdb-react-ui-kit'
import { useForm } from 'react-hook-form'
import ModalButton from '../Toolbar/ModalButton'
import '../Toolbar/CreateRide.css'
import UserService from '../../services/UserService'
import RoleService from '../../services/RoleService'
import { useDispatch } from 'react-redux'
import { setUsers } from '../../store/reducers/users-reducer'

export default function CreateUser(): JSX.Element {
	const dispatch = useDispatch()
	const [roles, setRoles] = useState<any[]>([])
	const [isOpen, setIsOpen] = useState(false)
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<UserFormProps>()

	const password = useRef({})
	password.current = watch('password', '')

	const handleOnClose = () => {
		setIsOpen(false)
		reset({})
	}

	async function getUsers() {
		const data = await UserService.getUsers()
		dispatch(setUsers(data))
	}

	const getRoles = async () => {
		const rolesData = await RoleService.getRoles()
		setRoles(rolesData.roles)
	}

	useEffect(() => {
		getRoles()
	}, [])

	const onSubmit = async (data: UserFormProps) => {
		await UserService.createUser(data)
		getUsers()
		handleOnClose()
	}
	return (
		<>
			<ModalButton
				isOpen={isOpen}
				handleOpenModal={() => {
					setIsOpen(!isOpen)
					console.log(isOpen)
				}}
				modalTitle='Create Uer'
				iconname={'bus'}
				handleOnClose={handleOnClose}
				modalBody={
					<MDBModalBody className='mx-3'>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='form-group'>
								<label className='fw-bold py-1 d-block'>
									First Name
									<span className='text-danger'>*</span>
								</label>
								<input
									placeholder='First Name'
									type='text'
									className='form-control mb-2'
									{...register('firstName', {
										required: true,
										maxLength: 50,
									})}
								/>

								{errors.firstName && (
									<span className='error_msg'>
										Please enter user's first Name
									</span>
								)}

								<label className='fw-bold py-1 d-block'>
									Last Name
								</label>
								<input
									placeholder='Last Name'
									type='text'
									className='form-control mb-2'
									{...register('lastName', {
										required: false,
										maxLength: 50,
									})}
								/>

								{errors.lastName && (
									<span className='error_msg'>
										Please enter user's last name
									</span>
								)}

								<label className='fw-bold py-1 d-block'>
									Email
									<span className='text-danger'>*</span>
								</label>
								<MDBTooltip
									placement='right'
									tag='span'
									title='Email must be in the format of one or more characters followed by @ followed by one or more characters followed by . followed by one or more characters'
								>
									<input
										placeholder='Email'
										type='email'
										className='form-control mb-2'
										{...register('email', {
											required: true,
											pattern:
												/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
										})}
									/>
								</MDBTooltip>

								{errors.email && (
									<span className='error_msg'>
										Please enter user's email
									</span>
								)}

								<label className='fw-bold py-1 d-block'>
									Password
									<span className='text-danger'>*</span>
								</label>
								<MDBTooltip
									placement='right'
									tag='span'
									title='Password must be 6-15 characters long, contain at least one numeric digit, one uppercase and one lowercase letter'
								>
									<input
										placeholder='Password'
										type='password'
										className='form-control mb-2'
										{...register('password', {
											required: true,
											// pattern:
											// 	/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
										})}
									/>
									<small>
										Password must be 6-15 characters long, contain at
										least one numeric digit, one uppercase and one
										lowercase letter
									</small>
								</MDBTooltip>

								{errors.password && (
									<span className='error_msg'>
										Please set user's password
									</span>
								)}

								<label className='fw-bold py-1 d-block'>
									Retype Password
								</label>
								<input
									type='password'
									className='form-control mb-2'
									placeholder='Retype password'
									{...register('repeatPassword', {
										validate: (value) =>
											value === password.current ||
											'The passwords do not match',
									})}
								/>
								{errors.repeatPassword && (
									<span className='error_msg'>
										{errors.repeatPassword.message}
									</span>
								)}

								<label className='fw-bold py-1 d-block'> Role</label>
								<select
									className='form-select mb-2'
									{...register('role')}
								>
									<option defaultValue=''>Select Role</option>
									{roles.map((role) => {
										return (
											<option
												selected={role?.name.toLowerCase() === 'user'}
												value={role?.id}
											>
												{role?.name}
											</option>
										)
									})}
								</select>
							</div>

							<MDBModalFooter>
								<MDBBtn
									color='secondary'
									className='button_style px-4 border-0'
									type='button'
									onClick={() => setIsOpen(false)}
								>
									Close
								</MDBBtn>
								<MDBBtn
									color='info'
									className='button_style px-4'
									type='submit'
									// onClick={handleSubmit(onSubmit)}
								>
									Save
								</MDBBtn>
							</MDBModalFooter>
						</form>
					</MDBModalBody>
				}
			>
				Create User
			</ModalButton>
		</>
	)
}
