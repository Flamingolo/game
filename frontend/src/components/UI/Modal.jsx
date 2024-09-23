import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button onClick={onClose} className="modal-close">X</button>
                </div>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    )
};

export default Modal;