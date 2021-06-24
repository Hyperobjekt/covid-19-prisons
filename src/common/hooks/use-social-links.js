import { useSiteMetadata } from "gatsby-theme-hypercore/src/hooks/use-site-metadata";
import { getSocialLink } from "gatsby-theme-hypersite/src/utils";

export default function useSocialLinks() {
  const siteMetadata = useSiteMetadata();
  return siteMetadata.social.map(({ name, value }) =>
    getSocialLink(name, value)
  );
}
