import React, { useState } from 'react'
import {
	MDBBtn,
	MDBModalBody,
	MDBModalFooter,
	MDBCol,
} from 'mdb-react-ui-kit'

import ModalButton from '../Toolbar/ModalButton'
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory'

interface ModalProps {
	show: boolean
	setShow: () => void
	handleOnClose: () => void
	onDelete: (e: any) => void
	deleteData: any
	message?: string
}
function DeleteModal({
	show,
	setShow,
	handleOnClose,
	onDelete,
	deleteData,
	message,
}: ModalProps): JSX.Element {
	const [isOpen, setIsOpen] = useState(false)

	const handleOpenModal = () => {
		setIsOpen(!isOpen)
	}

	const handleDelete = () => {
		onDelete(deleteData)
		setShow()
	}

	return (
		<ModalButton
			isOpen={show}
			setIsOpen={handleOpenModal}
			handleOnClose={setShow}
			handleOpenModal={setShow}
			iconname={'trash-alt'}
			modalTitle='Delete'
			modalBody={
				<MDBModalBody>
					<MDBCol className='mb-2 mx-1'>
						<span className='fs-5 '>
							{message
								? message
								: 'Are you sure you want to delete this record?'}
						</span>
					</MDBCol>

					<MDBModalFooter>
						<MDBBtn
							color='secondary'
							className='text-capitalize fw-bold fs-6 '
							onClick={setShow}
						>
							No
						</MDBBtn>
						<MDBBtn
							color='danger'
							className='text-capitalize fw-bold fs-6 '
							onClick={handleDelete}
						>
							Yes
						</MDBBtn>
					</MDBModalFooter>
				</MDBModalBody>
			}
		></ModalButton>
	)
}

export default DeleteModal
