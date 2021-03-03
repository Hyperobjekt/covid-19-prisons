import React from "react"
import { withStyles } from "@material-ui/core"
import Navigation from "gatsby-theme-hyperobjekt-core/src/components/header/nav"
import useBreadcrumb from "gatsby-theme-hyperobjekt-core/src/utils/use-breadcrumb"
import { sansSerifyTypography } from "../../theme"

/** number of cols for the subnav */
const cols = 6

const styles = (theme) => ({
  list: {
    display: "flex",
  },
  listItem: {
    zIndex: 999,

    // fix to keep nav from overflowing with addition of Immigration
    [theme.breakpoints.up("lg")]: {
      "& .nav__link": {
        paddingLeft: ".8rem",
        paddingRight: ".8rem",
      },
    },

    "&:hover $subMenu, &:focus-within $subMenu": {
      pointerEvents: "all",
      transform: "translate3d(0, 0, 0)",
      opacity: 1,
    },
    "&:first-child::before": {
      content: "''",
      display: "block",
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      width: 1,
      height: theme.spacing(3),
      margin: "auto",
      background: "#ccc",
    },
  },
  link: {
    fontSize: theme.typography.pxToRem(14),
  },
  subMenu: {
    position: "fixed",
    top: `calc(${theme.layout.headerHeight} - 9px)`,
    left: 0,
    width: "100%",
    marginLeft: 0,
    transform: `translate3d(0, -10%, 0)`,
    pointerEvents: "none",
    background: theme.palette.background.paper,
    borderTop: `2px dotted #eee`,
    transition: `transform 400ms ${theme.transitions.easing.easeInOut}, opacity 400ms ${theme.transitions.easing.easeInOut}`,
    opacity: 0,
    display: "block",
    height: theme.typography.pxToRem(264),
    padding: theme.spacing(4, 0),
    boxShadow: theme.shadows[1],
    "& .SubMenu-list": {
      columnCount: cols,
      padding: 0,
    },
    "& .SubMenu-listItem": {
      display: "inline-block",
    },
    "& .SubMenu-listItem:last-child": {
      marginTop: theme.spacing(2),
      position: "relative",
    },
    "& .SubMenu-listItem:last-child:before": {
      content: '""',
      display: "block",
      background: theme.palette.text.secondary,
      position: "absolute",
      height: "2px",
      width: "3rem",
      top: "-0.5rem",
    },
    "& .SubMenu-link": {
      padding: 0,
      display: "inline",
      ...sansSerifyTypography,
      fontSize: theme.typography.pxToRem(14),
    },
    "& .SubMenu-link.active": {
      fontWeight: "bold",
    },
  },
})

const Nav = ({ links, ...props }) => {
  const breadcrumb = useBreadcrumb()
  // replace State & Federal link with state name if currently on a state page
  const modLinks =
    breadcrumb.length === 2
      ? links.map((l) =>
          l.link === "#" ? { ...l, name: breadcrumb[1].name } : l
        )
      : links
  return <Navigation links={modLinks} {...props} />
}

export default withStyles(styles)(Nav)
