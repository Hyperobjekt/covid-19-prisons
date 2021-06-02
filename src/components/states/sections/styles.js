export const summaryStyles = (theme) => ({
  root: {},
  notes: {
    padding: theme.spacing(2, 0, 0, 1),
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.text.secondary,
    "& .MuiTypography-root": {
      fontSize: theme.typography.pxToRem(12),
    },
    "& li + li": {
      marginTop: theme.spacing(1),
    },
  },
})

export const statsStyles = (theme) => ({
  container: {
    maxWidth: "22rem",
  },
})
