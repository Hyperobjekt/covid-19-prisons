import { makeStyles } from "@material-ui/core"
import { color } from "d3-color"

/**
 * Styles shared between maps
 */
export const shapeStyles = (theme) => ({
  shape: {
    fill: "#F5F5ED",
    stroke: "#E4E4DB",
  },
  shapeLabel: {
    fill: theme.palette.text.secondary,
    fillOpacity: 1,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(10),
  },
  shapeHighlight: {
    strokeOpacity: 1,
    strokeWidth: 2,
    stroke: color("#DDDDCB").darker(0.4).formatHex(),
    fill: "transparent",
  },
})

export const regionShapeStyles = (theme) => ({
  shape: {
    fill: "#83A3B9",
    fillOpacity: "10%",
    stroke: "#637A89",
    strokeOpacity: "60%",
    "&:hover": {
      strokeOpacity: 1,
      strokeWidth: 2,
    },
  },
  selected: {
    fillOpacity: "40%",
  },
  text: {
    // no region name labels
    fillOpacity: 0,
    // fill: "#67675B",
  },
})

export const spikeStyles = (theme) => ({
  spike: {
    strokeWidth: 0.8,
    fillOpacity: 1,
  },
  spikeHighlight: {
    stroke: "rgba(255,0,0,0.5)",
    fill: "rgba(255,0,0,0.1)",
    strokeWidth: 1.5,
  },
})

export const useRegionShapeStyles = makeStyles(regionShapeStyles)
export const useShapeStyles = makeStyles(shapeStyles)
export const useSpikeStyles = makeStyles(spikeStyles)
