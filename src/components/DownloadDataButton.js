import React from "react";
import { withStyles, Button } from "@material-ui/core";
import { getLang } from "../common/utils/i18n";
import arrowToBottom from "../common/icons/arrow-to-bottom.svg";

const styles = (theme) => ({
  root: {
    border: "none",
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    maxWidth: "190px",
    fontSize: theme.typography.pxToRem(14),
  },
  icon: {
    marginRight: 16,
    marginLeft: 4,
  },
});

const DownloadDataButton = ({ dataLink, classes, ...props }) => {
  return (
    <Button className={classes.root} href={dataLink} target="_blank" {...props}>
      <img src={arrowToBottom} alt="" className={classes.icon} />
      {getLang("download_data")}
    </Button>
  );
};

export default withStyles(styles)(DownloadDataButton);
