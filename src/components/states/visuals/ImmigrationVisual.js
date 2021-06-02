import React from "react"
import { Grid, withStyles } from "@material-ui/core"
import { animated } from "react-spring"
import useStatesStore from "../useStatesStore"
import NumberStat from "../../stats/NumberStat"
import shallow from "zustand/shallow"
import { getSumAvgCount } from "../../../common/utils/selectors"

// COMPONENT OUTDATED.
// replaced by Ice Data and Immigration page

const styles = (theme) => ({
  container: {
    maxWidth: "22rem",
  },
})

const ImmigrationVisual = ({ classes, ...props }) => {
  const [data, content] = useStatesStore(
    (state) => [state.data, state.content],
    shallow
  )
  const immigrationData = data.allImmigrationCases.edges.map(
    (edge) => edge.node
  )
  const facilityCount = immigrationData.length
  const [caseCount] = getSumAvgCount(immigrationData, (d) => d.cases)
  const [deathsCount] = getSumAvgCount(immigrationData, (d) => d.deaths)
  const immigrationStats = {
    facilityCount,
    caseCount,
    deathsCount,
  }
  const labels = content.sections.find((s) => s.id === "immigration").lang
    .visual
  return (
    <animated.div {...props}>
      {immigrationStats && (
        <Grid className={classes.container} container spacing={4}>
          {Object.keys(immigrationStats).map((key) => (
            <Grid key={key} item xs={6}>
              <NumberStat value={immigrationStats[key]} label={labels[key]} />
            </Grid>
          ))}
        </Grid>
      )}
    </animated.div>
  )
}

ImmigrationVisual.propTypes = {}

export default withStyles(styles)(ImmigrationVisual)
