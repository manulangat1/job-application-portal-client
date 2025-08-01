import { Button, List, ListItem, Modal, Typography, Box } from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  onClose: any;
  message: any;
  onSuccessClick: any;
  //   onRejection: any;
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ConfirmationModal = ({
  open,
  onClose,
  message,
  onSuccessClick,
}: Props) => {
  return (
    <>
      <Modal open={open} onClose={() => onClose(!open)}>
        <Box sx={style} className="modal-container">
          {message}
          <List className="modal-buttons">
            <ListItem>
              <Button
                onClick={() => onSuccessClick()}
                className="modal-button"
                variant="contained"
                color="success"
              >
                YES
              </Button>
            </ListItem>
            <ListItem>
              <Button
                onClick={() => onClose(!open)}
                variant="contained"
                color="error"
                className="modal-button"
              >
                NO
              </Button>
            </ListItem>
          </List>
        </Box>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
