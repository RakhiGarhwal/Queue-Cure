import { useEffect, useState } from "react";
import socket from "./socket";

function History() {
  const [queue, setQueue] = useState({
    completedPatients: [],
  });

  useEffect(() => {
    socket.on("queue_update", (data) => {
      setQueue(data);
    });

    return () => {
      socket.off("queue_update");
    };
  }, []);

  return (
    <div style={{ padding: "30px" }}>

      <h1
        style={{
          color: "#1e3a8a",
          fontSize: "48px",
          marginBottom: "25px",
        }}
      >
        📋 Patient History
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "20px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
            minWidth: "200px",
          }}
        >
          <h2>{queue.completedPatients.length}</h2>
          <p>Total Records</p>
        </div>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#eef4ff",
              }}
            >
              <th style={{ padding: "18px" }}>Token</th>
              <th style={{ padding: "18px" }}>Patient Name</th>
              <th style={{ padding: "18px" }}>Completed At</th>
              <th style={{ padding: "18px" }}>Status</th>
            </tr>
          </thead>

          <tbody>
            {queue.completedPatients.map((patient) => (
              <tr
                key={patient.token}
                style={{
                  borderBottom: "1px solid #eee",
                }}
              >
                <td style={{ padding: "18px" }}>
                  #{patient.token}
                </td>

                <td style={{ padding: "18px" }}>
                  {patient.name}
                </td>

                <td style={{ padding: "18px" }}>
                  {patient.completedAt}
                </td>

                <td style={{ padding: "18px" }}>
                  <span
                    style={{
                      background: "#dcfce7",
                      color: "#166534",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    Completed
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default History;