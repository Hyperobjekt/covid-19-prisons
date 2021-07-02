import React from "react";
import { Button, Box, Link } from "@material-ui/core";
import { Block, Container } from "@hyperobjekt/material-ui-website";
import mdxComponents from "gatsby-theme-hypersite/src/gatsby-theme-hypercore/mdx";
import { Typography } from "@material-ui/core";
const components = {
  ...mdxComponents,
  section: Container,
  span: (props) => <Typography component="span" {...props} />,
  a: (props) => <Link color="secondary" {...props} />,
  Block,
  Box,
  Button,
};

export default components;
