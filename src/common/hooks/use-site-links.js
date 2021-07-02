import { useSiteMetadata } from "gatsby-theme-hypercore/src/hooks/use-site-metadata";

export default function useSiteLinks(location) {
  const { menuLinks } = useSiteMetadata();
  if (!location) return menuLinks;
  return menuLinks.filter(
    (link) => !link.location || link.location === location
  );
}
