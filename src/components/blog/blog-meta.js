import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "gatsby";
import slugify from "slugify";
import moment from "moment";

const BlogMeta = ({ author = [], date, ...props }) => {
  const formattedDate = moment(date).format("MMMM Do, YYYY");
  return (
    <Typography gutterBottom variant="body2" {...props}>
      {formattedDate}
      {author && author.length > 0 && " • "}
      {author &&
        author.map((a, i) => (
          <React.Fragment key={a}>
            <Link to={`/blog/authors/${slugify(a, { lower: true })}`}>{a}</Link>
            {/* {author.length === 2 && i === 0 && " and "} */}
            {author.length > 2 && i !== author.length - 1 && ", "}
            {author.length >= 2 && i === author.length - 2 && " and "}
          </React.Fragment>
        ))}
    </Typography>
  );
};

BlogMeta.propTypes = {};

export default BlogMeta;
