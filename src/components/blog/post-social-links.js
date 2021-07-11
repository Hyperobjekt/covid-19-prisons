import React from "react";
import FbIcon from "../../common/icons/fb-icon.svg";
import TwitterIcon from "@material-ui/icons/Twitter";
import EmailIcon from "@material-ui/icons/Email";
import IconButton from "@material-ui/core/IconButton";
import { useLocation } from "@reach/router";
import { Box, withStyles } from "@material-ui/core";
import { Block } from "@hyperobjekt/material-ui-website";

const styles = (theme) => ({
  social: {
    padding: 0,
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
      position: "sticky",
      marginTop: theme.spacing(2),
      top: theme.spacing(11),
      marginLeft: theme.spacing(-1),
      "& button": {
        padding: "12px",
        marginBottom: theme.spacing(1),
      },
    },
    "& > .MuiBox-root": {
      width: 64,
    },
  },
});

export const PostSocialLinks = ({ classes, shareText, baseUrl }) => {
  const location = useLocation();
  const url = baseUrl + location.pathname;

  const twitterClick = (e) => {
    window
      .open(
        `https://twitter.com/share?text=${shareText}&url=${url}`,
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
    <Block className={classes.social}>
      <IconButton onClick={twitterClick}>
        <TwitterIcon />
      </IconButton>
      <IconButton onClick={facebookClick}>
        <img alt="share on Facebook" src={FbIcon} />
      </IconButton>
      <IconButton>
        <a
          target="_blank"
          href={`mailto:?subject=${shareText}&body=${url}`}
          rel="noreferrer"
        >
          <EmailIcon />
        </a>
      </IconButton>
    </Block>
  );
};

export default withStyles(styles)(PostSocialLinks);
