import { MDBIcon, MDBCol, MDBRow } from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import './NotFound.css'

function NotFound(): JSX.Element {
	const navigate = useNavigate()
	return (
		<div>
			<div className='container_ '>
				<div className='align-self-start d-flex '>
					<MDBIcon
						icon='arrow-left'
						size='3x'
						className='go_back'
						onClick={() => navigate(-1)}
					/>
					<span className='fs-3 ms-4 fw-bold mt-3 align-start'>
						Go Back
					</span>
				</div>
				<div className='d-flex flex-column align-items-center align-items-start'>
					<p className='heading'> Page Not Found</p>
					<p className='text'>4</p>
					<i className=' text far fa-question-circle fa-spin'></i>
					<h1 className=' text mt-5 '>4</h1>
					<p className='fs-5'>
						Sorry, the page you are looking for does not exist.
					</p>
				</div>
			</div>
		</div>
	)
}

export default NotFound
