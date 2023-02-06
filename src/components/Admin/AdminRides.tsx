import React from "react";
import Layout from "../Layout/Layout";
import Table from "../TabularView/Table";

export default function AdminRides(): JSX.Element {
  return (
    <Layout>
      <div className="mt-5">
        <Table />
      </div>
    </Layout>
  );
}
