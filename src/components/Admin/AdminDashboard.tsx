import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import Layout from "src/components/Layout/Layout";
import Table from "src/components/TabularView/Table";
import Search from "src/components/Toolbar/Search";
import CreateUser from "src/components/Toolbar/CreateUser";
import CreateRide from "../Toolbar/CreateRide";

export default function UserDashboard(): JSX.Element {
  return (
    <Layout>
      <MDBRow className="mt-5 px-3 py-2 text-start bg-light d-flex justify-content-start flex-1 ">
        <MDBCol className="">
          <CreateRide />
          <CreateUser />
        </MDBCol>
      </MDBRow>
      <Search />
      <Table />
    </Layout>
  );
}
