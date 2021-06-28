const path = require("path");
const {
  getFacilities,
  getVaccines,
  getScorecard,
  getJailReleases,
  getPrisonReleases,
  getFilingsOrders,
  getImmigrationCases,
  getImmigrationFilings,
  // getYouth,
  getGrassroots,
  // getFundraisers,
  getResources,
} = require(`./scripts/fetchData.js`);
const { validStatePages, slugify } = require(`./scripts/utils.js`);

/**
 * Creates a data node from the data fetcher
 * @param {*} id identifier for node
 * @param {*} fetcher function that returns a promise with fetched data
 * @param {*} param2 gatsby `sourceNodes` params
 */
const createSourceNodes = async (
  id,
  fetcher,
  { actions, createNodeId, createContentDigest, reporter }
) => {
  const activity = reporter.activityTimer(`created source node for ${id}`);
  activity.start();
  const data = await fetcher();
  data.forEach((d, i) => {
    const node = {
      ...d,
      id: createNodeId(`${id}-${i}`),
      internal: {
        type: id,
        contentDigest: createContentDigest(d),
      },
    };
    actions.createNode(node);
  });
  activity.end();
};

exports.sourceNodes = async (params) => {
  const nodes = [
    ["Facilities", getFacilities],
    ["Vaccines", getVaccines],
    ["Scorecard", getScorecard],
    ["JailReleases", getJailReleases],
    ["PrisonReleases", getPrisonReleases],
    ["Filings", getFilingsOrders],
    ["ImmigrationCases", getImmigrationCases],
    ["ImmigrationFilings", getImmigrationFilings],
    // ["Youth", getYouth],
    ["Grassroots", getGrassroots],
    // ["Fundraisers", getFundraisers],
    ["Resources", getResources],
  ];
  for (let i = 0; i < nodes.length; i++) {
    await createSourceNodes(nodes[i][0], nodes[i][1], params);
  }
};

const StateTemplate = require.resolve(`./src/templates/states.js`);
const FederalPage = require.resolve(`./src/templates/federal.js`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
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
  `);

  const states = result.data.allFacilities.group;
  states.forEach(({ fieldValue: stateName }) => {
    const pageName = slugify(stateName);
    if (validStatePages.indexOf(pageName) > -1) {
      createPage({
        path: `/states/${pageName}/`,
        component: StateTemplate,
        context: {
          slug: pageName,
          state: stateName,
        },
      });
    } else {
      console.warn(
        `invalid state name: not creating a state page for ${pageName} `
      );
    }
  });

  createPage({
    path: `/federal/`,
    component: FederalPage,
    context: {},
  });
};

// allow import of local components
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  });
};
