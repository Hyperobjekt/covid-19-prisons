import React from "react"
import { FormControlLabel, Typography, withStyles } from "@material-ui/core"
import shallow from "zustand/shallow"
import { useOptionsStore } from "../../common/hooks"
import { getLang } from "../../common/utils/i18n"
import Stack from "../Stack"
import SpikeMarker from "../markers/SpikeMarker"
import Checkbox from "../controls/Checkbox"
import DotMarker from "../markers/DotMarker"
import clsx from "clsx"

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  formControl: {
    marginLeft: 0,
    marginRight: 0,
  },
  label: {
    whiteSpace: "nowrap",
    marginRight: theme.spacing(1),
  },
  checkbox: {
    padding: theme.spacing(0.45, 1, 0.55),
  },
})

const JurisdictionLabel = ({ label, marker, gradient, color }) => {
  return (
    <Stack horizontal spacing={1} align="center">
      {marker === "spike" && (
        <SpikeMarker width={7} height={10} fill={gradient} stroke={color} />
      )}
      {marker === "dot" && <DotMarker radius={5} fill={color} />}
      <Typography variant="body2">{label}</Typography>
    </Stack>
  )
}

const JurisdictionToggles = ({ classes, marker = "spike", ...props }) => {
  const [
    categories,
    selectedCategories,
    setSelectedCategories,
    categoryColors,
    categoryGradients,
  ] = useOptionsStore(
    (state) => [
      state.categories,
      state.selectedCategories,
      state.setSelectedCategories,
      state.categoryColors,
      state.categoryGradients,
    ],
    shallow
  )
  const isSelected = (category) => selectedCategories.indexOf(category) > -1
  const handleToggleCategory = (category) => {
    const newCategories = isSelected(category)
      ? selectedCategories.filter((c) => c !== category)
      : [category, ...selectedCategories]
    setSelectedCategories(newCategories)
  }
  return (
    <Stack
      className={clsx(classes.root, "jurisdiction-toggles")}
      spacing={0}
      {...props}
    >
      {categories.map((c, i) => {
        return (
          <FormControlLabel
            className={clsx("toggle", "toggle-" + c)}
            key={c}
            value={c}
            control={
              <Checkbox
                className={clsx(classes.checkbox, "checkbox")}
                checked={isSelected(c)}
                onClick={(e) => handleToggleCategory(c, e)}
              />
            }
            label={
              <JurisdictionLabel
                marker={marker}
                label={getLang(c)}
                gradient={categoryGradients[i]}
                color={categoryColors[i]}
              />
            }
            labelPlacement="end"
            classes={{ root: classes.formControl, label: classes.label }}
          />
        )
      })}
    </Stack>
  )
}

export default withStyles(styles)(JurisdictionToggles)
