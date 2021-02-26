import React from "react"
import { navigate } from "gatsby"
import { Table } from "../table"
import { format } from "d3-format"
import { Typography, withStyles } from "@material-ui/core"
import { useVaccineData } from "../../common/hooks"
import { Block } from "gatsby-theme-hyperobjekt-core"

import ResponsiveContainer from "../ResponsiveContainer"
import {
  getColorForJurisdiction,
  getSlug,
  isNumber,
} from "../../common/utils/selectors"
import { getLang } from "../../common/utils/i18n"
import { DotMarker } from "../markers"

const alphaStateSort = (a, b) => {
  return a.original.state > b.original.state ? -1 : 1
}

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
})

const intFormatter = format(",d")

const countFormatter = (value) =>
  !isNumber(value) ? "--" : intFormatter(value)

const VaccineTable = ({ title, subtitle, classes, ...props }) => {
  // data for table
  const data = useVaccineData()

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
  const columns = React.useMemo(
    () => [
      {
        id: "jurisdiction",
        Header: getLang("jurisdiction"),
        accessor: "name",
        disableSortBy: true,
        sortType: alphaStateSort,
        Cell: (prop) => {
          return (
            <Typography variant="body2" color="textSecondary">
              <span style={{ marginRight: 8 }}>{prop.row.original.state}</span>
            </Typography>
          )
        },
        style: {
          width: "25%",
          minWidth: 260,
        },
      },
      {
        id: "r-initiated",
        Header: getLang("residents_initiated"),
        accessor: "residents.initiated",
        disableSortBy: true,
        Cell: (prop) => countFormatter(prop.value),
        style: numberColStyle,
      },
      {
        id: "r-completed",
        Header: getLang("residents_completed"),
        accessor: "residents.completed",
        disableSortBy: true,
        Cell: (prop) => countFormatter(prop.value),
        style: numberColStyle,
      },
      {
        id: "r-vadmin",
        Header: getLang("residents_vadmin"),
        accessor: "residents.vadmin",
        disableSortBy: true,
        Cell: (prop) => countFormatter(prop.value),
        style: numberColStyle,
      },
      {
        id: "s-initiated",
        Header: getLang("staff_initiated"),
        accessor: "staff.initiated",
        disableSortBy: true,
        Cell: (prop) => countFormatter(prop.value),
        style: numberColStyle,
      },
      {
        id: "s-completed",
        Header: getLang("staff_completed"),
        accessor: "staff.completed",
        disableSortBy: true,
        Cell: (prop) => countFormatter(prop.value),
        style: numberColStyle,
      },
      {
        id: "s-vadmin",
        Header: getLang("staff_vadmin"),
        accessor: "staff.vadmin",
        disableSortBy: true,
        Cell: (prop) => countFormatter(prop.value),
        style: numberColStyle,
      },
    ],
    [numberColStyle]
  )

  // memoized table options
  const options = React.useMemo(
    () => ({
      initialState: {
        pageSize: 5,
        sortBy: [{ id: "jurisdiction", desc: false }],
      },
    }),
    []
  )

  const handleRowClick = React.useCallback((row) => {
    const { state, noNavigate } = row.original
    state && !noNavigate && navigate(`states/${getSlug(state)}`)
  }, [])
  return (
    <Block type="fullWidth" className={classes.root} {...props}>
      <ResponsiveContainer>
        <Typography variant="h3">{title}</Typography>
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
        <Table
          className={classes.table}
          data={data}
          columns={columns}
          options={options}
          sortColumn={"jurisdiction"}
          disableFilter={true}
          onRowClick={handleRowClick}
        />
      </ResponsiveContainer>
    </Block>
  )
}

export default withStyles(styles)(VaccineTable)
