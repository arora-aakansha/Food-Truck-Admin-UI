// ConfirmationDialog.jsx
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const ConfirmationDialog = ({ isOpen, handleClose, handleConfirm, title, children }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>Cancel</Button>
        <Button onClick={() => {
          handleConfirm();
          handleClose(true);
        }} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
