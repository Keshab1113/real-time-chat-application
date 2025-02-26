"use client"
import { useEffect, useState } from "react";

export const useWebSocket = (url: string) => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);
    const [status, setStatus] = useState<"Connected" | "Disconnected">("Disconnected");

    useEffect(() => {
        const socket = new WebSocket(url);
        
        socket.onopen = () => setStatus("Connected");
        socket.onclose = () => setStatus("Disconnected");

        socket.onmessage = (event) => {
            setMessages((prev) => [...prev, event.data]);
        };

        setWs(socket);

        return () => socket.close();
    }, [url]);

    const sendMessage = (message: string) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(message);
        }
    };

    return { messages, sendMessage, status };
};
