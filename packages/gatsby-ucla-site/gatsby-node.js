if (typeof fetch !== "function") {
  global.fetch = require("node-fetch")
}
const csv = require("d3-fetch").csv
const { parseFacility } = require(`./scripts/parseFacility.js`)

const facilitiesData = `https://raw.githubusercontent.com/uclalawcovid19behindbars/data/master/Adult%20Facility%20Counts/adult_facility_covid_counts_today_latest.csv`

const releasesData = `https://docs.google.com/spreadsheets/d/1X6uJkXXS-O6eePLxw2e4JeRtM41uPZ2eRcOA_HkPVTk/export?gid=1678228533&format=csv`

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  console.log("fetching latest data for facilities")
  const facilities = await csv(facilitiesData, parseFacility)
  facilities.forEach((f, i) => {
    const node = {
      ...f,
      id: createNodeId(`Facility-${f.name}-${i}`),
      internal: {
        type: "Facilities",
        contentDigest: createContentDigest(f),
      },
    }
    actions.createNode(node)
  })
}

const StateTemplate = require.resolve(`./src/components/states/states.js`)

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text
}

const validStatePages = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
].map(slugify)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allFacilities {
        group(field: state) {
          fieldValue
          nodes {
            id
            name
            city
            state
            jurisdiction
            coords
          }
        }
      }
    }
  `)

  const states = result.data.allFacilities.group
  states.forEach(({ fieldValue: stateName, nodes: facilities }) => {
    const pageName = slugify(stateName)
    if (validStatePages.indexOf(pageName) > -1) {
      createPage({
        path: `/states/${pageName}/`,
        component: StateTemplate,
        context: {
          slug: pageName,
          state: stateName,
          facilities: facilities,
        },
      })
    } else {
      console.warn(
        `invalid state name: not creating a state page for ${pageName} `
      )
    }
  })
}
