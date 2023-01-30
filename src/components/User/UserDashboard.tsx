import Layout from "src/components/Layout/Layout";
import CreateBooking from "src/components/Toolbar/CreateRide";
import Table from "src/components/TabularView/Table";
import Search from "src/components/Toolbar/Search";

export default function UserDashboard(): JSX.Element {
  return (
    <Layout>
      <CreateBooking />
      <Search />
      <Table />
    </Layout>
  );
}
