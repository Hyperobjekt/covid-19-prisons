import React from "react"
import { DefaultTable } from "../../table"
import { Typography, withStyles } from "@material-ui/core"
import { titleTypography } from "../../../gatsby-theme-hyperobjekt-core/theme"
import LinkIcon from "@material-ui/icons/Link"
import Notes from "../../Notes"
import StepWrapper from "../StepWrapper"
import { METRIC_FORMATTERS } from "../../../common/constants"

const styles = (theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
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
  table: {
    // margin: theme.spacing(0, -3),
    // width: `calc(100% + ${theme.spacing(6)})`,
    "& .MuiTablePagination-input, & .MuiTablePagination-spacer + .MuiTablePagination-caption": {
      // display: "none",
    },
  },
  // link: {
  //   whiteSpace: "pre",
  // },
})

const ReleasesTable = ({
  classes,
  data,
  lang,
  ...props
}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: lang.table.jurisdiction,
        accessor: "jurisdiction",
        // disableSortBy: true,
        Cell: (prop) => prop.value,
        style: {
          // minWidth: "50%",
        },
      },
      {
        Header: lang.table.facility,
        accessor: "facility",
        // disableSortBy: true,
        Cell: (prop) => prop.value,
        style: {
          textAlign: "right",
        },
      },
      {
        Header: lang.table.date,
        accessor: "date",
        // disableSortBy: true,
        Cell: (prop) => prop.value,
        style: {
          textAlign: "right",
        },
      },
      {
        Header: lang.table.authority,
        accessor: "authority",
        // disableSortBy: true,
        Cell: (prop) => prop.value,
        style: {
          textAlign: "right",
        },
      },
      {
        Header: lang.table.releases,
        accessor: "releases",
        Cell: (prop) => prop.value,
        style: {
          textAlign: "right",
        },
      },
      {
        Header: lang.table.population,
        accessor: "population",
        Cell: (prop) => prop.value,
        style: {
          textAlign: "right",
        },
      },
      {
        Header: lang.table.proportion,
        accessor: "proportion",
        Cell: ({ value }) =>
          Number.isFinite(value) ? METRIC_FORMATTERS.active_rate(value) : " ",
        style: {
          textAlign: "right",
        },
      },
      {
        Header: lang.table.capacity,
        accessor: "capacity",
        Cell: (prop) => prop.value,
        style: {
          textAlign: "right",
        },
      },
      {
        Header: lang.table.details,
        accessor: "details",
        // disableSortBy: true,
        Cell: (prop) => prop.value,
        style: {
          textAlign: "right",
        },
      },
      {
        Header: lang.table.source,
        accessor: "source",
        // disableSortBy: true,
        Cell: ({ value }) => {
          if (!value) return " "
          // const trunc = value.length < 35 ? value : value.slice(0, 31) + "..."
          return (
            <a
              title={value}
              className={classes.link}
              href={value}
              target="__blank"
            >
              <LinkIcon />
            </a>
          )
        },
        style: {
          textAlign: "right",
          // maxWidth: "24rem",
        },
      },
    ],
    [
      classes.link,
      lang.table.authority,
      lang.table.capacity,
      lang.table.date,
      lang.table.details,
      lang.table.facility,
      lang.table.jurisdiction,
      lang.table.population,
      lang.table.proportion,
      lang.table.releases,
      lang.table.source,
    ]
  )

  const { detailTypeMap } = lang.table
  const getReleaseData = (releaseEdges) => {
    return releaseEdges.map((ed) => {
      const { node } = ed
      const details = []
      Object.keys(detailTypeMap).forEach((detailKey) => {
        if (node[detailKey]) {
          const detailText = detailTypeMap[detailKey]
          details.push(detailText)
        }
      })
      node.details = details.join(", ")

      if (node.population && node.releases) {
        node.proportion = node.releases / node.population
      }
      return node
    })
  }
  const jailReleaseData = getReleaseData(data.allJailReleases.edges)
  const prisonReleaseData = getReleaseData(data.allPrisonReleases.edges)
  const extractedData = [...jailReleaseData, ...prisonReleaseData]
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
        className={classes.table}
        columns={columns}
        initialSortCol={"jurisdiction"}
        data={extractedData}
        {...props}
      ></DefaultTable>
      <Notes notes={[lang.notes.sourcing]}></Notes>
    </StepWrapper>
  )
}

ReleasesTable.propTypes = {}

export default withStyles(styles)(ReleasesTable)
