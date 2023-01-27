import React from 'react'
import {
	MDBInputGroup,
	MDBDropdown,
	MDBDropdownItem,
	MDBDropdownMenu,
	MDBDropdownToggle,
	MDBBtn,
} from 'mdb-react-ui-kit'
import './Search.css'

function Search(): JSX.Element {
	return (
		<div className='w-100 '>
			<MDBInputGroup className='mb-3  mt-5 flex-wrap-nowrap'>
				<MDBBtn outline>Search By</MDBBtn>

				<MDBDropdown>
					<MDBDropdownToggle className='dropdown'>
						Choose
					</MDBDropdownToggle>
					<MDBDropdownMenu>
						<MDBDropdownItem link>Last Name</MDBDropdownItem>
						<MDBDropdownItem link>First Name</MDBDropdownItem>
						<MDBDropdownItem link>
							Something else here
						</MDBDropdownItem>
						<MDBDropdownItem divider />
						<MDBDropdownItem link>Separated link</MDBDropdownItem>
					</MDBDropdownMenu>
				</MDBDropdown>

				<form className='input  ms-3'>
					<input
						type='search'
						className='form-control rounded'
						placeholder='Search'
						aria-label='Search'
						aria-describedby='search-addon'
					/>
					<MDBBtn type='button' className='btn btn-primary '>
						search
					</MDBBtn>
				</form>
			</MDBInputGroup>
		</div>
	)
}

export default Search
