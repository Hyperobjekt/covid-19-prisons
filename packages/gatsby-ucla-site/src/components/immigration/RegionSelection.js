import { withStyles } from "@material-ui/core"
import React from "react"
import shallow from "zustand/shallow"
import { useOptionsStore } from "../../common/hooks"
import IceRegions from "../../common/data/ice_regions.json"
import GenericSelection from "../controls/GenericSelection"


const styles = (theme) => ({
  buttonBase: {
    textTransform: "none !important",
  },
})

const RegionSelection = ({ classes, className, group, title, ...props }) => {
  const [iceRegionId, setIceRegionId] = useOptionsStore(
    (state) => [state.iceRegionId, state.setIceRegionId],
    shallow
  )

  const regionNames = Object.values(IceRegions)
  const unfiltered = "All"
  regionNames.unshift(unfiltered)
  
  let selectedOption = IceRegions[iceRegionId] || unfiltered

  const selectHandler = ((regionName) => {
    const id = Object.keys(IceRegions).find((regionId) => {
      return IceRegions[regionId] === regionName
    })

    setIceRegionId(id || null)
  })
  
  return (
    <GenericSelection
      className={classes.buttonBase}
      options={regionNames}
      selectedOption={selectedOption}
      handleSelect={selectHandler}
    />
  )
}

export default withStyles(styles)(RegionSelection)
