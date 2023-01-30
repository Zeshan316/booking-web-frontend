import Layout from "src/components/Layout/Layout";
import CreateUser from "src/components/Toolbar/CreateUser";
import Table from "src/components/TabularView/Table";
import Search from "src/components/Toolbar/Search";

export default function UserDashboard(): JSX.Element {
  return (
    <Layout>
      <CreateUser />
      <Search />
      <Table />
    </Layout>
  );
}
