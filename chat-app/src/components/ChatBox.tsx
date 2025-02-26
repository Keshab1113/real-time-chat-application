import React from "react";

type ChatBoxProps = {
    messages: string[];
};

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
    return (
        <div className="h-80 overflow-y-auto border rounded-lg p-4 bg-gray-100">
            {messages.map((msg, index) => (
                <div key={index} className="p-2 bg-white my-1 rounded-md shadow">
                    {msg}
                </div>
            ))}
        </div>
    );
};

export default ChatBox;
