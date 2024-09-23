import React, { useState } from "react";

const Tooltip = ({ text, children }) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    return (
        <div
            className="tooltip-wrapper"
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
        >
            {children}
            {isTooltipVisible && <div className="tooltip">{text}</div>}
        </div>
    );
};

export default Tooltip;