"use client";

import { useWebSocket } from "../utils/websocket";
import ChatBox from "../components/ChatBox";
import MessageInput from "../components/MessageInput";
import ConnectionStatus from "../components/ConnectionStatus";

export default function Home() {
    const { messages, sendMessage, status } = useWebSocket("ws://localhost:8080");

    return (
        <div className="max-w-lg mx-auto mt-10 p-4 border rounded-lg shadow-lg">
            <h1 className="text-xl font-bold mb-2">Real-Time Chat</h1>
            <ConnectionStatus status={status} />
            <ChatBox messages={messages} />
            <MessageInput sendMessage={sendMessage} />
        </div>
    );
}
