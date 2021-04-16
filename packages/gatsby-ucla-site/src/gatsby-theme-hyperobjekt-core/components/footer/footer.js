import React from "react"
import { default as FooterNav } from "gatsby-theme-hyperobjekt-core/src/components/footer/footer-nav"
import { default as FooterSocial } from "gatsby-theme-hyperobjekt-core/src/components/footer/footer-social"
import { default as FooterCopyright } from "gatsby-theme-hyperobjekt-core/src/components/footer/footer-copyright"
import Subscribe from "../../../components/footer/subscribe"
import {
  ButtonBase,
  Grid,
  Link,
  Typography,
  withStyles,
} from "@material-ui/core"
import Stack from "../../../components/Stack"
import { serifTypography } from "../../theme"
import ResponsiveContainer from "../../../components/ResponsiveContainer"
import ArrowToTop from "../../../../content/assets/arrow-to-top.svg"
import { getLang } from "../../../common/utils/i18n"

const styles = (theme) => ({
  root: {
    background: "#F5F5ED",
    padding: theme.spacing(8, 0, 3, 0),
  },
  subscribe: {
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      alignItems: "flex-start",
    },
  },
  links: {
    marginTop: theme.spacing(4),
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      marginTop: 0,
      alignItems: "flex-start",
    },
  },
  listItem: {
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      alignItems: "flex-start",
    },
  },
  link: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(0.5, 0),
  },
  social: {
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      textAlign: "left",
      marginLeft: theme.spacing(-1.5),
    },
  },
  socialLink: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(16),
  },
  copyright: {
    justifyContent: "center",
    marginTop: theme.spacing(4),
    "& .MuiTypography-root": {
      ...serifTypography,
      fontSize: theme.typography.pxToRem(13),
      color: "#61664D",
      paddingRight: theme.spacing(1),
      borderRight: "1px solid",
      borderColor: theme.palette.divider,
    },
    "& .MuiTypography-root:last-child": {
      borderRight: "none",
    },
    [theme.breakpoints.up("sm")]: {
      justifyContent: "flex-start",
    },
  },
  navContainer: {
    position: "relative",
  },
  scrollUpButton: {
    position: "absolute",
    right: 0,
    bottom: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    "& img": {
      paddingLeft: 3,
      paddingBottom: theme.spacing(1),
    },
    "& p": {
      fontSize: theme.typography.pxToRem(14),
      writingMode: "vertical-rl",
      transform: "rotate(180deg)",
    },
  },
})

const Footer = ({ classes, className, ...props }) => {
  const handleScrollUp = React.useCallback(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <footer id="footer" className={classes.root} {...props}>
      <ResponsiveContainer>
        <Grid container justify="center">
          <Grid item xs={12} sm={9}>
            <Subscribe className={classes.subscribe} />
          </Grid>
          <Grid item xs={12} sm={3} className={classes.navContainer}>
            <FooterNav
              classes={{
                root: classes.links,
                listItem: classes.listItem,
                link: classes.link,
              }}
            />
            <FooterSocial
              classes={{ root: classes.social, link: classes.socialLink }}
            />
            <ButtonBase
              onClick={handleScrollUp}
              className={classes.scrollUpButton}
            >
              <img alt="scroll up" src={ArrowToTop} />
              <Typography variant="body2">{getLang("scroll_up")}</Typography>
            </ButtonBase>
          </Grid>
        </Grid>
        <Stack className={classes.copyright} horizontal>
          <FooterCopyright />
          <Typography variant="body1">
            Site by{" "}
            <Link
              href="https://hyperobjekt.com"
              target="_blank"
              rel="noreferrer"
            >
              Hyperobjekt
            </Link>
          </Typography>
        </Stack>
      </ResponsiveContainer>
    </footer>
  )
}

export default withStyles(styles, { name: "HypFooter" })(Footer)
