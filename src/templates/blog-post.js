import React from "react";
import { graphql } from "gatsby";
import { getMdxProps } from "gatsby-theme-hypercore/src/templates/page";
import { getImage } from "gatsby-plugin-image";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "gatsby-theme-hypersite/src/layout";
import { Block } from "@hyperobjekt/material-ui-website";
import { GatsbyImage } from "gatsby-plugin-image";
import { Box, makeStyles, withStyles } from "@material-ui/core";
import {
  CONTENT_MAXWIDTH_LG,
  CONTENT_MAXWIDTH_XL,
  sansSerifyTypography,
  serifTypography,
  subtitleTypography,
} from "../gatsby-theme-hypercore/theme";
import { BlogHero, BlogSocialLinks, BlogLinkedPost } from "../components/blog";

const maxContentWidth = "37.5rem";

const LinkedBlock = withStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      paddingBottom: 0,
    },
  },
  container: {
    background: theme.palette.background.alt3,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginRight: 0, // shift container so it is pushed to the right side of the page
    // extend container widths at different resolutions, so left margin aligns with content
    [theme.breakpoints.up("sm")]: {
      maxWidth: `calc((100% - 6rem) + ((100vw - (100% - 6rem)) / 2))`,
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: `calc((${CONTENT_MAXWIDTH_LG}px - 6rem) + ((100vw - (${CONTENT_MAXWIDTH_LG}px - 6rem)) / 2))`,
    },
    [theme.breakpoints.up("xl")]: {
      maxWidth: `calc((${CONTENT_MAXWIDTH_XL}px - 6rem) + ((100vw - (${CONTENT_MAXWIDTH_XL}px - 6rem)) / 2))`,
    },
  },
}))(Block);

const useStyles = makeStyles((theme) => ({
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
  postContent: {
    position: "relative",
    wordWrap: "break-word",
    margin: "auto",
    maxWidth: maxContentWidth,
    // dividers within blog post
    "& > hr": {
      margin: theme.spacing(3, 0),
    },
    // headings within the blog post
    "& > h1, & > h2, & > h3, & > h4, & > h5, & > h6": {
      marginTop: "1em",
    },
    // default paragraph styles
    "& > p": {
      marginBottom: "1rem",
    },
    "& .MuiTypography-paragraph": {
      [theme.breakpoints.between("sm", "md")]: {
        fontSize: theme.typography.pxToRem(20),
        lineHeight: 1.6,
      },
    },
    // image and figure margins
    "& > p > .gatsby-resp-image-wrapper, & > figure": {
      [theme.breakpoints.up("md")]: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(-4),
        marginRight: theme.spacing(-4),
      },
      [theme.breakpoints.up("lg")]: {
        marginBottom: theme.spacing(6),
        marginTop: theme.spacing(6),
        marginLeft: theme.spacing(-6),
        marginRight: theme.spacing(-6),
      },
    },
    // image captions
    "& figcaption": {
      margin: "auto",
      marginTop: theme.spacing(2),
      color: theme.palette.text.secondary,
      textAlign: "center",
      maxWidth: "34em",
    },
    // SCORECARD TABLE STYLES
    "& .scorecard-table": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      marginLeft: theme.columnSpacing(-1),
      marginRight: theme.columnSpacing(-1),
      width: `calc(100% + ${theme.columnSpacing(2)})`,
      maxWidth: "100vw",
      position: "relative",
      [theme.breakpoints.down("xs")]: {
        overflow: "auto",
      },
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.columnSpacing(-0.5),
        marginRight: theme.columnSpacing(-0.5),
        width: `calc(100% + ${theme.columnSpacing(1)})`,
      },
      // links
      "& .MuiLink-root": {
        fontWeight: 700,
        color: theme.palette.secondary.main,
      },
      // table body text
      "& .MuiTypography-body1": {
        ...sansSerifyTypography,
        fontSize: theme.typography.pxToRem(14),
      },
      "& .MuiTable-root": {
        position: "relative",
      },
    },

    "& .MuiTableCell-head:nth-child(5), & .MuiTableCell-body:nth-child(2)": {
      minWidth: 100,
    },
    "& .MuiTableCell-head": {
      background: "#fff",
      fontWeight: 700,
      lineHeight: 1.333,
      verticalAlign: "bottom",
      textAlign: "center",
      zIndex: 999,
      borderBottom: `none`,
      boxShadow: `0 2px 0 ${theme.palette.text.primary}`,
      [theme.breakpoints.up("sm")]: {
        position: "sticky",
        top: 56,
      },
    },
    "& .MuiTableCell-head:first-child": {
      textAlign: "left",
    },
    "& .MuiTableCell-head span": {
      display: "block",
      fontWeight: 500,
      color: theme.palette.text.secondary,
    },
    "& .MuiTableCell-body": {
      textAlign: "center",
    },
    "& .MuiTableCell-body:first-child": {
      textAlign: "left",
    },
    // letter grade
    "& .MuiTableCell-body:nth-child(2) span:first-child": {
      fontWeight: 700,
      marginRight: 4,
      fontSize: theme.typography.pxToRem(16),
    },
    "& .MuiTableCell-body span + span": {
      display: "block",
      margin: "auto",
      fontWeight: 500,
      color: theme.palette.text.secondary,
    },
    "& .MuiTableRow-root:nth-child(2) .MuiTableCell-body": {
      borderBottom: `1px solid ${theme.palette.text.primary}`,
    },

    // END SCORECARD TABLE STYLES
    "& .continuousColumn": {
      [theme.breakpoints.up("sm")]: {
        columnCount: 2,
        columnGap: theme.spacing(3),
      },

      "& p": {
        [theme.breakpoints.only("sm")]: {
          fontSize: theme.typography.pxToRem(16),
        },
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
}));

const BlogPostTemplate = (props) => {
  const { mdx, allMdx } = props.data;
  const { author, date, image, title } = mdx.frontmatter;
  const featuredImage = image && getImage(image);
  const classes = useStyles();
  const postNode = allMdx.edges.find((edge) => edge.node.id === mdx.id);
  const { body, ...mdxProps } = getMdxProps(props);
  return (
    <Layout {...mdxProps} {...props}>
      <BlogHero {...{ author, date, title }} />
      <Block
        bgcolor="background.paper"
        ContainerProps={{ style: { position: "relative" } }}
      >
        <BlogSocialLinks title={title} />
        <Box className={classes.postContent}>
          {featuredImage && (
            <GatsbyImage
              className={classes.featuredImage}
              image={featuredImage}
            />
          )}
          <MDXRenderer>{body}</MDXRenderer>
        </Box>
      </Block>
      <LinkedBlock bgcolor="background.paper">
        <BlogLinkedPost {...postNode} />
      </LinkedBlock>
    </Layout>
  );
};
export default BlogPostTemplate;

export const query = graphql`
  query ($pathSlug: String!) {
    # get post itself (could instead pull this data off allMdx node by path === $pathSlug)
    mdx(frontmatter: { path: { eq: $pathSlug } }) {
      id
      frontmatter {
        meta {
          title
          description
          keywords
          image {
            childImageSharp {
              gatsbyImageData(
                transformOptions: { fit: COVER, cropFocus: CENTER }
                width: 1200
                height: 630
              )
            }
          }
          isBlogPost
        }
        author
        date
        title
        image {
          childImageSharp {
            gatsbyImageData(
              transformOptions: { fit: CONTAIN, cropFocus: CENTER }
              width: 1200
            )
          }
        }
        path
      }
      body
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
`;
