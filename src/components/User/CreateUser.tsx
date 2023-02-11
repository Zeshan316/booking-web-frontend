import React, { useRef, useState, useEffect } from "react";
import {
  MDBBtn,
  MDBModalBody,
  MDBModalFooter,
  MDBTooltip,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useForm } from "react-hook-form";
import ModalButton from "../Toolbar/ModalButton";
import "../Toolbar/CreateRide.css";
import UserService from "../../services/UserService";
import RoleService from "../../services/RoleService";
import { notify } from "src/common/utils";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface ModelProps {
  showModal?: boolean;
  showUserModel: boolean;
  formType: string;
  handleUserFormModel: (e: any) => void;
  handleFormType: (type: string) => void;
  getUsers: () => void;
}

export default function CreateUser({
  handleUserFormModel,
  showUserModel,
  formType,
  handleFormType,
  getUsers,
}: ModelProps): JSX.Element {
  const [roles, setRoles] = useState<any[]>([]);
  const [defaultValues, setDefaultValues] = useState<GenericObject>({
    values: {},
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<UserFormProps>(defaultValues);

  const [modalstate, setModalstate] = useState<boolean>(false);
  const [type, setType] = useState<string>("password");
  const [typeRepeat, setTypeRepeat] = useState<string>("password");

  const [showIcon, setShowIcon] = useState<string>("eye-slash");
  const [showIconRepeat, setShowIconRepeat] = useState<string>("eye-slash");

  const password: any = useRef({});
  password.current = watch("password", "");

  const userDetail = useSelector((state: RootState) => state.user.user);

  const handleOnClose = () => {
    handleUserFormModel(false);

    reset({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
      roleId: "",
      phoneNumber: "",
    });
    handleFormType("");
  };

  const getRoles = async () => {
    const rolesData = await RoleService.getRoles();
    setRoles(rolesData.roles);
  };

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (formType === "update") {
      setDefaultValues({
        values: {
          firstName: userDetail.firstName,
          lastName: userDetail.lastName,
          email: userDetail.email,
          password: "",
          repeatPassword: "",
          roleId: userDetail.role.id,
          phoneNumber: userDetail.phoneNumber,
        },
      });
      //   getRoles();
    } else if (formType === "create") {
      const userRole = roles.find((role: Role) => role.level === 2);
      setDefaultValues({
        values: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          repeatPassword: "",
          roleId: userRole?.id,
          phoneNumber: "",
        },
      });
    }
  }, [formType, userDetail?.id, userDetail?.userId]);

  const onSubmit = async (data: UserFormProps) => {
    if (formType === "update") {
      const { password, repeatPassword, ...formData } = data;
      await UserService.updateUser(userDetail?.id as string, formData);
    } else {
      //   notify("User created successfully", "success");
      await UserService.createUser(data);
    }
    getUsers();
    handleOnClose();
  };

  const handleToggle = () => {
    if (type === "password") {
      setShowIcon("eye");
      setType("text");
    } else {
      setShowIcon("eye-slash");
      setType("password");
    }
  };

  const handleToggleRepeat = () => {
    if (typeRepeat === "password") {
      setShowIconRepeat("eye");
      setTypeRepeat("text");
    } else {
      setShowIconRepeat("eye-slash");
      setTypeRepeat("password");
    }
  };

  return (
    <>
      <ModalButton
        isOpen={showUserModel}
        setIsOpen={setModalstate}
        handleOpenModal={() => {
          // setIsOpen(!isOpen)
          handleUserFormModel(true);
        }}
        modalTitle={formType === "update" ? "Update User" : "Create User"}
        iconname={"bus"}
        handleOnClose={handleOnClose}
        modalBody={
          <MDBModalBody className="mx-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="fw-bold py-1 d-block">
                  First Name
                  <span className="text-danger">*</span>
                </label>
                <input
                  placeholder="First Name"
                  type="text"
                  className="form-control mb-2"
                  {...register("firstName", {
                    required: true,
                    maxLength: 50,
                  })}
                />

                {errors.firstName && (
                  <span className="error_msg">
                    Please enter user's first name
                  </span>
                )}

                <label className="fw-bold py-1 d-block">
                  Last Name
                  <span className="text-danger">*</span>
                </label>
                <input
                  placeholder="Last Name"
                  type="text"
                  className="form-control mb-2"
                  {...register("lastName", {
                    required: true,
                    maxLength: 50,
                  })}
                />

                {errors.lastName && (
                  <span className="error_msg">
                    Please enter user's last name
                  </span>
                )}

                <label className="fw-bold py-1 d-block">
                  Email
                  <span className="text-danger">*</span>
                </label>
                <MDBTooltip
                  placement="right"
                  tag="span"
                  title="Email must be in the format of one or more characters followed by @ followed by one or more characters followed by . followed by one or more characters"
                >
                  <input
                    placeholder="Email"
                    type="email"
                    className="form-control mb-2"
                    {...register("email", {
                      required: true,
                      pattern:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                    disabled={formType === "update"}
                  />
                </MDBTooltip>

                {errors.email && (
                  <span className="error_msg">Please enter user's email</span>
                )}

                <label className="fw-bold py-1 d-block">
                  {formType === "update" ? "Your Password" : "Password"}
                  {formType === "create" && (
                    <span className="text-danger">*</span>
                  )}
                </label>
                <MDBTooltip
                  placement="right"
                  tag="span"
                  title="Password must be 6-15 characters long, contain at least one numeric digit, one uppercase and one lowercase letter"
                >
                  <div className="d-flex align-items-center form-control">
                    <input
                      placeholder="Password"
                      type={type}
                      className="  w-100 border-0"
                      {...(formType === "update"
                        ? {
                            ...register("oldPassword", {
                              required: false,
                            }),
                          }
                        : {
                            ...register("password", {
                              required: true,
                              // pattern:
                              // 	/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                            }),
                          })}
                    />

                    <MDBIcon
                      className="eye-icon"
                      far
                      icon={showIcon}
                      onClick={handleToggle}
                    />
                  </div>
                </MDBTooltip>
                {formType === "update"
                  ? errors.oldPassword && (
                      <span className="error_msg">
                        Please set your password
                      </span>
                    )
                  : errors.password && (
                      <span className="error_msg">
                        Please set user's password
                      </span>
                    )}
                <label className="fw-bold py-1 d-block">
                  {formType === "update" ? "New Password" : "Retype Password"}
                  {formType === "create" && (
                    <span className="text-danger">*</span>
                  )}
                </label>
                <div className="d-flex align-items-center form-control">
                  <input
                    type={typeRepeat}
                    className=" w-100 border-0"
                    placeholder={
                      formType === "update" ? "New Password" : "Retype Password"
                    }
                    {...(formType === "update"
                      ? {
                          ...register("newPassword", {
                            validate: (value) =>
                              value === password.current ||
                              "Please set new password",
                          }),
                        }
                      : {
                          ...register("repeatPassword", {
                            validate: (value) =>
                              value === password.current ||
                              "The passwords do not match",
                          }),
                        })}
                  />
                  <MDBIcon
                    className="eye-icon"
                    far
                    icon={showIconRepeat}
                    onClick={handleToggleRepeat}
                  />
                </div>

                {formType === "update"
                  ? errors.newPassword && (
                      <span className="error_msg">
                        {errors.newPassword.message}
                      </span>
                    )
                  : errors.repeatPassword && (
                      <span className="error_msg">
                        {errors.repeatPassword.message}
                      </span>
                    )}

                <label className="fw-bold py-1 d-block">Phone No.</label>
                <input
                  placeholder="+63 XXXX XXXX"
                  type="tel"
                  className="form-control mb-2"
                  {...register("phoneNumber", {
                    required: false,
                    maxLength: 12,
                    // pattern: /^\+63[0-9]{4}[0-9]{4}[0-9]{2}$/,
                  })}
                />
                {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}

                <label className="fw-bold py-1 d-block">
                  Role
                  <span className="text-danger">*</span>
                </label>

                <select
                  //   defaultValue={getValues("roleId")}
                  className="form-select mb-2"
                  {...register("roleId")}
                >
                  <option>Select Role</option>
                  {roles.length &&
                    roles.map((role) => {
                      return (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      );
                    })}
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
                >
                  Save
                </MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModalBody>
        }
      >
        <span onClick={() => handleFormType("create")}>Create User</span>
      </ModalButton>
    </>
  );
}
