import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
  MDBBadge,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

import ReactPaginate from "react-paginate";

import { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../../store/reducers/users-reducer";
import { LISTING_ORDER } from "../../common/constants";
import UserDetails from "./UserDetails";
import UserService from "../../services/UserService";
import CreateUser from "../User/CreateUser";
import { setUserDetail } from "../../store/reducers/users-reducer";
import DeleteModal from "../Toolbar/DeleteModal";

interface UserTableProps {
  perPageItems: number;
  handleFormType: (type: string) => void;
  handleUserFormModel: (e: any) => void;
  handleDeleteUser: (e: string) => void;
}

function UserTable({
  perPageItems,
  handleFormType,
  handleUserFormModel,
  handleDeleteUser,
}: UserTableProps): JSX.Element {
  const dispatch = useDispatch();
  const [pageOffset, setPageOffset] = useState<number>(0);
  const [tableFilters, setTableFilters] = useState<GenericObject>({
    order: LISTING_ORDER,
    from: pageOffset,
    to: perPageItems,
  });
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [showUserDetail, setShowUserDetail] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<string>("");
  const [showUserUpdateModel, setShowUserUpdateModel] =
    useState<boolean>(false);

  const userReducer = useSelector((state: RootState) => state.user);

  async function getUserDetail(userId: string) {
    const userDetail = await UserService.getUser(userId);
    dispatch(setUserDetail(userDetail));
  }

  useEffect(() => {
    if (selectedUserId) getUserDetail(selectedUserId);
  }, [selectedUserId]);

  async function getUsers() {
    const data = await UserService.getUsers(tableFilters);
    dispatch(setUsers(data));
  }

  React.useEffect(() => {
    getUsers();
  }, [pageOffset]);

  function handlePageChange({ selected }: { selected: number }): void {
    setPageOffset(selected);
    setTableFilters({
      ...tableFilters,
      from: selected * perPageItems,
    });
  }

  function handleUserDetail(userId: string | undefined) {
    if (!userId) return;

    setShowUserDetail(!showUserDetail);
    setSelectedUserId(userId);
  }

  function handleUserEdit(userId: string | undefined) {
    if (!userId) return;

    setShowUserDetail(false);
    setShowUserUpdateModel(true);
    setSelectedUserId(userId);
  }

  return (
    <MDBContainer fluid>
      <section>
        <div className="shadow-4 rounded-4 overflow-hidden bg-light">
          <MDBTable hover>
            <MDBTableHead className="bg-info">
              <tr>
                <th className="fw-bold text-white h6">
                  <MDBIcon
                    // icon={isAscending ? 'sort-up' : 'sort-down'}
                    // onClick={() => setIsAscending(!isAscending)}
                    className="sort-icon me-2"
                  />
                  Last Name
                </th>
                <th className="fw-bold text-white h6">
                  <MDBIcon
                    // icon={isAscending ? 'sort-up' : 'sort-down'}
                    // onClick={() => setIsAscending(!isAscending)}
                    className="sort-icon me-2"
                  />
                  First Name
                </th>
                <th className="fw-bold text-white h6">
                  <MDBIcon
                    // icon={isAscending ? 'sort-up' : 'sort-down'}
                    // onClick={() => setIsAscending(!isAscending)}
                    className="sort-icon me-2"
                  />
                  Email
                </th>
                <th className="fw-bold text-white h6">Status</th>
                <th className="fw-bold text-white h6">
                  <MDBIcon
                    // icon={isAscending ? 'sort-up' : 'sort-down'}
                    // onClick={() => setIsAscending(!isAscending)}
                    className="sort-icon me-2"
                  />
                  Phone No.
                </th>
                <th className="fw-bold text-white h6">
                  <MDBIcon
                    // icon={isAscending ? 'sort-up' : 'sort-down'}
                    // onClick={() => setIsAscending(!isAscending)}
                    className="sort-icon me-2"
                  />
                  Role
                </th>
                <th className="fw-bold text-white h6">Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody
              style={{
                verticalAlign: "middle",
              }}
            >
              {userReducer.users.length === 0 ? (
                <tr className="items">
                  <td colSpan={7}>There are no users to show...</td>
                </tr>
              ) : (
                userReducer.users.map((user: User, index: any) => (
                  <tr key={user?.id} className="items">
                    <td onClick={() => handleUserDetail(user?.userId)}>
                      <MDBCol className="d-flex align-items-center">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                          alt=""
                          style={{ width: "45px", height: "45px" }}
                          className="rounded-circle"
                        />
                        <div className="ms-3">
                          <p className="fw-bold mb-1">
                            {user?.lastName || "N/A"}
                          </p>
                        </div>
                      </MDBCol>
                    </td>
                    <td>
                      <p className=" mb-1">{user?.firstName}</p>
                    </td>
                    <td>
                      <p className="mb-0">{user?.email}</p>
                    </td>
                    <td>
                      <p className="mb-1">
                        {user?.isActive ? (
                          <MDBBadge
                            light
                            color="success"
                            pill
                            className="status"
                          >
                            Active
                          </MDBBadge>
                        ) : (
                          <MDBBadge
                            light
                            color="warning"
                            pill
                            className="status"
                          >
                            In-Active
                          </MDBBadge>
                        )}
                      </p>
                    </td>
                    <td>
                      <p className="mb-1">{user?.phoneNumber || "N/A"}</p>
                    </td>
                    <td>
                      <p className="mb-1">{user?.role?.name}</p>
                    </td>
                    <td>
                      {!user.deletedAt && (
                        <MDBBtn
                          key={user?.id}
                          className="fs-6 p-2"
                          color="light"
                          size="sm"
                          rippleColor="dark"
                          onClick={async () => {
                            handleUserEdit(user?.userId);
                            handleFormType("update");
                            setSelectedUserId(user?.userId as string);
                            handleUserFormModel(true);
                          }}
                          disabled={Boolean(user.deletedAt)}
                        >
                          <MDBTooltip tag="a" title={"Edit"}>
                            <MDBIcon icon="edit" />
                          </MDBTooltip>
                        </MDBBtn>
                      )}
                      {!user.deletedAt && (
                        <MDBBtn
                          key={user?.id}
                          className="fs-6 p-2"
                          color="light"
                          size="sm"
                          rippleColor="dark"
                          disabled={Boolean(user.deletedAt)}
                          onClick={() => {
                            setShowDeleteModal(true);
                            setDeleteData(user?.userId as string);
                          }}
                        >
                          <MDBTooltip tag="a" title={"Delete"}>
                            <MDBIcon icon="trash" />
                          </MDBTooltip>
                        </MDBBtn>
                      )}
                      <MDBBtn
                        key={user?.id}
                        className="fs-6 p-2"
                        color="light"
                        size="sm"
                        rippleColor="dark"
                      >
                        <MDBTooltip tag="a" title="Unlock">
                          <MDBIcon icon="lock" color="muted" />
                        </MDBTooltip>
                      </MDBBtn>
                    </td>
                  </tr>
                ))
              )}
            </MDBTableBody>
            <tfoot>
              <tr>
                <td colSpan={7}>
                  <MDBRow>
                    <MDBCol className="d-flex justify-content-end align-items-end p-1 ">
                      <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageChange}
                        pageRangeDisplayed={2}
                        pageCount={Math.ceil(
                          userReducer.totalUsers / perPageItems
                        )}
                        previousLabel="< previous"
                        // renderOnZeroPageCount={3}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                      />
                    </MDBCol>
                  </MDBRow>
                </td>
              </tr>
            </tfoot>
            {showUserDetail && (
              <UserDetails
                show={showUserDetail}
                setShow={() => setShowUserDetail(!showUserDetail)}
              />
            )}

            {/* {showUserUpdateModel && (
							<CreateUser showModel={showUserUpdateModel} />
						)} */}

            {showDeleteModal && (
              <DeleteModal
                show={showDeleteModal}
                onDelete={handleDeleteUser}
                deleteData={deleteData}
                handleOnClose={() => setShowDeleteModal(false)}
                setShow={() => setShowDeleteModal(!showDeleteModal)}
              />
            )}
          </MDBTable>
        </div>
      </section>
    </MDBContainer>
  );
}

export default UserTable;
