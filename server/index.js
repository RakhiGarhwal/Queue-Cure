const fs = require("fs");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Default State
let queueState = {
  patients: [],
  completedPatients: [],
  currentToken: 0,
  nextToken: 1,
  avgConsultTime: 10,
};

// Load Previous Data
if (fs.existsSync("queueData.json")) {
  queueState = JSON.parse(
    fs.readFileSync("queueData.json")
  );
}

// Save Function
function saveQueue() {
  fs.writeFileSync(
    "queueData.json",
    JSON.stringify(queueState, null, 2)
  );
}

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.emit("queue_update", queueState);

  // Add Patient
  socket.on("add_patient", (name) => {
    queueState.patients.push({
      token: queueState.nextToken++,
      name,
      status: "waiting",
      addedAt: new Date().toLocaleTimeString(),
    });

    saveQueue();

    io.emit("queue_update", queueState);
  });

  // Call Next Patient
  socket.on("call_next", () => {

    // Previous serving patient complete
    const servingPatient = queueState.patients.find(
      (p) => p.status === "serving"
    );

    if (servingPatient) {
      servingPatient.status = "completed";

      queueState.completedPatients.push({
        ...servingPatient,
        completedAt: new Date().toLocaleTimeString(),
      });
    }

    // Next waiting patient
    const nextPatient = queueState.patients.find(
      (p) => p.status === "waiting"
    );

    if (nextPatient) {
      nextPatient.status = "serving";
      queueState.currentToken = nextPatient.token;
    }

    saveQueue();

    io.emit("queue_update", queueState);
  });
});

server.listen(4000, () => {
  console.log("Server running on port 4000");
});