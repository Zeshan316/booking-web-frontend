import React from "react";
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBadge,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";

const Table: React.FC = () => {
  interface TableData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    position: string;
    actions: string[] | JSX.Element[];
  }

  const data: TableData[] = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@gmail.com",
      status: "Inactive",
      position: "Senior",
      actions: [<MDBIcon icon="edit" />, <MDBIcon icon="trash" />],
    },
    {
      id: 2,
      firstName: "Mahnoor",
      lastName: "Ahmed",
      email: "mahnoor@dnamicro.com",
      status: "Active",
      position: "Junior",
      actions: [<MDBIcon icon="edit" />, <MDBIcon icon="trash" />],
    },
    {
      id: 3,
      firstName: "Sara",
      lastName: "Khan",
      email: "Sara.khan@outlook.com",
      status: "Awaiting",
      position: "Senior",
      actions: [<MDBIcon icon="edit" />, <MDBIcon icon="trash" />],
    },
    {
      id: 4,
      firstName: "Eva",
      lastName: "Green",
      email: "Eva.blue@gmail.com",
      status: "Disabled",
      position: "Junior",
      actions: [<MDBIcon icon="edit" />, <MDBIcon icon="trash" />],
    },
  ];

  return (
    <MDBContainer fluid>
      <section>
        <div className="shadow-4 rounded-4 overflow-hidden">
          <MDBTable  hover>
            <MDBTableHead >
              <tr>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Trip Date</th>
                <th>Status</th>
                <th>Shift Time</th>
                <th>Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody style={{ verticalAlign: "middle" }}>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://mdbootstrap.com/img/new/avatars/4.jpg"
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{item.lastName}</p>
                        {/* <p className="text-muted mb-0">{item.email}</p> */}
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{item.firstName}</p>
                  </td>
                  <td>
                    <p className="text-muted mb-0">{item.email}</p>
                  </td>
                  <td>
                    <MDBBadge light color="success" pill>
                      {item.status}
                    </MDBBadge>
                  </td>
                  <td>{item.position}</td>
                  <td>
                    {item.actions.map((action) => (
                      <MDBBtn
                        className="fw-bold fs-6 p-2"
                        color="link"
                        rounded
                        size="sm"
                        rippleColor="dark"
                      >
                        <span key={item.id}>{action}</span>
                      </MDBBtn>
                    ))}
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      </section>
    </MDBContainer>
  );
};

export default Table;
