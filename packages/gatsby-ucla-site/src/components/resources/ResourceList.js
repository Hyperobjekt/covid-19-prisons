import React from "react"
import useResourcesData from "./useResourcesData"
import {
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core"

const ResourceTitle = ({ resource, ...props }) => {
  return resource.links.length === 1 ? (
    <Link target="_blank" href={resource.links[0]}>
      {resource.organization}
    </Link>
  ) : (
    resource.organization
  )
}

const ResourceDescription = ({ resource, ...props }) => {
  const hasManyLinks = resource.links.length > 1
  return hasManyLinks ? (
    <>
      {resource.description}
      <br />
      <strong>Links:</strong>
      <ul>
        {resource.links.map((link) => (
          <li key={link}>
            <Link target="_blank" href={link}>
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </>
  ) : (
    resource.description
  )
}

const ResourceList = (props) => {
  const data = useResourcesData()
  const resources = data.map((category) => (
    <>
      <Typography variant="h3">{category.fieldValue}</Typography>
      <List>
        {category.nodes.map((resource) => (
          <ListItem>
            <ListItemText
              primary={<ResourceTitle resource={resource} />}
              secondary={<ResourceDescription resource={resource} />}
            />
          </ListItem>
        ))}
      </List>
    </>
  ))

  // NOTE - just a stopgap until there is a Reports page
  const reportsData = [
    {
      organization: "COVID-19 Cases and Deaths in Federal and State Prisons",
      description: "JAMA Network Report",
      links: ["https://jamanetwork.com/journals/jama/fullarticle/2768249"],
    },
  ]

  const reports = (
    <>
      <Typography variant="h2">Reports</Typography>
      <List>
        {reportsData.map((resource) => (
          <ListItem>
            <ListItemText
              primary={<ResourceTitle resource={resource} />}
              secondary={<ResourceDescription resource={resource} />}
            />
          </ListItem>
        ))}
      </List>
    </>
  )

  return (
    <>
      {resources}
      {reports}
    </>
  )
}

ResourceList.propTypes = {}

export default ResourceList
