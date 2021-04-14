import React from "react"
import clsx from "clsx"
import {
  Button,
  Link,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core"
import { titleTypography } from "../../gatsby-theme-hyperobjekt-core/theme"
import Stack from "../Stack"
import UpRightArrow from "../../../content/assets/up-right-arrow.svg"

export const styles = (theme) => ({
  root: {},
  title: {
    ...titleTypography,
    fontSize: theme.typography.pxToRem(26),
    color: "#656647",
    maxWidth: "13.5rem",
    marginBottom: theme.spacing(2),
  },
  textField: {
    width: "100%",
    maxWidth: 236,
  },
  form: {
    minWidth: "18.5rem",
    marginBottom: theme.spacing(1),
  },
  archive: {
    "& img": {
      paddingLeft: ".2rem",
    },
  },
  button: {},
})

const Subscribe = ({ classes, className, ...props }) => {
  return (
    <Stack className={clsx(classes.root, className)} {...props}>
      <Typography id="subscribe_prompt" className={classes.title} variant="h3">
        Subscribe to our e-mail updates
      </Typography>
      <Stack className={classes.form} align="bottom" spacing={2} horizontal>
        <div id="mc_embed_signup">
          <form
            style={{ display: "flex", alignItems: "baseline" }}
            action="https://covid19behindbars.us7.list-manage.com/subscribe/post?u=5d704f1af2db3979886a8cde2&amp;id=fa6a9cea7f"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
            noValidate
          >
            <TextField
              className={classes.textField}
              name="EMAIL"
              id="mce-EMAIL"
              placeholder="Enter your e-mail address"
              style={{ marginRight: "0.8rem" }}
              inputProps={{ "aria-labelledby": "subscribe_prompt" }}
            ></TextField>
            <div id="mce-responses" className="clear">
              <div
                className="response"
                id="mce-error-response"
                style={{ display: "none" }}
              ></div>
              <div
                className="response"
                id="mce-success-response"
                style={{ display: "none" }}
              ></div>
            </div>
            <Button
              className={classes.button}
              type="submit"
              value="Subscribe"
              name="subscribe"
              id="mc-embedded-subscribe"
            >
              Subscribe
            </Button>
            <div
              style={{ position: "absolute", left: -5000 }}
              aria-hidden="true"
            >
              <TextField
                type="text"
                name="b_5d704f1af2db3979886a8cde2_fa6a9cea7f"
                tabIndex="-1"
                value=""
              ></TextField>
            </div>
          </form>
        </div>
      </Stack>
      <Link
        className={classes.archive}
        href="https://us7.campaign-archive.com/home/?u=5d704f1af2db3979886a8cde2&id=fa6a9cea7f"
        target="_blank"
        rel="noreferrer"
      >
        See our MailChimp archive
        <img alt="" src={UpRightArrow} />
      </Link>
    </Stack>
  )
}

export default withStyles(styles)(Subscribe)
