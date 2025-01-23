"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const ws = new ws_1.WebSocketServer({ port: 8081 });
// Create an array of the clients
let allSockets = [];
ws.on("connection", function (socket) {
    socket.on("message", (message) => {
        var _a;
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
            const currentRoom = (_a = allSockets.find((s) => s.socket === socket)) === null || _a === void 0 ? void 0 : _a.room;
            console.log("Current room:", currentRoom);
            // If the user is in a room, send the message to everyone in the same room
            if (currentRoom) {
                console.log(`Broadcasting message to room: ${currentRoom}`);
                allSockets.forEach((s) => {
                    if (s.room === currentRoom) {
                        console.log(`Sending message to ${s.socket}`);
                        console.log("sending " + parsedMessage.message);
                        s.socket.send(JSON.stringify({ type: "chat", message: parsedMessage.message })); // Sending to everyone in the room
                    }
                });
            }
            else {
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
