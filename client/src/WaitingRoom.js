import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import socket from "./socket";

function WaitingRoom() {
  const [queue, setQueue] = useState({
    patients: [],
    currentToken: 0,
  });

  useEffect(() => {
    socket.on("queue_update", (data) => {
      setQueue(data);
    });

    return () => socket.off("queue_update");
  }, []);

  const currentPatient = queue.patients.find(
    (p) => p.token === queue.currentToken
  );

  const waitingPatients = queue.patients.filter(
    (p) => p.status === "waiting"
  );

  const estimatedWait = waitingPatients.length * 10;

  return (
    <div className="dashboard">

      <div className="sidebar">

        <div className="logo">
          🏥 Queue Cure
        </div>

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
          style={{
            textDecoration: "none",
            display: "block",
            background: "#dbeafe"
          }}
        >
          Patient View
        </Link>

        <div
          style={{
            marginTop: "80px",
            textAlign: "center",
            color: "white",
          }}
        >
          <h3>🏥 Smart Clinic</h3>
          <p>Live Queue Tracking</p>
        </div>

      </div>

      <div className="main">

        <h1 className="title">
          Patient Waiting Room
        </h1>

        <div className="grid">

          <div>

            <div className="card">

              <h2>Currently Serving</h2>

              <div className="big-token">
                #{queue.currentToken}
              </div>

              <h2>
                {currentPatient
                  ? currentPatient.name.toUpperCase()
                  : "NO PATIENT"}
              </h2>

            </div>

            <div className="card queue-table">

              <h2>Waiting Queue</h2>

              {waitingPatients.length === 0 ? (
                <p>No patients waiting</p>
              ) : (
                waitingPatients.map((patient) => (
                  <div
                    key={patient.token}
                    className="queue-row"
                  >
                    <span>
                      <b>#{patient.token}</b>
                    </span>

                    <span>
                      {patient.name}
                    </span>
                  </div>
                ))
              )}

            </div>

          </div>

          <div>

            <div className="stat">
              <h2>
                {waitingPatients.length}
              </h2>

              <p>Patients Ahead</p>
            </div>

            <br />

            <div className="stat">
              <h2>
                {estimatedWait} mins
              </h2>

              <p>Estimated Wait</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default WaitingRoom;