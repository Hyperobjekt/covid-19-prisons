import React from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import InfoIcon from "../../content/assets/info-icon.svg"
import {
  ButtonBase,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  withStyles,
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import { sansSerifyTypography } from "../gatsby-theme-hypercore/theme"

export const styles = (theme) => ({
  iconWrapper: {
    "& img": {
      paddingRight: theme.spacing(1),
    },
  },
  dialog: {
    maxWidth: theme.typography.pxToRem(555),
  },
  title: {
    padding: theme.spacing(3, 4, 2),
    borderBottom: "1px solid #C8C8B9",
    "& *": {
      ...sansSerifyTypography,
      color: theme.palette.text.secondary,
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(18),
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1.5),
    top: theme.spacing(1.5),
    color: theme.palette.grey[500],
  },
  content: {
    padding: theme.spacing(3, 8, 3, 4),
  },
  notes: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    "& li + li": {
      marginTop: theme.spacing(1),
    },
  },
})

const NotesModal = ({
  classes,
  className,
  title = "Data Notes",
  iconText = "Open data notes",
  icon = InfoIcon,
  notes,
  ...props
}) => {
  const [modalOpen, setModalOpen] = React.useState(false)
  const openHandler = () => setModalOpen(true)
  const closeHandler = () => setModalOpen(false)

  return (
    <div className="notes-modal">
      <ButtonBase onClick={openHandler} classes={{ root: classes.iconWrapper }}>
        <img alt="info" src={icon} />
        {iconText}
      </ButtonBase>
      <Dialog
        classes={{ paper: classes.dialog }}
        open={modalOpen}
        onClose={closeHandler}
      >
        <DialogTitle classes={{ root: classes.title }}>
          {title}
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={closeHandler}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent classes={{ root: classes.content }}>
          <ol className={classes.notes}>
            {notes.map((note, i) => (
              <li key={i}>
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{ __html: note }}
                />
              </li>
            ))}
          </ol>
        </DialogContent>
      </Dialog>
    </div>
  )
}

NotesModal.propTypes = {
  notes: PropTypes.array,
  title: PropTypes.string,
  iconText: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.object,
}

export default withStyles(styles)(NotesModal)
