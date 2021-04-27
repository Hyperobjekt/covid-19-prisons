import React from "react"
import useReportsData from "./useReportsData"
import {
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
} from "@material-ui/core"
import moment from "moment"

const useStyles = makeStyles((theme) => ({
  details: {
    display: "inline",
  },
}))

const ReportTitle = ({ report }) => {
  const classes = useStyles()

  return (
    <>
      <Link target="_blank" href={report.url}>
        {report.title}
      </Link>{" "}
      <Typography variant="body2" className={classes.details}>
        {moment(report.date).format("MMMM Do, YYYY")}, {report.author}
      </Typography>
    </>
  )
}

const ReportList = (props) => {
  const reports = useReportsData()

  return (
    <List>
      {reports.map((report) => (
        <ListItem>
          <ListItemText
            primary={<ReportTitle report={report} />}
            secondary={report.description}
          />
        </ListItem>
      ))}
    </List>
  )
}

ReportList.propTypes = {}

export default ReportList
