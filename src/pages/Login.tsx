import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MDBBtn, MDBIcon, MDBRow, MDBCol } from 'mdb-react-ui-kit'
import img from '../assests/shuttle-bus.png'
import './Login.css'

function Login(): JSX.Element {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const navigate = useNavigate()

	const handleEmailChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setEmail(event.target.value)
	}

	const handlePasswordChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setPassword(event.target.value)
	}

	const handleShowPassword = () => {
		setShowPassword(!showPassword)
	}

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault()
		console.log(email)
		navigate('/home')
	}

	return (
		<div className='col-12 overflow-hidden'>
			<MDBRow>
				<MDBCol className='signup-left-image-container bg-image col-lg-5 col-md-5 d-sm-none d-md-block'>
					<div className='hero-text text-center d-flex justify-content-center text-white h2'>
						<img
							src={img}
							object-fit='contain'
							className='img-fluid'
							alt='...'
						/>
						DNA-Cab Service <br />
						<div className='hero-text-span h6'>
							Let us help you move!
						</div>
						<div className='text-center h6 position-absolute bottom-0'>
							<span>Powered by</span>{' '}
							<b>DNA Micro Inc.</b>
						</div>
					</div>
				</MDBCol>
				<MDBCol className='col-lg-7 col-md-7 justify-content-center main-right-container'>
					<div className='signup-right-container m-auto mt-5'>
						<div>
							<img src={img} alt={"..logo"}/>
							<div style={{ marginTop: '1.5vh' }} className='mt-4'>
								<div className='greeting-text'>Welcome</div>
								{
									<span className='greeting-text-span'>
										Ready to get started?
									</span>
								}
							</div>
						</div>

						<form
							onSubmit={handleSubmit}
							id='form'
							className='signup-form col-lg-9 col-md-9 m-auto text-align-start'
						>
							<label className='label p-2'>Email</label>

							<div className='group'>
								<MDBIcon far icon='envelope' className='input-icon' />
								<input
									type={'email'}
									className='form-inputs'
									value={email}
									placeholder='Enter Email'
									onChange={handleEmailChange}
								/>
							</div>

							<label className='label mt-4 p-2'>Password</label>
							<div className='group'>
								<MDBIcon fas icon='lock' className='input-icon' />
								<input
									type={showPassword ? 'text' : 'password'}
									className='form-inputs'
									value={password}
									placeholder='*********'
									onChange={handlePasswordChange}
								/>
								{showPassword ? (
									<MDBIcon
										className='eye-icon'
										far
										icon='eye'
										onClick={handleShowPassword}
									/>
								) : (
									<MDBIcon
										className='eye-icon'
										far
										icon='eye-slash'
										onClick={handleShowPassword}
									/>
								)}
							</div>

							<MDBBtn
								rounded
								color='info'
								type='submit'
								form='form'
								className='mb-3 signup-btn'
								block
								onClick={handleSubmit}
							>
								Login
							</MDBBtn>
						</form>
					</div>
				</MDBCol>
			</MDBRow>
		</div>
	)
}

export default Login
