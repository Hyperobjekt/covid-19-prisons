import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Layout } from "gatsby-theme-hyperobjekt-core"
import moment from "moment"
import { makeStyles } from "@material-ui/core"
import {
  sansSerifyTypography,
  serifTypography,
  subtitleTypography,
  compactTitleTypography,
} from "../../gatsby-theme-hyperobjekt-core/theme"
import { Link } from "gatsby-theme-material-ui"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import LeftArrow from "../../../content/assets/left-arrow.svg"
import FbIcon from "../../../content/assets/fb-icon.svg"
import TwitterIcon from "@material-ui/icons/Twitter"
import EmailIcon from "@material-ui/icons/Email"
import IconButton from "@material-ui/core/IconButton"
// import FacebookIcon from "@material-ui/icons/Facebook"

const useStyles = makeStyles((theme) => ({
  layout: {
    "& .content": {
      maxWidth: "unset !important",
      padding: "unset !important",
    },
    "& header": {
      // background: theme.palette.background.alt3,
    },
  },
  hero: {
    background: theme.palette.background.alt3,
    marginTop: "0 !important", // otherwise color shines through
    paddingTop: theme.spacing(11),
    paddingLeft: theme.columnSpacing(1),
    paddingRight: theme.columnSpacing(1),
    [theme.breakpoints.up("md")]: {
      paddingRight: theme.columnSpacing(3),
    },
  },
  date: {
    fontSize: theme.typography.pxToRem(14),
  },
  postTitle: {
    ...compactTitleTypography,
    color: theme.palette.text.secondary,
    lineHeight: 1.05,
    margin: 0,
    paddingBottom: theme.spacing(5),
    fontSize: theme.typography.pxToRem(55),
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.pxToRem(70),
    },
    [theme.breakpoints.up("md")]: {
      fontSize: theme.typography.pxToRem(85),
    },
  },
  body: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(5),
    },
    [theme.breakpoints.up("md")]: {
      paddingBottom: theme.spacing(7),
    },
    [theme.breakpoints.up("lg")]: {
      paddingBottom: theme.spacing(10),
    },
    background: theme.palette.background.paper,
  },
  crumb: {
    ...sansSerifyTypography,
    fontSize: theme.typography.pxToRem(13),
    color: theme.palette.text.secondary + " !important",
    textDecoration: "none !important",
    "& img": {
      paddingRight: theme.spacing(1),
    },
  },
  social: {
    display: "flex",
    position: "absolute",
    top: "-10px",
    right: theme.columnSpacing(1),
    color: theme.palette.text.secondary + " !important",
    "& a": {
      color: theme.palette.text.secondary + " !important",
      fontSize: "0",
    },
    "& button": {
      background: theme.palette.background.alt2 + " !important",
      padding: "10px",
      marginRight: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        marginRight: "0",
        transform: "scale(0.8)",
      },
    },
    [theme.breakpoints.up("lg")]: {
      flexDirection: "column",
      right: "unset",
      top: theme.spacing(10),
      "& button": {
        padding: "12px",
        marginBottom: theme.spacing(1),
      },
    },
  },
  crumbWrapper: {
    display: "block",
    position: "relative",
    paddingLeft: theme.columnSpacing(1),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.up("md")]: {
      paddingBottom: theme.spacing(7),
    },
    [theme.breakpoints.up("lg")]: {
      // paddingBottom: theme.spacing(7),
    },
  },
  content: {
    paddingLeft: theme.columnSpacing(1),
    paddingRight: theme.columnSpacing(1),
    marginBottom: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.columnSpacing(2),
      paddingRight: theme.columnSpacing(2),
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.columnSpacing(3),
      paddingRight: theme.columnSpacing(3),
      marginBottom: theme.spacing(10),
    },
    "& .MuiTypography-paragraph": {
      [theme.breakpoints.between("sm", "md")]: {
        fontSize: theme.typography.pxToRem(20),
        lineHeight: 1.6,
      },
    },

    "& .gatsby-resp-image-wrapper": {
      [theme.breakpoints.up("md")]: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
      },
      [theme.breakpoints.up("lg")]: {
        marginBottom: theme.spacing(6),
        marginTop: theme.spacing(6),
      },
    },
    // image captions
    "& i": {
      textAlign: "center",
      display: "block",
      position: "relative",
      fontStyle: "normal",
      // shift them up the amount that the image is pushing them down (theme.spacing),
      // then shift down to give some distance from image
      top: `calc(-${theme.spacing(2)} + 5px)`,
      [theme.breakpoints.up("md")]: {
        top: `calc(-${theme.spacing(4)} + 10px)`,
        padding: theme.spacing(0, 1.5),
      },
      [theme.breakpoints.up("lg")]: {
        top: `calc(-${theme.spacing(6)} + 15px)`,
        padding: theme.spacing(0, 3),
      },
    },
  },
  featuredImage: {
    [theme.breakpoints.up("sm")]: {
      width: "110%",
      marginLeft: "-5%",
      marginBottom: theme.spacing(4),
    },
    [theme.breakpoints.up("md")]: {
      marginBottom: theme.spacing(6),
    },
    [theme.breakpoints.up("lg")]: {
      marginBottom: theme.spacing(8),
    },
    marginBottom: theme.spacing(2),
  },

  linkedSection: {
    background: theme.palette.background.alt3,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
    paddingLeft: theme.columnSpacing(1),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.columnSpacing(1),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
  },
  sectionTitle: {
    ...subtitleTypography,
    color: theme.palette.secondary.main,
    fontSize: theme.typography.pxToRem(28),
    letterSpacing: "calc(18px / 25)",
  },
  linkedTitle: {
    ...serifTypography,
    fontWeight: 400,
    color: theme.palette.text.primary,
    fontSize: theme.typography.pxToRem(32),
    lineHeight: 1.25,
    margin: 0,
    maxWidth: theme.columnSpacing(10),
    [theme.breakpoints.up("sm")]: {
      maxWidth: theme.columnSpacing(8),
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: theme.columnSpacing(6),
    },
  },
  description: {
    ...serifTypography,
    color: theme.palette.text.primary,
    fontSize: theme.typography.pxToRem(16),
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
}))

const Hero = ({ author, date, title, image }) => {
  const postDetails = `${author} • ${moment(date).format("MMMM Do, YYYY")}`
  const classes = useStyles()

  return (
    <div className={classes.hero}>
      <p className={classes.date}>{postDetails}</p>
      <h2 className={classes.postTitle}>{title}</h2>
    </div>
  )
}

const SocialIcons = (title, path) => {
  const classes = useStyles()
  const url = "https://uclacovidbehindbars.org/"+path

  const twitterClick = e => {
    window.open(`https://twitter.com/share?text=${title}&url=${url}`, '_blank', 'width=550,height=420').focus();
  }
  
  const facebookClick = e => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=550,height=420').focus();
  }

  return (
    <div className={classes.social}>
      <IconButton onClick={twitterClick}>
        <TwitterIcon />
      </IconButton>
      <IconButton onClick={facebookClick}>
        <img alt="share on Facebook" src={FbIcon} />
      </IconButton>
      <IconButton>
        <a target="_blank" href={`mailto:?subject=${title} - UCLA COVID Behind Bars&body=${url}`} rel="noreferrer">
        <EmailIcon />
        </a>
      </IconButton>
    </div>
  )
}

const BreadCrumb = (title, path) => {
  const classes = useStyles()

  return (
    <div className={classes.crumbWrapper}>
      <Link className={classes.crumb} to="/blog">
        <img alt="" src={LeftArrow} /> Back to blog
      </Link>
      {SocialIcons(title, path)}
    </div>
  )
}

const Linked = ({ next, previous }) => {
  const classes = useStyles()

  const post = next || previous
  if (!post) {
    return null
  }

  const { title, description, path } = post.frontmatter
  const sectionTitle = (next ? "next" : "previous") + " post"
  return (
    <div className={classes.linkedSection}>
      <div className={classes.post}>
        <h3 className={classes.sectionTitle}>{sectionTitle}</h3>
        <h4 className={classes.linkedTitle}>{title}</h4>
        <p className={classes.description}>{description}</p>

        <Link className={classes.readLink} to={"/" + path}>
          Read more
        </Link>
      </div>
    </div>
  )
}

const BlogPostTemplate = (props) => {
  const { mdx, allMdx, allFile } = props.data
  const classes = useStyles()
  const { image, path, title, socialImage, socialDescription } = mdx.frontmatter
  const featuredImage =
    image &&
    allFile.nodes.find((n) => {
      const originalName = n?.childImageSharp?.fluid?.originalName
      return originalName === image || image.endsWith("/" + originalName)
    })

  const postNode = allMdx.edges.find((edge) => edge.node.id === mdx.id)
  return (
    <Layout
      className={classes.layout}
      image={socialImage?.childImageSharp?.fixed}
      description={socialDescription}
    >
      {Hero(mdx.frontmatter)}

      <div className={classes.body}>
        {BreadCrumb(title, path)}
        <div className={classes.content}>
          {featuredImage && (
            <Img
              className={classes.featuredImage}
              fluid={featuredImage.childImageSharp.fluid}
            />
          )}
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>
        {Linked(postNode)}
      </div>
    </Layout>
  )
}
export default BlogPostTemplate
export const query = graphql`
  query($pathSlug: String!) {
    # get post itself (could instead pull this data off allMdx node by path === $pathSlug)
    mdx(frontmatter: { path: { eq: $pathSlug } }) {
      id
      frontmatter {
        author
        date
        title
        image
        path
        socialDescription
        socialImage {
          childImageSharp {
            fixed(width: 300, height: 300) {
              src
            }
          }
        }
      }
      body
    }

    # get images to display featured (TODO: just query for the one)
    allFile(
      filter: { relativeDirectory: { eq: "blog" }, extension: { ne: "mdx" } }
    ) {
      nodes {
        childImageSharp {
          fluid {
            originalName
            ...GatsbyImageSharpFluid
          }
        }
      }
    }

    # get all posts to connect the next/prev
    allMdx(
      sort: { fields: frontmatter___date, order: ASC }
      filter: { frontmatter: { isBlogPost: { eq: true } } }
    ) {
      edges {
        node {
          id
        }
        next {
          frontmatter {
            title
            description
            path
          }
        }
        previous {
          frontmatter {
            title
            description
            path
          }
        }
      }
    }
  }
`
