// this is a hack fix needed for section navigation to work
// without this, the section navigation requires a second click before it will navigate properly
// https://github.com/gatsbyjs/gatsby/issues/25778

export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  if (location.hash === "") {
    window.scrollTo(0, 0)
  }

  return false
}
