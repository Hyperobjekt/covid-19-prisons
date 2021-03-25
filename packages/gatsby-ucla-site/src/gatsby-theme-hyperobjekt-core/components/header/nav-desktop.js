import React from "react"
import { withStyles } from "@material-ui/core"
import Navigation from "gatsby-theme-hyperobjekt-core/src/components/header/nav"
import useBreadcrumb from "gatsby-theme-hyperobjekt-core/src/utils/use-breadcrumb"
import { sansSerifyTypography } from "../../theme"

/** number of cols for the subnav */
const cols = 6

const styles = (theme) => ({
  root: {
    // Explore Data submenu
    "& .nav__list-item:first-child $subMenu": {
      position: "fixed",
      top: `calc(${theme.layout.headerHeight} - 2px)`,
      width: "100%",
      height: theme.typography.pxToRem(264),
      "& .SubMenu-list": {
        columnCount: cols,
      },
    },
  },
  list: {
    display: "flex",
  },
  listItem: {
    zIndex: 999,

    "& .MuiSvgIcon-root": {
      transition: `transform 400ms ${theme.transitions.easing.easeInOut}, fill 200ms ${theme.transitions.easing.easeInOut} 0ms`,
    },
    "&:hover .MuiSvgIcon-root": {
      transform: "rotateX(180deg)",
    },

    "&:hover $subMenu, &:focus-within $subMenu": {
      pointerEvents: "all",
      transform: "translate3d(0, 0, 0)",
      opacity: 1,
    },
  },
  link: {
    fontSize: theme.typography.pxToRem(14),
  },
  subMenu: {
    position: "absolute",
    top: `calc(${theme.layout.headerHeight} - .5rem)`,
    right: 0,
    // left: "calc(-108px + 50%)", // to center
    width: "12rem",
    marginLeft: 0,
    transform: `translate3d(0, -10%, 0)`,
    pointerEvents: "none",
    background: theme.palette.background.paper,
    borderTop: `2px dotted #eee`,
    transition: `transform 400ms ${theme.transitions.easing.easeInOut}, opacity 400ms ${theme.transitions.easing.easeInOut}`,
    opacity: 0,
    display: "block",
    // height: theme.typography.pxToRem(264),
    padding: theme.spacing(4, 0),
    boxShadow: theme.shadows[1],
    "& .SubMenu-list": {
      padding: 0,
    },
    "& .SubMenu-listItem": {
      display: "inline-block",
    },
    "& .SubMenu-link": {
      padding: 0,
      display: "inline",
      ...sansSerifyTypography,
      fontSize: theme.typography.pxToRem(14),
    },
    "& .SubMenu-link.active": {
      color: theme.palette.secondary.main,
    },
  },
})

const Nav = ({ links, ...props }) => {
  const breadcrumb = useBreadcrumb()
  // replace State & Federal link with state name if currently on a state page
  const modLinks =
    breadcrumb.length === 2 && breadcrumb[0].link === "#"
      ? links.map((l) =>
          l.link === "#" ? { ...l, name: breadcrumb[1].name } : l
        )
      : links
  return <Navigation links={modLinks} {...props} />
}

export default withStyles(styles)(Nav)
