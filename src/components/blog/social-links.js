import React from "react";
import FbIcon from "../../common/icons/fb-icon.svg";
import TwitterIcon from "@material-ui/icons/Twitter";
import EmailIcon from "@material-ui/icons/Email";
import IconButton from "@material-ui/core/IconButton";
import { useLocation } from "@reach/router";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
  social: {
    display: "flex",
    margin: "auto",
    marginBottom: theme.spacing(3),
    "& button": {
      background: theme.palette.background.alt2,
      color: theme.palette.text.secondary,
      padding: "10px",
      marginRight: theme.spacing(1),
      "& a": {
        color: theme.palette.text.secondary + "!important",
        fontSize: "0",
      },
      [theme.breakpoints.down("xs")]: {
        marginRight: "0",
        transform: "scale(0.8)",
      },
    },
    [theme.breakpoints.up("lg")]: {
      flexDirection: "column",
      position: "absolute",
      left: theme.spacing(6),
      top: 0,
      "& button": {
        padding: "12px",
        marginBottom: theme.spacing(1),
      },
    },
  },
});

const SocialLinks = ({ classes, title }) => {
  const location = useLocation();
  const url = "https://uclacovidbehindbars.org" + location.pathname;

  const twitterClick = (e) => {
    window
      .open(
        `https://twitter.com/share?text=${title}&url=${url}`,
        "_blank",
        "width=550,height=420"
      )
      .focus();
  };

  const facebookClick = (e) => {
    window
      .open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank",
        "width=550,height=420"
      )
      .focus();
  };

  return (
    <div className={classes.social}>
      <IconButton onClick={twitterClick}>
        <TwitterIcon />
      </IconButton>
      <IconButton onClick={facebookClick}>
        <img alt="share on Facebook" src={FbIcon} />
      </IconButton>
      <IconButton>
        <a
          target="_blank"
          href={`mailto:?subject=${title} - UCLA COVID Behind Bars&body=${url}`}
          rel="noreferrer"
        >
          <EmailIcon />
        </a>
      </IconButton>
    </div>
  );
};

export default withStyles(styles)(SocialLinks);
