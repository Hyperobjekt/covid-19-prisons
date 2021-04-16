import React, { useContext } from "react"
import { ButtonBase, withStyles } from "@material-ui/core"
import { SiteContext } from "gatsby-theme-hyperobjekt-core/src/utils/site-context"
import Navigation from "./nav-mobile-menu"
import Drawer from "gatsby-theme-hyperobjekt-core/src/components/drawer"
import Branding from "gatsby-theme-hyperobjekt-core/src/components/header/branding"
import MenuIcon from "../../../../content/assets/menu-icon.svg"
import CloseMenuIcon from "../../../../content/assets/close-menu-icon.svg"
import clsx from "clsx"

const styles = (theme) => ({
  button: {
    "& img": {
      borderRadius: 20,
      transition: `background 150ms ${theme.transitions.easing.easeInOut}`,
    },
    "&:hover img": {
      background: "rgba(229, 237, 224, 0.5)",
    },
  },
  nav: {},
  drawerRoot: {
    width: 325,
    [theme.breakpoints.down("xs")]: {
      width: "100vw",
    },
    "& .drawer__close": {
      display: "none",
    },
    "& .drawer__content": {
      marginTop: theme.spacing(9),
    },
  },
  openMenuButton: {
    marginRight: theme.spacing(-1.5),
  },
  closeMenuButton: {
    position: "absolute",
    top: theme.spacing(0.5),
    right: theme.spacing(2),
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

  function handleMenuOpen() {
    setIsNavOpen(true)
  }

  function handleMenuClose() {
    setIsNavOpen(false)
  }

  return (
    <React.Fragment>
      <ButtonBase
        onClick={handleMenuOpen}
        className={clsx(classes.openMenuButton, classes.button)}
      >
        <img src={MenuIcon} alt="menu" />
      </ButtonBase>
      <Drawer classes={{ root: classes.drawerRoot }} open={isNavOpen}>
        <ButtonBase
          onClick={handleMenuClose}
          className={clsx(classes.closeMenuButton, classes.button)}
        >
          <img src={CloseMenuIcon} alt="close menu" />
        </ButtonBase>
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
