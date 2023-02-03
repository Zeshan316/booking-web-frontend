import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import Layout from "src/components/Layout/Layout";
import CreateRide from "src/components/Toolbar/CreateRide";
import Table from "src/components/TabularView/Table";
import Search from "src/components/Toolbar/Search";
import ModalButton from "../Toolbar/ModalButton";

export default function UserDashboard(): JSX.Element {
  return (
    <Layout>
      <MDBRow className="mt-5 px-3 py-2 text-start bg-light">
        <MDBCol>
          <ModalButton
            modalTitle="Create a Ride"
            iconname={"bus"}
            modalBody={<CreateRide />}
          >
            {" "}
            Create Ride{" "}
          </ModalButton>
        </MDBCol>
      </MDBRow>
      <Search />
      <Table />
    </Layout>
  );
}
