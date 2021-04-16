import React from "react"
import { Table } from "../table"
import { format } from "d3-format"
import { Box, Typography, withStyles } from "@material-ui/core"
import { useVaccineData } from "../../common/hooks"
import { Block } from "gatsby-theme-hyperobjekt-core"

import ResponsiveContainer from "../ResponsiveContainer"
import { getSlug, isNumber } from "../../common/utils/selectors"
import { getLang } from "../../common/utils/i18n"
import { Link } from "gatsby-theme-material-ui"

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
    [theme.breakpoints.up(1100)]: {
      display: "flex",
    },
  },
  content: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: "38rem",
      minWidth: "36rem",
      "& h3": {
        maxWidth: "32rem",
      },
    },
  },
  body: {
    maxWidth: "32rem",
    margin: theme.spacing(1, 0, 2),
  },
  jurisdictionLink: {
    "&.MuiLink-root.MuiTypography-root": {
      color: theme.palette.text.secondary,
    },
  },
  table: {
    "& tr:hover $jurisdictionLink": {
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
          const { jurisdiction, isState, isFederal, isIce } = prop.row.original
          let slug = null
          if (jurisdiction && isState) {
            slug = `/states/${getSlug(jurisdiction)}`
          } else if (isFederal) {
            slug = `/federal`
          } else if (isIce) {
            slug = `/ice`
          }
          const jurisdictionElement = slug ? (
            <Link to={slug} className={classes.jurisdictionLink}>
              {jurisdiction}
            </Link>
          ) : (
            jurisdiction
          )
          return (
            <Typography variant="body2" color="textSecondary">
              {jurisdictionElement}
            </Typography>
          )
        },
        style: {
          width: "32%",
          minWidth: 130,
        },
      },
      {
        id: "r-initiated",
        Header: getLang("residents_initiated"),
        accessor: "residents.initiated",
        disableSortBy: true,
        Cell: (prop) => countFormatter(prop.value),
        style: {
          width: "37%",
          minWidth: 170,
          textAlign: "right",
        },
      },
      {
        id: "s-initiated",
        Header: getLang("staff_initiated"),
        accessor: "staff.initiated",
        disableSortBy: true,
        Cell: (prop) => countFormatter(prop.value),
        style: {
          width: "31%",
          minWidth: 160,
          textAlign: "right",
        },
      },
    ],
    [classes.jurisdictionLink]
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
          <div className={classes.content}>
            <Typography variant="h3">{title}</Typography>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: subtitle }}
              className={classes.body}
            />
          </div>
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
