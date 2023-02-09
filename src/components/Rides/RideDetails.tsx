import React, { useState } from 'react'
import {
	MDBRow,
	MDBCol,
	MDBModalBody,
	MDBModalFooter,
	MDBBtn,
} from 'mdb-react-ui-kit'
import dayjs from 'dayjs'
import './RideDetails.css'
import ModalButton from '../Toolbar/ModalButton'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'

interface RideDetailProps {
	show: boolean
	setShow: () => void
}

function RideDetails({
	show,
	setShow,
}: RideDetailProps): JSX.Element {
	const [modalShow, setModalShow] = useState(false)

	const rideDetail: Ride = useSelector(
		(state: RootState) => state.ride.ride
	)

	console.log('rideDetail', rideDetail)

	return (
		<>
			<ModalButton
				isOpen={show}
				handleOpenModal={setShow}
				handleOnClose={setShow}
				modalTitle='Ride Details'
				iconname={'bus'}
				modalBody={
					<MDBModalBody className='px-4 mx-3 mt-1'>
						{/* create user form */}
						<MDBCol>
							<MDBRow className='mb-4'>
								<MDBCol>
									<h5 className='fw-bold'>Trip Date</h5>
									<p className='text-style'>
										{dayjs(rideDetail.tripDateTime).format(
											'YYYY-MM-DD'
										)}
									</p>
								</MDBCol>

								<MDBCol>
									<h5 className='fw-bold'>Trip Time</h5>
									<p className='text-style'>
										{dayjs(rideDetail.tripDateTime).format('hh:mm A')}
									</p>
								</MDBCol>
							</MDBRow>
							<MDBRow className='mb-4'>
								<MDBCol>
									<h5 className='fw-bold'>Pick Up Direction</h5>
									<p className='text-style'>
										{rideDetail?.pickup?.direction}
									</p>
								</MDBCol>

								<MDBCol>
									<h5 className='fw-bold'>Pickup Location</h5>
									<p className='text-style'>
										{rideDetail?.pickup?.locationName}
									</p>
								</MDBCol>
							</MDBRow>
							<MDBRow className='mb-4'>
								<MDBCol>
									<h5 className='fw-bold'>Drop off Direction</h5>
									<p className='text-style'>
										{rideDetail?.destination?.direction}
									</p>
								</MDBCol>

								<MDBCol>
									<h5 className='fw-bold'>Drop off Location</h5>
									<p className='text-style'>
										{rideDetail?.destination?.locationName}
									</p>
								</MDBCol>
							</MDBRow>
							<MDBRow className='mb-4'>
								<MDBCol>
									<h5 className='fw-bold'>Passenger Name</h5>
									<p className='text-style'>
										{rideDetail?.user?.firstName +
											' ' +
											rideDetail?.user?.lastName}
									</p>
								</MDBCol>

								<MDBCol>
									<h5 className='fw-bold'>Phone no.</h5>
									<p className='text-style'>
										{rideDetail?.user?.phoneNumber}
									</p>
								</MDBCol>
							</MDBRow>

							{/* <MDBRow className='mb-4'>
								<MDBCol>
									<h5 className='fw-bold'>Trip Date</h5>
									<p className='text-style'>2021-08-01</p>
								</MDBCol>

								<MDBCol>
									<h5 className='fw-bold'>Shift Time</h5>
									<p className='text-style'>7:00 AM</p>
								</MDBCol>
							</MDBRow> */}

							<MDBRow className='mb-4'>
								<MDBCol>
									<h5 className='fw-bold'>Status</h5>
									<p className='text-style'>{rideDetail?.status}</p>
								</MDBCol>
							</MDBRow>

							{/* <MDBCol>
								<h5 className='fw-bold'>Driver Name</h5>
								<p className='text-style'>John Doe</p>
							</MDBCol> */}
						</MDBCol>

						<MDBModalFooter>
							<MDBBtn
								color='info'
								className=' fw-bold'
								onClick={setShow}
							>
								Close
							</MDBBtn>
						</MDBModalFooter>
					</MDBModalBody>
				}
			></ModalButton>
		</>
	)
}

export default RideDetails
