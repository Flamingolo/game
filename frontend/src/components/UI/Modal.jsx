import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-backdrop">  {/* Define custom CSS for modal backdrop */}
            <div className="modal-container">  {/* Define custom CSS for modal container */}
                <div className="modal-header">  {/* Custom class for modal header */}
                    <h2>{title}</h2>
                    <button onClick={onClose} className="modal-close">X</button>  {/* Custom class for close button */}
                </div>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
