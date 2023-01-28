import Layout from "src/components/Layout/Layout";
import CreateBooking from "src/components/Toolbar/CreateBooking";
import Table from "src/components/TabularView/Table";
import Search from "src/components/Toolbar/Search";

export default function Dashboard(): JSX.Element {
  return (
    <Layout>
      <CreateBooking />
      <Search />
      <Table />
    </Layout>
  );
}
