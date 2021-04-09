import React from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import { List, ListItem, Typography, withStyles } from "@material-ui/core"
import SubNavigation from "./nav-submenu"
import NavArrow from "gatsby-theme-hyperobjekt-core/src/components/header/nav-arrow"
import useBreadcrumb from "gatsby-theme-hyperobjekt-core/src/utils/use-breadcrumb"

export const styles = (theme) => {
  return {
    /* Styles applied to the root element. */
    root: {
      flex: "0 1",
      display: "flex",
      alignItems: "stretch",
    },
    /* Styles applied to the list wrapper */
    list: {},
    /* Styles applied to each list item */
    listItem: {
      position: "relative",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: 0,
    },
    listItemActive: {
      "& > p": {
        fontWeight: "bold",
      },
    },
    /* Styles applies to each link */
    link: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(2),
      whiteSpace: "nowrap",
      color: theme.palette.text.primary,
    },
    /** Styles applied to the sub menu root */
    subMenu: { marginLeft: theme.spacing(2) },
    /** Styles applied to each sub menu list item */
    subMenuListItem: { padding: 0 },
    /** Styles applied to each sub menu link */
    subMenuLink: {
      display: "flex",
      flex: 1,
      padding: theme.spacing(2),
    },
  }
}

const Navigation = ({
  classes,
  className,
  component: Component = "nav",
  subMenu = false,
  links,
  onSelect,
  ...props
}) => {
  const breadcrumb = useBreadcrumb()
  const isActive = (link) => {
    return breadcrumb.some((l) => {
      // don't highlight as active a supercategory (eg About) in a nav
      // without submenus (ie the footer)
      if (!subMenu && l.subMenu) return false
      return l.link === link
    })
  }
  return (
    <Component className={clsx("nav", classes.root, className)} {...props}>
      <List className={clsx("nav__list", classes.list)}>
        {links.map((menuItem, index) => (
          <ListItem
            className={clsx("nav__list-item", classes.listItem, {
              [classes.listItemActive]: isActive(menuItem.link),
            })}
            key={"link" + index}
          >
            <Typography
              className={clsx("nav__link", classes.link)}
            >
              {menuItem.name}
              {menuItem.subMenu?.length > 0 && subMenu && <NavArrow />}
            </Typography>
            {menuItem.subMenu?.length > 0 && subMenu && (
              <SubNavigation
                classes={{
                  root: classes.subMenu,
                  link: classes.subMenuLink,
                  listItem: classes.subMenuListItem,
                  listItemActive: classes.listItemActive,
                }}
                onSelect={onSelect}
                links={menuItem.subMenu}
              />
            )}
          </ListItem>
        ))}
      </List>
    </Component>
  )
}

Navigation.defaultProps = {
  onSelect: () => {},
  links: [],
}

Navigation.propTypes = {
  /**
   * Determines if submenus should render
   */
  subMenu: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
}

export default withStyles(styles, { name: "HypNavigation" })(Navigation)
