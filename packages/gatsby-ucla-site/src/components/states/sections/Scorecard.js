import React from "react"
import clsx from "clsx"
import { Table } from "../../table"
import { Grid, Typography, withStyles } from "@material-ui/core"
import { Link } from "gatsby-theme-material-ui"
import Notes from "../../Notes"
import StepWrapper from "../StepWrapper"
import BadIcon from "../../../../content/assets/score-bad.svg"
import OkayIcon from "../../../../content/assets/score-okay.svg"
import GoodIcon from "../../../../content/assets/score-good.svg"
import { sansSerifyTypography } from "../../../gatsby-theme-hyperobjekt-core/theme"

const MIN_COL_WIDTH = 116
const MAX_COL_WIDTH = 230

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
    margin: theme.spacing(2, 0),
    "& $scoreTitle, & $scoreGrade": {
      ...sansSerifyTypography,
      display: "inline-block",
      margin: 0,
    },

    [theme.breakpoints.up("lg")]: {
      margin: theme.spacing(4, 0),
      "& $scoreTitle, & $scoreGrade": {
        paddingTop: theme.spacing(4),
      },
    },
  },
  scoreTitle: {
    paddingTop: theme.spacing(2),
    borderTop: "2px dotted #92926C",
    lineHeight: 1,
    fontSize: theme.typography.pxToRem(13),
  },
  scoreGrade: {
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
    fontSize: theme.typography.pxToRem(20),
    display: "inline-block",
  },
  body: {
    marginTop: theme.spacing(2),
    fontSize: theme.typography.pxToRem(14),
  },
  dateExplainer: {
    marginTop: theme.spacing(2),
    fontSize: theme.typography.pxToRem(13),
  },
  asteriskExplainer: {
    marginTop: theme.spacing(2),
    fontSize: theme.typography.pxToRem(11),
    display: "flex",
    "& $asterisk": {
      marginRight: theme.spacing(1),
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
    "&$residentSection $table": {
      maxWidth: MAX_COL_WIDTH * 5,
    },
    "&$staffSection $table": {
      maxWidth: MAX_COL_WIDTH * 3,
    },
    "&$qualitySection $table": {
      maxWidth: MAX_COL_WIDTH * 4,
    },
  },
  cellValue: {
    display: "flex",
    "& p": {
      margin: theme.spacing(0.4, 0, 0, 1),
    },
  },
  table: {
    "& .MuiTableCell-root": {
      padding: theme.spacing(2, 1, 2, 0),
      fontSize: theme.typography.pxToRem(13),
      background: "unset !important",
      "&.MuiTableCell-body": {
        border: "none",
      },
    },
  },
})

const getQualityValue = (value, lang) => {
  let alt = lang.table_value.no
  let icon = BadIcon
  let text = lang.table_value.no

  const val = value && value.toLowerCase()
  if (val === "yes") {
    alt = lang.table_value.yes
    icon = GoodIcon
    text = lang.table_value.yes
  }
  return (
    <>
      <img alt={alt} src={icon} />
      <p>{text}</p>
    </>
  )
}

const getReportingValue = (value, lang) => {
  let alt = lang.table_value.none_alt
  let icon = BadIcon
  let text = lang.table_value.none

  const val = value && value.toLowerCase()
  if (val === "facility-level") {
    alt = lang.table_value.facility_level_alt
    icon = GoodIcon
    text = lang.table_value.facility_level
  } else if (val === "statewide") {
    alt = lang.table_value.statewide_alt
    icon = OkayIcon
    text = lang.table_value.statewide
  }
  return (
    <>
      <img alt={alt} src={icon} />
      <p>{text}</p>
    </>
  )
}

const qualityColumns = [
  { id: "machine" },
  { id: "regularly" },
  { id: "defined" },
  { id: "history" },
]

const resReportingColumns = [
  { id: "cases_residents" },
  { id: "deaths_residents" },
  { id: "active_residents" },
  { id: "tests_residents" },
  { id: "population_residents" },
]

const staffReportingColumns = [
  { id: "cases_staff" },
  { id: "deaths_staff" },
  { id: "tests_staff" },
]

const ScorecardSection = ({
  data,
  lang,
  columnMeta,
  title,
  getDisplayValue,
  className,
  classes,
}) => {
  const columns = React.useMemo(() => {
    return columnMeta.map((c) => ({
      Header: lang.table_header[c.id],
      accessor: c.id,
      disableSortBy: true,
      Cell: (prop) => (
        <span className={classes.cellValue}>
          {getDisplayValue(prop.value, lang)}
        </span>
      ),
      style: {
        minWidth: MIN_COL_WIDTH,
        // maxWidth: MAX_COL_WIDTH,
        width: `${100 / columnMeta.length}%`,
      },
    }))
  })

  return (
    <div className={clsx(className, classes.section)}>
      <Typography className={classes.sectionTitle} variant="h5">
        {title}
      </Typography>
      <Table
        className={classes.table}
        columns={columns}
        data={[data]}
        disableFilter={true}
        disableFooter={true}
      />
    </div>
  )
}

const Scorecard = ({ classes, data, state, lang, ...props }) => {
  const scorecardData = data.stateScorecard?.nodes[0]
  if (!scorecardData) return null

  // TODO
  const date = "LAST_UPDATED"
  const asterisked = true

  const asterisk = <span className={classes.asterisk}>*</span>

  const { link_text, link_url, text: description } = lang.description
  const blogLink = <Link to={link_url}>{link_text}</Link>
  const descriptionArray = description
    
    .replace("${state}", state)
    
    .split("${link}")
  return (
    <StepWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={3} className={classes.info}>
          <Typography variant="h3" className={classes.title}>
            {lang.title}
          </Typography>
          <Typography variant="body1" className={classes.score}>
            <p className={classes.scoreTitle}>
              {lang.score_title[0]}
              <br />
              {lang.score_title[1]}
            </p>
            <p className={classes.scoreGrade}>
              {scorecardData.score}
              {asterisked && asterisk}
            </p>
          </Typography>
          <Typography variant="body1" className={classes.body}>
            {descriptionArray[0]}
            {blogLink}
            {descriptionArray[1]}
          </Typography>
          <Typography variant="body2" className={classes.dateExplainer}>
            {lang.date_explainer.replace("${date}", date)}
          </Typography>
          {asterisked && (
            <Typography variant="body2" className={classes.asteriskExplainer}>
              {asterisk}
              <span>{lang.asterisk_explainer}</span>
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} lg={9} className={classes.scorecardSections}>
          <ScorecardSection
            className={classes.residentSection}
            classes={classes}
            lang={lang}
            columnMeta={resReportingColumns}
            data={scorecardData}
            title={lang.section.resident_reporting}
            getDisplayValue={getReportingValue}
          />
          <ScorecardSection
            className={classes.staffSection}
            classes={classes}
            lang={lang}
            columnMeta={staffReportingColumns}
            data={scorecardData}
            title={lang.section.staff_reporting}
            getDisplayValue={getReportingValue}
          />
          <ScorecardSection
            className={classes.qualitySection}
            classes={classes}
            lang={lang}
            columnMeta={qualityColumns}
            data={scorecardData}
            title={lang.section.data_quality}
            getDisplayValue={getQualityValue}
          />
        </Grid>
      </Grid>
      {/* <Notes notes={[lang.notes.lorem]}></Notes> */}
    </StepWrapper>
  )
}

Scorecard.propTypes = {}

export default withStyles(styles)(Scorecard)
