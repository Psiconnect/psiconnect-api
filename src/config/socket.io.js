import { Server as SocketServer } from "socket.io";

const socket = (httpServer) => {
  const io = new SocketServer(httpServer, {
    cors: "*",
  });

  io.on("connection", (socket) => {
    console.log(socket.id);
  });
};

export default socket;
