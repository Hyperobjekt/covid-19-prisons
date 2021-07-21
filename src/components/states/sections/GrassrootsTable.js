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
});

const GrassrootsTable = ({ classes, data, lang, ...props }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: lang.table.facility,
        accessor: "facility",
        Cell: (prop) => prop.value,
        style: {
          width: "12%",
          minWidth: "7.2rem",
        },
      },
      {
        Header: lang.table.county,
        accessor: "county",
        Cell: (prop) => prop.value,
        style: {
          width: "12%",
        },
      },
      {
        Header: lang.table.date,
        accessor: "date",
        Cell: (prop) => prop.value,
        style: {
          textAlign: "right",
          width: "12%",
          minWidth: "7.3rem",
        },
      },
      {
        Header: lang.table.organization,
        accessor: "organization",
        Cell: (prop) => prop.value,
        style: {
          width: "25%",
          minWidth: "8rem",
        },
      },
      {
        Header: lang.table.type,
        accessor: "type",
        Cell: (prop) => prop.value,
        style: {
          minWidth: "7.1rem",
          maxWidth: "7.1rem",
        },
      },
      {
        Header: lang.table.effort,
        accessor: "effort",
        Cell: (prop) => prop.value,
        style: {
          minWidth: "5rem",
          maxWidth: "5rem",
        },
      },
      {
        Header: lang.table.concerns,
        accessor: "concerns",
        Cell: (prop) => prop.value,
        style: {
          minWidth: "8rem",
          maxWidth: "8rem",
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
      lang.table.concerns,
      lang.table.county,
      lang.table.date,
      lang.table.effort,
      lang.table.facility,
      lang.table.organization,
      lang.table.source,
      lang.table.type,
    ]
  );

  const { concernTypeMap, effortMap } = lang.table;

  const getGrassrootsData = (releaseEdges) => {
    return releaseEdges.map((ed) => {
      const node = { ...ed.node };

      let effort = " ";
      const internal = node.internal_effort;
      const external = node.external_effort;
      if (internal && external) {
        effort = effortMap.coordinated_effort;
      } else if (internal) {
        effort = effortMap.internal_effort;
      } else if (external) {
        effort = effortMap.external_effort;
      }
      node.effort = effort;

      const concerns = [];
      Object.keys(concernTypeMap).forEach((concernKey) => {
        if (node[concernKey]) {
          const concernText = concernTypeMap[concernKey];
          concerns.push(concernText);
        }
      });
      node.concerns = concerns.join(", ");
      return node;
    });
  };

  const extractedData = getGrassrootsData(data.allGrassroots.edges);

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
        initialSortCol={"facility"}
        rowModal
        data={extractedData}
        {...props}
      ></DefaultTable>
      <NotesModal notes={[lang.notes.sourcing]} />
      {lang.data_link && lang.data_link.length > 0 && (
        <DownloadDataButton dataLink={lang.data_link} />
      )}
    </StepWrapper>
  );
};

GrassrootsTable.propTypes = {};

export default withStyles(styles)(GrassrootsTable);
