//React imports
import React from "react";
//Material UI imports
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";

export const DetailsDialog = props => {
  const content = props.selected;
  return (
    <Dialog fullWidth={true} open={props.open} onClose={props.handleClose}>
      <DialogTitle id="form-dialog-title">Truck Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {Object.keys(content).map((key, i) => (
            <p key={i}>
              <span>
                {key.toUpperCase()} : {content[key]}{" "}
              </span>
            </p>
          ))}
        </DialogContentText>
        <Button onClick={props.handleClose} color="primary">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};
