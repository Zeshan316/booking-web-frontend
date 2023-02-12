import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn,
  MDBCol,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import logo from "../../assets/bus-img.png";
import { RootState } from "../../../src/store";
import { clearUserData } from "../../store/reducers/auth-reducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SERVER_BASE_URL } from "../../common/constants";
import DeleteModal from "../Toolbar/DeleteModal";

const Header = (): JSX.Element => {
  const [showConfirmBox, setShowConfirmBox] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authData = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.auth.user);
  function handleLogout() {
    dispatch(clearUserData());
    navigate("/login");
  }

  return (
    <>
      <MDBNavbar light className="px-3">
        <MDBContainer fluid>
          <MDBNavbarBrand className="fs-4 fw-normal">
            <img src={logo} height="50" alt="brand" loading="lazy" />
            DNA Cab Service {authData?.user.role.name}
          </MDBNavbarBrand>

          <MDBCol className="d-flex justify-content-end align-items-center">
            <img
              src={
                `${SERVER_BASE_URL}${user?.profileImgUrl}` ||
                `${SERVER_BASE_URL}static/images/defaultProfileImg.png`
              }
              className="rounded-circle"
              height="50"
              width="50"
              alt="Black and White Portrait of a Man"
              loading="lazy"
            />
            <span className="fw-bold fs-6 ms-1 mt-4">
              {user?.firstName} {user?.lastName}
            </span>
            <MDBBtn
              color="info"
              type="button"
              className="fw-bold ms-3 text-capitalize"
              onClick={() => setShowConfirmBox(true)}
            >
              Logout
            </MDBBtn>
          </MDBCol>
        </MDBContainer>
      </MDBNavbar>
      {showConfirmBox && (
        <DeleteModal
          show={showConfirmBox}
          title={"Logout"}
          icon={"sign-out-alt"}
          message={"Do you want to logout?"}
          onDelete={handleLogout}
          handleOnClose={() => setShowConfirmBox(false)}
          setShow={() => setShowConfirmBox(!showConfirmBox)}
        />
      )}
    </>
  );
};

export default Header;
