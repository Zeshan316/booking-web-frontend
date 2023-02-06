import React, { useRef, useState } from "react";
import {
  MDBBtn,
  MDBModalBody,
  MDBModalFooter,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { useForm } from "react-hook-form";
import ModalButton from "./ModalButton";
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
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const password = useRef({});
  password.current = watch("password", "");

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  const handleOnClose = () => {
    setIsOpen(!isOpen);
    reset({});
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <>
      <ModalButton
        isOpen={isOpen}
        handleOpenModal={handleOpenModal}
        modalTitle="Create Ride"
        iconname={"bus"}
        modalBody={
          <MDBModalBody className="mx-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="fw-bold py-1 d-block">First Name</label>
                <input
                  placeholder="First Name"
                  type="text"
                  className="form-control mb-2"
                  {...register("firstName", { required: true, maxLength: 10 })}
                />

                {errors.firstName && (
                  <span className="error_msg">
                    Please enter user's first Name
                  </span>
                )}

                <label className="fw-bold py-1 d-block">Last Name</label>
                <input
                  placeholder="Last Name"
                  type="text"
                  className="form-control mb-2"
                  {...register("lastName", { required: true, maxLength: 10 })}
                />

                {errors.lastName && (
                  <span className="error_msg">
                    Please enter user's last name
                  </span>
                )}

                <label className="fw-bold py-1 d-block">Email</label>
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
                  <span className="error_msg">Please enter user's email</span>
                )}

                <label className="fw-bold py-1 d-block">Password</label>
                <MDBTooltip
                  placement="right"
                  tag="span"
                  title="Password must be 6-15 characters long, contain at least one numeric digit, one uppercase and one lowercase letter"
                >
                  <input
                    placeholder="Password"
                    type="password"
                    className="form-control mb-2"
                    {...register("password", {
                      required: true,
                      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                    })}
                  />
                </MDBTooltip>

                {errors.password && (
                  <span className="error_msg">Please set user's password</span>
                )}

                <label className="fw-bold py-1 d-block">Retype Password</label>
                <input
                  type="password"
                  className="form-control mb-2"
                  placeholder="Retype password"
                  {...register("repeatPassword", {
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  })}
                />
                {errors.repeatPassword && (
                  <span className="error_msg">
                    {errors.repeatPassword.message}
                  </span>
                )}

                <label className="fw-bold py-1"> Role</label>
                <select className="form-select mb-2" {...register("role")}>
                  <option value="User">User</option>
                  <option value="App Admin">App Admin</option>
                  <option value="System Admin">System Admin</option>
                </select>
              </div>

              <MDBModalFooter>
                <MDBBtn
                  color="secondary"
                  className="button_style px-4 border-0"
                  type="button"
                  onClick={handleOnClose}
                >
                  Close
                </MDBBtn>
                <MDBBtn
                  color="info"
                  className="button_style px-4"
                  type="submit"
                  // onClick={handleSubmit(onSubmit)}
                >
                  Save
                </MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModalBody>
        }
      >
        Create User
      </ModalButton>
    </>
  );
}
