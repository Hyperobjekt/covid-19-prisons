import React from "react"
import { navigate } from "gatsby"
import { Table } from "../table"
import { format } from "d3-format"
import { Typography, withStyles } from "@material-ui/core"
import { useVaccineData } from "../../common/hooks"
import { Block } from "gatsby-theme-hyperobjekt-core"

import ResponsiveContainer from "../ResponsiveContainer"
import { getSlug, isNumber } from "../../common/utils/selectors"
import { getLang } from "../../common/utils/i18n"

const alphaStateSort = (a, b) => {
  if (a.original.isState !== b.original.isState) {
    return a.original.isState ? 1 : -1
  }
  return a.original.jurisdiction > b.original.jurisdiction ? -1 : 1
}

const styles = (theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
  wrapper: {
    maxWidth: 860,
  },
  body: {
    margin: theme.spacing(1, 0, 2),
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
      width: "33.3%",
      minWidth: 160,
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
        accessor: "jurisdiction",
        disableSortBy: true,
        sortType: alphaStateSort,
        Cell: (prop) => {
          return (
            <Typography variant="body2" color="textSecondary">
              <span style={{ marginRight: 8 }}>
                {prop.row.original.jurisdiction}
              </span>
            </Typography>
          )
        },
        style: {
          width: "33.3%",
          minWidth: 160,
        },
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
    const { jurisdiction, isState, isFederal, isIce } = row.original
    if (jurisdiction && isState) {
      navigate(`states/${getSlug(jurisdiction)}`)
    } else if (jurisdiction && isFederal) {
      navigate(`federal`)
    } else if (jurisdiction && isIce) {
      navigate(`immigration`)
    } 
  }, [])
  return (
    <Block type="fullWidth" className={classes.root} {...props}>
      <ResponsiveContainer>
        <div className={classes.wrapper}>
          <Typography variant="h3">{title}</Typography>
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: subtitle }}
            className={classes.body}
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
        </div>
      </ResponsiveContainer>
    </Block>
  )
}

export default withStyles(styles)(VaccineTable)
