import React from "react";
import { makeStyles } from "@material-ui/core";
import { Link } from "gatsby-theme-material-ui";
import AccountCircle from "@material-ui/icons/AccountCircle";
import moment from "moment";

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     "@global": {},
//   })
// );

const BlogPost = ({ post, isFeatured }) => {
  const { date, title, description, path } = post.frontmatter;
  const classes = {};
  const formattedDate = moment(date).format("MMMM Do, YYYY");
  return (
    <div className={classes.post}>
      {!isFeatured && <p className={classes.date}>{formattedDate}</p>}
      <div className={classes.titleWrapper}>
        <h3 className={classes.title}>{title}</h3>
        <p className={classes.description}>{description}</p>
        <div className={classes.authorImageWrapper}>
          <AccountCircle className={classes.authorImage} />
        </div>
      </div>

      <div className={classes.readLinkWrapper}>
        <Link className={classes.readLink} to={"/" + path}>
          Read more
        </Link>
      </div>
    </div>
  );
};

export default BlogPost;
