import React from "react"
import shallow from "zustand/shallow"
import clsx from "clsx"
import { ButtonGroup, Button, withStyles } from "@material-ui/core"
import { useOptionsStore } from "../../common/hooks"

const styles = (theme) => ({
  root: {},
  button: {},
  active: {},
})

const MapMetricControl = ({ classes, className, ...props }) => {
  const [metric, metrics, setMetric] = useOptionsStore(
    (state) => [state.metric, state.metrics, state.setMetric],
    shallow
  )
  const handleSelect = (value) => {
    setMetric(value)
  }
  return (
    <ButtonGroup
      className={classes.root}
      color="primary"
      aria-label="metric selection"
      {...props}
    >
      {metrics.map((m) => (
        <Button
          className={clsx(classes.button, { active: m === metric })}
          key={m}
          value={m}
          onClick={(e) => handleSelect(m, e)}
        >
          {m}
        </Button>
      ))}
    </ButtonGroup>
  )
}

MapMetricControl.propTypes = {}

export default withStyles(styles)(MapMetricControl)
