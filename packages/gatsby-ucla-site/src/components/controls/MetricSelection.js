import { ButtonBase, fade, Menu, MenuItem, withStyles } from "@material-ui/core"
import React from "react"
import shallow from "zustand/shallow"
import { useOptionsStore } from "../../common/hooks"
import { getLang } from "../../common/utils/i18n"
import ArrowDown from "@material-ui/icons/ArrowDropDown"
import { METRICS, GROUPS } from "../../common/constants"
const styles = (theme) => ({
  button: {
    lineHeight: 1,
    textAlign: "left",
    transition: theme.transitions.create("background"),
    "&.MuiButtonBase-root:focus, &.MuiButtonBase-root:hover": {
      background: fade("#d7790f", 0.08),
      borderBottomColor: "#d7790f",
    },
  },
  menu: {},
  menuItem: {},
  menuItemActive: {},
})

const MetricSelection = ({ classes, className, group, ...props }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [metric, setMetric] = useOptionsStore(
    (state) => [state.metric, state.setMetric],
    shallow
  )
  // get available metrics, or default to first group
  const metrics = group ? METRICS[group] : METRICS[GROUPS[0]]
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)

  const handleSelect = (value, event) => {
    setMetric(value)
    handleClose()
  }
  return (
    <>
      <ButtonBase
        className={classes.button}
        aria-controls="metric-menu"
        aria-haspopup="true"
        onClick={handleClick}
        {...props}
      >
        {getLang(metric)}
        <ArrowDown />
      </ButtonBase>
      <Menu
        id="metric-menu"
        className={classes.menu}
        anchorEl={anchorEl}
        keepMounted
        MenuListProps={{ disablePadding: true }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {metrics.map((m) => (
          <MenuItem
            className={classes.menuItem}
            selected={m === metric}
            key={m}
            onClick={(e) => handleSelect(m, e)}
          >
            {getLang(m)}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default withStyles(styles)(MetricSelection)
