# UCLA COVID Behind Bars Website

This is the main gatsby site for https://uclacovidbehindbars.org/

This site is based off of [gatsby-theme-hyperobject-core](https://github.com/Hyperobjekt/gatsby-theme-hyperobjekt), which provides the basics:

- MDX content rendering
- Page creation
- SEO (customizable via front matter)
- [Base level components](https://github.com/Hyperobjekt/gatsby-theme-hyperobjekt/tree/main/themes/gatsby-theme-hyperobjekt-core/src/components) (header, footer, body, navigation, etc)
- Theming via [material styles](https://material-ui.com/styles/basics/)

All components from the core theme can be overridden using [component shadowing](https://www.gatsbyjs.com/blog/2019-04-29-component-shadowing/) (creating the same component from the core theme in `src/gatsby-theme-hyperobjekt-core`).

See the [hyperobjekt core starter](https://gatsby-starter-hyperobjekt.netlify.app/) site for more details.

## Data Sources

Data is pulled from a many sources:

- [UCLA Law COVID Behind Bars Data Repo](https://github.com/uclalawcovid19behindbars/data)
- [UCLA Law COVID Behind Bars Google Sheet](https://docs.google.com/spreadsheets/d/1X6uJkXXS-O6eePLxw2e4JeRtM41uPZ2eRcOA_HkPVTk/edit#gid=1641553906)

Data fetching and processing happens on build in `gatsby-node.js`

## Publishing the website

- [staging website](https://staging--covid-19-behind-bars.netlify.app/)
  - publishes on any pushes to the `staging` branch
  - publishes when new data is committed to the `master` branch of the [data repository](https://github.com/uclalawcovid19behindbars/data)
  - uses data in the `master` branch of the data repo
- [public website](https://uclacovidbehindbars.org/)
  - publishes on any pushes to the `production` branch
  - publishes when new data is committed to the `website` branch of the [data repository](https://github.com/uclalawcovid19behindbars/data)
  - uses data in the `website` branch of the data repo

## Content Management System

- as per the [config.yml](https://github.com/Hyperobjekt/covid-19-behind-bars/blob/production/packages/gatsby-ucla-site/static/admin/config.yml), CMS updates on the public website trigger commits to the `production` branch (with `editorial_workflow`, so a preview branch with the content updates is created on save before being published). 
