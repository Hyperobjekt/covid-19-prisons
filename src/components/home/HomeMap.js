import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Box, fade, Grid, Typography, withStyles } from "@material-ui/core";
import { Block } from "@hyperobjekt/material-ui-website";
import { NationalMap, MapLegend } from "../maps";
import { navigate } from "gatsby";
import { useMapStore } from "@hyperobjekt/svg-maps";
import Stack from "../Stack";
import { serifTypography } from "../../gatsby-theme-hypercore/theme";
import { useActiveMetric, useMappableFacilities } from "../../common/hooks";
import { getLang } from "../../common/utils/i18n";
import MetricSelectionTitle from "../controls/MetricSelectionTitle";
import { getSlug } from "../../common/utils/selectors";
import { Container } from "@hyperobjekt/material-ui-website";

const styles = (theme) => ({
  root: {
    position: "relative",
    display: "flex",
    padding: theme.spacing(3, 0),
    minHeight: 650,
    [theme.breakpoints.up("md")]: {
      height: `calc(100vh - ${theme.layout.headerHeight})`,
    },
    "& .svg-map": {
      width: "100%",
      margin: "auto",
      [theme.breakpoints.up("md")]: {
        margin: "auto auto 0 auto",
        height: `calc(100% - ${theme.layout.headerHeight} - ${theme.spacing(
          2
        )})`,
      },
      [theme.breakpoints.up("lg")]: {
        width: theme.columnSpacing(8),
        maxWidth: "1200px",
        marginRight: theme.spacing(1),
        height: `calc(100% - ${theme.spacing(4)})`,
      },
    },
  },
  notesXlContainer: {
    display: "none",
    marginTop: "18vh",
    "& $notes": {
      background: theme.palette.background.default,
      border: "2px dotted #92926C",
      padding: theme.spacing(2),
      marginRight: theme.spacing(6),
      "& span:first-child": {
        display: "inline-block",
        marginBottom: theme.spacing(2),
      },
    },
  },
  detailContainer: {
    [theme.breakpoints.up("lg")]: {
      flexDirection: "column",
      "& $notesXlContainer": {
        display: "block",
      },
    },
  },
  legend: {
    background: theme.palette.background.default,
    [theme.breakpoints.up("lg")]: {
      background: "unset",
      marginTop: theme.spacing(2),
    },
  },
  textContainer: {},
  textContainerGrid: {
    // otherwise MetricSelectionTitle can be obscured by MapLegend background
    zIndex: 1,
  },
  mapTitle: {
    display: "inline",
    // TODO: refactor these styles so they are defined in one place instead of duplicated in home/table.js
    "& .MuiButtonBase-root": {
      ...serifTypography,
      fontWeight: 700,
      fontSize: theme.typography.pxToRem(26),
      color: theme.palette.secondary.main,
      textTransform: "lowercase",
      border: `2px dotted transparent`,
      borderBottomColor: fade("#555526", 0.333),
      borderRadius: 5,
      position: "relative",
      top: "-0.15rem",
    },
  },
  mapNotes: {
    maxWidth: "20rem",
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(3),
    },
  },
  notesBelow: {},
  notes: {
    "&$notesBelow": {
      padding: theme.spacing(2, 4),
      [theme.breakpoints.up("md")]: {
        position: "absolute",
        bottom: theme.spacing(2),
        left: 0,
        right: 0,
      },
      [theme.breakpoints.up("lg")]: {
        display: "none",
      },
      margin: "auto",
      textAlign: "center",
    },
    color: fade(theme.palette.text.secondary, 0.666),
    "& a": {
      "&:not(:hover)": {
        color: fade(theme.palette.text.secondary, 0.666) + " !important",
      },
      textDecoration: "none !important",
      paddingBottom: "1px",
      borderBottom: "solid 1px",
      borderBottomColor: theme.palette.secondary.main,
    },
    fontSize: theme.typography.pxToRem(12),
    // drop line break to conserve space on mobile
    [theme.breakpoints.down("sm")]: {
      "& br": {
        display: "none",
      },
    },
  },
  controls: {
    // on lg the controls div obscures the whole map -> need to manage pointer events
    [theme.breakpoints.up("lg")]: {
      pointerEvents: "none",
      "& $detailContainer *": {
        pointerEvents: "all",
      },
    },
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      alignItems: "flex-start",
      justifyContent: "space-between",
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
  const [metricSelectCols, legendCols] = isImmigration ? [9, 3] : [8, 4];

  const notes = getLang("map", "notes", isImmigration && "immigration");
  console.log(data, metric);
  return (
    <Block data-tip="" className={clsx(classes.root, className)} {...props}>
      <Container className={classes.controls}>
        <Grid container spacing={1} className={classes.detailContainer}>
          <Grid
            item
            xs={12}
            md={metricSelectCols}
            lg={12}
            className={classes.textContainerGrid}
          >
            <Stack className={classes.textContainer} spacing={0.5}>
              <MetricSelectionTitle
                title={title}
                isImmigration={isImmigration}
              />
              <Typography className={classes.mapNotes} variant="body2">
                {getLang("map", metric, isImmigration && "immigration")}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={legendCols}>
            <MapLegend data={data} className={classes.legend} />
          </Grid>
          <Grid item xs={12} md={4} className={classes.notesXlContainer}>
            <Typography
              variant="body2"
              className={classes.notes}
              dangerouslySetInnerHTML={{ __html: notes }}
            />
          </Grid>
        </Grid>
      </Container>
      <NationalMap
        facilities={data}
        metric={metric}
        onSelect={handleSelect}
        isImmigration={isImmigration}
      >
        {children}
      </NationalMap>
      <Typography
        variant="body2"
        className={clsx(classes.notes, classes.notesBelow)}
        dangerouslySetInnerHTML={{ __html: notes }}
      />
    </Block>
  );
};

HomeMap.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
};

export default withStyles(styles)(HomeMap);
