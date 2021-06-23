import { Box, withStyles } from "@material-ui/core";

/** base content page block wrapper */
const Content = withStyles((theme) => ({
  root: {
    "& .MuiTypography-root": {
      marginBottom: `1rem`,
      "& + .MuiList-root": {
        marginTop: 0,
      },
    },
    "& .MuiList-root .MuiTypography-root": {
      marginBottom: `0.5rem`,
    },
    "& h1,h2,h3,h4,h5,h6": {
      marginTop: `1.5em`,
    },
    "& a": {
      color: theme.palette.secondary.main,
      fontWeight: "bold",
    },
  },
}))(Box);

export default Content;
