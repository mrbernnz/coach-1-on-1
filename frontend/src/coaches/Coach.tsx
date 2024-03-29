import SchedulerCal from '@calendar/coach/CoachCalendarSchedule';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {momentLocalizer} from 'react-big-calendar';
import {useParams} from 'react-router-dom';

const initialState = {
  coach: {}
};

export default function Coach() {
  const localizer = momentLocalizer(moment);
  const {coachId} = useParams();
  const [state, setState] = useState<{
    coach: Record<string, string>;
  }>(initialState);

  useEffect(() => {
    async function fetchCoach() {
      const result = await axios.get(`http://localhost:3005/api/coaches/${coachId}`);

      setState({coach: result.data});
    }

    fetchCoach();
  }, [coachId]);

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Coach {state.coach.lastName}
      </Typography>
      <Box sx={{maxWidth: '60vw'}}>
        <SchedulerCal localizer={localizer} />
      </Box>
    </Container>
  );
}
