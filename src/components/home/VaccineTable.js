import React from "react";
import { format } from "d3-format";
import { useVaccineData } from "../../common/hooks";
import { Block } from "@hyperobjekt/material-ui-website";
import { getSlug, isNumber } from "../../common/utils/selectors";
import { getLang } from "../../common/utils/i18n";
import { Link } from "gatsby-theme-material-ui";
import { DefaultTable } from "../table";
import { Typography, withStyles } from "@material-ui/core";
import { formatMetricValue } from "../../common/utils/formatters";
import Notes from "../Notes";

const alphaStateSort = (a, b) => {
  // Total row goes first
  if (a.original.isTotal) return 1;
  if (b.original.isTotal) return -1;

  // non-state rows (federal, ice) go above states
  if (a.original.isState !== b.original.isState) {
    return a.original.isState ? -1 : 1;
  }

  return a.original.jurisdiction > b.original.jurisdiction ? -1 : 1;
};

const rateSorter = (a, b, columnId) => {
  if (a.original.isTotal) return 1;
  if (b.original.isTotal) return -1;

  const [group, metric] = columnId.split("-");
  const [aVal, bVal] = [a, b].map((v) => v.original[group][metric]);
  if (isNumber(aVal) && !isNumber(bVal)) return 1;
  if (!isNumber(aVal) && isNumber(bVal)) return -1;
  if (!isNumber(aVal) && !isNumber(bVal)) return 0;
  return aVal - bVal;
};

const styles = (theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
  wrapper: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "space-between",
    },
  },
  content: {
    maxWidth: "32rem",
    [theme.breakpoints.up("md")]: {
      marginRight: theme.spacing(5),
    },
  },
  body: {
    margin: theme.spacing(2, 0),
  },
  jurisdictionLink: {
    "&.MuiLink-root.MuiTypography-root": {
      color: theme.palette.text.secondary,
    },
  },
  tableWrapper: {
    flex: 1,
    maxWidth: theme.spacing(69),
  },
  table: {
    "& tr:hover $jurisdictionLink": {
      textDecoration: "underline",
      textDecorationThickness: "1px",
      cursor: "pointer",
      "&:hover": {
        textDecorationColor: theme.palette.secondary.main,
      },
    },
  },
  notes: {
    listStyle: "none",
    margin: theme.spacing(2, "auto"),
    maxWidth: "24rem",
    "& li": {
      maxWidth: "24rem",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "space-around",
      maxWidth: "none",
      "& li + li": {
        marginTop: 0,
      },
    },
  },
});

const intFormatter = format(",d");

const perFormatter = (v) => formatMetricValue(v, "home_table_rate");
const countFormatter = (value) =>
  !isNumber(value) ? "--" : intFormatter(value);

const VaccineTable = ({ title, subtitle, note, classes, ...props }) => {
  // data for table
  const data = useVaccineData();

  // column configuration for the table
  const columns = React.useMemo(
    () => [
      {
        id: "jurisdiction",
        Header: getLang("jurisdiction"),
        accessor: "jurisdiction",
        sortType: alphaStateSort,
        Cell: (prop) => {
          const { jurisdiction, isState, isFederal, isIce } = prop.row.original;
          let slug = null;
          if (jurisdiction && isState) {
            slug = `/states/${getSlug(jurisdiction)}`;
          } else if (isFederal) {
            slug = `/federal`;
          } else if (isIce) {
            slug = `/ice`;
          }
          const jurisdictionElement = slug ? (
            <Link to={slug} className={classes.jurisdictionLink}>
              {jurisdiction}
            </Link>
          ) : (
            jurisdiction
          );
          return (
            <Typography variant="body2" color="textSecondary">
              {jurisdictionElement}
            </Typography>
          );
        },
      },
      {
        id: "r-initiated",
        Header: getLang("initiated_total"),
        accessor: "residents.initiated",
        Cell: (prop) => countFormatter(prop.value),
        style: {
          width: "6em",
          textAlign: "right",
        },
      },
      {
        id: "residents-percentInitiated",
        Header: getLang("initiated_percent"),
        accessor: "residents.percentInitiated",
        sortType: rateSorter,
        Cell: (prop) => perFormatter(prop.value),
        style: {
          width: "6em",
          textAlign: "right",
        },
      },
      {
        id: "s-initiated",
        Header: getLang("initiated_total"),
        accessor: "staff.initiated",
        Cell: (prop) => countFormatter(prop.value),
        style: {
          width: "6em",
          textAlign: "right",
        },
      },
      {
        id: "staff-percentInitiated",
        Header: getLang("initiated_percent"),
        accessor: "staff.percentInitiated",
        sortType: rateSorter,
        Cell: (prop) => perFormatter(prop.value),
        style: {
          width: "6em",
          textAlign: "right",
        },
      },
    ],
    [classes.jurisdictionLink]
  );

  const topLevelHeaders = [
    { colSpan: 1, text: " " },
    { colSpan: 2, align: "center", text: getLang("residents_initiated") },
    { colSpan: 2, align: "center", text: getLang("staff_initiated") },
  ];

  return (
    <Block className={classes.root} {...props}>
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <Typography variant="h3">{title}</Typography>
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: subtitle }}
            className={classes.body}
          />
        </div>
        <div className={classes.tableWrapper}>
          <DefaultTable
            className={classes.table}
            data={data}
            columns={columns}
            startDesc={true}
            preventReverseSort={true}
            initialSortColumn={"jurisdiction"}
            disableFilter={true}
            topLevelHeaders={topLevelHeaders}
          />
          <Notes notes={note} className={classes.notes} />
        </div>
      </div>
    </Block>
  );
};

export default withStyles(styles)(VaccineTable);
