import CoachesCalendar from '@calendar/student/CoachesCalendar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {momentLocalizer} from 'react-big-calendar';
import {useParams} from 'react-router-dom';

export default function Student() {
  const localizer = momentLocalizer(moment);
  const {studentId} = useParams();
  const [state, setState] = useState<{
    student: Record<string, string>;
    slots: Record<string, string>[];
  }>();

  useEffect(() => {
    async function fetchStudent() {
      const promise1 = await axios.get(`http://localhost:3005/api/students/${studentId}`);
      const promise2 = await axios.get(`http://localhost:3005/api/students/${studentId}/slots`);
      const [result1, result2] = await Promise.all([promise1, promise2]);

      setState({student: result1.data, slots: result2.data});
    }

    fetchStudent();
  }, [studentId]);

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        {state?.student.firstName} {state?.student.lastName}
      </Typography>
      <CoachesCalendar localizer={localizer} />
    </Container>
  );
}
