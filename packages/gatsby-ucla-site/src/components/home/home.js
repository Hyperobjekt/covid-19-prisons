import React from "react"
import { graphql } from "gatsby"
import { Layout } from "gatsby-theme-hyperobjekt-core"
import Intro from "./HomeIntro"
import HomeMap from "./HomeMap"
import Sponsors from "./HomeSponsors"
import Table from "./HomeTable"
import CdcLogo from "../../../content/assets/cdc-logo.svg"
import VitalProjectsFundLogo from "../../../content/assets/vital-projects-fund-logo.svg"
import ArnoldVenturesLogo from "../../../content/assets/arnold-ventures-logo.svg"
import MapTooltip from "./HomeMapTooltip"
import { Link } from "gatsby-theme-material-ui"

export const query = graphql`
  query($pathSlug: String!) {
    mdx(frontmatter: { path: { eq: $pathSlug } }) {
      frontmatter {
        path
      }
      body
    }
  }
`
// TODO: pull content from front matter

const content = {
  intro: {
    title: "COVID-19 behind bars data project",
    subtitle: "UCLA Law",
    body:
      "This map displays COVID-19 cases and related deaths of people incarcerated in prisons and jails across the US. Click on a state to access more data about prisons, jails, immigration detention centers, pandemic-related prison and jail releases, legal filings and court orders, and grassroots and community organizing efforts.",
  },
  map: {
    title: "Showing ${metric} in carceral facilities",
    description:
      "Each spike represents the number of cases in a facility, select a state for more details",
  },
  table: {
    title: "Facilities with the highest ${metric}",
    note: "",
  },
  sponsors: {
    title: "Our generous supporters include:",
    logos: [
      {
        image: CdcLogo,
        link: "",
        alt: "center for disease control logo",
      },
      {
        image: VitalProjectsFundLogo,
        link: "",
        alt: "Vital Projects Fund logo",
      },
      {
        image: ArnoldVenturesLogo,
        link: "",
        alt: "Arnold Ventures logo",
      },
    ],
  },
}

const logos = [
  {
    image: CdcLogo,
    link: "",
    alt: "center for disease control logo",
  },
  {
    image: VitalProjectsFundLogo,
    link: "",
    alt: "Vital Projects Fund logo",
  },
  {
    image: ArnoldVenturesLogo,
    link: "",
    alt: "Arnold Ventures logo",
  },
]

const HomeTemplate = ({
  pageContext,
  data: { mdx },
  classes,
  className,
  ...props
}) => {
  return (
    <Layout title={"home"}>
      <Intro
        title={content.intro.title}
        subtitle={content.intro.subtitle}
        body={content.intro.body}
      />
      <HomeMap
        title={content.map.title}
        description={content.map.description}
      />
      <MapTooltip />
      <Table title={content.table.title} note={content.table.note} />
      {/* <Block type="fullWidth" style={{ background: "#fff" }}>
        <Container maxWidth="lg">
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Container>
      </Block> */}
      <Sponsors title={content.sponsors.title} logos={content.sponsors.logos} />
    </Layout>
  )
}

export default HomeTemplate
