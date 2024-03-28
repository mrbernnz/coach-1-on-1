import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from 'react';
import EditEvent from './EditEvent';

export default function Event(props: any) {
  const [editOpen, setEditOpen] = useState(false);

  const handleClickOpen = () => {
    setEditOpen(true);
  };

  const handleClose = () => {
    props.setState((prev: any) => ({...prev, open: false}));
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>{props.event?.title}</DialogTitle>
      <DialogContent>
        {props.event?.student && (
          <>
            <DialogContentText>
              Coach Phone Number: {props.event?.coach?.phoneNumber}
            </DialogContentText>
            <DialogContentText>
              Student Phone Number: {props.event?.student?.phoneNumber}
            </DialogContentText>
          </>
        )}
        {props.event?.rating && (
          <DialogContentText> Rating: {props.event?.rating}</DialogContentText>
        )}
        {props.event?.notes && <DialogContentText>Notes {props.event?.notes}</DialogContentText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        {props.event?.student && (
          <Button type="submit" onClick={handleClickOpen}>
            Edit
          </Button>
        )}
      </DialogActions>
      <EditEvent
        open={editOpen}
        setEditOpen={setEditOpen}
        setState={props.setState}
        slotId={props.event?.id}
        coachId={props.event?.coachId}
        count={props.count}
      />
    </Dialog>
  );
}
