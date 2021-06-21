import React from "react";
import { getLang } from "../../../common/utils/i18n";
import { Block } from "@hyperobjekt/material-ui-website";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles, TextField } from "@material-ui/core";
// import useFacilitiesMetadata from "../../../common/hooks/use-facilities-metadata";
import { csv } from "d3-fetch";
import useTimeSeriesStore from "../useTimeSeriesStore";
import useTimeSeriesData from "../../../common/hooks/use-time-series-data";
import { formatFacilityName } from "../../../common/utils/formatters";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const FacilitySelect = ({ defaultFacilities = [] }) => {
  const classes = useStyles();

  const [allFacilities, setAllFacilities] = React.useState([]);
  const { setSelectedFacilities, selectedFacilities } = useTimeSeriesStore(
    (state) => state
  );
  const handleSelection = (event, selected) => setSelectedFacilities(selected);

  // load all facilities on initial load
  React.useEffect(() => {
    async function fetchData() {
      const allFacilities = await csv("./data/allFacilities.csv");
      setAllFacilities(allFacilities);
      const defaultSelected = defaultFacilities
          .map((facId) => allFacilities.find(({ id }) => id === facId))
          .filter((f) => !!f);
      setSelectedFacilities(defaultSelected);
    }
    fetchData();
  }, []);

  // const facilitiesData = useTimeSeriesData();
  // only show facility as selected when its data is ready to be charted
  // const values = selectedFacilities.filter(({ id }) => !!facilitiesData[id]);
  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        value={selectedFacilities}
        id="facility-autocomplete"
        options={allFacilities}
        onChange={handleSelection}
        getOptionLabel={formatFacilityName}
        renderOption={(option) => option.name}
        groupBy={({ state }) => (state === "*other" ? "" : state)}
        size="small"
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Facilities"
            placeholder="Select facilities"
          />
        )}
      />
    </div>
  );
};

export default FacilitySelect;
