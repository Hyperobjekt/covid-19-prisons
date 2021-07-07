import React from "react";
import {
  ButtonBase,
  Grid,
  Link,
  Typography,
  withStyles,
} from "@material-ui/core";
import { serifTypography } from "../../gatsby-theme-hypercore/theme";
import { VerticalNavigation } from "@hyperobjekt/material-ui-website/lib/navigation";
import SocialLinks from "gatsby-theme-hypersite/src/header/social-links";
import Subscribe from "./subscribe";
import { getLang } from "../../common/utils/i18n";
import { Block, Stack } from "@hyperobjekt/material-ui-website";
const styles = (theme) => ({
  root: {
    background: "#F5F5ED",
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
    textDecoration: "none",
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
});

const Footer = ({ social, links, copyright, classes, className, ...props }) => {
  const handleScrollUp = React.useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <footer id="footer" className={classes.root} {...props}>
      <Block>
        <Grid container justify="center">
          <Grid item xs={12} sm={9}>
            <Subscribe className={classes.subscribe} />
          </Grid>
          <Grid item xs={12} sm={3} className={classes.navContainer}>
            <VerticalNavigation
              classes={{
                root: classes.links,
                listItem: classes.listItem,
                link: classes.link,
              }}
              links={links}
            />
            <SocialLinks
              classes={{ root: classes.social, link: classes.socialLink }}
              links={social}
            />
            <ButtonBase
              onClick={handleScrollUp}
              className={classes.scrollUpButton}
            >
              <svg
                width="9"
                height="12"
                viewBox="0 0 9 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M-3.93402e-07 7L0.948711 7.94871L3.82906 5.06836L3.82906 11.5L5.17094 11.5L5.17094 5.06836L8.05129 7.94871L9 7L4.5 2.5L-3.93402e-07 7Z"
                  fill="#555526"
                />
                <path
                  d="M0 1.5L-6.55671e-08 0L9 -3.93402e-07L9 1.5L0 1.5Z"
                  fill="#555526"
                />
              </svg>
              <Typography variant="body2">{getLang("scroll_up")}</Typography>
            </ButtonBase>
          </Grid>
        </Grid>
        <Stack className={classes.copyright}>
          <Typography variant="body1">{copyright}</Typography>
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
      </Block>
    </footer>
  );
};

export default withStyles(styles, { name: "HypFooter" })(Footer);
