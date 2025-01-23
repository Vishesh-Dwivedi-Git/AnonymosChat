import { WebSocketServer, WebSocket } from "ws";

const ws = new WebSocketServer({ port: 8081 });

interface User {
  socket: WebSocket;
  room: string;
}

// Create an array of the clients
let allSockets: User[] = [];

ws.on("connection", function (socket) {
  socket.on("message", (message) => {
    // @ts-ignore
    const parsedMessage = JSON.parse(message);
    console.log("Received:", parsedMessage);

    if (parsedMessage.type === "join") {
      // Join logic: Store the room for the socket
      allSockets.push({ socket: socket, room: parsedMessage.room });
      console.log(`User joined room: ${parsedMessage.room}`);
    }

    if (parsedMessage.type === "chat") {
      console.log("Chat message received");

      // Broadcast the message to all clients in the room
      const currentRoom = allSockets.find((s) => s.socket === socket)?.room;
      console.log("Current room:", currentRoom);

      // If the user is in a room, send the message to everyone in the same room
      if (currentRoom) {
        console.log(`Broadcasting message to room: ${currentRoom}`);
        allSockets.forEach((s) => {
          if (s.room === currentRoom) {
            console.log(`Sending message to ${s.socket}`);
            console.log("sending "+parsedMessage.message);
            s.socket.send(JSON.stringify({type:"chat" , message:parsedMessage.message})); // Sending to everyone in the room
          }
        });
      } else {
        console.log("User not found in any room");
      }
    }
  });

  socket.on("close", () => {
    // Cleanup when a socket disconnects
    allSockets = allSockets.filter((s) => s.socket !== socket);
    console.log("Socket disconnected, removing from rooms.");
  });
});
