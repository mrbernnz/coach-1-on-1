import Coach from '@coaches/Coach';
import CoachList from '@coaches/CoachList';
import Coaches from '@coaches/Coaches';
import Student from '@students/Student';
import StudentList from '@students/StudentList';
import Students from '@students/Students';
import {Navigate, Route, Routes} from 'react-router-dom';

export default function RoutedComponents() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="coaches" replace={true} />}></Route>
      <Route path="coaches" element={<Coaches />}>
        <Route index element={<CoachList />} />
        <Route path=":coachId" element={<Coach />} />
      </Route>
      <Route path="students" element={<Students />}>
        <Route index element={<StudentList />} />
        <Route path=":studentId" element={<Student />} />
      </Route>
    </Routes>
  );
}
