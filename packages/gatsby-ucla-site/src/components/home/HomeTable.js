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
import { formatMetricValue } from "../../common/utils/formatters"
import clsx from "clsx"

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
const perFormatter = (v) => formatMetricValue(v, "home_table_rate")

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

const HomeTable = ({
  title,
  note,
  classes,
  categories,
  selectedRegion,
  ...props
}) => {
  // pull active metric from the store, with setter
  const [metric, setMetric] = useOptionsStore(
    (state) => [state.metric, state.setMetric],
    shallow
  )

  // data for table
  const data = useFacilitiesData(categories, selectedRegion)

  // styles for number columns in table
  const numberColStyle = React.useMemo(
    () => ({
      width: "12.5%",
      minWidth: 100,
      textAlign: "right",
    }),

    []
  )

  // column configuration for the table
  const columns = React.useMemo(() => {
    const facilityCol = {
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
              <span style={{ marginRight: 8 }}>{prop.row.original.state}</span>
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
    }

    const colNames = [
      "confirmed",
      "confirmed_rate",
      "active",
      "active_rate",
      "deaths",
      "deaths_rate",
      "tested",
      "tested_rate",
    ]

    const cols = colNames.map((cn) => {
      const col = {
        id: cn,
        Header: getLang(cn),
        accessor: `residents.${cn}`,
        Cell: (prop) => countFormatter(prop.value),
        style: numberColStyle,
      }

      const isRate = cn.indexOf("_rate") > 0
      if (isRate) {
        col.sortType = rateSorter
        col.Cell = (prop) => rateFormatter(prop.value)
      }

      return col
    })

    return [facilityCol, ...cols]
  }, [classes.name, numberColStyle])

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
    <Block
      type="fullWidth"
      className={clsx(classes.root, "home-table")}
      {...props}
    >
      <ResponsiveContainer>
        <MetricSelectionTitle title={title} />
        <Table
          className={classes.table}
          data={data.filter((d) => d.name !== "Statewide")}
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
        {note && note.length > 0 && (
          <Notes notes={note} className={classes.notes} />
        )}
      </ResponsiveContainer>
    </Block>
  )
}

export default withStyles(styles)(HomeTable)
