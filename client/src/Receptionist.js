import "./App.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import socket from "./socket";


function Receptionist() {

const [name, setName] = useState("");

const [search, setSearch] = useState("");

const [queue, setQueue] = useState({
  patients: [],
  currentToken: 0,
});


useEffect(() => {
socket.on("queue_update", (data) => {
setQueue(data);
});


return () => {
  socket.off("queue_update");
};


}, []);

const addPatient = () => {
if (name.trim()) {
socket.emit("add_patient", name);
setName("");
}
};

const callNext = () => {
socket.emit("call_next");
};

const currentPatient = queue.patients.find(
(p) => p.token === queue.currentToken
);

return ( <div className="dashboard"> <div className="sidebar"> <div className="logo">🏥 Queue Cure</div>


    <Link
      to="/"
      className="menu-item"
      style={{ textDecoration: "none", display: "block" }}
    >
      Receptionist
    </Link>

    <Link
      to="/waiting"
      className="menu-item"
      style={{ textDecoration: "none", display: "block" }}
    >
      Patient View
    </Link>
    <Link
  to="/history"
  className="menu-item"
  style={{ textDecoration: "none", display: "block" }}
>
  Patient History
</Link>
    <div
      style={{
        marginTop: "80px",
        textAlign: "center",
        color: "white",
      }}
    >
      <h3>🏥 Smart Clinic</h3>
      <p>Real-Time Patient Queue</p>
    </div>
    
  </div>

  <div className="main">
    <h1 className="title">Receptionist Dashboard</h1>

    <div className="grid">
      <div>
        <div className="card">
          <h2>Add New Patient</h2>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Patient Name"
          />

          <button
            className="add-btn"
            onClick={addPatient}
          >
            Add Patient
          </button>

          <br />
          <br />

          <button
            className="call-btn"
            onClick={callNext}
          >
            Call Next Patient
          </button>
        </div>

        <div className="card queue-table">
          <h2>Queue List</h2>

<input
  type="text"
  placeholder="Search patient..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #ddd",
  }}
/>

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 15px",
    fontWeight: "bold",
    color: "#2563eb",
    borderBottom: "2px solid #e5e7eb",
    marginBottom: "10px",
  }}
>
  <span>Token</span>
  <span>Patient Name</span>
  <span>Status</span>
</div>

          {queue.patients
  .filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  )
  .filter((patient) => patient.status !== "completed")
  .map((patient) => (
            <div
  key={patient.token}
  className="queue-row"
>
  <span>
    <b>#{patient.token}</b>
  </span>

  <span>{patient.name}</span>

  <span
  style={{
    background:
      patient.status === "serving"
        ? "#dcfce7"
        : "#fef3c7",

    color:
      patient.status === "serving"
        ? "#166534"
        : "#92400e",

    padding: "5px 12px",
    borderRadius: "20px",
    fontWeight: "bold",
  }}
>
  {patient.status === "serving"
    ? "🟢 Serving"
    : "🟡 Waiting"}
</span>
</div>
          ))}
        </div>
      </div>

      <div>
        <div className="card token-box">
          <h3
            style={{
              color: "#2563eb",
              textTransform: "uppercase",
            }}
          >
            Currently Serving
          </h3>

          <div className="big-token">
            #{queue.currentToken}
          </div>

          <h2>
            {currentPatient
              ? currentPatient.name.toUpperCase()
              : "NO PATIENT"}
          </h2>

          <div
            style={{
              display: "inline-block",
              marginTop: "15px",
              background: "#dcfce7",
              color: "#166534",
              padding: "8px 16px",
              borderRadius: "20px",
              fontWeight: "bold",
            }}
          >
            🟢 IN CONSULTATION
          </div>
        </div>

        <div className="stats">

  <div className="stat">
    <h2>{queue.patients.length}</h2>
    <p>Total Patients</p>
  </div>

  <div className="stat">
    <h2>
      {
        queue.patients.filter(
          (p) => p.status === "waiting"
        ).length
      }
    </h2>
    <p>Waiting</p>
  </div>

  <div className="stat">
    <h2>
      {queue.completedPatients?.length || 0}
    </h2>
    <p>Completed</p>
  </div>

  <div className="stat">
    <h2>{queue.avgConsultTime} mins</h2>
    <p>Avg Consultation</p>
  </div>

</div>
        

      </div>
     
    </div>
  </div>
</div>


);
}

export default Receptionist;
