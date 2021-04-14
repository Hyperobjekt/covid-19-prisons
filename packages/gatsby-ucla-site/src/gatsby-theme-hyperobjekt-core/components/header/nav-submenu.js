import React from "react"
import clsx from "clsx"
import { Link } from "gatsby-theme-material-ui"
import { Grid, List, ListItem, makeStyles, Typography } from "@material-ui/core"
import ResponsiveContainer from "../../../components/ResponsiveContainer"

const useStyles = makeStyles((theme) => ({
  header: {
    color: theme.palette.text.secondary,
    borderBottom: `1px solid #C8C8B9`,
    display: "block",
    width: "100%",
    lineHeight: 1,
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  exploreData: {
    "&.SubMenu-root": {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(4),
    },
  },
}))

const SubMenu = ({ links, className, classes, onSelect, ...props }) => {
  const ownClasses = useStyles()
  // hack for identifying Explore Data
  const isDataSubMenu = links.length >= 50

  if (!isDataSubMenu) {
    return (
      <div className={clsx("SubMenu-root", classes.root)}>
        <ResponsiveContainer
          className={clsx("SubMenu-container", classes.container)}
        >
          <List className={clsx("SubMenu-list", classes.list)} {...props}>
            {links.map((menuItem, index) => (
              <ListItem
                className={clsx("SubMenu-listItem", classes.listItem)}
                key={"link" + index}
              >
                <Link
                  className={clsx("SubMenu-link", classes.link)}
                  activeClassName="active"
                  onClick={onSelect}
                  to={menuItem.link}
                >
                  {menuItem.name}
                </Link>
              </ListItem>
            ))}
          </List>
        </ResponsiveContainer>
      </div>
    )
  }

  const stateLinks = links.filter((l) => l.link.includes("states/"))
  const federalLinks = links.filter((l) => !l.link.includes("states/"))

  return (
    <div className={clsx("SubMenu-root", ownClasses.exploreData, classes.root)}>
      <ResponsiveContainer
        className={clsx("SubMenu-container", classes.container)}
      >
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Typography variant="body" className={ownClasses.header}>
              By federal agency
            </Typography>
            <List>
              {federalLinks.map((menuItem, index) => (
                <ListItem
                  className={clsx("SubMenu-listItem", classes.listItem)}
                  key={"link" + index}
                >
                  <Link
                    className={clsx("SubMenu-link", classes.link)}
                    activeClassName="active"
                    onClick={onSelect}
                    to={menuItem.link}
                  >
                    {menuItem.name}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={9}>
            <Typography variant="body" className={ownClasses.header}>
              By state
            </Typography>
            <List className={clsx("SubMenu-list", classes.list)} {...props}>
              {stateLinks.map((menuItem, index) => (
                <ListItem
                  className={clsx("SubMenu-listItem", classes.listItem)}
                  key={"link" + index}
                >
                  <Link
                    className={clsx("SubMenu-link", classes.link)}
                    activeClassName="active"
                    onClick={onSelect}
                    to={menuItem.link}
                  >
                    {menuItem.name}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </ResponsiveContainer>
    </div>
  )
}

SubMenu.defaultProps = {
  classes: {},
  links: [],
  onSelect: () => {},
}

export default SubMenu
