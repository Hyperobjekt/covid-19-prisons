import React from "react";
import clsx from "clsx";
import { Box, Typography, withStyles } from "@material-ui/core";
import NumberStat from "../../stats/NumberStat";
import shallow from "zustand/shallow";
import useStatesStore from "../useStatesStore";
import StepWrapper from "./../StepWrapper";

const styles = (theme) => ({
  root: {},
  title: {
    marginBottom: theme.spacing(2),
  },
  statContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexWrap: "wrap",
    maxWidth: 440,
  },
  stat: {
    margin: theme.spacing(1, 0, 1, 0),
    minWidth: "50%",
    maxWidth: "50%",
  },
  contentContainer: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      flexDirection: "row-reverse",
      "& .MuiTypography-root": {
        maxWidth: `26.25rem`,
      },
    },
    [theme.breakpoints.up("lg")]: {
      "& $statContainer": {
        transform: `translateX(-25%)`,
      },
    },
  },
});

const Filings = ({
  id,
  lang,
  data,
  state,
  isFederal,
  classes,
  className,
  ...props
}) => {
  const content = useStatesStore((state) => state.content, shallow);

  const filingsData = data.allFilings?.edges[0]?.node;
  const labels = content["filings"].visual;

  return (
    <div className={clsx(classes.root, "filings", className)} {...props}>
      <StepWrapper>
        <Typography className={classes.title} variant="h3">
          {lang.title}
        </Typography>
        <Box className={classes.contentContainer}>
          {filingsData ? (
            <Box className={classes.statContainer}>
              {Object.keys(filingsData).map((key) => (
                <NumberStat
                  key={key}
                  className={classes.stat}
                  value={filingsData[key]}
                  label={labels[key]}
                />
              ))}
            </Box>
          ) : (
            <Typography className="empty-embedded-stats" variant="body1">
              {labels.unavailable}
            </Typography>
          )}
          {lang.body && (
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: lang.body }}
            />
          )}
        </Box>
      </StepWrapper>
    </div>
  );
};

export default withStyles(styles)(Filings);
