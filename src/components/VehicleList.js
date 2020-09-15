import React, { useState, useEffect } from "react";
import VehicleDataService from "../services/VehicleService";
import { Link } from "react-router-dom";

const VehiclesList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchDescription, setsearchDescription] = useState("");

  useEffect(() => {
    retrieveVehicles();
  }, []);

  const onChangesearchDescription = (e) => {
    const searchDescription = e.target.value;
    setsearchDescription(searchDescription);
  };

  const retrieveVehicles = () => {
    VehicleDataService.getAll()
      .then((response) => {
        setVehicles(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveVehicles();
    setCurrentVehicle(null);
    setCurrentIndex(-1);
  };

  const setActiveVehicle = (tutorial, index) => {
    setCurrentVehicle(tutorial);
    setCurrentIndex(index);
  };

  const removeAllVehicles = () => {
    VehicleDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByDescription = () => {
    VehicleDataService.findByDescription(searchDescription)
      .then((response) => {
        setVehicles(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by description"
            value={searchDescription}
            onChange={onChangesearchDescription}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByDescription}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Vehicles List</h4>

        <ul className="list-group">
          {vehicles &&
            vehicles.map((vehicle, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveVehicle(vehicle, index)}
                key={index}
              >
                {vehicle.description}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllVehicles}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentVehicle ? (
          <div>
            <h4>Vehicle</h4>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentVehicle.description}
            </div>
            <div>
              <label>
                <strong>Reg No:</strong>
              </label>{" "}
              {currentVehicle.regNo}
            </div>
            <div>
              <label>
                <strong>Booking Status:</strong>
              </label>{" "}
              {currentVehicle.bookingStatus ? "Booked" : "Available"}
            </div>

            <Link
              to={"/vehicles/" + currentVehicle.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Vehicle...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehiclesList;
