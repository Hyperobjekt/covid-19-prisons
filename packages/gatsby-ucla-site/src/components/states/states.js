import React from "react"
import clsx from "clsx"
import { graphql } from "gatsby"
import { Layout } from "gatsby-theme-hyperobjekt-core"
import { makeStyles, Typography } from "@material-ui/core"

import { Step, Scrollama } from "@hyperobjekt/react-scrollama"
import {
  ResidentsSummary,
  Facilities,
  Filings,
  Grassroots,
  Immigration,
  Releases,
  StaffSummary,
} from "./sections"
import useStatesStore from "./useStatesStore"
import Visual from "./Visual"
import shallow from "zustand/shallow"
import SectionNavigation from "../SectionNavigation"
import ResponsiveContainer from "../ResponsiveContainer"
import content from "../../../content/states.json"

const useStyles = makeStyles((theme) => ({
  block: {
    padding: theme.spacing(0, 2),
    alignItems: "flex-start",
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(0, 3),
    },
  },
  visual: {
    position: "sticky",
    top: `calc(${theme.layout.headerHeight} + 56px)`,
    width: `100%`,
    // full vertical height, minus header
    height: `calc(100vh - ${theme.layout.headerHeight} - 56px)`,
    marginLeft: "0",
    [theme.breakpoints.up("md")]: {
      marginLeft: "auto",
      width: `calc(100% - 26.25rem)`,
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    // make some space for the legend
    "& .rsm-svg": {
      flex: 1,
      maxHeight: `calc(100% - 5rem)`,
    },
  },
  title: {
    marginTop: theme.spacing(5),
  },
  step: {
    display: "flex",
    minHeight: `calc(100vh - ${theme.layout.headerHeight})`,
    justifyContent: "center",
    padding: theme.spacing(3, 0),
  },
  first: {
    minHeight: `calc(100vh - ${theme.layout.headerHeight} - ${theme.spacing(
      10
    )})`,
  },
  content: {
    marginTop: `calc(-100vh + ${theme.layout.headerHeight} + 56px)`,
    position: "relative",
    maxWidth: "26.25rem",
    marginLeft: `auto`,
    marginRight: `auto`,
    [theme.breakpoints.up("md")]: {
      marginLeft: 0,
      marginRight: `auto`,
    },
  },
}))

const SECTION_COMPONENTS = {
  residents: ResidentsSummary,
  staff: StaffSummary,
  facilities: Facilities,
  filings: Filings,
  releases: Releases,
  immigration: Immigration,
  grassroots: Grassroots,
}

const StateTemplate = ({ pageContext, data }) => {
  // classes used on this page
  const classes = useStyles()
  // pull state name from page context
  const { state } = pageContext
  // track current step index for scrollytelling
  const [
    currentStep,
    setCurrentStep,
    setStateName,
    setData,
    setContent,
  ] = useStatesStore(
    (state) => [
      state.currentStep,
      state.setCurrentStep,
      state.setStateName,
      state.setData,
      state.setContent,
    ],
    shallow
  )
  // set the state name in the store
  setStateName(state)
  // set the data in the store
  setData(data)
  // set the content for the page
  setContent(content)

  // update current step when entering
  const handleStepEnter = ({ data }) => {
    setCurrentStep(data)
  }

  // setctions for section nav
  const sections = content.sections.map((s) => ({
    id: s.id,
    name: s.lang.link,
  }))

  return (
    <Layout title={state}>
      <SectionNavigation current={currentStep} sections={sections} />
      <ResponsiveContainer>
        <Visual className={classes.visual} />
        <div className={classes.content}>
          <Scrollama onStepEnter={handleStepEnter}>
            {content.sections.map((section, index) => {
              const Component = SECTION_COMPONENTS[section.id]
              return (
                <Step key={section.id} data={section.id}>
                  <div id={section.id}>
                    {index === 0 && (
                      <Typography variant="h2" className={classes.title}>
                        {state}
                      </Typography>
                    )}
                    <Component
                      className={clsx(classes.step, {
                        [classes.first]: index === 0,
                      })}
                      data={data}
                      {...section}
                    />
                  </div>
                </Step>
              )
            })}
          </Scrollama>
        </div>
      </ResponsiveContainer>
    </Layout>
  )
}

StateTemplate.propTypes = {}

export const query = graphql`
  query($state: String!) {
    allFacilities(filter: { state: { eq: $state } }) {
      edges {
        node {
          id
          name
          coords
          city
          jurisdiction
          residents {
            active
            active_rate
            confirmed
            confirmed_rate
            deaths
            deaths_rate
            tested
            tested_rate
            population
          }
          staff {
            active
            confirmed
            deaths
            tested
          }
          date
        }
      }
    }
    allFilings(filter: { state: { eq: $state } }) {
      edges {
        node {
          courtCount
          facilityCount
          granted
          total
        }
      }
    }
    allFundraisers(filter: { state: { eq: $state } }) {
      edges {
        node {
          ongoing
          goal
          fundraiser
          date
          organization
          sources
        }
      }
    }
    allGrassroots(filter: { state: { eq: $state } }) {
      edges {
        node {
          county
          external_effort
          facility
          internal_effort
          organization
          releases
          response
          sanitary
          success
          testing
          type
        }
      }
    }
    allImmigrationCases(filter: { state: { eq: $state } }) {
      edges {
        node {
          cases
          deaths
          facility
          fieldOffice
        }
      }
    }
    allImmigrationFilings(filter: { state: { eq: $state } }) {
      edges {
        node {
          cancer
          diabetes
          heart
          facility
          lung
          medication
          other
          smoking
          substance
        }
      }
    }
    allJailReleases(filter: { state: { eq: $state } }) {
      edges {
        node {
          facility
          capacity
          releases
          source
        }
      }
    }
    allPrisonReleases(filter: { state: { eq: $state } }) {
      edges {
        node {
          facility
          capacity
          releases
          source
        }
      }
    }
    allYouth(filter: { state: { eq: $state } }) {
      edges {
        node {
          cases_staff
          cases_youth
          city
          county
          facility
        }
      }
    }
  }
`

export default StateTemplate
