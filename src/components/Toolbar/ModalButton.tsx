import React from 'react'
import {
	MDBModal,
	MDBModalHeader,
	MDBModalTitle,
	MDBIcon,
	MDBBtn,
	MDBModalDialog,
	MDBModalContent,
} from 'mdb-react-ui-kit'

interface Props {
	children?: React.ReactNode
	modalTitle: string
	modalBody: React.ReactNode
	iconname?: string
	handleOnClose?: () => void
	isOpen: boolean
	setIsOpen: (value: boolean) => void
	edit?: boolean

	handleOpenModal: (e?: any) => void
}

const ModalButton: React.FC<Props> = ({
	children,
	modalTitle,
	iconname,
	modalBody,
	handleOpenModal,
	handleOnClose,
	isOpen,
	setIsOpen,
	edit,
}) => {
	return (
		<>
			{children ? (
				<MDBBtn
					color='info'
					className='button_style me-3'
					onClick={handleOpenModal}
				>
					{children}
				</MDBBtn>
			) : null}

			<MDBModal
				show={isOpen}
				onHide={handleOnClose}
				setShow={setIsOpen}
				tabIndex='-1'
				closeOnEsc={true}
				animationDirection='top'
			>
				<MDBModalDialog>
					<MDBModalContent className={`bg-light`}>
						<MDBModalHeader>
							<MDBModalTitle className='fw-bold'>
								<MDBIcon
									size='xl'
									color='info'
									className='px-2'
									fas
									icon={iconname}
								/>
								{modalTitle}
							</MDBModalTitle>
							<MDBBtn
								className='btn-close'
								color='none'
								onClick={handleOnClose}
							></MDBBtn>
						</MDBModalHeader>
						{modalBody}
					</MDBModalContent>
				</MDBModalDialog>
			</MDBModal>
		</>
	)
}

export default ModalButton
