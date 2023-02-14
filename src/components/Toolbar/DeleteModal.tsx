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
	title?: string
	icon?: string
	handleOnClose: () => void
	onDelete: (e: any, data?: any) => void
	statusEvent?: any
	deleteData?: any
	message?: string
	message2?: string
}
function DeleteModal({
	show,
	title,
	icon,
	setShow,
	handleOnClose,
	onDelete,
	statusEvent,
	deleteData,
	message,
	message2,
}: ModalProps): JSX.Element {
	const [isOpen, setIsOpen] = useState(false)

	const handleOpenModal = () => {
		setIsOpen(!isOpen)
	}

	const handleDelete = () => {
		if (statusEvent) {
			onDelete(statusEvent, deleteData)
			setShow()
		} else {
			onDelete(deleteData)
			setShow()
		}
	}

	return (
		<ModalButton
			isOpen={show}
			setIsOpen={handleOpenModal}
			handleOnClose={setShow}
			handleOpenModal={setShow}
			iconname={icon ? icon : 'trash-alt'}
			modalTitle={title ? title : 'Delete'}
			modalBody={
				<MDBModalBody>
					<MDBCol className='mb-2 mx-1'>
						<>
							<span className='fs-5 '>
								{message
									? message
									: 'Are you sure you want to delete this record?'}
							</span>
							{message2 && (
								<p className='mt-2 fw-bold text-danger fs-6 '>
									{message2}
								</p>
							)}
						</>
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
