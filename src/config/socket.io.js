import { Server as SocketServer } from "socket.io";
import httpServer from "./http.js";

const io = new SocketServer(httpServer);

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("message", (body) => {
     console.log(body);
    });
  });