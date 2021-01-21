import React from "react"
import { Typography } from "@material-ui/core"
import StepWrapper from "./../StepWrapper"

const Immigration = ({ id, lang, data, ...props }) => {
  return (
    <div {...props}>
      <StepWrapper>
        <Typography variant="h3">{lang.title}</Typography>
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

Immigration.propTypes = {}

export default Immigration
