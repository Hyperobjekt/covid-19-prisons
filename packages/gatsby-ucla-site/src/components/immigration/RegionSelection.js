import { fade, Typography, withStyles } from "@material-ui/core"
import { Block } from "gatsby-theme-hyperobjekt-core"
import React from "react"
import shallow from "zustand/shallow"
import { useOptionsStore } from "../../common/hooks"
import IceRegions from "../../common/data/ice_regions.json"
import { serifTypography } from "../../gatsby-theme-hyperobjekt-core/theme"
import GenericSelection from "../controls/GenericSelection"
import ResponsiveContainer from "../ResponsiveContainer"

const styles = (theme) => ({
  root: {
    background: theme.palette.background.paper,
    paddingBottom: 0,
    marginTop: 0,
    "& .MuiButtonBase-root": {
      ...serifTypography,
      fontWeight: 700,
      fontSize: theme.typography.pxToRem(26),
      color: theme.palette.secondary.main,
      border: `2px dotted transparent`,
      borderBottomColor: fade(theme.palette.text.secondary, 0.333),
      borderRadius: 5,
      position: "relative",
      top: "-0.15rem",
    },
  },
})

const RegionSelection = ({ classes, className, group, title, ...props }) => {
  const [iceRegionId, setIceRegionId] = useOptionsStore(
    (state) => [state.iceRegionId, state.setIceRegionId],
    shallow
  )

  const regionNames = Object.values(IceRegions)
  const unfiltered = "(unfiltered)"
  regionNames.unshift(unfiltered)
  
  let selectedOption = IceRegions[iceRegionId] || unfiltered

  const selectHandler = ((regionName) => {
    const id = Object.keys(IceRegions).find((regionId) => {
      return IceRegions[regionId] === regionName
    })

    setIceRegionId(id || null)
  })
  
  return (
    <Block type="fullWidth" data-tip="" className={classes.root}>
      <ResponsiveContainer>
        <Typography variant="h3">
          {title+" "}
          <GenericSelection
            options={regionNames}
            selectedOption={selectedOption}
            handleSelect={selectHandler}
          />
        </Typography>
      </ResponsiveContainer>
    </Block>
  )
}

export default withStyles(styles)(RegionSelection)
