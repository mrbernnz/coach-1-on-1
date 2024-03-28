import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link as RouteLink} from 'react-router-dom';
import {initialState} from './Students';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function StudentList() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    async function fetchCoaches() {
      const result = await axios.get('http://localhost:3005/api/students');
      setState((previousState) => ({...previousState, students: result.data}));
    }

    fetchCoaches();
  }, []);
  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        Students
      </Typography>
      <List>
        {state.students.map((student: Record<string, string>) => {
          const studentId = student.id.toString();

          return (
            <ListItem key={studentId}>
              <Link component={RouteLink} to={`/students/${studentId}`}>
                {student.firstName} {student.lastName}
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
