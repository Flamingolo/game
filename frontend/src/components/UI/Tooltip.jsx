import React, { useState } from "react";

const Tooltip = ({ text, children }) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    return (
        <div
            className="tooltip-container"
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
        >
            {children}
            {isTooltipVisible && (
                <div className="tooltip-text">  {/* Define tooltip styles in separate CSS */}
                    {text}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
