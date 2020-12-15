import React from "react"
import clsx from "clsx"
import { graphql, navigate } from "gatsby"
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

const useStyles = makeStyles((theme) => ({
  block: {
    padding: theme.spacing(0, 2),
    alignItems: "flex-start",
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(0, 3),
    },
  },
  // visual: {
  //   position: "sticky",
  //   top: `calc(${theme.layout.headerHeight} + 56px)`,
  //   width: `calc(100% - 26.25rem)`,
  //   // full vertical height, minus header
  //   height: `calc(100vh - ${theme.layout.headerHeight} - 56px)`,
  //   marginLeft: "auto",
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "stretch",
  //   // make some space for the legend
  //   "& .rsm-svg": {
  //     flex: 1,
  //     maxHeight: `calc(100% - 5rem)`,
  //   },
  // },
  title: {
    marginTop: theme.spacing(0),
  },
  step: {
    display: "flex",
    //minHeight: `calc(100vh - ${theme.layout.headerHeight})`,
    justifyContent: "center",
    padding: theme.spacing(3, 0),
  },
  first: {
    /*minHeight: `calc(100vh - ${theme.layout.headerHeight} - ${theme.spacing(
      10
    )})`,*/
  },
  content: {
    position: "relative",
    // DEPARTURES FROM STATES PAGES
    marginTop: `calc(${theme.layout.headerHeight} + 24px)`,
    // to center single column
    maxWidth: "42rem",
    margin: "auto",
    "& .embedded-stats": {
      padding: theme.spacing(3,2),
    },
  },
}))

const content = {
  mapDescription: "Spikes represents the ${metric} in a facility for ${group}",
  sections: [
    {
      id: "residents",
      lang: {
        title: "Nationwide ${metric} among incarcerated people",
        link: "Incarcerated People",
        notes: {
          // TODO: prune
          confirmed:
            "True case counts are likely higher and may be significantly higher than reported.",
          confirmed_rate:
            "Rates are calculated using a denominator of facility-level population as of February 2020. See our methodology to learn more about why we chose this approach.",
          active:
            "True case counts are likely higher and may be significantly higher than reported.",
          active_rate:
            "Rates are calculated using a denominator of facility-level population as of February 2020. See our methodology to learn more about why we chose this approach.",
          deaths:
            "True mortality counts are likely higher and may be significantly higher than reported.",
          deaths_rate:
            "Rates are calculated using a denominator of facility-level population as of February 2020. See our methodology to learn more about why we chose this approach. ",
          tests:
            "Some agencies report the number of persons tested, while others report the number of tests administered. We record whichever number is available.",
          tests_rate:
            "Rates are calculated using a denominator of facility-level population as of February 2020. See our methodology to learn more about why we chose this approach.",
        },
      },
    },
    {
      id: "staff",
      lang: {
        title: "Nationwide ${metric} among staff",
        link: "Staff",
        unavailable: "${metric} is not available for staff.",
        notes: {
          active:
            "True case counts are likely higher and may be significantly higher than reported",
          active_rate:
            "We do not have reliable data for staffing levels at all facilities. As a result, we are not currently providing rates for staff.",
          confirmed:
            "True case counts are likely higher and may be significantly higher than reported",
          confirmed_rate:
            "We do not have reliable data for staffing levels at all facilities. As a result, we are not currently providing rates for staff.",
          deaths:
            "True case counts are likely higher and may be significantly higher than reported",
          deaths_rate:
            "We do not have reliable data for staffing levels at all facilities. As a result, we are not currently providing rates for staff.",
          tests: "",
          tests_rate:
            "We do not have reliable data for staffing levels at all facilities. As a result, we are not currently providing rates for staff.",
        },
      },
    },
    {
      id: "facilities",
      lang: {
        title: "Facilities by ${metric}",
        link: "Facilities",
        body: "",
      },
    },
    {
      id: "filings",
      lang: {
        title: "Legal Filings and Court Orders Related to COVID-19",
        link: "Filings & Court Orders",
        body:
          "Our project collaborates with Bronx Defenders, Columbia Law School’s Center for Institutional and Social Change, and Zealous to collect legal documents from around the country related to COVID-19 and incarceration. Together, we then organize and code them into the jointly managed <a href='https://healthisjustice.org/litigation-hub/login' rel='noreferrer' target='_blank'>Health is Justice litigation hub</a> for public defenders, litigators, and other advocates. The majority of the legal documents in the Health is Justice litigation hub are federal court opinions, but we are expanding to state legal filings, declarations, and exhibits.<br /><br />In addition to the Health is Justice litigation hub, our project also manages additional data self-reported by advocates regarding COVID-19-related legal filings involving <a href='https://docs.google.com/spreadsheets/d/1X6uJkXXS-O6eePLxw2e4JeRtM41uPZ2eRcOA_HkPVTk/edit#gid=1832796231' rel='noreferrer' target='_blank'>incarcerated youth</a> and <a href='https://docs.google.com/spreadsheets/d/1X6uJkXXS-O6eePLxw2e4JeRtM41uPZ2eRcOA_HkPVTk/edit#gid=22612814' rel='noreferrer' target='_blank'>individuals in immigration detention</a>.<br /><br />In addition to the Health is Justice litigation hub, our project also manages additional data self-reported by advocates regarding COVID-19-related legal filings involving <a href='https://docs.google.com/spreadsheets/d/1X6uJkXXS-O6eePLxw2e4JeRtM41uPZ2eRcOA_HkPVTk/edit#gid=1832796231' rel='noreferrer' target='_blank'>incarcerated youth</a> and <a href='https://docs.google.com/spreadsheets/d/1X6uJkXXS-O6eePLxw2e4JeRtM41uPZ2eRcOA_HkPVTk/edit#gid=22612814' rel='noreferrer' target='_blank'>individuals in immigration detention</a>.<br><br>For more COVID-19-related legal filings, please visit the University of Michigan Law School’s <a href='https://clearinghouse.net/results.php?searchSpecialCollection=62'>Civil Rights Litigation Clearinghouse, COVID-19 Special Collection</a>.",
        visual: {
          courtCount: "number of courts",
          granted: "compassionate releases granted",
          facilityCount: "number of facilities",
          total: "filings coded by our team",
          unavailable: "No filings data available.",
        },
      },
    },
    {
      id: "releases",
      lang: {
        title: "Federal Prison Releases Related to COVID-19",
        link: "Releases",
        body:
          "We collect data on jurisdictions across the U.S. that have released people from adult prison and jail custody in response to the COVID-19 pandemic. For the most part, we only include release efforts where the data source includes some sort of programmatic description of who is being released (e.g., people with technical violations of parole, people charged with non-violent crimes, etc.). You can find our full prison releases dataset <a href='https://docs.google.com/spreadsheets/d/1X6uJkXXS-O6eePLxw2e4JeRtM41uPZ2eRcOA_HkPVTk/edit#gid=845601985'>here</a> and jail releases dataset <a href'https://docs.google.com/spreadsheets/d/1X6uJkXXS-O6eePLxw2e4JeRtM41uPZ2eRcOA_HkPVTk/edit#gid=1678228533'>here</a>.<br><br><br>",
        visual: {
          prisonCount: "prison release efforts",
        },
      },
    },
  ],
}

const SECTION_COMPONENTS = {
  residents: ResidentsSummary,
  staff: StaffSummary,
  facilities: Facilities,
  filings: Filings,
  releases: Releases,
}

const StateTemplate = ({ pageContext, data }) => {
  // classes used on this page
  const classes = useStyles()
  const state = "Federal"
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

  const handleNavigation = (section) => {
    navigate("#" + section)
    setCurrentStep(section)
  }

  // setctions for section nav
  const sections = content.sections.map((s) => ({
    id: s.id,
    name: s.lang.link,
  }))

  return (
    <Layout title={state}>
      <SectionNavigation
        current={currentStep}
        sections={sections}
        onSelect={handleNavigation}
      />
      <ResponsiveContainer>
        {/* <Visual className={classes.visual} /> */}
        <div className={classes.content}>
          <Scrollama onStepEnter={handleStepEnter}>
            {content.sections.map((section, index) => {
              const Component = SECTION_COMPONENTS[section.id]
              return (
                <Step key={section.id} data={section.id}>
                  <div id={section.id}>
                    {index === 0 && (
                      <Typography variant="h2" className={classes.title}>
                        Federal Facilities in the United States
                      </Typography>
                    )}
                    <Component
                      isFederal={true}
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
  query {
    allFacilities(filter: { jurisdiction: { eq: "federal" } }) {
      edges {
        node {
          city
          coords
          id
          jurisdiction
          name
          residents {
            active
            active_rate
            confirmed
            confirmed_rate
            deaths
            deaths_rate
            tested
            tested_rate
          }
          staff {
            active
            confirmed
            deaths
            tested
            recovered
          }
        }
      }
    }
    allPrisonReleases(filter: { state: { eq: "Federal BOP" } }) {
      edges {
        node {
          id
          releases
          facility
          source
          state
          capacity
        }
      }
    }
    allFilings(filter: { state: { eq: "federal" } }) {
      edges {
        node {
          courtCount
          facilityCount
          granted
          total
        }
      }
    }
  }
`

export default StateTemplate
