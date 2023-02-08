import { MDBCol, MDBRow } from 'mdb-react-ui-kit'
import Layout from 'src/components/Layout/Layout'
import CreateRide from 'src/components/Toolbar/CreateRide'
import Table from 'src/components/TabularView/Table'
import Search from 'src/components/Toolbar/Search'

export default function UserDashboard(): JSX.Element {
	return (
		<Layout>
			<p>Users</p>
			<MDBRow className='mt-5 px-3 py-2 text-start bg-light'>
				<MDBCol>
					<CreateRide />
				</MDBCol>
			</MDBRow>
			{/* <Search /> */}
			<Table />
		</Layout>
	)
}
