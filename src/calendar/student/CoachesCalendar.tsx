import Event from '@calendar/student/Event';
import axios from 'axios';
import {Fragment, useCallback, useEffect, useMemo, useState} from 'react';
import {Calendar, DateLocalizer, Views} from 'react-big-calendar';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {useParams} from 'react-router-dom';

interface Props {
  localizer: DateLocalizer;
}

interface State {
  events: any[];
  event?: Record<string, unknown>;
  count: number;
  open: boolean;
}

const initialState = {
  events: [],
  event: undefined,
  count: 0,
  open: false
};

export default function CoachesCalendar({localizer}: Props) {
  const {studentId} = useParams();
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    async function fetchCoach() {
      const result = await axios.get(`http://localhost:3005/api/students/${studentId}/slots`);

      const coachesEvents = result.data.map((slot: any) => {
        const endDatetime = new Date(slot.appointmentDate).getTime() + slot.duration;

        return {
          id: slot.id,
          title: `Coach ${slot.coach.lastName} 1-on-1`,
          start: new Date(slot.appointmentDate),
          end: new Date(endDatetime),
          coach: slot.coach,
          student: slot.student
        };
      });

      setState((prev) => ({...prev, events: coachesEvents}));
    }

    fetchCoach();
  }, [studentId, state.count]);

  const handleSelectEvent = useCallback((event: Record<string, unknown>) => {
    console.info(event);
    setState((prev) => ({...prev, open: true, event}));
  }, []);

  const {defaultDate, scrollToTime} = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date()
    }),
    []
  );

  return (
    <Fragment>
      <div className="height600">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.WORK_WEEK}
          events={state.events}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          scrollToTime={scrollToTime}
          views={['day', 'work_week']}
        />
      </div>
      <Event
        setState={setState}
        open={state.open}
        count={state.count}
        event={state.event}
        studentId={studentId}
      />
    </Fragment>
  );
}
