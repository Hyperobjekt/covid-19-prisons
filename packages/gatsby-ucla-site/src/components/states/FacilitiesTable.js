import React from "react"
import { Table } from "../table"
import { Typography, withStyles } from "@material-ui/core"
import { titleTypography } from "../../gatsby-theme-hyperobjekt-core/theme"
import { getLang } from "../../common/utils/i18n"
import { formatMetricValue } from "../../common/utils/formatters"
import useStatesStore from "./useStatesStore"

const styles = (theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
  title: {
    ...titleTypography,
    fontSize: theme.typography.pxToRem(38),
    maxWidth: "14em",
    marginTop: 0,
    "& span": {
      color: theme.palette.secondary.main,
    },
  },
  name: {},
  table: {
    margin: theme.spacing(0, -3),
    width: `calc(100% + ${theme.spacing(6)})`,
    "& .MuiTablePagination-input, & .MuiTablePagination-spacer + .MuiTablePagination-caption": {
      display: "none",
    },
  },
})

const FacilitiesTable = ({
  classes,
  data,
  group = "residents",
  metric,
  isFederal,
  ...props
}) => {
  const setHoveredFacility = useStatesStore((state) => state.setHoveredFacility)
  const columns = React.useMemo(
    () => [
      {
        Header: "Facility",
        accessor: "name",
        disableSortBy: true,
        Cell: (prop) => {
          return (
            <>
              <Typography
                onMouseEnter={() => {
                  // console.log("Hovering in table: ", prop.cell.row.original)
                  setHoveredFacility(prop.cell.row.original)
                }}
                onMouseLeave={() => {
                  setHoveredFacility(null)
                }}
                className={classes.name}
                variant="body1"
              >
                {prop.value}
              </Typography>
              {!isFederal && (
                <Typography variant="body2" color="textSecondary">
                  {getLang(prop.row.original.jurisdiction)}
                </Typography>
              )}
            </>
          )
        },
        style: {
          minWidth: "50%",
        },
      },
      {
        id: "residents." + metric,
        Header: getLang("residents"),
        accessor: "residents." + metric,
        Cell: (prop) => {
          return formatMetricValue(prop.value, metric)
        },
        style: {
          width: 136,
          maxWidth: 136,
          textAlign: "right",
        },
      },
      {
        id: "staff." + metric,
        Header: `${getLang("staff")}`,
        accessor: "staff." + metric,
        Cell: (prop) => {
          return formatMetricValue(prop.value, metric)
        },
        style: {
          width: 136,
          maxWidth: 136,
          textAlign: "right",
        },
      },
    ],
    [classes.name, metric, isFederal, setHoveredFacility]
  )

  const [pageIndex, setPageIndex] = React.useState(0)
  const changePageHandler = React.useCallback((idx) => {
    setPageIndex(idx)
  }, [])
  
  const options = React.useMemo(
    () => {
      return {
        initialState: {
          pageSize: 5,
          pageIndex,
          sortBy: [{ id: group + "." + metric, desc: true }],
        },
      }
    },
    [metric, group, pageIndex]
  )

  return (
    <Table
      className={classes.table}
      columns={columns}
      options={options}
      onChangePage={changePageHandler}
      // fixes #45
      data={data.filter((d) => d.name !== "Statewide")}
      {...props}
    ></Table>
  )
}

FacilitiesTable.propTypes = {}

export default withStyles(styles)(FacilitiesTable)
