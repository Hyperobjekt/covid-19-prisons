import React from "react"
import Stack from "../../Stack"
import { Typography } from "@material-ui/core"
import NumberStat from "../../stats/NumberStat"
import useStatesStore from "../useStatesStore"
import shallow from "zustand/shallow"

const Releases = ({ id, lang, data, isFederal, ...props }) => {
  const content = useStatesStore((state) => state.content, shallow)
  let federalStat = null
  if (isFederal) {
    const releaseCount = data.allPrisonReleases?.edges?.length
    const label = content.sections.find((s) => s.id === "releases").lang.visual
      .prisonCount
    federalStat = <NumberStat value={releaseCount} label={label} />
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

Releases.propTypes = {}

export default Releases
