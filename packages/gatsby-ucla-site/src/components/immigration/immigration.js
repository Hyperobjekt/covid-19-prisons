import React from "react"
import shallow from "zustand/shallow"
import { graphql } from "gatsby"
import { Layout } from "gatsby-theme-hyperobjekt-core"
import { GeoJsonLayer } from "@hyperobjekt/svg-maps"
import IceShapes from "../../common/data/full_ice_topo.json"
import Intro from "../home/HomeIntro"
import HomeMap from "../home/HomeMap"
import Table from "../home/HomeTable"
import MapTooltip from "../home/HomeMapTooltip"
import RegionSelection from "./RegionSelection"
import { makeStyles } from "@material-ui/core"
import FacilitiesMapTooltip from "../states/visuals/FacilitiesMapTooltip"
import { useRegionShapeStyles } from "../maps/styles"
import { useActiveMetric, useOptionsStore } from "../../common/hooks"

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
  }
`

const useStyles = makeStyles((theme) => ({
  root: {
    "& .jurisdiction-toggles .toggle": {
      visibility: "hidden", // display: hidden interferes with gradients...
      "&.toggle-immigration": {
        visibility: "visible",
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
  data: { mdx },
  classes,
  className,
  ...props
}) => {
  const content = mdx.frontmatter
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
      <FacilitiesMapTooltip group={"residents"} metric={metric} />
      <MapTooltip isImmigration={true} />
      <RegionSelection title={content.regionSelection.title} />
      <Table
        isImmigration={true}
        selectedRegion={iceRegionId}
        categories={["immigration"]}
        title={content.table.title}
        note={content.table.note}
      />
    </Layout>
  )
}

export default ImmigrationTemplate
