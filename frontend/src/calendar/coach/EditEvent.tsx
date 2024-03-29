import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import React from 'react';

const ratings = [
  {
    value: 1,
    label: '1'
  },
  {
    value: 2,
    label: '2'
  },
  {
    value: 3,
    label: '3'
  },
  {
    value: 4,
    label: '4'
  },
  {
    value: 5,
    label: '5'
  }
];

export default function EditEvent(props: any) {
  const handleClose = () => {
    props.setState((prev: any) => ({...prev, count: props.count + 1}));
    props.setEditOpen(false);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const rating = formJson.rating;
          const notes = formJson.notes;

          await axios.patch(
            `http://localhost:3005/api/coaches/${props.coachId}/slots/${props.slotId}`,
            {rating, notes}
          );

          handleClose();
        }
      }}
    >
      <DialogTitle>Edit Coaching Call</DialogTitle>
      <DialogContent>
        <DialogContentText>Add rating and notes from coaching call.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          select
          name="rating"
          label="Student Rating"
          helperText="Please select rating"
          type="text"
          fullWidth
          variant="standard"
        >
          {ratings.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="notes"
          label="Notes"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
