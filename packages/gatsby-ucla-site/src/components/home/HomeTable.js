import React from "react"
import { navigate } from "gatsby"
import { Table } from "../table"
import { format } from "d3-format"
import { Typography, withStyles } from "@material-ui/core"
import { useFacilitiesData, useOptionsStore } from "../../common/hooks"
import { Block } from "gatsby-theme-hyperobjekt-core"

import ResponsiveContainer from "../ResponsiveContainer"
import {
  getColorForJurisdiction,
  getSlug,
  isNumber,
} from "../../common/utils/selectors"
import shallow from "zustand/shallow"
import { getLang } from "../../common/utils/i18n"
import JurisdictionToggles from "../controls/JurisdictionToggles"
import DotMarker from "../markers/DotMarker"
import MetricSelectionTitle from "../controls/MetricSelectionTitle"
import Notes from "../Notes"

const styles = (theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
  toggleContainer: {
    margin: theme.spacing(2, 0, 1, -0.75),
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(0, 0, 0, -0.75),
    },
  },
  name: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    maxWidth: 224,
    [theme.breakpoints.up(1440)]: {
      maxWidth: 320,
    },
  },
  table: {},
  notes: {
    listStyle: "none",
    margin: theme.spacing(2, "auto"),
    maxWidth: "24rem",
    "& li": {
      maxWidth: "24rem",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "space-around",
      maxWidth: "none",
      "& li + li": {
        marginTop: 0
      }
    },
    
  }
})

const intFormatter = format(",d")
const perFormatter = format(".0%")

const countFormatter = (value) =>
  !isNumber(value) ? "--" : intFormatter(value)

const rateFormatter = (value) => (!isNumber(value) ? "--" : perFormatter(value))

const rateSorter = (a, b, columnId) => {
  const vals = [a, b].map((v) => v["original"]["residents"][columnId])
  if (isNumber(vals[0]) && !isNumber(vals[1])) return 1
  if (!isNumber(vals[0]) && isNumber(vals[1])) return -1
  if (!isNumber(vals[0]) && !isNumber(vals[1])) return 0
  const diff = vals[0] - vals[1]
  return diff < 0 ? -1 : 1
}

const HomeTable = ({ title, note, classes, ...props }) => {
  // pull active metric from the store, with setter
  const [metric, setMetric] = useOptionsStore(
    (state) => [state.metric, state.setMetric],
    shallow
  )

  // data for table
  const data = useFacilitiesData()

  // styles for number columns in table
  const numberColStyle = {
    width: "12.5%",
    minWidth: 100,
    textAlign: "right",
  }


  // column configuration for the table
  const columns = React.useMemo(
    () => [
      {
        Header: "Facility",
        accessor: "name",
        disableSortBy: true,
        Cell: (prop) => {
          return (
            <>
              <Typography className={classes.name} variant="body1">
                {prop.value}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <span style={{ marginRight: 8 }}>
                  {prop.row.original.state}
                </span>
                <DotMarker
                  radius={4}
                  fill={getColorForJurisdiction(prop.row.original.jurisdiction)}
                />
              </Typography>
            </>
          )
        },
        style: {
          width: "25%",
          minWidth: 260,
        },
      },
      {
        id: "confirmed",
        Header: getLang("confirmed"),
        accessor: "residents.confirmed",
        Cell: (prop) => countFormatter(prop.value),
        style: numberColStyle,
      },
      {
        id: "confirmed_rate",
        Header: getLang("confirmed_rate"),
        accessor: "residents.confirmed_rate",
        sortType: rateSorter,
        Cell: (prop) => rateFormatter(prop.value),
        style: numberColStyle,
      },
      {
        id: "active",
        Header: getLang("active"),
        accessor: "residents.active",
        Cell: (prop) => countFormatter(prop.value),
        style: numberColStyle,
      },
      {
        id: "active_rate",
        Header: getLang("active_rate"),
        accessor: "residents.active_rate",
        sortType: rateSorter,
        Cell: (prop) => rateFormatter(prop.value),
        style: numberColStyle,
      },
      {
        id: "deaths",
        Header: getLang("deaths"),
        accessor: "residents.deaths",
        Cell: (prop) => countFormatter(prop.value),
        style: numberColStyle,
      },
      {
        id: "deaths_rate",
        Header: getLang("deaths_rate"),
        accessor: "residents.deaths_rate",
        sortType: rateSorter,
        Cell: (prop) => rateFormatter(prop.value),
        style: numberColStyle,
      },
      {
        id: "tested",
        Header: getLang("tested"),
        accessor: "residents.tested",
        Cell: (prop) => countFormatter(prop.value),
        style: numberColStyle,
      },
      {
        id: "tested_rate",
        Header: getLang("tested_rate"),
        accessor: "residents.tested_rate",
        Cell: (prop) => countFormatter(prop.value),
        style: numberColStyle,
      },
    ],
    [classes.name]
  )

  // memoized table options
  const options = React.useMemo(
    () => ({
      initialState: {
        pageSize: 5,
        sortBy: [{ id: metric, desc: true }],
      },
    }),
    [metric]
  )

  // handler for when table headers are clicked
  const handleSortChange = React.useCallback(
    (sortBy) => {
      const newMetric = sortBy
      metric !== newMetric && setMetric(newMetric)
    },
    [metric, setMetric]
  )

  const handleRowClick = React.useCallback((row) => {
    const state = row.original.state
    state && navigate(`states/${getSlug(state)}`)
  }, [])
  return (
    <Block type="fullWidth" className={classes.root} {...props}>
      <ResponsiveContainer>
        <MetricSelectionTitle title={title} />
        <Table
          className={classes.table}
          data={data}
          columns={columns}
          options={options}
          sortColumn={metric}
          onSort={handleSortChange}
          onRowClick={handleRowClick}
        >
          <JurisdictionToggles
            marker="dot"
            horizontal="md"
            classes={{ root: classes.toggleContainer }}
          />
        </Table>
        { note && note.length > 0 && <Notes notes={note} className={classes.notes} />}
      </ResponsiveContainer>
    </Block>
  )
}

export default withStyles(styles)(HomeTable)
