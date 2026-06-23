import { io } from "socket.io-client";

const socket = io("https://queue-cure-backend-7rf7.onrender.com");

export default socket;