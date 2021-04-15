import React, { useContext } from "react"
import { IconButton, withStyles } from "@material-ui/core"
import { SiteContext } from "gatsby-theme-hyperobjekt-core/src/utils/site-context"
import Navigation from "./nav-mobile-menu"
import Drawer from "gatsby-theme-hyperobjekt-core/src/components/drawer"
import Branding from "gatsby-theme-hyperobjekt-core/src/components/header/branding"
import icons from "gatsby-theme-hyperobjekt-core/src/icons"
import clsx from "clsx"

const styles = (theme) => ({
  button: {},
  nav: {},
  drawerRoot: {
    "& .drawer__content": {
      marginTop: theme.spacing(9),
    },
  },
  branding: {
    position: "absolute",
    top: theme.spacing(2),
    left: theme.spacing(2),
    "& img": {
      clipPath: `inset(0px ${theme.typography.pxToRem(150)} 0px 0px)`,
    },
  },
})

const MobileNavigation = ({ classes, className, links, ...props }) => {
  const { isNavOpen, setIsNavOpen } = useContext(SiteContext)
  const MenuIcon = icons["menu"]

  function handleMenuOpen() {
    setIsNavOpen(true)
  }

  function handleMenuClose() {
    setIsNavOpen(false)
  }

  return (
    <React.Fragment>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="menu"
        onClick={handleMenuOpen}
        className={clsx(classes.button, className)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        classes={{ root: classes.drawerRoot }}
        open={isNavOpen}
        onClose={handleMenuClose}
      >
        <Branding className={classes.branding} onClick={handleMenuClose} />
        <Navigation
          className={clsx("nav--mobile", classes.nav)}
          links={links}
          onSelect={handleMenuClose}
          subMenu
        />
      </Drawer>
    </React.Fragment>
  )
}

MobileNavigation.propTypes = {}

export default withStyles(styles, { name: "HypMobileNavigation" })(
  MobileNavigation
)
