import React from "react"
import { Grid, Typography, withStyles } from "@material-ui/core"
import { animated } from "react-spring"
import useStatesStore from "../useStatesStore"
import NumberStat from "../../stats/NumberStat"
import shallow from "zustand/shallow"

// COMPONENT OUTDATED.
// Filings uses inline table stats

const styles = (theme) => ({
  container: {
    maxWidth: "22rem",
  },
})

const FilingsVisual = ({ classes, ...props }) => {
  const [data, content] = useStatesStore(
    (state) => [state.data, state.content],
    shallow
  )
  const filingsData = data.allFilings?.edges[0]?.node
  const labels = content.sections.find((s) => s.id === "filings").lang.visual
  return (
    <animated.div {...props}>
      {filingsData && (
        <Grid className={classes.container} container spacing={4}>
          {Object.keys(filingsData).map((key) => (
            <Grid key={key} item xs={6}>
              <NumberStat value={filingsData[key]} label={labels[key]} />
            </Grid>
          ))}
        </Grid>
      )}
      {!filingsData && (
        <Typography variant="body1">{labels["unavailable"]}</Typography>
      )}
    </animated.div>
  )
}

FilingsVisual.propTypes = {}

export default withStyles(styles)(FilingsVisual)
