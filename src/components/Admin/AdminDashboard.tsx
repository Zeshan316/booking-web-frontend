import Layout from "src/components/Layout/Layout";
import CreateModal from "src/components/Toolbar/CreateModal";
import Table from "src/components/TabularView/Table";
import Search from "src/components/Toolbar/Search";

export default function UserDashboard(): JSX.Element {
  return (
    <Layout>
      <CreateModal />
      <Search />
      <Table />
    </Layout>
  );
}
