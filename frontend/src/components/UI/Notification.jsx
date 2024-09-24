import React, { useEffect } from "react";

const Notification = ({ message, type = 'info', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    const notificationStyle = {
        info: 'bg-blue-500',
        success: 'bg-green-500',
        error: 'bg-red-500'
    };

    return (
        <div className={`text-white p-4 rounded-lg fixed top-5 right-5 shadow-lg ${notificationStyle[type]}`}>
            {message}
        </div>
    );
};

export default Notification;
