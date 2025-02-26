"use client"
import React, { useState } from "react";

type MessageInputProps = {
    sendMessage: (message: string) => void;
};

const MessageInput: React.FC<MessageInputProps> = ({ sendMessage }) => {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (message.trim()) {
            sendMessage(message);
            setMessage("");
        }
    };

    return (
        <div className="flex mt-4">
            <input
                className="border flex-1 p-2 rounded-md"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleSend}
            >
                Send
            </button>
        </div>
    );
};

export default MessageInput;
