import React from 'react'
import {
	MDBInputGroup,
	MDBDropdown,
	MDBDropdownToggle,
	MDBBtn,
} from 'mdb-react-ui-kit'
import './Search.css'

interface SearchProps {
	options: string[]
	handleSearchClick: () => void
	handleOption: (e: any) => void
	searchValue: string
	handleSearchField: (e: any) => void
}

function Search({
	options,
	handleSearchClick,
	handleOption,
	searchValue,
	handleSearchField,
}: SearchProps): JSX.Element {
	return (
		<MDBInputGroup className='mb-3 d-flex justify-content-center mt-3 p-3'>
			<MDBBtn
				color='info'
				className='buttonstyle border-info'
				outline
			>
				Search By
			</MDBBtn>
			<select
				className='browser-default custom-select'
				onChange={handleOption}
			>
				<option defaultValue=''>Select Filter</option>
				{options.map((option, index) => (
					<option key={index} value={option}>
						{option}
					</option>
				))}
			</select>

			<form
				className='input ms-1'
				onSubmit={(e) => e.preventDefault()}
			>
				<input
					type='search'
					className='form-control rounded'
					placeholder='Search'
					aria-label='Search'
					aria-describedby='search-addon'
					value={searchValue}
					onChange={(e) => handleSearchField(e)}
				/>
				<MDBBtn
					color='info'
					className='buttonstyle ms-1'
					onClick={handleSearchClick}
				>
					Search
				</MDBBtn>
			</form>
		</MDBInputGroup>
	)
}

export default Search
