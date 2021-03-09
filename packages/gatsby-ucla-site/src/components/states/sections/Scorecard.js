import React from "react"
import clsx from "clsx"
import { Table } from "../../table"
import { Grid, Typography, withStyles } from "@material-ui/core"
import Notes from "../../Notes"
import StepWrapper from "../StepWrapper"
import BadIcon from "../../../../content/assets/score-bad.svg"
import OkayIcon from "../../../../content/assets/score-okay.svg"
import GoodIcon from "../../../../content/assets/score-good.svg"
import { sansSerifyTypography } from "../../../gatsby-theme-hyperobjekt-core/theme"

const styles = (theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(26),
  },
  score: {
    margin: theme.spacing(2, 0),
    "& $scoreTitle, & $scoreGrade": {
      ...sansSerifyTypography,
      display: "inline-block",
      margin: 0,
    },
  },
  scoreTitle: {
    lineHeight: 1,
    fontSize: theme.typography.pxToRem(13),
    paddingRight: theme.spacing(1),
  },
  scoreGrade: {
    color: theme.palette.secondary.main,
    fontWeight: 600,
    fontSize: theme.typography.pxToRem(32),
  },
  body: {
    marginTop: theme.spacing(2),
    fontSize: theme.typography.pxToRem(14),
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
    "&$staffSection $table, &$qualitySection $table": {
      maxWidth: 780,
    },
    "&$residentSection $table": {
      maxWidth: 1300,
    },
  },
  cellValue: {
    display: "inline-block",
    "& p": {
      display: "inline",
      verticalAlign: "top",
      margin: theme.spacing(0, 0, 0, 1),
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
        minWidth: 116,
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

const Scorecard = ({ classes, data, lang, ...props }) => {

  
  const scorecardData = data.allScorecard?.edges[0]?.node || {}
  if (!scorecardData) return null

  return (
    <StepWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={3}>
          <Typography variant="h3" className={classes.title}>
            {lang.title}
          </Typography>
          <Typography variant="body1" className={classes.score}>
            <p className={classes.scoreTitle}>
              Data
              <br />
              score
            </p>
            <p className={classes.scoreGrade}>{scorecardData.score}</p>
          </Typography>
          <Typography
            variant="body2"
            dangerouslySetInnerHTML={{ __html: lang.body }}
            className={classes.body}
          />
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
      <Notes notes={[lang.notes.lorem]}></Notes>
    </StepWrapper>
  )
}

Scorecard.propTypes = {}

export default withStyles(styles)(Scorecard)
