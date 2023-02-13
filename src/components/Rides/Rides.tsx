import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBCol, MDBIcon, MDBRow } from "mdb-react-ui-kit";

import Layout from "../Layout/Layout";
import Listings from "./Listings";
import Search from "../Toolbar/Search";
import RideService from "../../services/RideService";
import CreateRide from "./CreateRide";
import "./Rides.css";
import {
  LISTING_ORDER,
  INITIAL_PAGE_OFFSET,
  ITEMS_PER_PAGE,
  USER_ROLES,
} from "../../common/constants";
import { setRides } from "../../store/reducers/rides-reducer";
import { RootState } from "../../store";
import dayjs from "dayjs";

const initialTableFilters: GenericObject = {
  order: LISTING_ORDER,
  from: INITIAL_PAGE_OFFSET,
  to: ITEMS_PER_PAGE,
};

export default function Rides(): JSX.Element {
  const dispatch = useDispatch();

  const [itemsPerPage, setItemsPerPage] = useState<number>(ITEMS_PER_PAGE);
  const [pageOffset, setPageOffset] = useState<number>(0);
  const [options, setOptions] = useState<GenericObject[]>([
    {
      filterVal: "firstName",
      readableValue: "First Name",
    },
    {
      filterVal: "email",
      readableValue: "Email",
    },
  ]);
  const [rideDirection, setRideDirection] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [ridesStartDateTime, setRidesStartDateTime] = useState<Date>(
    dayjs().subtract(1, "hour").toDate()
  );
  const [ridesEndDateTime, setRidesEndDateTime] = useState<Date>(
    dayjs().set("hour", 23).set("minute", 59).toDate()
  );
  const [formType, setFormType] = useState<string>("create");
  const [showRideFormModel, setShowRideFormModel] = useState<boolean>(false);

  const [tableFilters, setTableFilters] = useState<GenericObject>({
    ...initialTableFilters,
    tripStartDateTime: dayjs(ridesStartDateTime).format("YYYY-MM-DD HH:mm"),
    tripEndDateTime: dayjs(ridesEndDateTime).format("YYYY-MM-DD HH:mm"),
  });

  async function getRides(reqTableFilters = tableFilters) {
    const allRides = await RideService.getRides(reqTableFilters);
    await dispatch(setRides(allRides));
  }

  const authReducer = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    getRides();
  }, []);

  React.useEffect(() => {
    getRides();
  }, [tableFilters.to, pageOffset]);

  function handleOption(event: React.ChangeEvent<any>) {
    /* setSelectedOptionValue(event.target.value)
		setTableFilters({
			...initialTableFilters,
			[selectedOptionValue]: searchValue,
		}) */
  }

  function handleStartDateTime(e: any) {
    console.log("start date time", dayjs(e).format("YYYY-MM-DD HH:mm"));

    setRidesStartDateTime(dayjs(e).toDate());
    setTableFilters({
      ...tableFilters,
      tripStartDateTime: dayjs(dayjs(e).toDate()).format("YYYY-MM-DD HH:mm"),
    });
  }

  function handleEndDateTime(e: any) {
    setRidesEndDateTime(dayjs(e).toDate());
    console.log("end date time", dayjs(e).format("YYYY-MM-DD HH:mm"));

    setTableFilters({
      ...tableFilters,
      tripEndDateTime: dayjs(dayjs(e).toDate()).format("YYYY-MM-DD HH:mm"),
    });
  }

  function handleDirectionFilter(e: React.ChangeEvent<any>) {
    setRideDirection(e.target.value);
    setTableFilters({
      ...tableFilters,
      direction: e.target.value,
    });
  }

  async function handleChangeRideStatus(
    e: React.ChangeEvent<HTMLInputElement>,
    rideId: string
  ) {
    //await RideServe
    console.log("called ride status change", e.target.checked, rideId);
    await RideService.updateRideStaus(rideId, e.target.checked);
    getRides();
  }

  function handleFilterRides() {
    getRides();
  }

  function handleSearchField(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    // setSearchValue(event.target.value)
    // setTableFilters({
    // 	...tableFilters,
    // 	[selectedOptionValue]: searchValue,
    // })

    // if (!event.target.value.length)
    // 	setTableFilters({ ...initialTableFilters })
  }

  async function handleSearchClick() {
    // if (!searchValue || !selectedOptionValue) return
    // await getUsers()
  }

  function handleItemsPerPage(event: React.ChangeEvent<any>): void {
    setItemsPerPage(event.target.value);
    setTableFilters({ ...tableFilters, to: event.target.value });
    setPageOffset(0);
    return;
  }

  function handlePageChange({ selected }: { selected: number }): void {
    setPageOffset(selected);
    setTableFilters({
      ...tableFilters,
      from: selected * itemsPerPage,
      to: itemsPerPage,
    });
  }

  function handleFormType(type: string, userId?: string) {
    setFormType(type);
  }

  function handleRideFormModel(showHideModel: boolean) {
    setShowRideFormModel(showHideModel);
  }

  async function handleDeleteRide(rideId: string) {
    await RideService.deleteRide(rideId);
    await getRides();
  }

  const currentUserRole = authReducer.user.role.name.toLowerCase();
  // const driverRole = USER_ROLES.Driver.toLowerCase()
  const userRole = USER_ROLES.User.toLowerCase();

  return (
    <Layout>
      {currentUserRole == userRole && Boolean(authReducer.user.isActive) && (
        <MDBRow className="mt-5 px-3 py-2 text-start bg-light d-flex justify-content-start flex-1 ">
          <MDBCol className="">
            <CreateRide
              getRides={getRides}
              showRideFormModel={showRideFormModel}
              formType={formType}
              handleFormType={handleFormType}
              handleRideFormModel={handleRideFormModel}
            />
          </MDBCol>
        </MDBRow>
      )}
      {currentUserRole == userRole && !Boolean(authReducer.user.isActive) && (
        <MDBRow>
          <MDBCol className="mt-5 px-3 py-2 text-start bg-light d-flex justify-content-start flex-1 ">
            <div className="moving-text-container">
              <p className="moving-text">
                <MDBIcon
                  icon="exclamation-triangle"
                  size="lg"
                  className="me-2"
                />
                You are currently inactive, please contact admin to activate
                your account.
              </p>
            </div>
          </MDBCol>
        </MDBRow>
      )}

      <Search
        page={"rides"}
        handleSearchClick={handleSearchClick}
        handleOption={handleOption}
        options={options}
        searchValue={searchValue}
        handleSearchField={handleSearchField}
        handleItemsPerPage={handleItemsPerPage}
        ridesStartDateTime={ridesStartDateTime}
        ridesEndDateTime={ridesEndDateTime}
        handleStartDateTime={handleStartDateTime}
        handleEndDateTime={handleEndDateTime}
        handleFilterRides={handleFilterRides}
        handleDirectionFilter={handleDirectionFilter}
      />
      <Listings
        perPageItems={itemsPerPage}
        handleFormType={handleFormType}
        handleRideFormModel={handleRideFormModel}
        handleDeleteRide={handleDeleteRide}
        handlePageChange={handlePageChange}
        handleChangeRideStatus={handleChangeRideStatus}
      />
    </Layout>
  );
}
