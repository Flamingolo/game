import React, { useEffect } from "react";

const Notification = ({ message, type = 'info', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => {
            clearTimeout(timer);
        }, [onClose]});

    return (
        <div className={`notification ${type}`}>
            {message}
        </div>
    );
};

export default Notification;