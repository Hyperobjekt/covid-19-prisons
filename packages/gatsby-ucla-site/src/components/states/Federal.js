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
  visual: {
    position: "sticky",
    top: `calc(${theme.layout.headerHeight} + 56px)`,
    width: `calc(100% - 26.25rem)`,
    // full vertical height, minus header
    height: `calc(100vh - ${theme.layout.headerHeight} - 56px)`,
    marginLeft: "auto",
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
          tests:
            "",
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
    // {
    //   id: "filings",
    //   lang: {
    //     title: "Legal Filings and Court Orders Related to COVID-19",
    //     link: "Filings & Court Orders",
    //     body:
    //       "Our project collaborates with Bronx Defenders, Columbia Law School’s Center for Institutional and Social Change, and Zealous to collect legal documents from around the country related to COVID-19 and incarceration. Together, we then organize and code them into the jointly managed <a href='https://healthisjustice.org/litigation-hub/login' rel='noreferrer' target='_blank'>Health is Justice litigation hub</a> for public defenders, litigators, and other advocates. The majority of the legal documents in the Health is Justice litigation hub are federal court opinions, but we are expanding to state legal filings, declarations, and exhibits.<br /><br />In addition to the Health is Justice litigation hub, our project also manages additional data self-reported by advocates regarding COVID-19-related legal filings involving <a href='https://docs.google.com/spreadsheets/d/1X6uJkXXS-O6eePLxw2e4JeRtM41uPZ2eRcOA_HkPVTk/edit#gid=1832796231' rel='noreferrer' target='_blank'>incarcerated youth</a> and <a href='https://docs.google.com/spreadsheets/d/1X6uJkXXS-O6eePLxw2e4JeRtM41uPZ2eRcOA_HkPVTk/edit#gid=22612814' rel='noreferrer' target='_blank'>individuals in immigration detention</a>.",
    //     visual: {
    //       courtCount: "number of courts",
    //       granted: "compassionate releases granted",
    //       facilityCount: "number of facilities",
    //       total: "filings coded by our team",
    //       unavailable: "No filings data available.",
    //     },
    //   },
    // },
    {
      id: "releases",
      lang: {
        title: "Federal Prison Releases Related to COVID-19",
        link: "Releases",
        body:
          "We collect data on jurisdictions across the U.S. that have released people from adult prison and jail custody in response to the COVID-19 pandemic. For the most part, we only include release efforts where the data source includes some sort of programmatic description of who is being released (e.g., people with technical violations of parole, people charged with non-violent crimes, etc.). See our <a href='https://docs.google.com/spreadsheets/d/1X6uJkXXS-O6eePLxw2e4JeRtM41uPZ2eRcOA_HkPVTk/edit#gid=845601985' rel='noreferrer' target='_blank'>full prison releases dataset</a> for more.",
        visual: {
          prisonCount: "prison release efforts",
        },
      },
    },
    // {
    //   id: "immigration",
    //   lang: {
    //     title: "COVID-19 Cases and Deaths in Immigration Detention",
    //     link: "Immigration",
    //     body:
    //       "We collect data on COVID-19 infections and deaths of detainees and staff within all 120 U.S. Immigration and Customs Enforcement (ICE) facilities, as well as other facilities detaining people under ICE jurisdiction, across the United States. Our data come directly from ICE’s website and are updated almost every day. As of November 23, 2020, ICE no longer reports COVID-19-related cases and deaths among staff. View our <a href='https://docs.google.com/spreadsheets/d/1X6uJkXXS-O6eePLxw2e4JeRtM41uPZ2eRcOA_HkPVTk/edit#gid=278828877' rel='noreferrer' target='_blank'>full immigration dateset</a>.",
    //     visual: {
    //       facilityCount: "ICE facilities",
    //       caseCount: "detainee cases",
    //       deathsCount: "detainee deaths",
    //     },
    //   },
    // },
    // {
    //   id: "grassroots",
    //   lang: {
    //     title:
    //       "Grassroots and Community Organizing Efforts Related to COVID-19",
    //     link: "Grassroots & Organizing",
    //     body:
    //       "Our team collects data on grassroots and community organizing efforts by incarcerated people, their families, community-based organizations, nonprofits, and advocates aimed at influencing government agencies to protect the lives of people incarcerated in prisons, jails, and detention centers against the threats posed by COVID-19. <a href='https://docs.google.com/spreadsheets/d/1X6uJkXXS-O6eePLxw2e4JeRtM41uPZ2eRcOA_HkPVTk/edit#gid=1720501154' rel='noreferrer' target='_blank'>View our full grassroots and organizing dataset</a>. ",
    //     visual: {
    //       effortCount: "efforts",
    //       internalCount: "efforts happening behind bars",
    //       externalCount: "efforts started externally",
    //       coordinatedCount: "coordinated efforts (inside and outside)",
    //     },
    //   },
    // },
  ],
}

const SECTION_COMPONENTS = {
  residents: ResidentsSummary,
  staff: StaffSummary,
  facilities: Facilities,
  filings: Filings,
  releases: Releases,
  // immigration: Immigration,
  // grassroots: Grassroots,
}

const StateTemplate = ({ pageContext, data }) => {
  // classes used on this page
  const classes = useStyles()
  // pull state name from page context
  // const { state } = pageContext
  const state = "federal"
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
    console.log('hse: ', data)
    setCurrentStep(data)
  }

  const handleNavigation = (section) => {
    console.log("seciton", section)
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
              console.log("||", section.id, "||", Component)
              return (
                <Step key={section.id} data={section.id}>
                  <div id={section.id}>
                    {index === 0 && (
                      <Typography variant="h2" className={classes.title}>
                        {state}ihhi
                      </Typography>
                    )}
                    <div>{index}!</div>
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
          }
          staff {
            active
            confirmed
            deaths
            recovered
          }
          state
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
  }
`

export default StateTemplate
