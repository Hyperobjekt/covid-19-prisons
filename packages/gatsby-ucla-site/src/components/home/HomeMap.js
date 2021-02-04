import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import { fade, Grid, Typography, withStyles } from "@material-ui/core"
import { Block } from "gatsby-theme-hyperobjekt-core"
import { NationalMap, MapLegend } from "../maps"
import { navigate } from "gatsby"
import { useMapStore } from "@hyperobjekt/svg-maps"
import ResponsiveContainer from "../ResponsiveContainer"
import Stack from "../Stack"
import { serifTypography } from "../../gatsby-theme-hyperobjekt-core/theme"
import { useActiveMetric, useMappableFacilities } from "../../common/hooks"
import { getLang } from "../../common/utils/i18n"
import MetricSelectionTitle from "../controls/MetricSelectionTitle"
import { getSlug } from "../../common/utils/selectors"
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
        height: `calc(100% - ${theme.spacing(1)})`,
      },
    },
  },
  notesXlContainer: {
    display: "none",
    marginTop: "240px",
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
    },
  },
  textContainer: {},
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
  mapDescription: {
    maxWidth: "20rem",
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
})

const HomeMap = ({ classes, title, description, className, ...props }) => {
  const setSelected = useMapStore((state) => state.setSelected)
  const metric = useActiveMetric()
  const data = useMappableFacilities()

  // handler for selection
  const handleSelect = (geo) => {
    setSelected(geo)
    navigate(`states/${getSlug(geo.properties.name)}`)
  }

  return (
    <Block
      type="fullWidth"
      data-tip=""
      className={clsx(classes.root, className)}
      {...props}
    >
      <ResponsiveContainer className={classes.controls}>
        <Grid container spacing={1} className={classes.detailContainer}>
          <Grid item xs={12} md={8}>
            <Stack className={classes.textContainer} spacing={0.5}>
              <MetricSelectionTitle title={title} />
              <Typography className={classes.mapDescription} variant="body2">
                {getLang("map", metric)}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <MapLegend data={data} className={classes.legend} />
          </Grid>
          <Grid item xs={12} md={4} className={classes.notesXlContainer}>
            <Typography
              variant="body2"
              className={classes.notes}
              dangerouslySetInnerHTML={{ __html: getLang("map", "notes") }}
            />
          </Grid>
        </Grid>
      </ResponsiveContainer>
      <NationalMap facilities={data} metric={metric} onSelect={handleSelect} />
      <Typography
        variant="body2"
        className={clsx(classes.notes, classes.notesBelow)}
        dangerouslySetInnerHTML={{ __html: getLang("map", "notes") }}
      />
    </Block>
  )
}

HomeMap.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
}

export default withStyles(styles)(HomeMap)
