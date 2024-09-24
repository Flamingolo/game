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
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full mt-2 bg-gray-700 text-white text-sm p-2 rounded shadow-lg z-50">
                    {text}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
