import Layout from 'src/components/Layout/Layout'
import Toolbar from 'src/components/Toolbar/Toolbar'
import Table from 'src/components/TabularView/Table'
import Search from 'src/components/Toolbar/Search'

export default function Dashboard(): JSX.Element {
	return (
		<Layout>
			<Toolbar />
			<Search />
			<Table />
		</Layout>
	)
}
