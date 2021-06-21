import { csv } from "d3-fetch";
import { useCallback, useMemo } from "react";
import shallow from "zustand/shallow";
import useTimeSeriesStore from "../../components/FacilitiesTimeSeries/useTimeSeriesStore";

// TODO: confirm staff metrics
const groupMetrics = {
  residents: ["confirmed", "deaths", "active", "tested"],
  staff: ["confirmed", "deaths", "active", "tested"],
};

const parseTimeSeries = (timeSeries = {}) => {
  const result = {
    id: timeSeries.id,
    name: timeSeries.name,
    state: timeSeries.state,
  };

  ["residents", "staff"].forEach((grp) => {
    const metrics = groupMetrics[grp];

    metrics.forEach((metric) => {
      const accessor = grp + "_" + metric;
      const rateAccessor = accessor + "_rate";

      [accessor, rateAccessor].forEach((acc) => {
        const dataString = timeSeries[acc];

        result[acc] = !dataString
          ? []
          : dataString.split(";").map((keyValStr) => {
              const [date, value] = keyValStr.split("|");
              return { date, value };
            });
      });
    });
  });

  return result;
};

export default function useTimeSeriesData() {
  const {
    selectedFacilities,

    loadedStates,
    loadedStateDataMap,
    setLoaded,

    parsedFacilityMap,
    setParsedFacilityMap,
  } = useTimeSeriesStore((state) => state, shallow);

  const getParsedFacilityData = useCallback((facilityId, state) => {
    const stateData = loadedStateDataMap[state];
    const facData = stateData.find((fac) => fac.id === facilityId);

    return parseTimeSeries(facData);
  }, []);

  const loadStateData = useCallback((state) => {
    csv(`./data/${state}.csv`)
      .then((d) => {
        loadedStateDataMap[state] = d;
        console.log(`DATA LOADED FOR ${state}`);
        setLoaded(state, loadedStateDataMap);
      })
      .catch((err) => {
        console.error(
          `Failed to load ${state} time series data due to: ${err}`
        );
      });
  }, []);

  return useMemo(() => {
    const output = {};

    console.log(`GETTING TIME SERIES DATA`);

    selectedFacilities.forEach(({ name, state, id }) => {
      let facilityData = parsedFacilityMap[id];
      if (facilityData) {
        // already been parsed
        console.log(`USING PARSED DATA FOR ${name}`);
        output[id] = facilityData;
      } else if (loadedStateDataMap[state]) {
        // state already loaded, facility not yet parsed
        console.log(`CREATING PARSED DATA FOR ${name}`);
        facilityData = getParsedFacilityData(id, state);
        output[id] = facilityData;

        // add parsed facility to state so it can be used immediately next time
        parsedFacilityMap[id] = facilityData;
        setParsedFacilityMap(parsedFacilityMap);
      } else {
        // Async call to load state data. Once setLoaded is called with newly loaded data,
        // loadedStates will update and trigger a recalculation here.
        console.log(`LOADING DATA FOR ${state}`);
        loadStateData(state);
      }
    });
    return output;
  }, [selectedFacilities, loadedStates]);
}
