import React from "react"
import clsx from "clsx"
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
  // Total row goes first
  if (a.original.isTotal) return 1
  if (b.original.isTotal) return -1

  // non-state rows (federal, ice) go above states 
  if (a.original.isState !== b.original.isState) {
    return a.original.isState ? -1 : 1
  }

  return a.original.jurisdiction > b.original.jurisdiction ? -1 : 1
}

const styles = (theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
  wrapper: {
    maxWidth: "38rem",
    "& h3": {
      maxWidth: "32rem",
    },
  },
  body: {
    maxWidth: "32rem",
    margin: theme.spacing(1, 0, 2),
  },
  clickable: {},
  table: {
    "& tr:hover $clickable": {
      textDecoration: "underline",
      textDecorationThickness: "1px",
      cursor: "pointer",
      "&:hover": {
        textDecorationColor: theme.palette.secondary.main,
      },
    },
  },
})

const intFormatter = format(",d")

const countFormatter = (value) =>
  !isNumber(value) ? "--" : intFormatter(value)

const VaccineTable = ({ title, subtitle, classes, ...props }) => {
  // data for table
  const data = useVaccineData()

  const handleRowClick = React.useCallback(
    ({ jurisdiction, isState, isFederal, isIce }) => {
      if (jurisdiction && isState) {
        navigate(`states/${getSlug(jurisdiction)}`)
      } else if (jurisdiction && isFederal) {
        navigate(`federal`)
      } else if (jurisdiction && isIce) {
        navigate(`immigration`)
      }
    },
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
              <span
                onClick={handleRowClick.bind(this, prop.row.original)}
                className={clsx({
                  [classes.clickable]: !prop.row.original.isTotal,
                })}
                style={{ marginRight: 8 }}
              >
                {prop.row.original.jurisdiction}
              </span>
            </Typography>
          )
        },
        style: {
          width: "32%",
          minWidth: 130,
        },
      },
      {
        id: "r-vadmin",
        Header: getLang("residents_vadmin"),
        accessor: "residents.vadmin",
        disableSortBy: true,
        Cell: (prop) => countFormatter(prop.value),
        style: {
          width: "37%",
          minWidth: 170,
          textAlign: "right",
        },
      },
      {
        id: "s-vadmin",
        Header: getLang("staff_vadmin"),
        accessor: "staff.vadmin",
        disableSortBy: true,
        Cell: (prop) => countFormatter(prop.value),
        style: {
          width: "31%",
          minWidth: 160,
          textAlign: "right",
        },
      },
    ],
    []
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
          />
        </div>
      </ResponsiveContainer>
    </Block>
  )
}

export default withStyles(styles)(VaccineTable)
