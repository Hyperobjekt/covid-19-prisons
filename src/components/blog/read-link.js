import React from "react";
import PropTypes from "prop-types";
import { styled } from "@material-ui/core";
import { Link } from "gatsby";

const ReadLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 400,
  textDecoration: "none !important",
  paddingBottom: theme.spacing(1),
  borderBottom: "solid 1px",
  borderBottomColor: theme.palette.secondary.main,
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));

export default ReadLink;
