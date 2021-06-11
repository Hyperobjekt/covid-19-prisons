import React from "react";
import { getLang } from "../../../common/utils/i18n";
import { Block } from "@hyperobjekt/material-ui-website";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles, TextField } from "@material-ui/core";
import useFacilitiesMetadata from "../../../common/hooks/use-facilities-metadata";
import { csv } from "d3-fetch";

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

  const [facilities, setFacilities] = React.useState([]);

  React.useEffect(async () => {
    const result = await csv("/data/allFacilities");
    console.log("********", result.length);
    setFacilities(result);
  }, []);
  // const facilities = useFacilitiesMetadata();
  // const facilities = React.useEffect();

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="facility-autocomplete"
        options={facilities}
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
