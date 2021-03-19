import React from "react"
import PropTypes from "prop-types"
import InfoIcon from "../../content/assets/info-icon.svg"
import {
  Box,
  Button,
  ButtonBase,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core"
import { sansSerifyTypography } from "../gatsby-theme-hyperobjekt-core/theme"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  iconWrapper: {
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(14),
    padding: theme.spacing(1),
    "& img": {
      marginTop: -1,
      paddingRight: theme.spacing(1),
    },
    "&:hover": {
      "& img": {
        transform: "scale(1.1)",
        filter: "brightness(.98)",
      },
      color: "#353510",
    },
  },
  close: {
    position: "absolute",
    right: "1.2rem",
    top: "1.2rem",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  tooltip: {},
  title: {
    ...sansSerifyTypography,
    display: "block",
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 700,
    marginTop: 0,
    paddingBottom: theme.spacing(1),
    borderBottom: "dotted white 1px",
    marginBottom: theme.spacing(1),
  },
  note: {
    ...sansSerifyTypography,
    fontSize: theme.typography.pxToRem(12),
    "&:last-of-type": {
      marginBottom: 0,
    },
  },
}))

const IconWithTooltip = ({
  iconText = "Data notes",
  title = "Data notes",
  notes = [],
  id: idSuffix,
  ...props
}) => {
  const classes = useStyles()

  const tooltipContent = (
    <Box className={classes.tooltip}>
      {title && (
        <Typography variant="body1" className={classes.title}>
          {title}
        </Typography>
      )}
      {notes.map((note) => (
        <Typography
          variant="body1"
          paragraph
          className={classes.note}
          key={note}
        >
          {note}
        </Typography>
      ))}
    </Box>
  )

  return (
    <div className={classes.root}>
      <Tooltip title={tooltipContent} enterTouchDelay={1}>
        <ButtonBase className={classes.iconWrapper}>
          <img alt="info" src={InfoIcon} />
          {iconText}
        </ButtonBase>
      </Tooltip>
    </div>
  )
}

IconWithTooltip.propTypes = {
  id: PropTypes.string.isRequired,
  notes: PropTypes.array,
  title: PropTypes.string,
  iconText: PropTypes.string,
}

export default IconWithTooltip
