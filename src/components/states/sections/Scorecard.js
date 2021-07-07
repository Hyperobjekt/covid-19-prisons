import React from "react";
import clsx from "clsx";
import { Box, Grid, Typography, withStyles } from "@material-ui/core";
import StepWrapper from "../StepWrapper";
import { sansSerifyTypography } from "../../../gatsby-theme-hypercore/theme";
import { BadIcon } from "../../../common/icons/BadIcon";
import { GoodIcon } from "../../../common/icons/GoodIcon";
import { OkayIcon } from "../../../common/icons/OkayIcon";

const styles = (theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(26),
  },
  info: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: "32em",
    },
  },
  score: {
    "& $scoreTitle, & $scoreGrade": {
      ...sansSerifyTypography,
      display: "inline-block",
    },
  },
  scorecardSections: {
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(2),
    },
  },
  scoreTitle: {
    lineHeight: 1.2,
    fontSize: theme.typography.pxToRem(13),
    paddingTop: theme.spacing(2),
    borderTop: "2px dotted #92926C",
    margin: theme.spacing(2, 0),
    maxWidth: "7em",
    [theme.breakpoints.up("lg")]: {
      margin: theme.spacing(3, 0),
      paddingTop: theme.spacing(3),
    },
  },
  scoreGrade: {
    margin: 0,
    color: theme.palette.secondary.main,
    fontWeight: 600,
    fontSize: theme.typography.pxToRem(32),
    paddingLeft: theme.spacing(1),
    "& $asterisk": {
      transform: "translateY(-.5rem)",
    },
  },
  asterisk: {
    fontWeight: 400,
    color: theme.palette.secondary.main,
    fontSize: theme.typography.pxToRem(22),
    display: "inline-block",
  },
  body: {
    fontSize: theme.typography.pxToRem(16),
  },
  dateExplainer: {
    marginTop: theme.spacing(2),
    fontSize: theme.typography.pxToRem(13),
  },
  asteriskExplainer: {
    marginTop: theme.spacing(2),
    display: "flex",
    "& p": {
      fontSize: theme.typography.pxToRem(11),
    },
    "& $asterisk": {
      marginRight: theme.spacing(1),
      transform: "translateY(-.25rem)",
    },
  },
  sectionTitle: {
    marginBottom: theme.spacing(2),
    fontSize: theme.typography.pxToRem(23),
  },
  residentSection: {},
  staffSection: {},
  qualitySection: {},
  section: {
    marginBottom: theme.spacing(5),
    "&$residentSection": {
      [theme.breakpoints.down("md")]: {
        marginTop: theme.spacing(5),
      },
    },
    "& .MuiGrid-item": {
      // only use the horizontal padding from spacing
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
});

const getItemProps = (value, lang) => {
  const val = value && value.toLowerCase();
  switch (val) {
    case "facility-level":
      return {
        alt: lang.table_value.facility_level_alt,
        icon: GoodIcon,
        text: lang.table_value.facility_level,
      };
    case "statewide":
      return {
        alt: lang.table_value.statewide_alt,
        icon: OkayIcon,
        text: lang.table_value.statewide,
      };
    case "yes":
      return {
        alt: lang.table_value.yes_alt,
        icon: GoodIcon,
        text: lang.table_value.yes,
      };
    case "no":
      return {
        alt: lang.table_value.no_alt,
        icon: BadIcon,
        text: lang.table_value.no,
      };
    default:
      return {
        alt: lang.table_value.none_alt,
        icon: BadIcon,
        text: lang.table_value.none,
      };
  }
};

const qualityColumns = [
  { id: "machine" },
  { id: "regularly" },
  { id: "defined" },
  { id: "history" },
];

const resReportingColumns = [
  { id: "cases_residents" },
  { id: "deaths_residents" },
  { id: "active_residents" },
  { id: "tests_residents" },
  { id: "population_residents" },
  { id: "vaccinations_residents" },
];

const staffReportingColumns = [
  { id: "cases_staff" },
  { id: "deaths_staff" },
  { id: "active_staff" },
  { id: "tests_staff" },
  { id: "population_staff" },
  { id: "vaccinations_staff" },
];

const ScorecardItem = ({ icon, alt, text, ...props }) => {
  const Icon = icon;
  return (
    <Box display="flex" alignItems="center" {...props}>
      <Icon aria-label={alt} />
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
};

const ScorecardList = withStyles((theme) => ({
  root: {
    padding: 0,
    margin: 0,
    [theme.breakpoints.up("md")]: {
      display: "flex",
      flexWrap: "wrap",
      "& > $item + $item": {
        marginLeft: theme.spacing(2),
      },
    },
  },
  item: {
    height: theme.spacing(4),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      flexDirection: "column",
      height: theme.spacing(8),
      justifyContent: "flex-start",
      alignItems: "stretch",
    },
    [theme.breakpoints.up("lg")]: {
      minWidth: `calc(33.333% - ${theme.spacing(4)})`,
      "&:nth-child(4)": {
        marginLeft: 0 + "!important",
      },
    },
  },
  label: {
    ...sansSerifyTypography,
    fontWeight: 700,
    fontSize: theme.typography.pxToRem(14),
    marginBottom: theme.spacing(1),
  },
  value: {
    "& svg": {
      width: "1em",
      height: "1em",
      marginRight: theme.spacing(1),
    },
  },
}))(({ columnMeta, lang, data, classes }) => {
  return (
    <Box className={classes.root} component="ul">
      {columnMeta.map((col) => {
        return (
          <Box className={classes.item} component="li" key={col.id}>
            <Typography className={classes.label}>
              {lang.table_header[col.id]}
            </Typography>
            <ScorecardItem
              className={classes.value}
              {...getItemProps(data[col.id], lang)}
            />
          </Box>
        );
      })}
    </Box>
  );
});

const ScorecardSection = ({
  data,
  lang,
  columnMeta,
  title,
  className,
  classes,
}) => {
  return (
    <Grid container spacing={3} className={clsx(classes.section, className)}>
      <Grid item xs={12} sm={5} md={12}>
        <Typography className={classes.sectionTitle} variant="h5">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={7} md={12}>
        <ScorecardList columnMeta={columnMeta} data={data} lang={lang} />
      </Grid>
    </Grid>
  );
};

const Scorecard = ({ classes, data, state = "", lang, ...props }) => {
  const scorecardData = data.scorecard?.nodes[0];
  if (!scorecardData) return null;

  const asteriskKey = props.isFederal ? "federal" : state.toLowerCase();
  const asteriskNote = lang.asterisk_notes.find(
    (entry) => asteriskKey === entry.key
  );
  const asteriskText = asteriskNote && asteriskNote.note;
  const asterisk = <span className={classes.asterisk}>*</span>;

  return (
    <StepWrapper>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={4} className={classes.info}>
          <Typography variant="h3" className={classes.title}>
            {lang.title}
          </Typography>
          <Typography variant="body1" className={classes.score}>
            <span className={classes.scoreTitle}>{lang.score_title}</span>
            <span className={classes.scoreGrade}>
              {scorecardData.score}
              {asteriskText && asterisk}
            </span>
          </Typography>
          <Typography
            variant="body1"
            className={classes.body}
            dangerouslySetInnerHTML={{
              /* eslint-disable no-template-curly-in-string */
              __html: lang.description.replace("${state}", state),
              /* eslint-enable no-template-curly-in-string */
            }}
          />
          <Typography
            variant="body2"
            className={classes.dateExplainer}
            dangerouslySetInnerHTML={{
              /* eslint-disable no-template-curly-in-string */
              __html: lang.date_note.replace("${date}", scorecardData.date),
              /* eslint-enable no-template-curly-in-string */
            }}
          />
          {asteriskText && (
            <span className={classes.asteriskExplainer}>
              {asterisk}
              <Typography
                variant="body2"
                dangerouslySetInnerHTML={{
                  __html: asteriskText,
                }}
              />
            </span>
          )}
        </Grid>
        <Grid item xs={12} lg={1}></Grid>
        <Grid item xs={12} lg={7} className={classes.scorecardSections}>
          <ScorecardSection
            className={classes.residentSection}
            classes={classes}
            lang={lang}
            columnMeta={resReportingColumns}
            data={scorecardData}
            title={lang.section.resident_reporting}
          />
          <ScorecardSection
            className={classes.staffSection}
            classes={classes}
            lang={lang}
            columnMeta={staffReportingColumns}
            data={scorecardData}
            title={lang.section.staff_reporting}
          />
          <ScorecardSection
            className={classes.qualitySection}
            classes={classes}
            lang={lang}
            columnMeta={qualityColumns}
            data={scorecardData}
            title={lang.section.data_quality}
          />
        </Grid>
      </Grid>
      {/* <Notes notes={[lang.notes.lorem]}></Notes> */}
    </StepWrapper>
  );
};

Scorecard.propTypes = {};

export default withStyles(styles)(Scorecard);
