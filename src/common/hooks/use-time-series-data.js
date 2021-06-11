import { csv } from "d3-fetch";
import { useCallback, useMemo } from "react";
import shallow from "zustand/shallow";
import useTimeSeriesStore from "../../components/FacilitiesTimeSeries/useTimeSeriesStore";
import useStatesStore from "../../components/states/useStatesStore";
import useOptionsStore from "./use-options-store";

const groupMetrics = {
  residents: ["confirmed", "deaths", "active", "tested"],
  staff: ["confirmed", "deaths", "active"],
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
        result[acc] = timeSeries[acc].split(";").map((keyValStr) => {
          const [date, value] = keyValStr.split("|");
          return { date, value };
        });
      });
    });
  });

  return result;
};

export default function useTimeSeriesData() {
  const metric = useOptionsStore((state) => state.metric);
  const group = useStatesStore((state) => state.facilitiesGroup);

  const {
    selectedFacilities,
    setSelectedFacilities,
    loadedStates,
    setLoadedStates,
    setLoaded,
    loadedDataMap,
    setLoadedDataMap,
  } = useTimeSeriesStore((state) => state, shallow);

  //
  const getFacilityData = useCallback((facilityId, state) => {
    console.log(state, facilityId);
    const stateData = loadedDataMap[state];
    const facData = stateData.find((fac) => fac.id === facilityId);

    return parseTimeSeries(facData);
  }, []);

  const addStateData = (state) => {
    csv("./data/" + state, (x) => x)
      .then((d) => {
        loadedDataMap[state] = d;
        setLoaded(state, loadedDataMap);
      })
      .catch((err) => {
        console.error(
          `Failed to load ${state} time series data due to: ${err}`
        );
      });
  };

  return useMemo(() => {
    const output = {};

    selectedFacilities.forEach(({ name, state, id }) => {
      if (loadedDataMap[state]) {
        const data = getFacilityData(id, state);
        output[id] = data;
      } else {
        addStateData(state);
      }
    });
    return output;
  }, [selectedFacilities, loadedStates]);
}
