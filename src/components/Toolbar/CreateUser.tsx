import React, { useRef } from "react";
import { MDBBtn, MDBModalBody, MDBModalFooter } from "mdb-react-ui-kit";
import { useForm } from "react-hook-form";
import "./CreateRide.css";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  role: string;
  phone: string;
};

export default function CreateUser(): JSX.Element {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <MDBModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>First Name</label>
            <input
              placeholder="First Name"
              type="text"
              className="form-control mb-2"
              {...register("firstName", { required: true, maxLength: 10 })}
            />

            {errors.firstName && (
              <p className="error_msg">Please check the First Name</p>
            )}

            <label>Last Name</label>
            <input
              placeholder="Last Name"
              type="text"
              className="form-control mb-2"
              {...register("lastName", { required: true, maxLength: 10 })}
            />

            {errors.lastName && (
              <p className="error_msg">Please check the Last Name</p>
            )}

            <label>Email</label>
            <input
              placeholder="Email"
              type="email"
              className="form-control mb-2"
              {...register("email", {
                required: true,
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />

            {errors.email && (
              <p className="error_msg">Please check the Email</p>
            )}

            <label>Password</label>
            <input
              placeholder="Password"
              type="password"
              className="form-control mb-2"
              {...register("password", {
                required: true,
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
              })}
            />

            {errors.password && (
              <p className="error_msg">Please check the Password</p>
            )}

            <label>Retype Password</label>
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Retype password"
              {...register("repeatPassword", {
                validate: (value) =>
                  value === password.current || "The passwords do not match",
              })}
            />
            {errors.repeatPassword && (
              <p className="error_msg">{errors.repeatPassword.message}</p>
            )}

            <label> Role</label>
            <select className="form-control mb-2" {...register("role")}>
              <option value="User">User</option>
              <option value="App Admin">App Admin</option>
              <option value="System Admin">System Admin</option>
            </select>
          </div>

          <MDBModalFooter>
            <MDBBtn
              color="secondary"
              className="button_style px-4 border-0"
              // onClick={() => setToggleModal(!toggleModal)}
            >
              Close
            </MDBBtn>
            <MDBBtn
              color="info"
              className="button_style px-4"
              type="submit"
              // onClick={(e: any) => submitRide(e)}
            >
              Save
            </MDBBtn>
          </MDBModalFooter>
        </form>
      </MDBModalBody>
    </div>
  );
}
