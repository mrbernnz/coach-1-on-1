import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link as RouteLink} from 'react-router-dom';
import {initialState} from './Coaches';

export default function CoachList() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    async function fetchCoaches() {
      const result = await axios.get('http://localhost:3005/api/coaches');
      setState((previousState) => ({...previousState, coaches: result.data}));
    }

    fetchCoaches();
  }, []);

  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        Coaches
      </Typography>
      <List>
        {state.coaches.map((coach: Record<string, string>) => {
          const coachId = coach.id.toString();

          return (
            <ListItem key={coachId}>
              <Link component={RouteLink} to={`/coaches/${coachId}`}>
                {coach.firstName} {coach.lastName}
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
