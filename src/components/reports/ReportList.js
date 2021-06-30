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

const ReportList = ({ reports = [], external, ...props }) => {
  const classes = useStyles();
  if (reports.length === 0)
    return <Typography>No reports available</Typography>;
  return (
    <List>
      {reports.map((report) => (
        <ListItem disableGutters>
          <ListItemText
            primary={<ReportTitle report={report} external={external} />}
            secondary={report.description}
            classes={{ primary: classes.primary }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export const ExternalReportList = (props) => {
  const reports = useReportsData();
  return <ReportList external reports={reports} {...props} />;
};

export const InternalReportList = (props) => {
  const reports = useInternalReports();
  return <ReportList reports={reports} {...props} />;
};

export default ReportList;
