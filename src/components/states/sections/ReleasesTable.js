import React from "react";
import { DefaultTable } from "../../table";
import { Typography, withStyles } from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import StepWrapper from "../StepWrapper";
import { titleTypography } from "../../../gatsby-theme-hypercore/theme";
import NotesModal from "../../NotesModal";
import DownloadDataButton from "../../DownloadDataButton";

const styles = (theme) => ({
  title: {
    ...titleTypography,
    fontSize: theme.typography.pxToRem(38),
    maxWidth: "14em",
    marginTop: 0,
    "& span": {
      color: theme.palette.secondary.main,
    },
  },
  headers: {
    maxWidth: "26.25rem",
  },
  body: {
    margin: theme.spacing(1, 0),
  },
  notes: {
    listStyle: "none",
  },
});

const ReleasesTable = ({ classes, data, lang, ...props }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: lang.table.jurisdiction,
        accessor: "jurisdiction",
        Cell: (prop) => prop.value,
        style: { width: "12%" },
      },
      {
        Header: lang.table.facility,
        accessor: "facility",
        Cell: (prop) => prop.value,
        style: { width: "11%" },
      },
      {
        Header: lang.table.authority,
        accessor: "authority",
        Cell: (prop) => prop.value,
        style: { width: "10%" },
      },
      {
        Header: lang.table.date,
        accessor: "date",
        Cell: (prop) => prop.value,
        style: {
          textAlign: "right",
          width: "10%",
        },
      },
      {
        Header: lang.table.releases,
        accessor: "releases",
        Cell: (prop) => prop.value,
        style: {
          textAlign: "right",
          minWidth: "8rem",
          maxWidth: "8rem",
        },
      },
      {
        Header: lang.table.population,
        accessor: "population",
        Cell: (prop) => prop.value,
        style: {
          textAlign: "right",
          width: "13%",
        },
      },
      {
        Header: lang.table.capacity,
        accessor: "capacity",
        Cell: (prop) => prop.value,
        style: {
          textAlign: "right",
          width: "13%",
        },
      },
      {
        Header: lang.table.details,
        accessor: "details",
        Cell: (prop) => prop.value,
        style: {
          width: "14%",
          minWidth: "7.8rem",
        },
      },
      {
        Header: lang.table.source,
        accessor: "source",
        Cell: ({ value }) => {
          if (!value) return " ";
          // const trunc = value.length < 35 ? value : value.slice(0, 31) + "..."
          return (
            <a title={value} href={value} target="__blank">
              <LinkIcon />
            </a>
          );
        },
        style: {
          minWidth: "4rem",
          maxWidth: "4rem",
        },
      },
    ],
    [
      lang.table.authority,
      lang.table.capacity,
      lang.table.date,
      lang.table.details,
      lang.table.facility,
      lang.table.jurisdiction,
      lang.table.population,
      lang.table.releases,
      lang.table.source,
    ]
  );

  const { detailTypeMap } = lang.table;
  const getReleaseData = (releaseEdges) => {
    return releaseEdges.map((ed) => {
      const { node } = ed;
      const details = [];
      Object.keys(detailTypeMap).forEach((detailKey) => {
        if (node[detailKey]) {
          const detailText = detailTypeMap[detailKey];
          details.push(detailText);
        }
      });
      node.details = details.join(", ");

      return node;
    });
  };
  const jailReleaseData = getReleaseData(data.allJailReleases.edges);
  const prisonReleaseData = getReleaseData(data.allPrisonReleases.edges);
  const extractedData = [...jailReleaseData, ...prisonReleaseData];
  return (
    <StepWrapper>
      <div className={classes.headers}>
        <Typography variant="h3">{lang.title}</Typography>
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: lang.body }}
          className={classes.body}
        />
      </div>
      <DefaultTable
        columns={columns}
        initialSortCol={"jurisdiction"}
        data={extractedData}
        rowModal
        {...props}
      ></DefaultTable>
      <NotesModal disableNumbering notes={lang.notes} />
      {lang.data_link && lang.data_link.length > 0 && (
        <DownloadDataButton dataLink={lang.data_link} />
      )}
    </StepWrapper>
  );
};

ReleasesTable.propTypes = {};

export default withStyles(styles)(ReleasesTable);
