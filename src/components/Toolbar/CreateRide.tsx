import React, { useState } from "react";
import { MDBBtn, MDBModalBody, MDBModalFooter } from "mdb-react-ui-kit";
import ModalButton from "./ModalButton";
import "./CreateRide.css";

export default function CreateRide(edit: any): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");
  const [shuttle_type, setShuttle_type] =
    useState<React.SetStateAction<string>>("");
  const [pickup, setPickup] = useState<React.SetStateAction<string>>("");
  const [destination, setDestination] =
    useState<React.SetStateAction<string>>("");
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const now = new Date();
  const [error, setError] = useState("");

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    const currentDate = `${now.getFullYear()}-${(
      "0" +
      (now.getMonth() + 1)
    ).slice(-2)}-${("0" + now.getDate()).slice(-2)}`;
    const selected = new Date(`${currentDate}T${time}:00`);
    if (selected > now) {
      setSelectedTime(selected);
      setError("");
    } else {
      setError("Invalid time, please select a time after the current time.");
      console.log(time);
    }
  };

  const submitRide = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (shuttle_type === "") {
      alert("Please select shuttle type");
      return;
    }
    console.log("submit ride");
    setIsOpen(!isOpen);
  };

  const NorthPoints: { text: string; value: number }[] = [
    {
      text: "Marigondon Crossing",
      value: 1,
    },
    { text: "Gaisano Grand Mall, Basak, Lapulapu", value: 2 },
    { text: "San Narciso Church, Consolacion", value: 3 },
    { text: "M.Lhuilleir, Guizo, Panagdait Hernan Cortes", value: 4 },
    { text: "Talamban", value: 5 },
    { text: "Camp Lapulapu Road, Apas", value: 6 },
    { text: "UCMA", value: 7 },
    { text: "DNA Micro", value: 8 },
  ];

  const SouthPoints: { text: string; value: number }[] = [
    { text: "Calamba Flyover, V. Rama", value: 1 },
    {
      text: "Jollibee Banawa Junction, Mama Susan's, V.Rama",
      value: 2,
    },
    { text: "Deca Homes, Tisa Arbees, Tisa", value: 3 },
    { text: "Gaisano, Tisa", value: 4 },
    { text: "Jollibee, Punta, Princesa, F. Llamas", value: 5 },
    { text: "Waiting Shed, Suba, Pasil", value: 6 },
    { text: "T.Padilla Bgy Hall", value: 7 },
    { text: "Baseline, Juana Osmena", value: 8 },
    { text: "DNA Micro", value: 9 },
  ];

  return (
    <>
      {/* <MDBRow className="mt-5 px-3 py-2 text-start bg-light d-flex justify-content-start flex-1 ">
        <MDBCol className=""> */}
      <ModalButton
        isOpen={isOpen}
        handleOpenModal={handleOpenModal}
        modalTitle="Create Ride"
        iconname={"bus"}
        modalBody={
          <MDBModalBody className="mx-3">
            {/* create user form */}
            <form className="mb-4">
              <div className="fw-bold">
                <label className="fw-bold py-1">Trip Date</label>
                <input
                  type="date"
                  name="date"
                  min={new Date().toISOString().split("T")[0]}
                  // value={new Date().toISOString().split("T")[0]}
                  max={
                    new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={(e) => console.log(e.target.value)}
                  className="form-control mb-2 "
                  placeholder="Enter Date"
                />

                <label className="form-check-label py-1 ">Shift Time </label>

                <input
                  type="time"
                  name="time"
                  className="form-control mb-2"
                  placeholder="Enter Time"
                  value={
                    selectedTime ? selectedTime.toTimeString().slice(0, 5) : ""
                  }
                  onChange={handleTimeChange}
                />
                {error && <span className="error_msg">{error}</span>}

                <label className="form-check-label py-1 d-block mt-2">
                  {" "}
                  Shuttle Direction
                </label>

                <div className="form-check form-check-inline mb-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Direction"
                    onChange={(e) => setShuttle_type(e.target.value)}
                    value="North"
                  />
                  <label className="fw-normal">North</label>
                </div>
                <div className="form-check form-check-inline mb-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Direction"
                    onChange={(e) => setShuttle_type(e.target.value)}
                    value="South"
                  />
                  <label className="fw-normal">South</label>
                </div>

                <label className="fw-bold py-1 d-block"> Pick-up point</label>
                <select
                  className="form-select mb-2"
                  aria-label="Default select example"
                  onChange={(e) => setPickup(e.target.value)}
                >
                  {shuttle_type === "North"
                    ? NorthPoints.map((point) => (
                        <option key={point.value} value={point.text}>
                          {point.text}
                        </option>
                      ))
                    : SouthPoints.map((point) => (
                        <option key={point.value} value={point.text}>
                          {point.text}
                        </option>
                      ))}
                </select>

                <label className="fw-bold py-1"> Destination</label>

                {pickup === "DNA Micro" ? (
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setDestination(e.target.value)}
                  >
                    {shuttle_type === "North"
                      ? NorthPoints.filter(
                          (point) => point.text !== "DNA Micro"
                        ).map((point) => (
                          <option key={point.value} value={point.text}>
                            {point.text}
                          </option>
                        ))
                      : SouthPoints.filter(
                          (point) => point.text !== "DNA Micro"
                        ).map((point) => (
                          <option key={point.value} value={point.text}>
                            {point.text}
                          </option>
                        ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    className="form-control mb-2"
                    defaultValue={"DNA Micro"}
                    disabled
                  />
                )}
              </div>
            </form>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                className="button_style px-4 border-0"
                onClick={() => setIsOpen(false)}
              >
                Close
              </MDBBtn>
              <MDBBtn
                color="info"
                className="button_style px-4"
                onClick={(e: any) => submitRide(e)}
              >
                Save
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalBody>
        }
      >
        Create Ride
      </ModalButton>

      {/* </MDBCol>
      </MDBRow> */}
    </>
  );
}
