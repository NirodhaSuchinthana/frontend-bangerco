import React, { useState, useEffect } from "react";
import VehicleDataService from "../services/VehicleService";

const Vehicle = (props) => {
  const initialVehicleState = {
    id: null,
    regNo: "",
    description: "",
    fuel: "",
    bookingStatus: false,
    charges: "",
  };
  const [currentVehicle, setCurrentVehicle] = useState(initialVehicleState);
  const [message, setMessage] = useState("");

  const getVehicle = (id) => {
    VehicleDataService.get(id)
      .then((response) => {
        setCurrentVehicle(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getVehicle(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentVehicle({ ...currentVehicle, [name]: value });
  };

  const updateBookingStatus = (status) => {
    var data = {
      id: currentVehicle.id,
      regNo: currentVehicle.regNo,
      description: currentVehicle.description,
      fuel: currentVehicle.fuel,
      charges: currentVehicle.charges,
      bookingStatus: true,
    };

    VehicleDataService.update(currentVehicle.id, data)
      .then((response) => {
        setCurrentVehicle({ ...currentVehicle, published: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateVehicle = () => {
    VehicleDataService.update(currentVehicle.id, currentVehicle)
      .then((response) => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteVehicle = () => {
    VehicleDataService.remove(currentVehicle.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/tutorials");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentVehicle ? (
        <div className="edit-form">
          <h4>Vehicle</h4>
          <form>
            <div className="form-group">
              <label htmlFor="regNo">Reg No</label>
              <input
                type="text"
                className="form-control"
                id="regNo"
                name="regNo"
                value={currentVehicle.regNo}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentVehicle.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Booking Status:</strong>
              </label>
              {currentVehicle.isBookingStatus ? "Booked" : "Pending"}
            </div>
          </form>

          {currentVehicle.isBookingStatus ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateBookingStatus(false)}
            >
              Pending
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateBookingStatus(true)}
            >
              Booked
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteVehicle}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateVehicle}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Vehicle...</p>
        </div>
      )}
    </div>
  );
};

export default Vehicle;
