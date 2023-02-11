import React from 'react'
import {
	MDBContainer,
	MDBTable,
	MDBTableHead,
	MDBTableBody,
	MDBIcon,
} from 'mdb-react-ui-kit'

import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'

function Listings(): JSX.Element {
	const roleReducer = useSelector(
		(state: RootState) => state.roleReducer
	)

	return (
		<MDBContainer fluid>
			<section>
				<div className='shadow-4 mb-5 rounded-4 overflow-hidden bg-light'>
					<MDBTable hover>
						<MDBTableHead className='bg-info'>
							<tr>
								<th className='fw-bold text-white h6'>
									<MDBIcon className='sort-icon me-2' />
									Role Name
								</th>
								<th className='fw-bold text-white h6'>
									<MDBIcon />
									Level
								</th>
								<th className='fw-bold text-white h6'>
									<MDBIcon className='sort-icon me-2' />
									Created on
								</th>
							</tr>
						</MDBTableHead>
						<MDBTableBody
							style={{
								verticalAlign: 'middle',
							}}
						>
							{roleReducer.roles.length === 0 ? (
								<tr className='items'>
									<td colSpan={7}>There are no roles to show...</td>
								</tr>
							) : (
								roleReducer.roles.map((role: Role, index: any) => (
									<tr key={role?.id} className='items'>
										<td>
											<div className='d-flex align-items-center'>
												<div className='ms-3'>
													<p className='fw-bold mb-1'>
														{role?.name || 'N/A'}
													</p>
												</div>
											</div>
										</td>
										<td>
											<p className=' mb-1'>{role.level}</p>
										</td>
										<td>
											<p className='mb-0'>
												{dayjs(role?.createdAt).format('D MMM, YYYY')}
											</p>
										</td>
									</tr>
								))
							)}
						</MDBTableBody>
					</MDBTable>
				</div>
			</section>
		</MDBContainer>
	)
}

export default Listings
