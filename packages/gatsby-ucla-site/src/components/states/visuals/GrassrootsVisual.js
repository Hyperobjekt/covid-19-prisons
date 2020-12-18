import React from "react"
import { Grid, withStyles } from "@material-ui/core"
import { animated } from "react-spring"
import useStatesStore from "../useStatesStore"
import NumberStat from "../../stats/NumberStat"
import shallow from "zustand/shallow"
import { getSumAvgCount } from "../../../common/utils/selectors"

const styles = (theme) => ({
  container: {
    maxWidth: "22rem",
  },
})

const GrassrootsVisual = ({ classes, ...props }) => {
  const [data, content] = useStatesStore(
    (state) => [state.data, state.content],
    shallow
  )
  const grassrootsData = data.allGrassroots.edges.map((edge) => edge.node)
  const effortCount = grassrootsData.length
  const internalCount = getSumAvgCount(
    grassrootsData,
    (d) => d.internal_effort
  )[2]
  const externalCount = getSumAvgCount(
    grassrootsData,
    (d) => d.external_effort
  )[2]
  const coordinatedCount = getSumAvgCount(
    grassrootsData,
    (d) => d.internal_effort && d.external_effort
  )[2]
  const stats = {
    effortCount,
    internalCount,
    externalCount,
    coordinatedCount,
  }
  const labels = content.sections.find((s) => s.id === "grassroots").lang.visual
  return (
    <animated.div {...props}>
      {stats && (
        <Grid className={classes.container} container spacing={4}>
          {Object.keys(stats).map((key) => (
            <Grid key={key} item xs={6}>
              <NumberStat value={stats[key]} label={labels[key]} />
            </Grid>
          ))}
        </Grid>
      )}
    </animated.div>
  )
}

GrassrootsVisual.propTypes = {}

export default withStyles(styles)(GrassrootsVisual)
