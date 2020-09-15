import React, { useState } from "react";
import VehicleDataService from "../services/VehicleService";

const AddVehicle = () => {
  const initialVehicleState = {
    id: null,
    regNo: "",
    description: "",
    fuel: "",
    bookingStatus: false,
    charges: "",
  };
  const [vehicle, setVehicle] = useState(initialVehicleState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  const saveVehicle = () => {
    var data = {
      id: null,
      regNo: vehicle.regNo,
      description: vehicle.description,
      fuel: vehicle.fuel,
      bookingStatus: false,
      charges: vehicle.charges,
    };

    VehicleDataService.create(data)
      .then((response) => {
        setVehicle({
          id: response.data.id,
          description: response.data.description,
          fuel: response.data.fuel,
          bookingStatus: response.data.bookingStatus,
          charges: response.data.charges,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newVehicle = () => {
    setVehicle(initialVehicleState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newVehicle}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="regNo">Reg No</label>
            <input
              type="text"
              className="form-control"
              id="regNo"
              required
              value={vehicle.regNo}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={vehicle.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="fuel">Fuel</label>
            <input
              type="text"
              className="form-control"
              id="fuel"
              required
              value={vehicle.fuel}
              onChange={handleInputChange}
              name="fuel"
            />
          </div>
          <div className="form-group">
            <label htmlFor="charges">Charges</label>
            <input
              type="text"
              className="form-control"
              id="charges"
              required
              value={vehicle.charges}
              onChange={handleInputChange}
              name="charges"
            />
          </div>

          <button onClick={saveVehicle} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddVehicle;
