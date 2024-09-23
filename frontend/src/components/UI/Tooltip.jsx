import React, { useState } from "react";

const Tooltip = ({ text, children }) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
        >
            {children}
            {isTooltipVisible && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-700 text-white text-sm p-2 rounded shadow-lg">
                    {text}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
