import React from "react";

type ConnectionStatusProps = {
    status: "Connected" | "Disconnected";
};

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ status }) => {
    return (
        <div className={`p-2 text-sm font-semibold ${status === "Connected" ? "text-green-600" : "text-red-600"}`}>
            {status}
        </div>
    );
};

export default ConnectionStatus;
