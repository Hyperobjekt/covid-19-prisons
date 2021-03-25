import React, { useContext } from "react"
import {
  Accordion,
  makeStyles,
  NativeSelect,
  withStyles,
} from "@material-ui/core"
import Navigation from "gatsby-theme-hyperobjekt-core/src/components/header/nav"
import { useSiteMetadata, SiteContext } from "gatsby-theme-hyperobjekt-core"
import { navigate } from "gatsby"

/** Styles for the list of links */
const navStyles = (theme) => ({
  listItem: {
    "&:first-child": {
      display: "none",
    },
  },
  link: {
    padding: theme.spacing(2, 3),
  },
})

/** Styles for the select menu */
const useSelectStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(3),
    "&:before": { display: "none" },
    "& $select": {
      fontSize: theme.typography.pxToRem(16),
    },
    "& .MuiNativeSelect-icon": {
      top: `calc(50% - 10px)`,
    },
  },
}))

const MobileMenu = withStyles(navStyles)(Navigation)

export default function NavMobileMenu(props) {
  const classes = useSelectStyles()
  const { menuLinks } = useSiteMetadata()
  const { setIsNavOpen } = useContext(SiteContext)
  // get the menu links that should be "select" menus
  const selectLinks = menuLinks.filter(
    (menuItem) => menuItem.link === "#" && menuItem.subMenu.length > 0
  )
  // close menu and navigate on state selection
  const handleSelect = (event) => {
    setIsNavOpen(false)
    navigate(event.target.value)
  }
  return (
    <div>
      {/* <Accordion */}
      {selectLinks.map((selectMenu) => (
        <NativeSelect
          key={selectMenu.name}
          onChange={handleSelect}
          className={classes.root}
        >
          <option value="">{selectMenu.name}</option>
          {selectMenu.subMenu.map((opt) => (
            <option key={opt.link} value={opt.link}>
              {opt.name}
            </option>
          ))}
        </NativeSelect>
      ))}

      <MobileMenu {...props} />
    </div>
  )
}
