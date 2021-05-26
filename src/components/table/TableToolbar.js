import React from "react"
import clsx from "clsx"
import { lighten, makeStyles } from "@material-ui/core/styles"
import PropTypes from "prop-types"
import { Toolbar } from "@material-ui/core"
import GlobalFilter from "./GlobalFilter"

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "center",
    },
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}))

const TableToolbar = (props) => {
  const classes = useToolbarStyles()
  const { preGlobalFilteredRows, setGlobalFilter, globalFilter } = props
  return (
    <Toolbar className={clsx(classes.root)}>
      {props.children}
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </Toolbar>
  )
}

TableToolbar.propTypes = {
  setGlobalFilter: PropTypes.func.isRequired,
  preGlobalFilteredRows: PropTypes.array.isRequired,
  globalFilter: PropTypes.string,
}

export default TableToolbar
