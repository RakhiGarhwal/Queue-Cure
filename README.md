# Queue Cure 🏥

Queue Cure is a real-time patient queue management system built to reduce waiting confusion in clinics and hospitals.

## 🚀 Live Demo

Frontend: https://queue-cure-sage.vercel.app

## 📌 Problem Statement

Many clinics still manage patients using manual token systems. Patients have no visibility into their waiting time, while receptionists manually manage the queue.

Queue Cure solves this by providing real-time queue updates across multiple screens.

## ✨ Features

### Receptionist Dashboard

* Add new patients
* Generate tokens automatically
* Call next patient
* View current serving token
* Monitor queue status

### Patient Waiting Room

* View currently serving token
* Check tokens ahead in queue
* See estimated waiting time
* Real-time updates without refreshing

### Additional Features

* Real-time synchronization using Socket.IO
* Queue persistence using JSON storage
* Patient history tracking

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Socket.IO Client

### Backend

* Node.js
* Express.js
* Socket.IO

### Deployment

* Frontend: Vercel
* Backend: Render

## 🔄 Socket Events

### Client → Server

* add_patient
* call_next

### Server → Client

* queue_update

## 📂 Project Structure

Queue-Cure/
├── client/
│ ├── src/
│ └── package.json
├── server/
│ ├── index.js
│ ├── queueData.json
│ └── package.json

## 🧠 Future Improvements

* Editable consultation time
* SMS notifications
* Doctor dashboard
* Multi-doctor support
* Database integration

## 👩‍💻 Developer

Rakhi Garhwal
B.Tech CSE (AI)
KIET Group of Institutions
