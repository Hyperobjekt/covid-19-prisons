import React from "react"
import clsx from "clsx"
import { makeStyles, Typography, withStyles } from "@material-ui/core"
import shallow from "zustand/shallow"
import { useActiveMetric, useOptionsStore } from "../../common/hooks"
import Stack from "../Stack"
import SpikeMarker from "../markers/SpikeMarker"
import { extent } from "d3-array"
import { getDataMetricSelector } from "../../common/utils"
import { formatMetricValue } from "../../common/utils/formatters"
import JurisdictionToggles from "../controls/JurisdictionToggles"
import useStatesStore from "../states/useStatesStore"

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  toggleContainer: {
    marginBottom: "-0.25rem",
  },
})

const useSpikeLegendStyles = makeStyles((theme) => ({
  label: {
    fontSize: theme.typography.pxToRem(12),
  },
}))

const SpikeLegend = ({ data, sizeRange = [1, 60] }) => {
  const classes = useSpikeLegendStyles()
  const [categoryColors, categoryGradients] = useOptionsStore(
    (state) => [state.categoryColors, state.categoryGradients],
    shallow
  )
  const [currentStep, facilitiesGroup] = useStatesStore(
    (state) => [state.currentStep, state.facilitiesGroup],
    shallow
  )
  const metric = useActiveMetric()

  const legendGroup = (() => {
    if (currentStep === "staff") return "staff"
    if (currentStep === "facilities") return facilitiesGroup
    return "residents"
  })()
  const accessor = getDataMetricSelector(metric, legendGroup)
  const dataExtent = extent(data, accessor)

  const isRate = metric.indexOf("_rate") > -1
  const formatId = isRate ? "rate_legend" : "count_legend"
  const spikeLabels = [isRate ? 0 : 1, dataExtent[1] / 2, dataExtent[1]].map(
    (d) => {
      if (!isRate && d < 1) {
        // when max value is 0 or 1
        return "N/A"
      }
      const value = formatMetricValue(d, formatId)
      const parts = value.split(".")
      // if integer with .0 ending, return only the integer part
      return parts.length > 1 && !isRate
        ? parts[1].indexOf("k") > -1
          ? value
          : parts[0]
        : value
    }
  )
  return (
    <Stack horizontal spacing={1} align="bottom">
      <Stack align="center" spacing={0.5}>
        <SpikeMarker
          height={sizeRange[0]}
          width={7}
          stroke={categoryColors[4]}
          fill={categoryGradients[4]}
        />
        <Typography className={classes.label} variant="body2">
          {spikeLabels[0]}
        </Typography>
      </Stack>
      <Stack align="center" spacing={0.5}>
        <SpikeMarker
          height={sizeRange[1] / 2}
          width={7}
          stroke={categoryColors[4]}
          fill={categoryGradients[4]}
        />
        <Typography className={classes.label} variant="body2">
          {spikeLabels[1]}
        </Typography>
      </Stack>
      <Stack align="center" spacing={0.5}>
        <SpikeMarker
          height={sizeRange[1]}
          width={7}
          stroke={categoryColors[4]}
          fill={categoryGradients[4]}
        />
        <Typography className={classes.label} variant="body2">
          {spikeLabels[2]}
        </Typography>
      </Stack>
    </Stack>
  )
}

const MapLegend = ({ data, classes, className, ...props }) => {
  return (
    <Stack
      horizontal
      className={clsx("map-legend", classes.root, className)}
      align="bottom"
      spacing={2}
      {...props}
    >
      <JurisdictionToggles
        classes={{
          root: classes.toggleContainer,
        }}
      />
      <SpikeLegend data={data} />
    </Stack>
  )
}

MapLegend.propTypes = {}

export default withStyles(styles)(MapLegend)
