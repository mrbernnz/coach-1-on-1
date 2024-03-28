import {Outlet} from 'react-router-dom';

export const initialState = {
  coaches: []
};

export default function Coaches() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
