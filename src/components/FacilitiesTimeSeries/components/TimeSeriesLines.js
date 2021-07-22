import React, { useContext } from "react";
import { LineSeries, TooltipContext } from "@visx/xychart";

const accessors = {
  xAccessor: (d) => new Date(`${d.date}T00:00:00`),
  yAccessor: (d) => Number(d.value),
};

const TimeSeriesLines = ({ linesData }) => {
  const { tooltipOpen, tooltipData } = useContext(TooltipContext);
  console.log(tooltipOpen, tooltipData);

  return (
    <>
      {linesData.map(
        ({ id, lineData }, i) =>
          lineData.length > 0 && (
            <LineSeries
              key={i}
              dataKey={id}
              data={lineData}
              style={{
                opacity:
                  tooltipOpen && tooltipData
                    ? tooltipData.nearestDatum.key === id
                      ? 1
                      : 0.2
                    : 1,
              }}
              {...accessors}
            />
          )
      )}
    </>
  );
};

export default TimeSeriesLines;
