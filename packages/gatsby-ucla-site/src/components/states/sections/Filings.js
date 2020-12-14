import React from "react"
import Stack from "../../Stack"
import { Grid, Typography } from "@material-ui/core"
import HealthJustice from "../../../../content/assets/health-justice-logo.png"
import NumberStat from "../../stats/NumberStat"
import shallow from "zustand/shallow"
import useStatesStore from "../useStatesStore"

const Filings = ({ id, lang, data, isFederal, ...props }) => {
  const content = useStatesStore((state) => state.content, shallow)
  let federalStat = null
  if (isFederal) {
    const filingsData = data.allFilings?.edges[0]?.node
    const labels = content.sections.find((s) => s.id === "filings").lang.visual
    federalStat = (
      <Grid className="embedded-stats" container spacing={4}>
        {Object.keys(filingsData).map((key) => (
          <Grid key={key} item xs={6}>
            <NumberStat value={filingsData[key]} label={labels[key]} />
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <Stack {...props}>
      <Typography variant="h3">{lang.title}</Typography>
      {federalStat}
      {lang.body && (
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: lang.body }}
        />
      )}
    </Stack>
  )
}

Filings.propTypes = {}

export default Filings
