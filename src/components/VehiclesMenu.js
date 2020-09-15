import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

import AddVehicle from "./AddVehicle";
import VehiclesList from "./VehicleList";
import Vehicle from "./Vehicle";

function VehiclesMenu() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/vehicles" className="navbar-brand">
          Banger and Co
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/vehicles"} className="nav-link">
              Vehicles
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/vehicles"]} component={VehiclesList} />
          <Route exact path="/add" component={AddVehicle} />
          <Route path="/vehicles/:id" component={Vehicle} />
        </Switch>
      </div>
    </div>
  );
}

export default VehiclesMenu;
