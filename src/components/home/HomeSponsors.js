import React from "react"
import { Block } from "gatsby-theme-hyperobjekt-core"
import Stack from "../Stack"
import { Typography, withStyles } from "@material-ui/core"
import ResponsiveContainer from "../ResponsiveContainer"

export const styles = (theme) => ({
  root: {},
  title: {
    fontSize: theme.typography.pxToRem(23),
    textAlign: "center",
    maxWidth: "10em",
    marginTop: 0,
    [theme.breakpoints.up("sm")]: {
      textAlign: "left",
    },
  },
  titleWrapper: {
    [theme.breakpoints.up("md")]: {
      minWidth: "33%",
    },
  },
})

const Sponsors = ({ title, logos, children, classes, ...props }) => {
  return (
    <Block className={classes.root} type="fullWidth" {...props}>
      <ResponsiveContainer>
        <Stack
          horizontal="sm"
          spacing={3}
          justify="space-between"
          align="center"
        >
          {title && (
            <div className={classes.titleWrapper}>
              <Typography className={classes.title} variant="h3">
                {title}
              </Typography>
            </div>
          )}
          <Stack
            horizontal="sm"
            spacing={3}
            justify="space-around"
            style={{ flex: 1 }}
          >
            {logos.map((logo) => (
              <img key={logo.alt} src={logo.image} alt={logo.alt} />
            ))}
          </Stack>
        </Stack>
        {children}
      </ResponsiveContainer>
    </Block>
  )
}

export default withStyles(styles)(Sponsors)
