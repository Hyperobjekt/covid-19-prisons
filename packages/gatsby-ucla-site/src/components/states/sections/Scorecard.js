import React from "react"
import clsx from "clsx"
import { Table } from "../../table"
import { Typography, withStyles } from "@material-ui/core"
import Notes from "../../Notes"
import StepWrapper from "../StepWrapper"
import BadIcon from "../../../../content/assets/score-bad.svg"
import OkayIcon from "../../../../content/assets/score-okay.svg"
import GoodIcon from "../../../../content/assets/score-good.svg"
import { titleTypography } from "../../../gatsby-theme-hyperobjekt-core/theme"

const styles = (theme) => ({
  body: {
    marginTop: theme.spacing(2),
  },
  sectionTitle: {
    marginBottom: theme.spacing(2),
  },
  residentSection: {},
  staffSection: {},
  qualitySection: {},
  section: {
    marginTop: theme.spacing(5),
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
    "& .MuiTableCell-body": {
      border: "none",
    },
  },
})

const getQualityValue = (value) => {
  let alt = "no"
  let icon = BadIcon
  let text = "No"

  const val = value && value.toLowerCase()
  if (val === "yes") {
    alt = "yes"
    icon = GoodIcon
    text = "Yes"
  }
  return (
    <>
      <img alt={alt} src={icon} />
      <p>{text}</p>
    </>
  )
}

const getReportingValue = (value) => {
  let alt = "not reported"
  let icon = BadIcon
  let text = "None"

  const val = value && value.toLowerCase()
  if (val === "facility-level") {
    alt = "reported at the facility level"
    icon = GoodIcon
    text = "Facility-level"
  } else if (val === "statewide") {
    alt = "reported statewide"
    icon = OkayIcon
    text = "Statewide"
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
      Header: console.log(lang.table[c.id]) || lang.table[c.id],
      accessor: c.id,
      disableSortBy: true,
      Cell: (prop) => (
        <span className={classes.cellValue}>{getDisplayValue(prop.value)}</span>
      ),
      style: {
        minWidth: 140,
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
  const scorecardData = data.allScorecard?.edges[0]?.node

  return (
    <StepWrapper>
      <div className={classes.headers}>
        <Typography variant="h3">{lang.title}</Typography>
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: lang.body }}
          className={classes.body}
        />
      </div>
      <ScorecardSection
        className={classes.residentSection}
        classes={classes}
        lang={lang}
        columnMeta={resReportingColumns}
        data={scorecardData}
        title="Resident reporting quality"
        getDisplayValue={getReportingValue}
      />
      <ScorecardSection
        className={classes.staffSection}
        classes={classes}
        lang={lang}
        columnMeta={staffReportingColumns}
        data={scorecardData}
        title="Staff reporting quality"
        getDisplayValue={getReportingValue}
      />
      <ScorecardSection
        className={classes.qualitySection}
        classes={classes}
        lang={lang}
        columnMeta={qualityColumns}
        data={scorecardData}
        title="Data quality"
        getDisplayValue={getQualityValue}
      />
      <Notes notes={[lang.notes.lorem]}></Notes>
    </StepWrapper>
  )
}

Scorecard.propTypes = {}

export default withStyles(styles)(Scorecard)
