import React, { useState } from "react";
import {
  MDBBtn,
  MDBModalBody,
  MDBSelect,
  MDBTimepicker,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import "./CreateRide.css";

export default function CreateRide(): JSX.Element {
  const [toggleModal, setToggleModal] = useState(false);
  const [time, setTime] = useState("");
  const [shuttle_type, setShuttle_type] =
    useState<React.SetStateAction<string>>("");

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const submitRide = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (shuttle_type === "") {
      alert("Please select shuttle type");
      return;
    }
    console.log("submit ride");
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
    { text: "Dna Micro", value: 9 },
  ];

  return (
    <>
      <MDBModalBody className="mx-3">
        {/* create user form */}
        <form className="mb-4">
          <div className="fw-bold">
            <label className="fw-bold py-1">Trip Date</label>
            <input
              type="date"
              name="date"
              className="form-control mb-2 fw-bold"
              placeholder="Enter Date"
            />

            <label className="fw-bold py-1">Shift Time </label>

            <MDBTimepicker
              inline
              inputLabel="hh:mm"
              format="12h"
              inputClasses="fw-bold mb-2 text-dark"
            />

            <label className="fw-bold py-1"> Shuttle Route Direction</label>
            <MDBSelect
              data={[
                {
                  text: "North",
                  value: 1,
                },
                {
                  text: "South",
                  value: 2,
                },
              ]}
              inputClassName="fw-bold mb-2"
              placeholder="Choose"
              onValueChange={(item: any) => {
                setShuttle_type(item.text);
              }}
            />

            <label className="fw-bold py-1"> Pick-up point</label>
            {shuttle_type === "North" ? (
              <MDBSelect
                data={NorthPoints}
                inputClassName="fw-bold mb-2"
                placeholder="Choose"
                onValueChange={(e) => {
                  console.log(e);
                }}
              />
            ) : (
              <MDBSelect
                data={SouthPoints}
                inputClassName="fw-bold mb-2"
                placeholder="Choose"
                onValueChange={(e) => {
                  console.log(e);
                }}
              />
            )}

            <label className="fw-bold py-1"> Destination</label>
            <MDBSelect
              data={SouthPoints}
              inputClassName="fw-bold"
              placeholder="Choose"
              onValueChange={(e) => {
                console.log(e);
              }}
            />
          </div>
        </form>
        <MDBModalFooter>
          <MDBBtn
            color="secondary"
            className="button_style px-4 border-0"
            onClick={() => setToggleModal(!toggleModal)}
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
    </>
  );
}
