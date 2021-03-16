import React from "react"
import { Grid, Typography } from "@material-ui/core"
import NumberStat from "../../stats/NumberStat"
import shallow from "zustand/shallow"
import useStatesStore from "../useStatesStore"
import StepWrapper from "./../StepWrapper"

const Filings = ({ id, lang, data, isFederal, ...props }) => {
  const content = useStatesStore((state) => state.content, shallow)

  const filingsData = data.allFilings?.edges[0]?.node
  const labels = content.sections.find((s) => s.id === "filings").lang.visual

  return (
    <div {...props}>
      <StepWrapper>
        <Typography variant="h3">{lang.title}</Typography>
        <Grid className="embedded-stats" container spacing={4}>
          {Object.keys(filingsData).map((key) => (
            <Grid key={key} item xs={6}>
              <NumberStat value={filingsData[key]} label={labels[key]} />
            </Grid>
          ))}
        </Grid>
        {lang.body && (
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: lang.body }}
          />
        )}
      </StepWrapper>
    </div>
  )
}

Filings.propTypes = {}

export default Filings
