import React from "react"
import { makeStyles } from "@material-ui/core"
import { Link } from "gatsby-theme-material-ui"
import useBlogPostsData from "./useBlogPostsData"
import AccountCircle from "@material-ui/icons/AccountCircle"
import {
  serifTypography,
  subtitleTypography,
  compactTitleTypography,
} from "../../gatsby-theme-hyperobjekt-core/theme"
import moment from "moment"
import { Layout } from "gatsby-theme-hyperobjekt-core"

const useStyles = makeStyles((theme) => ({
  layout: {
    "& .content": {
      maxWidth: "unset !important",
      padding: "unset !important",
      // maxWidth: theme.columnSpacing(7),
      // paddingLeft: theme.columnSpacing(2),
    },
    background: theme.palette.background.paper,
  },
  recentSection: {
    paddingTop: theme.spacing(13),
    paddingLeft: theme.columnSpacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.columnSpacing(2),
    },
    "& $post": {
      marginBottom: theme.spacing(9),
      paddingBottom: theme.spacing(9),

      "&:not(:last-child) $readLinkWrapper": {
        display: "inline",
        borderBottom: "2px dotted #92926C",
        paddingRight: theme.spacing(10),
        paddingBottom: theme.spacing(9),
      },
    },
    // "& $title": {
    //   maxWidth: theme.columnSpacing(6),
    // },
  },
  featuredSection: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(9),
    background: theme.palette.background.alt3,
    paddingLeft: theme.columnSpacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.columnSpacing(2),
      marginLeft: theme.columnSpacing(1),
    },

    // position: "relative",
    // if we want break-out background, need to set page overflow: hidden
    // "&::before": {
    //   height: "100%",
    //   content: "''",
    //   display: "block",
    //   background: "yellow",
    //   position: "absolute",
    //   zIndex: "-1",
    //   top: "0",
    //   left: "calc((-100vw + 100%)/2)", // or -8.5vw
    //   right: "calc((-100vw + 100%)/2)",
    //   // width: "100vw",
    // },
    "& $post": {},
    "& $title": {
      ...compactTitleTypography,
      color: theme.palette.text.secondary,
      fontSize: theme.typography.pxToRem(62),
      lineHeight: 1.1,
    },
    "& $authorImage": {
      // fontSize: theme.typography.pxToRem(70),
      // marginTop: 0,
    },
  },
  title: {
    ...serifTypography,
    color: theme.palette.text.primary,
    fontSize: theme.typography.pxToRem(40),
    fontWeight: 400,
    lineHeight: 1.2,
    margin: 0,
    maxWidth: theme.columnSpacing(10),
    [theme.breakpoints.up("sm")]: {
      maxWidth: theme.columnSpacing(8),
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: theme.columnSpacing(6),
    },
  },
  authorImage: {
    display: "none", // deactivate for now
    position: "relative",
    left: "-100%",
    fontSize: theme.typography.pxToRem(40),
    marginRight: theme.spacing(2),
    // marginTop: theme.spacing(1),
    color: "#B7B7A5",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  sectionTitle: {
    ...subtitleTypography,
    color: theme.palette.secondary.main,
    fontSize: theme.typography.pxToRem(18),
    letterSpacing: "calc(18px / 25)",
    margin: theme.spacing(0, 0, 4),
  },
  post: {},
  featured: {},
  date: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(14),
    lineHeight: 1,
    marginTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
    margin: 0,
  },
  titleWrapper: {
    position: "relative",
  },
  description: {
    ...serifTypography,
    color: theme.palette.text.primary,
    fontSize: theme.typography.pxToRem(13),
    lineHeight: 1.5,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    maxWidth: theme.columnSpacing(9),
    [theme.breakpoints.up("sm")]: {
      maxWidth: theme.columnSpacing(7),
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: theme.columnSpacing(5),
    },
    // marginRight: theme.columnSpacing(2),
  },
  authorImageWrapper: {
    position: "absolute",
    top: 0,
    display: "none", // deactivate for now
  },
  readLink: {
    "&:not(:hover)": {
      color: `${theme.palette.text.primary} !important`,
    },
    textDecoration: "none !important",
    paddingBottom: theme.spacing(1),
    borderBottom: "solid 1px",
    borderBottomColor: theme.palette.secondary.main,
  },
  readLinkWrapper: {}, // needed for nested $readLinkWrapper above
}))

const BlogPost = ({ post, isFeatured }) => {
  const { date, title, description, path } = post.frontmatter
  const classes = useStyles()

  const formattedDate = moment(date).format("MMMM Do, YYYY")
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
  )
}

const BlogIndex = () => {
  const { featuredPost, posts } = useBlogPostsData()
  const classes = useStyles()
  return (
    <Layout className={classes.layout}>
      <div className={classes.featuredSection}>
        <h2 className={classes.sectionTitle}>featured post</h2>
        <BlogPost post={featuredPost} isFeatured={true} />
      </div>

      <div className={classes.recentSection}>
        <h2 className={classes.sectionTitle}>recent posts</h2>
        {posts.map((p, idx) => (
          <BlogPost post={p} key={p.frontmatter.path} />
        ))}
      </div>
    </Layout>
  )
}

// TODO: figure out mdx import confusion
export default BlogIndex
export { BlogIndex }
