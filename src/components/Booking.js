import React, { useState, useEffect } from "react";
import BookingDataService from "../services/BookingService";

const Booking = (props) => {
  const initialBookingState = {
    id: null,
    vehicle_id: "",
    user_id: "",
    booking_date: "",
    returning_date: "",
  };
  const [currentBooking, setCurrentBooking] = useState(initialBookingState);
  const [message, setMessage] = useState("");

  const getBooking = (id) => {
    BookingDataService.get(id)
      .then((response) => {
        setCurrentBooking(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getBooking(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentBooking({ ...currentBooking, [name]: value });
  };

  const updateBookingStatus = (status) => {
    var data = {
      id: currentBooking.id,
      vehicle_id: currentBooking.vehicle_id,
      user_id: currentBooking.user_id,
      booking_date: currentBooking.booking_date,
      returning_date: currentBooking.returning_date,
    };

    BookingDataService.update(currentBooking.id, data)
      .then((response) => {
        setCurrentBooking({ ...currentBooking, published: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateBooking = () => {
    BookingDataService.update(currentBooking.id, currentBooking)
      .then((response) => {
        console.log(response.data);
        setMessage("The booking was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteBooking = () => {
    BookingDataService.remove(currentBooking.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/bookings");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentBooking ? (
        <div className="edit-form">
          <h4>Booking</h4>
          <form>
            <div className="form-group">
              <label htmlFor="regNo">Vehicle No</label>
              <input
                type="text"
                className="form-control"
                id="regNo"
                name="regNo"
                value={currentBooking.vehicle_id}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">user id</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentBooking.user_id}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Booking Date:</strong>
              </label>
              {currentBooking.isBookingStatus ? "Booked" : "Pending"}
            </div>
          </form>

          {currentBooking.isBookingStatus ? (
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

          <button className="badge badge-danger mr-2" onClick={deleteBooking}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateBooking}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Booking...</p>
        </div>
      )}
    </div>
  );
};

export default Booking;
