import React from "react"
import clsx from "clsx"
import { Typography, withStyles } from "@material-ui/core"

export const styles = (theme) => ({
  root: {
    padding: theme.spacing(2, 0, 0, 1),
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.text.secondary,
    "& .MuiTypography-root": {
      fontSize: theme.typography.pxToRem(12),
    },
    "& li + li": {
      marginTop: theme.spacing(1),
    },
  },
})

const Notes = ({ classes, className, notes, ...props }) => {
  return (
    <ol className={clsx(classes.root, className)} {...props}>
      {notes.map((note, i) => (
        <li key={i}>
          <Typography
            variant="body2"
            dangerouslySetInnerHTML={{ __html: note }}
          />
        </li>
      ))}
    </ol>
  )
}

Notes.propTypes = {}

export default withStyles(styles)(Notes)
