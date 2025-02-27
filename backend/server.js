const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: "*",  // Make sure this matches your frontend's URL
    methods: ["GET", "POST"]
}));

const io = new Server(server, {
    cors: {
        origin: "*",  // Ensure this matches frontend origin
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("chat", (payload) => {
        io.emit("chat", payload);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(5000, () => console.log("Server is running on port 5000..."));
