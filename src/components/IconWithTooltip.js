import React from "react";
import PropTypes from "prop-types";
import InfoIcon from "../../content/assets/info-icon.svg";
import {
  Box,
  ButtonBase,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { sansSerifyTypography } from "../gatsby-theme-hypercore/theme";
import clsx from "clsx";

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
  tooltip: {},
  title: {
    ...sansSerifyTypography,
    display: "block",
    fontSize: 14,
    fontWeight: 700,
    marginTop: 0,
    paddingBottom: theme.spacing(1),
    borderBottom: "dotted white 1px",
    marginBottom: theme.spacing(1),
  },
  note: {
    ...sansSerifyTypography,
    fontSize: 14, // fixed font size on tooltip
    lineHeight: 18.2 / 14,
    "&:last-of-type": {
      marginBottom: 0,
    },
  },
}));

const IconWithTooltip = ({
  iconText = "Data notes",
  title = "Data notes",
  notes = [],
  icon = InfoIcon,
  ...props
}) => {
  const classes = useStyles();

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
  );

  return (
    <div className={clsx(classes.root, "icon-with-tooltip")}>
      <Tooltip
        title={tooltipContent}
        enterTouchDelay={1}
        open={true}
        interactive
      >
        <ButtonBase className={clsx(classes.iconWrapper, "icon-wrapper")}>
          <img alt="info" src={icon} />
          {iconText}
        </ButtonBase>
      </Tooltip>
    </div>
  );
};

IconWithTooltip.propTypes = {
  notes: PropTypes.array,
  title: PropTypes.string,
  iconText: PropTypes.string,
  icon: PropTypes.object,
};

export default IconWithTooltip;
