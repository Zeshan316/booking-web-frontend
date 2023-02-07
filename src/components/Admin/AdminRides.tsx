import React from "react";
import Layout from "../Layout/Layout";
import Table from "../TabularView/Table";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import Search from "../Toolbar/Search";
import CreateUser from "../Toolbar/CreateUser";
import CreateRide from "../Toolbar/CreateRide";

export default function AdminRides(): JSX.Element {
  return (
    <Layout>
      <MDBRow className="mt-5 px-3 py-2 text-start bg-light d-flex justify-content-start flex-1 ">
        <MDBCol className="">
          {/* <CreateRide /> */}
          <CreateRide />
        </MDBCol>
      </MDBRow>
      <Search />
      <Table />
    </Layout>
  );
}
