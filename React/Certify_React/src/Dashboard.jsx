import React, { useEffect, useState } from "react";
import API from "../api/axios";
import Carousel from "../components/Carousel";
import Calendar from "../components/Calendar";
import BookingForm from "../components/BookingForm";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [sort, setSort] = useState("date");

  const load = async () => {
    try {
      const res = await API.get(`/api/dashboard?sort=${sort}`);
      setBookings(res.data.bookings || []);
    } catch (err) {
      setBookings([]);
    }
  };

  useEffect(() => { load(); }, [sort]);

  return (
    <div className="ms-3 me-3 mb-5 mt-5">
      <Carousel />

      <div className="container mt-5">
        <div className="ms-3 me-3 mb-5">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h2>Welcome back!</h2>
            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#bookingForm">
              ➕ Add a Booking
            </button>
          </div>

          <div className="mb-4">
            <label htmlFor="sort" className="fw-bold">Sort by:</label>
            <select id="sort" className="form-select w-auto d-inline-block ms-2" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="date">Date</option>
              <option value="artist">Artist</option>
              <option value="venue">Venue</option>
            </select>
          </div>

          <div className="row">
            <div className="col-lg-8">
              <h3 className="mb-4 fw-bold text-dark">Your Bookings</h3>
              <div className="table-responsive shadow-lg rounded">
                <table className="table align-middle text-center">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th>Receipt ID</th>
                      <th>Venue</th>
                      <th>Artist</th>
                      <th>Date</th>
                      <th>Time Slot</th>
                      <th>Amount Paid</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody className="bg-light">
                    {bookings.map(b => (
                      <tr key={b._id} className="border-bottom">
                        <td><b>{b.receipt_id}</b></td>
                        <td>{b.venue?.name}</td>
                        <td>{b.artist_name}</td>
                        <td>{new Date(b.date).toISOString().slice(0,10)}</td>
                        <td>{b.time_slot}</td>
                        <td className="fw-bold text-success">₱{(b.amount_expected || 0).toLocaleString()}</td>
                        <td><span className={`badge ${b.status === "Paid" ? "bg-success" : "bg-secondary"} p-2`}>{b.status}</span></td>
                        <td className="d-flex gap-2 justify-content-center">
                          <a className="btn btn-info btn-sm" href={`/receipt/${b._id}`}>View</a>
                          <button className="btn btn-danger btn-sm" onClick={async () => {
                            try {
                              await API.post(`/api/cancel_booking/${b._id}`);
                              window.__showFlash && window.__showFlash("Booking has been cancelled.", "info");
                              load();
                            } catch (err) {
                              window.__showFlash && window.__showFlash("Cancel failed", "danger");
                            }
                          }}>Cancel</button>
                        </td>
                      </tr>
                    ))}
                    {bookings.length === 0 && <tr><td colSpan="8">No bookings yet</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-lg-4 mb-5 pt-5">
              <Calendar />
            </div>
          </div>

          <BookingForm onBooked={load} />

        </div>
      </div>
    </div>
  );
}
