"use client";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";

// Connect to Socket.io server
const socket = io("https://symmetrical-disco-jv7vgjjvv5w2pxj9-5000.app.github.dev", {
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000
});

const userName = nanoid(4); // Unique ID for each user

export default function Home() {
    const [message, setMessage] = useState<string>("");
    const [chat, setChat] = useState<{ message: string; userName: string }[]>([]);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Handle sending messages
    const handleSend = () => {
        if (message.trim()) {
            socket.emit("chat", { message, userName });
            setMessage("");
        }
    };

    // Handle pressing Enter key
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSend();
    };

    useEffect(() => {
        // Connection status updates
        socket.on("connect", () => setIsConnected(true));
        socket.on("disconnect", () => setIsConnected(false));

        // Receive chat messages
        socket.on("chat", (payload: { message: string; userName: string }) => {
            setChat((prevChat) => [...prevChat, payload]);

            // Auto-scroll to the latest message
            setTimeout(() => {
                if (chatContainerRef.current) {
                    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                }
            }, 100);
        });

        return () => {
            socket.off("chat");
            socket.off("connect");
            socket.off("disconnect");
        };
    }, []);

    return (
        <div className="max-w-lg mx-auto mt-10 p-4 border rounded-lg shadow-lg bg-white">
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-xl font-bold text-black">Group Chat</h1>
                <span className={`text-sm font-medium ${isConnected ? "text-green-500" : "text-red-500"}`}>
                    {isConnected ? "🟢 Connected" : "🔴 Disconnected"}
                </span>
            </div>

            {/* Chat Messages */}
            <div ref={chatContainerRef} className="h-80 overflow-y-auto border rounded-lg p-4 bg-gray-100">
                {chat.length === 0 ? (
                    <p className="text-center text-gray-500">No messages yet...</p>
                ) : (
                    chat.map((payload, index) => (
                        <div key={index} className={`flex ${payload.userName === userName ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`p-2 my-1 rounded-md shadow max-w-[75%] ${
                                    payload.userName === userName ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
                                }`}
                            >
                                <span className="font-semibold capitalize">{payload.userName}:</span> {payload.message}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Message Input */}
            <div className="flex mt-4">
                <input
                    className="border flex-1 p-2 rounded-md text-black"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown} // Enter to send
                    placeholder="Type your message..."
                />
                <button
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    onClick={handleSend}
                >
                    Send
                </button>
            </div>
        </div>
    );
}
