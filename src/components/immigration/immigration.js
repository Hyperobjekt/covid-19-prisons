import React from "react"
import shallow from "zustand/shallow"
import { graphql } from "gatsby"
import { Block } from "@hyperobjekt/material-ui-website"
import Layout from "gatsby-theme-hypersite/src/layout"
import { GeoJsonLayer } from "@hyperobjekt/svg-maps"
import IceShapes from "../../common/data/full_ice_topo.json"
import Intro from "../home/HomeIntro"
import HomeMap from "../home/HomeMap"
import Table from "../home/HomeTable"
import { Scorecard } from "../states/sections"
import MapTooltip from "../home/HomeMapTooltip"
import { makeStyles } from "@material-ui/core"
import FacilitiesMapTooltip from "../states/visuals/FacilitiesMapTooltip"
import { useRegionShapeStyles } from "../maps/styles"
import { useActiveMetric, useOptionsStore } from "../../common/hooks"
import sectionContent from "../../../content/immigration.json"
import ResponsiveContainer from "../ResponsiveContainer"

export const query = graphql`
  query($pathSlug: String!) {
    mdx(frontmatter: { path: { eq: $pathSlug } }) {
      frontmatter {
        intro {
          body
          subtitle
          title
        }
        map {
          description
          title
        }
        title
        sponsors {
          title
        }
        regionSelection {
          title
        }
        table {
          note
          title
        }
      }
      body
    }
    scorecard: allScorecard(filter: { state: { eq: "Immigration (ICE)" } }) {
      nodes {
        score
        date
        machine
        regularly
        history
        defined
        cases_residents
        deaths_residents
        active_residents
        tests_residents
        population_residents
        vaccinations_residents
        cases_staff
        deaths_staff
        tests_staff
        vaccinations_staff
        active_staff
        population_staff
      }
    }
  }
`

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.only("md")]: {
      "& .map-legend": {
        // metric selection dropdown gets an extra column of width (see HomeMap.js)
        // so shift left slightly to keep it on the page
        transform: `translateX(-30px)`,
      },
    },
    "& .jurisdiction-toggles .toggle": {
      visibility: "hidden", // display: hidden interferes with gradients...
      "&.toggle-immigration": {
        visibility: "visible",
        // since it's the only toggle, shift up slightly
        transform: "translateY(-5px)",
        // display: "inline-flex",
        cursor: "auto",
        "& .checkbox": {
          display: "none",
        },
      },
    },
    "& .home-table .jurisdiction-toggles .toggle": {
      display: "none",
      "&.toggle-immigration": {
        display: "none",
      },
    },
  },
}))

const ImmigrationTemplate = ({
  pageContext,
  data,
  classes,
  className,
  ...props
}) => {
  const content = data.mdx.frontmatter
  const muiClasses = useStyles()

  const [iceRegionId, setIceRegionId] = useOptionsStore(
    (state) => [state.iceRegionId, state.setIceRegionId],
    shallow
  )

  const shapeClasses = useRegionShapeStyles()
  const classMap = {
    shape: shapeClasses.shape,
    label: shapeClasses.shapeLabel,
    selected: shapeClasses.selected,
    // root: shapeClasses.root,
    // label: shapeClasses.label,
    // marker: shapeClasses.marker,
    text: shapeClasses.text,
  }
  const shapeProps = {
    classes: classMap,
    selected: iceRegionId,
    isSelectedMatch: (geo, selected) =>
      selected && geo.properties.id === selected,
  }

  // const [searchValue, setSearchValue] = React.useState("")

  const labelSelector = (d) => d && d.properties && d.properties.name
  const onSelect = (geo) => {
    let toSelect = geo.properties.id
    // unselect if user clicks the selected region
    if (toSelect === iceRegionId) {
      toSelect = null
    }
    setIceRegionId(toSelect)
  }

  const metric = useActiveMetric()

  return (
    <Layout title={content.title} className={muiClasses.root}>
      <Intro
        title={content.intro.title}
        subtitle={content.intro.subtitle}
        body={content.intro.body}
      />
      <HomeMap
        selectedRegion={iceRegionId}
        categories={["immigration"]}
        title={content.map.title}
        description={content.map.description}
        isImmigration={true}
      >
        <GeoJsonLayer
          className="ice-regions"
          classes={classMap}
          source={IceShapes}
          shapeProps={shapeProps}
          labelProps={shapeProps}
          onSelect={onSelect}
          interactive
          showLabels
          labelSelector={labelSelector}
        />
      </HomeMap>
      <FacilitiesMapTooltip
        group={"residents"}
        metric={metric}
        isImmigration={true}
      />
      <MapTooltip isImmigration={true} />
      <Table
        isImmigration={true}
        selectedRegion={iceRegionId}
        categories={["immigration"]}
        title={content.table.title}
        note={content.table.note}
      />
      <Block id="scorecard" type="fullWidth">
        <ResponsiveContainer>
          <Scorecard
            state="immigration"
            data={data}
            lang={sectionContent.scorecard.lang}
          />
        </ResponsiveContainer>
      </Block>
    </Layout>
  )
}

export default ImmigrationTemplate
