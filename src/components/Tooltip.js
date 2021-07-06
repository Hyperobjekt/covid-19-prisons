import React from "react";
import ReactTooltip from "react-tooltip";

/**
 * Tooltip component used for maps
 * See theme.js for style overrides using `ucla-tooltip` class
 */
const Tooltip = (props) => {
  return (
    <ReactTooltip
      type="dark"
      backgroundColor="rgba(32,32,32,0.9)"
      className="ucla-tooltip"
      place="left"
      // offset={{ top: -15 }}
      {...props}
    />
  );
};

export default Tooltip;
