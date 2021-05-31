const metadata = require("./config/metadata.json");
module.exports = {
  siteMetadata: metadata,
  plugins: [
    {
      resolve: `gatsby-theme-hypersite`,
      options: {
        contentPath: `content/pages`,
        assetPath: `content/assets`,
        templates: {
          home: require.resolve("./src/components/home/home.js"),
          immigration: require.resolve(
            "./src/components/immigration/immigration.js"
          ),
        },
      },
    },
    // load typekit fonts
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        typekit: {
          id: "uiz8duz",
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `COVID-19 Behind Bars`,
        short_name: `COVID Behind Bars`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#cccccc`,
        display: `minimal-ui`,
        icon: `content/assets/site-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `./src/cms/cms.js`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          `${process.env.GATSBY_GA_TRACKING_ID}`,
          // "GA-TRACKING_ID", // Google Analytics / GA
          // "AW-CONVERSION_ID", // Google Ads / Adwords / AW
          // "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: false,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ["/preview/**"],
        },
      },
    },
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        offset: -100,
      },
    },
  ],
};
