import React from "react";
import PropTypes from "prop-types";
import { Typography, withStyles } from "@material-ui/core";
import InfoIcon from "../common/icons/InfoIcon";
import { getLang } from "../common/utils/i18n";
import Modal from "./modal/Modal";

export const styles = (theme) => ({
  button: {
    border: "none",
    padding: theme.spacing(1),
    marginLeft: theme.spacing(-1),
    marginRight: "auto",
    marginTop: theme.spacing(2),
    fontSize: theme.typography.pxToRem(14),
  },
});

const getNumberPrefix = (num) =>
  `<sup style="position:absolute; margin-left: -1em;">${num}</sup>`;

const NotesModal = ({
  classes,
  className,
  disableNumbering,
  notes,
  ...props
}) => {
  return (
    <Modal
      classes={{ button: classes.button }}
      title={getLang("notes_dialog_title")}
      content={
        <>
          {notes.map((note, i) => (
            <Typography
              key={note}
              variant="body2"
              gutterBottom
              dangerouslySetInnerHTML={{
                __html: disableNumbering ? note : getNumberPrefix(i + 1) + note,
              }}
            />
          ))}
        </>
      }
      {...props}
    >
      <InfoIcon aria-hidden="true" style={{ marginRight: 8 }} />
      {getLang("notes_open")}
    </Modal>
  );
};

NotesModal.propTypes = {
  notes: PropTypes.array,
  className: PropTypes.string,
};

export default withStyles(styles)(NotesModal);
