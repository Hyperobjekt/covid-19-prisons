# COVID-19 Behind Bars

This is a monorepo containing all code for the COVID-19 Behind Bars project.

## Getting Started

This project is managed using yarn workspaces. To get started, clone the repo and install all dependencies with:

```
yarn install
```

## Contributing

  1. All new features, fixes, and work in progress should be branched off off the `development` branch.
  2. Open a Pull Request from your local branch on to the `development` branch when your work is ready to become part of the code base.
  3. When a new release is ready, merge in to `staging` to preview on the [staging site](https://staging--covid-19-behind-bars.netlify.app/).
  4. Once a staging review is complete, merge into the `production` branch to trigger a build of the live site.

## Website (`/packages/gatsby-ucla-site`)

[![Netlify Status](https://api.netlify.com/api/v1/badges/1886ec87-389f-470e-a6c0-84f5d44ed418/deploy-status)](https://app.netlify.com/sites/covid-19-behind-bars/deploys)

Run the Gatsby site in development mode with

```
yarn workspace gatsby-ucla-site develop
```

and perform a build with:

```
yarn workspace gatsby-ucla-site build
```

## National Map (`/packages/national-map`)

> ARCHIVED: this is a national mapbox map that has been replaced by the SVG spike maps in `/packages/gatsby-ucla-site`.

Run the national map in development mode with:

```
yarn workspace national-map start
```

Create a build that places the map in the static site `public` directory with

```
yarn workspace national-map build
```
