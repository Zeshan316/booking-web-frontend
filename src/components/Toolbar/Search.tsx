import React from 'react'
import { MDBInputGroup, MDBBtn } from 'mdb-react-ui-kit'
import './Search.css'
import {
	ITEMS_PER_PAGE,
	RECORDS_PER_PAGE,
	RIDE_STATUSES,
} from '../../common/constants'
import Datetime from 'react-datetime'
import dayjs from 'dayjs'

interface SearchProps {
	page?: string
	options: GenericObject[]
	handleSearchClick: () => void
	handleOption: (e: any) => void
	searchValue: string
	handleSearchField: (e: any) => void
	handleItemsPerPage: (e: any) => void
	ridesStartDateTime?: Date
	ridesEndDateTime?: Date
	handleStartDateTime?: (e: any) => void
	handleEndDateTime?: (e: any) => void
	handleFilterRides?: () => void
	handleDirectionFilter?: (e: any) => void
}

function Search({
	page = 'users',
	options,
	handleSearchClick,
	handleOption,
	searchValue,
	handleSearchField,
	handleItemsPerPage,
	ridesStartDateTime,
	ridesEndDateTime,
	handleStartDateTime,
	handleEndDateTime,
	handleFilterRides,
	handleDirectionFilter,
}: SearchProps): JSX.Element {
	return (
		<>
			{page === 'users' && (
				<MDBInputGroup className='mb-3 d-flex justify-content-center mt-3 p-3'>
					<MDBBtn
						color='info'
						className='buttonstyle border-info '
						outline
					>
						Search By
					</MDBBtn>
					<select
						className='form-selectt me-1'
						onChange={handleOption}
					>
						<option className='options' defaultValue=''>
							Select Filter
						</option>
						{options.map((filter, index) => {
							return (
								<option
									className='options'
									key={index}
									value={filter.filterVal}
								>
									{filter.readableValue}
								</option>
							)
						})}
					</select>

					<select
						className='pageitem-select'
						onChange={handleItemsPerPage}
					>
						{RECORDS_PER_PAGE.map((record, index) => (
							<option
								className='options'
								key={index}
								selected={record === ITEMS_PER_PAGE}
								value={record}
							>
								{record}
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
			)}
			{page == 'rides' && (
				<MDBInputGroup className='mb-3 d-flex justify-content-center mt-3 p-3'>
					<Datetime
						onChange={handleStartDateTime}
						dateFormat={'DD-MM-YYYY'}
						value={ridesStartDateTime}
					/>
					<Datetime
						onChange={handleEndDateTime}
						dateFormat={'DD-MM-YYYY'}
						value={ridesEndDateTime}
					/>
					<select
						className='pageitem-select'
						onChange={handleItemsPerPage}
					>
						{RECORDS_PER_PAGE.map((record, index) => (
							<option
								className='options'
								key={index}
								selected={record === ITEMS_PER_PAGE}
								value={record}
							>
								{record}
							</option>
						))}
					</select>
					<select
						className='pageitem-select'
						onChange={handleDirectionFilter}
					>
						<option className='options' defaultValue=''>
							Select Direction
						</option>
						<option
							className='options'
							key={Math.ceil(Math.random() * 50000)}
							value={'north'}
						>
							North
						</option>
						<option
							className='options'
							key={Math.ceil(Math.random() * 50000)}
							value={'south'}
						>
							South
						</option>
					</select>
					<MDBBtn
						color='info'
						className='buttonstyle ms-1'
						onClick={handleFilterRides}
					>
						Filter Rides
					</MDBBtn>
				</MDBInputGroup>
			)}
		</>
	)
}

export default Search
