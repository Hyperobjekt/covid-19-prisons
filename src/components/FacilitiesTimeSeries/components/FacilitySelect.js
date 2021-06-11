import React from "react";
import { getLang } from "../../../common/utils/i18n";
import { Block } from "@hyperobjekt/material-ui-website";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles, TextField } from "@material-ui/core";
// import useFacilitiesMetadata from "../../../common/hooks/use-facilities-metadata";
import { csv } from "d3-fetch";
import useTimeSeriesStore from "../useTimeSeriesStore";
// import useTimeSeriesData from "../../../common/hooks/use-time-series-data";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

const FacilitySelect = ({ ...props }) => {
  const classes = useStyles();

  const [allFacilities, setAllFacilities] = React.useState([]);
  const { setSelectedFacilities } = useTimeSeriesStore(
    (state) => state
  );
  const handleSelection = (event, selected) => setSelectedFacilities(selected);

  // load all facilities on initial load
  React.useEffect(() => {
    async function fetchData() {
      const result = await csv("./data/allFacilities");
;
      setAllFacilities(result);
    }
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="facility-autocomplete"
        options={allFacilities}
        onChange={handleSelection}
        getOptionLabel={(option) => option.name}
        groupBy={(option) => option.state}
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
