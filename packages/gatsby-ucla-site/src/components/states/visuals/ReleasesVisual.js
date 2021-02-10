import React from "react"
import { Grid, withStyles } from "@material-ui/core"
import { animated } from "react-spring"
import useStatesStore from "../useStatesStore"
import NumberStat from "../../stats/NumberStat"
import shallow from "zustand/shallow"

// COMPONENT OUTDATED.
// replaced by ReleasesTable

const styles = (theme) => ({
  container: {
    maxWidth: "22rem",
  },
})

const ReleasesVisual = ({ classes, ...props }) => {
  const [data, content] = useStatesStore(
    (state) => [state.data, state.content],
    shallow
  )
  const releaseStats = {
    prisonCount: data.allPrisonReleases?.edges?.length,
    jailCount: data.allJailReleases?.edges?.length,
  }
  const labels = content.sections.find((s) => s.id === "releases").lang.visual
  return (
    <animated.div {...props}>
      {releaseStats && (
        <Grid className={classes.container} container spacing={4}>
          {Object.keys(releaseStats).map((key) => (
            <Grid key={key} item xs={6}>
              <NumberStat value={releaseStats[key]} label={labels[key]} />
            </Grid>
          ))}
        </Grid>
      )}
    </animated.div>
  )
}

ReleasesVisual.propTypes = {}

export default withStyles(styles)(ReleasesVisual)
