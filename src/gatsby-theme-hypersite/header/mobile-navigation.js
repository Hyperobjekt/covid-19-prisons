import React from "react";
import { withStyles } from "@material-ui/core";
import MobileNavigation from "gatsby-theme-hypersite/src/header/mobile-navigation";
import SocialLinks from "gatsby-theme-hypersite/src/header/social-links";
import Logo from "../logo";
import useSocialLinks from "../../common/hooks/use-social-links";
import MobileAccordion from "./mobile-accordion";
const styles = (theme) => ({
  button: {
    border: "none",
    borderRadius: 24,
    padding: 0 + "!important",
  },
  close: {
    marginTop: 14,
    borderRadius: 24,
    padding: 0 + "!important",
  },
  drawer: {
    "& .logo": {
      position: "absolute",
      top: theme.spacing(2),
      left: theme.spacing(2),
      width: 32,
      overflow: "hidden",
    },
    "& .mobile-accordion": {
      marginTop: theme.spacing(3),
    },
    "& .HypSocialLinks-root": {
      marginLeft: "0.25rem",
      marginTop: "0.5rem",
    },
  },
});

const StyledNavigation = withStyles(styles)(MobileNavigation);

export default function UclaMobileNav(props) {
  const socialLinks = useSocialLinks();
  return (
    <StyledNavigation {...props}>
      <Logo />
      <MobileAccordion className="mobile-accordion" />
      <SocialLinks links={socialLinks} />
    </StyledNavigation>
  );
}
