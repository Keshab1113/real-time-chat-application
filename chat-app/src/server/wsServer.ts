import { WebSocketServer, WebSocket, RawData } from "ws";


const wss = new WebSocketServer({ port: 8080 });

const clients = new Set<WebSocket>();

wss.on("connection", (ws: WebSocket) => {
    clients.add(ws);
    console.log("New client connected");

    ws.on("message", (message: RawData) => {
        // Convert message to string
        const textMessage = message.toString();
        console.log(`Received: ${textMessage}`);

        // Broadcast the message to all clients
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(textMessage);
            }
        });
    });

    ws.on("close", () => {
        clients.delete(ws);
        console.log("Client disconnected");
    });
});

console.log("WebSocket server running on ws://localhost:8080");
