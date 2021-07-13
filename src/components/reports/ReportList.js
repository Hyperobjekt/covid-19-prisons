import React from "react";
import useReportsData from "./useReportsData";
import {
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
} from "@material-ui/core";
import moment from "moment";
import useInternalReports from "./useInternalReports";
import { Link as GatsbyLink } from "gatsby-theme-material-ui";
const useStyles = makeStyles((theme) => ({
  details: {
    display: "inline",
  },
  primary: {
    marginBottom: theme.spacing(0.5),
  },
}));

const ReportTitle = ({ report, external }) => {
  const classes = useStyles();

  return (
    <>
      {external && (
        <Link target="_blank" href={report.url}>
          {report.title}
        </Link>
      )}
      {!external && <GatsbyLink to={report.url}>{report.title}</GatsbyLink>}
      <br />
      <Typography variant="body2" className={classes.details}>
        {moment(report.date).format("MMMM Do, YYYY")}, {report.author}
      </Typography>
    </>
  );
};

const ReportList = ({ ...props }) => {
  const classes = useStyles();
  const internal = useInternalReports();
  const external = useReportsData().map((r) => ({ ...r, external: true }));
  const reports = [...internal, ...external].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  if (reports.length === 0)
    return <Typography>No reports available</Typography>;
  return (
    <List>
      {reports.map((report) => (
        <ListItem disableGutters>
          <ListItemText
            primary={<ReportTitle report={report} external={report.external} />}
            secondary={report.description}
            classes={{ primary: classes.primary }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ReportList;
