import React, { useContext, useState } from "react"
import PropTypes from "prop-types"
import { AppBar, Toolbar, useTheme, withStyles } from "@material-ui/core"
import Branding from "gatsby-theme-hyperobjekt-core/src/components/header/branding"
import NavigationIcons from "gatsby-theme-hyperobjekt-core/src/components/header/nav-icons"
import DesktopNavigation from "./nav-desktop"
import MobileNavigation from "./nav-mobile"
import { SiteContext } from "gatsby-theme-hyperobjekt-core/src/utils/site-context"
import { useSiteConfig } from "gatsby-theme-hyperobjekt-core/src/utils/use-site-config"
import { useSiteMetadata } from "gatsby-theme-hyperobjekt-core/src/utils/use-site-metadata"
import { useScrollPosition } from "@n8tb1t/use-scroll-position"
import clsx from "clsx"

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    background: theme.palette.primary.main,
    transition: `height ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    padding: theme.spacing(0, 2),
    height: theme.layout.headerHeight,
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(0, 3),
    },
  },
  /* Styles applied to the toolbar component. */
  toolbar: {
    maxWidth: theme.layout.headerMaxWidth || 960,
    alignItems: "stretch",
    justifyContent: "space-between",
    flex: 1,
    minHeight: 44,
    padding: 0,
  },
  /* Styles applied when the header is "sticky" after scrolling */
  stuck: {},
  /* Styles applied when the header is shrunk */
  shrunk: {
    height: theme.layout.shrinkHeaderHeight,
  },
  /* Styles applied to the branding component */
  branding: {
    color: theme.palette.primary.contrastText,
    marginRight: "auto",
  },
  /** Styles for desktop navigation */
  nav: {},
  /** Styles for mobile navigation  */
  mobileNav: {},
  /** Styles for menu button */
  menuButton: {},
  /** Styles for site title */
  title: {},
  /** Styles for site logo */
  logo: {},
  /** Styles for fixed header offset */
  offset: {
    height: theme.layout.headerHeight,
  },
})

/**
 * filter function for header links
 * @param {*} link
 */
const headerLinkFilter = (link) => ["all", "header"].indexOf(link.location) > -1

const SiteHeader = ({ classes, children, ...props }) => {
  // state indicating whether header is condensed
  const [shrink, setShrink] = useState(false)
  // state indicating if the header is "stuck"
  const [stuck, setStuck] = useState(false)
  // site menu
  const { menuLinks } = useSiteMetadata()
  const headerLinks = menuLinks.filter(headerLinkFilter)
  // pull header configuration
  const {
    header: { useStickyHeader, useShrinkHeader },
  } = useSiteConfig()
  const { useMobileMenu } = useContext(SiteContext)
  const {
    layout: { shrinkOffset },
  } = useTheme()
  useScrollPosition(({ prevPos, currPos }) => {
    // only shrink header if proper settings are defined
    if (useShrinkHeader && (shrinkOffset || shrinkOffset === 0)) {
      // check if conditions are met and shrink header
      currPos.y >= shrinkOffset && shrink && setShrink(false)
      currPos.y < shrinkOffset && !shrink && setShrink(true)
    }
    // only sticky header if proper settings are defined
    if (useStickyHeader) {
      // check if conditions are met and shrink header
      currPos.y >= 0 && stuck && setStuck(false)
      currPos.y < 0 && !stuck && setStuck(true)
    }
  })

  return (
    <React.Fragment>
      <AppBar
        className={clsx("header", classes.root, {
          "header--shrunk": shrink,
          [classes.shrunk]: shrink,
          "header--stuck": stuck,
          [classes.stuck]: stuck,
        })}
        position={useStickyHeader ? "fixed" : "static"}
        {...props}
      >
        <Toolbar className={clsx("header__toolbar", classes.toolbar)}>
          <Branding
            classes={{
              root: clsx("header__branding", classes.branding),
              title: classes.title,
              logo: classes.logo,
            }}
          />
          {children}
          {!useMobileMenu && (
            <DesktopNavigation
              className={clsx("header__nav", classes.nav)}
              subMenu
              links={headerLinks}
            />
          )}
          <NavigationIcons />
          {useMobileMenu && (
            <MobileNavigation
              classes={{ button: classes.menuButton, nav: classes.mobileNav }}
              links={headerLinks}
            />
          )}
        </Toolbar>
      </AppBar>
      {useStickyHeader && <div className={classes.offset} />}
    </React.Fragment>
  )
}

SiteHeader.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { name: "HypHeader" })(SiteHeader)
