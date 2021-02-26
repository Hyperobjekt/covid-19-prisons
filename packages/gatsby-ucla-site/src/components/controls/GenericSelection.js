import { ButtonBase, fade, Menu, MenuItem, withStyles } from "@material-ui/core"
import React from "react"
import { getLang } from "../../common/utils/i18n"
import ArrowDown from "@material-ui/icons/ArrowDropDown"
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

const GenericSelection = ({
  classes,
  className,
  options,
  selectedOption,
  handleSelect,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)

  const selectHandler = (value) => {
    handleSelect(value)
    handleClose()
  }
  return (
    <>
      <ButtonBase
        className={classes.button}
        aria-controls="option-menu"
        aria-haspopup="true"
        onClick={handleClick}
        {...props}
      >
        {getLang(selectedOption)}
        <ArrowDown />
      </ButtonBase>
      <Menu
        id="option-menu"
        className={classes.menu}
        anchorEl={anchorEl}
        keepMounted
        MenuListProps={{ disablePadding: true }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((o) => (
          <MenuItem
            className={classes.menuItem}
            selected={o === selectedOption}
            key={o}
            onClick={(e) => selectHandler(o, e)}
          >
            {getLang(o)}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default withStyles(styles)(GenericSelection)
