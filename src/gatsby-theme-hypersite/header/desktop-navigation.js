// import React from "react";

// import { HorizontalNavigation } from "@hyperobjekt/material-ui-website";
// import { withStyles } from "@material-ui/core";

// const StyledNavigation = withStyles((theme) => ({
//   root: {
//     display: "none",
//     [theme.breakpoints.up("md")]: {
//       display: "block",
//     },
//   },
//   list: {
//     display: "flex",
//     flexDirection: "row",
//   },
//   listItem: {
//     background: "transparent",
//   },
//   link: {
//     color: theme.palette.primary.contrastText,
//     textDecoration: "none",
//     "&:hover, &:focus": {
//       textDecoration: "underline",
//     },
//   },
//   linkActive: {
//     fontWeight: "bold",
//   },
// }))(HorizontalNavigation);

// export default function DesktopNavigation(props) {
//   console.log(props);
//   return <StyledNavigation {...props} />;
// }

import React from "react";
import { withStyles } from "@material-ui/core";
import { sansSerifyTypography } from "../../gatsby-theme-hypercore/theme";
import { HorizontalNavigation } from "@hyperobjekt/material-ui-website/lib/navigation";

/** number of cols for the subnav */
const cols = 5;

const styles = (theme) => ({
  root: {},
  depth0: {
    height: 64,
    zIndex: 2,
  },
  depth1: {
    position: "absolute",
    top: 64,
    left: 0,
    zIndex: 1,
    width: "12rem",
    marginLeft: 0,
    transform: `translate3d(0, -10%, 0)`,
    pointerEvents: "none",
    background: theme.palette.background.paper,
    borderTop: `1px solid #F1F1EB`,
    transition: `transform 400ms ${theme.transitions.easing.easeInOut}, opacity 400ms ${theme.transitions.easing.easeInOut}`,
    opacity: 0,
    display: "block",
    // height: theme.typography.pxToRem(264),
    // padding: theme.spacing(0, 0),
    boxShadow: theme.shadows[1],
    "& $list": {},
    "& $listItem": {},
    "& $link": {
      ...sansSerifyTypography,
      fontSize: theme.typography.pxToRem(14),
    },
    "& $linkActive": {
      color: theme.palette.secondary.main,
    },
  },
  list: {
    display: "flex",
    height: "100%",
  },
  listItem: {
    zIndex: 999,
    "& .MuiSvgIcon-root": {
      transition: `transform 150ms ${theme.transitions.easing.easeInOut}, fill 200ms ${theme.transitions.easing.easeInOut} 0ms`,
    },
    "&:hover .MuiSvgIcon-root": {
      transform: "rotate(180deg)",
    },
    "&:first-child $depth1": {
      position: "fixed",
      top: 64,
      width: "100%",
      padding: theme.spacing(3),
      // by state nav items
      "& $list": {
        display: "block",
        columnCount: cols,
        maxWidth: 1216,
        marginLeft: theme.spacing(27),
        position: "relative",
        paddingTop: theme.spacing(5),
        "&:before": {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          content: "'By State'",
          paddingBottom: theme.spacing(1),
          paddingLeft: theme.spacing(2),
          display: "block",
          marginTop: 4,
          borderBottom: "1px solid",
          borderBottomColor: theme.palette.divider,
          color: theme.palette.text.secondary,
        },
      },

      "& $listItem": {
        display: "inline-block",
        // by federal agency nav items
        "&:first-child, &:nth-child(2)": {
          left: theme.spacing(-27),
        },
        "&:first-child": {
          position: "absolute",
          top: theme.spacing(5),
          width: theme.spacing(25),
          "&:before": {
            position: "absolute",
            top: theme.spacing(-5),
            paddingBottom: theme.spacing(1),
            paddingLeft: theme.spacing(2),
            content: "'By Federal Agency'",
            display: "block",
            marginTop: theme.spacing(0.5),
            width: theme.spacing(25),
            borderBottom: "1px solid",
            borderBottomColor: theme.palette.divider,
            color: theme.palette.text.secondary,
          },
        },
        "&:nth-child(2)": {
          position: "absolute",
          width: theme.spacing(25),
          top: theme.spacing(8.5),
        },
        // by state nav items
        "&:nth-child(3)": {},
      },
      "& $link": {
        display: "inline-flex",
        alignItems: "center",
        minHeight: theme.spacing(3.5),
        paddingTop: theme.spacing(0.25),
        paddingBottom: theme.spacing(0.25),
      },
    },
    "&:hover $depth1, &:focus-within $depth1": {
      pointerEvents: "all",
      transform: "translate3d(0, 0, 0)",
      opacity: 1,
    },
  },
  link: {
    ...sansSerifyTypography,
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
  linkActive: {
    fontWeight: "bold",
  },
});

export default withStyles(styles)(HorizontalNavigation);
