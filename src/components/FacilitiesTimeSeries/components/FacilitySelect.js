import React from "react";
import { getLang } from "../../../common/utils/i18n";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  makeStyles,
  TextField,
  Chip,
} from "@material-ui/core";
// import useFacilitiesMetadata from "../../../common/hooks/use-facilities-metadata";
import { csv } from "d3-fetch";
import useTimeSeriesStore from "../useTimeSeriesStore";
import { formatFacilityName } from "../../../common/utils/formatters";
import { FiberManualRecord } from "@material-ui/icons";

const colors = [
  "#D7790F",
  "#82CAA4",
  "#4C6788",
  "#84816F",
  "#71A9C9",
  "#AE91A8",
  "#DED6DC",
  "#B4C551",
  "#7E55D4",
  "#A21916",
  "#BC73AE",
  "#567EBA",
  "#FFD540",
  "#CF5833",
];


const useStyles = makeStyles((theme) => ({
  root: {},
  placeholder: {
    display: "none",
  },
}));

const FacilitySelect = ({ defaultFacilities = [] }) => {
  const classes = useStyles();

  const [modalOpen, setModalOpen] = React.useState(false);
  const [allFacilities, setAllFacilities] = React.useState([]);
  const [setSelectedFacilities, selectedFacilities] = useTimeSeriesStore(
    (state) => [state.setSelectedFacilities, state.selectedFacilities]
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

  const openHandler = (e) => {
    console.log(e);
    setModalOpen(true);
  };
  const closeHandler = () => setModalOpen(false);

  return (
    <div className={classes.root}>
      <div onClick={openHandler}>
        <Autocomplete
          multiple
          open={false}
          value={selectedFacilities}
          id="facility-autocomplete-placeholder"
          options={allFacilities}
          getOptionLabel={formatFacilityName}
          renderOption={(option) => option.name}
          limitTags={4}
          size="small"
          classes={{ input: classes.placeholder }}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, i) => (
              <Chip
                icon={
                  <FiberManualRecord
                    style={{ fill: colors[i % colors.length] }}
                  />
                }
                label={formatFacilityName(option)}
                {...getTagProps({ i })}
                onDelete={null}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Facilities"
              placeholder=""
            />
          )}
        />
      </div>
      <Dialog open={modalOpen} onClose={closeHandler}>
        <DialogTitle>{getLang("time_series_facility_select")}</DialogTitle>
        <DialogContent>
          <Autocomplete
            multiple
            value={selectedFacilities}
            id="facility-autocomplete"
            options={allFacilities}
            onChange={handleSelection}
            getOptionLabel={formatFacilityName}
            renderOption={(option) => option.name}
            groupBy={({ state }) => (state === "*other" ? "" : state)}
            // size="small"
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, i) => (
                <Chip
                  icon={
                    <FiberManualRecord
                      style={{ fill: colors[i % colors.length] }}
                    />
                  }
                  label={formatFacilityName(option)}
                  {...getTagProps({ i })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Facilities"
                placeholder="Add location"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FacilitySelect;
