import React from "react"
import clsx from "clsx"
import { Table } from "../../table"
import {
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  withStyles,
} from "@material-ui/core"
import StepWrapper from "../StepWrapper"
import BadIcon from "../../../../content/assets/score-bad.svg"
import OkayIcon from "../../../../content/assets/score-okay.svg"
import GoodIcon from "../../../../content/assets/score-good.svg"
import { sansSerifyTypography } from "../../../gatsby-theme-hyperobjekt-core/theme"

// const MIN_COL_WIDTH = 116
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
    "& $scoreTitle, & $scoreGrade": {
      ...sansSerifyTypography,
      display: "inline-block",
    },
  },
  scoreTitle: {
    lineHeight: 1.2,
    fontSize: theme.typography.pxToRem(13),
    paddingTop: theme.spacing(2),
    borderTop: "2px dotted #92926C",
    margin: theme.spacing(2, 0),
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
    fontSize: theme.typography.pxToRem(14),
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
      "& $table": {
        maxWidth: MAX_COL_WIDTH * 5,
      },
      [theme.breakpoints.down("md")]: {
        marginTop: theme.spacing(5),
      },
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
      margin: theme.spacing(0.4, 0, 0, 0.2),
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(1),
      },
    },
    "& img": {
      transform: "scale(.6)",
      [theme.breakpoints.up("sm")]: {
        transform: "scale(.8)",
      },
      [theme.breakpoints.up("md")]: {
        transform: "scale(1)",
      },
    },
  },
  table: {
    "& .MuiTableBody-root .MuiTableRow-root:hover": {
      background: "unset !important",
    },
    "& .MuiTableCell-root": {
      padding: theme.spacing(2, 1, 2, 0),
      fontSize: theme.typography.pxToRem(13),
      "&.MuiTableCell-body": {
        border: "none",
      },
    },
  },
  pivotedTable: {
    fontSize: theme.typography.pxToRem(13),
    "& th, & td": {
      paddingBottom: theme.spacing(0.5),
    },
    "& th": {
      textAlign: "start",
      paddingRight: theme.spacing(1),
      width: "8rem",
      [theme.breakpoints.up(420)]: {
        width: "11rem",
      },
    },
    "& td": {
      // "& img": {
      //   transform: "scale(.6)",
      // },
      // "& p": {
      //   marginLeft: ".1rem",
      // },
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
        // minWidth: MIN_COL_WIDTH,
        // maxWidth: MAX_COL_WIDTH,
        // equal width columns
        width: `${100 / columnMeta.length}%`,
      },
    }))
  }, [getDisplayValue, classes, columnMeta, lang])

  const table = (
    <Table
      className={classes.table}
      columns={columns}
      data={[data]}
      disableFilter={true}
      disableFooter={true}
    />
  )

  const pivotedTable = (
    <table className={classes.pivotedTable}>
      <tbody>
        {columnMeta.map((c) => (
          <tr key={c.id}>
            <th>{lang.table_header[c.id]}</th>
            <td className={classes.cellValue}>
              {getDisplayValue(data[c.id], lang)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  const theme = useTheme()
  const bumpWidth = theme.breakpoints.values["sm"]
  const isLarge = useMediaQuery(`(min-width:${bumpWidth}px)`)

  return (
    <div className={clsx(className, classes.section)}>
      <Typography className={classes.sectionTitle} variant="h5">
        {title}
      </Typography>
      {isLarge ? table : pivotedTable}
    </div>
  )
}

const Scorecard = ({ classes, data, state = "", lang, ...props }) => {
  const scorecardData = data.scorecard?.nodes[0]
  if (!scorecardData) return null

  const asteriskKey = props.isFederal ? "federal" : state.toLowerCase()
  const asteriskText = lang.asterisk_notes[asteriskKey]
  const asterisk = <span className={classes.asterisk}>*</span>

  return (
    <StepWrapper>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={3} className={classes.info}>
          <Typography variant="h3" className={classes.title}>
            {lang.title}
          </Typography>
          <Typography variant="body1" className={classes.score}>
            <span className={classes.scoreTitle}>
              {lang.score_title[0]}
              <br />
              {lang.score_title[1]}
            </span>
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
        <Grid item xs={12} lg={8} className={classes.scorecardSections}>
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
