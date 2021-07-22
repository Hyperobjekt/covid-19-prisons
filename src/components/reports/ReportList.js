import React from "react";
import useReportsData from "./useReportsData";
import { Typography, makeStyles } from "@material-ui/core";
import useInternalReports from "./useInternalReports";
import { PostList } from "../blog";
const useStyles = makeStyles((theme) => ({
  titleWrapper: {
    // override margins added from page content
    "& > h3": { marginTop: `0!important` },
  },
}));

const ReportList = (props) => {
  const classes = useStyles();
  const internal = useInternalReports();
  const external = useReportsData().map((r) => ({ ...r, external: true }));
  const reports = [...internal, ...external].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  if (reports.length === 0)
    return <Typography>No reports available</Typography>;
  return <PostList posts={reports} classes={classes} {...props} />;
};

export default ReportList;
