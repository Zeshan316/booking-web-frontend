import React from "react";
import Layout from "../Layout/Layout";
import Table from "../TabularView/Table";
import Search from "../Toolbar/Search";

export default function Users(): JSX.Element {
  return (
    <Layout>
      <div className="mt-5">
        <Search />
        <Table />
      </div>
    </Layout>
  );
}
