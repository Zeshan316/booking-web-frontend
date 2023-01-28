import React from 'react'
import Layout from '../Layout/Layout'
import Table from '../TabularView/Table'

export default function RideHistory(): JSX.Element {
	return (
		<Layout> 
            <h4 className='p-4 fw-bold'>History</h4>
			<Table />
		</Layout>
	)
}
