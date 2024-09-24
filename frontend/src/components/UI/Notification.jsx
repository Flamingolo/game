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

    return (
        <div className={`notification ${type}`}>  {/* Define notification styles in separate CSS */}
            {message}
        </div>
    );
};

export default Notification;
