import axios from 'axios';
import {Fragment, useCallback, useEffect, useMemo, useState} from 'react';
import {Calendar, DateLocalizer, Views} from 'react-big-calendar';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {useParams} from 'react-router-dom';
import Event from './Event';

interface Props {
  localizer: DateLocalizer;
}

interface State {
  events: {title: string; start: Date; end: Date}[];
  // event?: {title: string; start: Date; end: Date};
  event?: Record<string, unknown>;
  count: number;
  open: boolean;
}

const initialState = {
  events: [],
  count: 0,
  open: false,
  event: undefined
};

export default function SchedulerCal({localizer}: Props) {
  const {coachId} = useParams();
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    async function fetchCoach() {
      const result = await axios.get(`http://localhost:3005/api/coaches/${coachId}/slots`);

      const events = result.data.map((slot: Record<string, string>) => {
        const endDatetime = new Date(slot.appointmentDate).getTime() + slot.duration;

        return {
          id: slot.id,
          coachId: slot.coachId,
          title: 'Coach 1-on-1',
          start: new Date(slot.appointmentDate),
          end: new Date(endDatetime),
          rating: slot.rating,
          notes: slot.notes,
          coach: slot.coach,
          student: slot.student
        };
      });

      setState((prev) => ({...prev, events}));
    }

    fetchCoach();
  }, [coachId, state.count]);

  const handleSelectSlot = useCallback(
    async ({start}: any) => {
      window.alert('Slot created');
      await axios.post(`http://localhost:3005/api/coaches/${coachId}/slots`, [
        {
          appointmentDate: start.toISOString()
        }
      ]);
      setState((prev) => ({...prev, count: state.count + 1}));
    },
    [coachId, state.count]
  );

  const handleSelectEvent = useCallback((event: Record<string, unknown>) => {
    setState((prev) => ({...prev, open: true, event: event}));
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
          dayLayoutAlgorithm={'no-overlap'}
          defaultDate={defaultDate}
          defaultView={Views.WORK_WEEK}
          events={state.events}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          scrollToTime={scrollToTime}
          views={['day', 'work_week']}
        />
      </div>
      <Event setState={setState} open={state.open} event={state.event} count={state.count} />
    </Fragment>
  );
}
