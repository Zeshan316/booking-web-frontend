import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MDBBtn, MDBIcon, MDBRow, MDBCol } from "mdb-react-ui-kit";
import img from "../assets/bus.png";
import "./Login.css";

import AuthService from "../services/AuthService";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../store/reducers/auth-reducer";
import { RootState } from "../store";
import { useLocation, useParams } from "react-router-dom";

function Login(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authData = useSelector((state: RootState) => {
    return state.auth;
  });

  if (authData.isLoggedIn) {
    navigate("/");
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const userData = await AuthService.login(email, password);
    console.log(userData);
    if (userData.jwtToken) await dispatch(setUserData(userData));

    return;
  };

  return (
    <div className="col-12 overflow-hidden">
      <MDBRow>
        <MDBCol className="signup-left-image-container bg-image col-lg-5 col-md-5 d-sm-none d-md-block">
          <div className="hero-text text-center d-flex justify-content-center h1 ">
            DNA-Cab Service <br />
            <div className="hero-text-span h5 fw-bold">
              Let us help you move!
            </div>
            <div className="text-center h6 position-absolute bottom-0">
              <span>Powered by</span> <b>DNA Micro Inc.</b>
            </div>
          </div>
        </MDBCol>
        <MDBCol className="col-lg-7 col-md-7 justify-content-center main-right-container">
          <div className="signup-right-container m-auto mt-5">
            <div>
              <img src={img} alt={"..logo"} />
              <div className="mt-1">
                <div className="greeting-text">Welcome</div>
                {
                  <span className="greeting-text-span">
                    Ready to get started?
                  </span>
                }
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              id="form"
              className="signup-form col-lg-9 col-md-9 m-auto text-align-start"
            >
              <label className="label p-2">Email</label>

              <div className="group">
                <MDBIcon far icon="envelope" className="input-icon" />
                <input
                  type={"email"}
                  className="form-inputs"
                  value={email}
                  placeholder="Enter Email"
                  required
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(event.target.value)
                  }
                />
              </div>

              <label className="label mt-4 p-2">Password</label>
              <div className="group">
                <MDBIcon fas icon="lock" className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-inputs"
                  value={password}
                  placeholder="*********"
                  required
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(event.target.value)
                  }
                />
                {showPassword ? (
                  <MDBIcon
                    className="eye-icon"
                    far
                    icon="eye"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <MDBIcon
                    className="eye-icon"
                    far
                    icon="eye-slash"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>

              <MDBBtn
                rounded
                color="info"
                type="submit"
                form="form"
                className="mb-3 signup-btn"
                block
              >
                Login
              </MDBBtn>
            </form>
          </div>
        </MDBCol>
      </MDBRow>
    </div>
  );
}

export default Login;
