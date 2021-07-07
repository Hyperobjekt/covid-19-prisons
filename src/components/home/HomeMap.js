import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Box, Typography, withStyles } from "@material-ui/core";
import { Block } from "@hyperobjekt/material-ui-website";
import { NationalMap, MapLegend } from "../maps";
import { navigate } from "gatsby";
import { useMapStore } from "@hyperobjekt/svg-maps";
import { useActiveMetric, useMappableFacilities } from "../../common/hooks";
import MetricSelectionTitle from "../controls/MetricSelectionTitle";
import { getSlug } from "../../common/utils/selectors";

const styles = (theme) => ({
  root: {
    position: "relative",
    display: "flex",
    minHeight: 600,
    [theme.breakpoints.up("xl")]: {
      minHeight: 650,
    },
  },
  legend: {
    background: theme.palette.background.default,
    // align legend on the right for medium viewports
    [theme.breakpoints.only("md")]: {
      position: "absolute",
      left: "50%",
      top: theme.spacing(-1),
    },
  },
  mapContent: {
    position: "relative",
    height: "100%",
  },
  mapTitle: {
    maxWidth: theme.spacing(47),
    marginBottom: theme.spacing(2),
  },
  mapDescription: {
    maxWidth: "24em",
    marginBottom: theme.spacing(2),
  },
  mapContainer: {
    maxWidth: 900,
    margin: "auto",
    // move map to the right where space is available
    [theme.breakpoints.up("lg")]: {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      margin: "auto",
      width: `calc(100% - ${theme.spacing(44)})`,
    },
  },
  mapAspectRatio: {
    // maintain aspect ratio
    paddingTop: (100 * 600) / 800 + "%",
    height: 0,
    position: "relative",
    maxWidth: 900,
    margin: "auto",
    "& .svg-map": {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
    },
    [theme.breakpoints.up("lg")]: {
      position: "absolute",
      top: 0,
      bottom: 0,
      width: "100%",
    },
  },
  notes: {
    textAlign: "center",
    maxWidth: "36em",
    margin: "auto",
    fontSize: theme.typography.pxToRem(12),
    [theme.breakpoints.up("lg")]: {
      margin: `2rem 0`,
      textAlign: "left",
      maxWidth: "24em",
    },
  },
});

const HomeMap = ({
  classes,
  title,
  className,
  categories,
  children,
  isImmigration,
  lang,
  selectedRegion,
  ...props
}) => {
  const setSelected = useMapStore((state) => state.setSelected);
  const metric = useActiveMetric();
  const data = useMappableFacilities(categories, selectedRegion);

  // handler for selection
  const handleSelect = (geo) => {
    setSelected(geo);
    navigate(`states/${getSlug(geo.properties.name)}`);
  };

  // MetricSelection includes region name in immigration map

  const notes = lang.notes;
  return (
    <Block data-tip="" className={clsx(classes.root, className)} {...props}>
      <Box className={classes.mapContent}>
        <Box className={classes.mapTitle}>
          <MetricSelectionTitle title={title} isImmigration={isImmigration} />
        </Box>
        <Typography className={classes.mapDescription} variant="body2">
          {lang.labels[metric]}
        </Typography>
        <MapLegend data={data} className={classes.legend} />
        <Box className={classes.mapContainer}>
          <Box className={classes.mapAspectRatio}>
            <NationalMap
              facilities={data}
              metric={metric}
              onSelect={handleSelect}
              isImmigration={isImmigration}
            >
              {children}
            </NationalMap>
          </Box>
        </Box>

        <Typography
          variant="caption"
          component="p"
          className={clsx(classes.notes)}
          dangerouslySetInnerHTML={{ __html: notes }}
        />
      </Box>
    </Block>
  );
};

HomeMap.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
};

export default withStyles(styles)(HomeMap);
