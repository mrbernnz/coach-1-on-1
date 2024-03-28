import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import React from 'react';

export default function EditEvent(props: any) {
  const handleClose = () => {
    props.setState((prev: any) => ({...prev, open: false, count: props.count + 1}));
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          console.info(props.studentId, props.event.id);
          await axios.patch(
            `http://localhost:3005/api/students/${props.studentId}/slots/${props.event.id}`
          );

          handleClose();
        }
      }}
    >
      <DialogTitle>Coaching Call</DialogTitle>
      {props.event?.student ? (
        <>
          <DialogContent>
            <DialogContentText>
              Coach Phone Number: {props.event?.coach?.phoneNumber}
            </DialogContentText>
            <DialogContentText>
              Student Phone Number: {props.event?.student?.phoneNumber}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogContent>
            <DialogContentText>
              Book Time with Coach {props.event?.coach?.lastName}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button type="submit">Book</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
