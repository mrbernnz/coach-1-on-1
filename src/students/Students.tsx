import {Outlet} from 'react-router-dom';

export const initialState = {
  students: []
};

export default function Coaches() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
