import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomeScreen from './Screens/HomeScreen';
import FacultyHome from './Screens/FacultyHome';
import StudentHome from './Screens/StudentHome';
import FacultySignup from './Screens/FacultySignup';
import StudentSignup from './Screens/StudentSignup';
import StudentLogin from './Screens/StudentLogin';
import FacultyLogin from './Screens/FacultyLogin';
import Contact from './Screens/Contact';
import AdminLogin from './Screens/AdminLogin';
import MarkAttendance from './Screens/MarkAttendance';
import AdminHome from './Screens/AdminHome';
import AddSubject from './Screens/AddSubject';
import TakeAttendance from './Screens/TakeAttendance';
import DisplayScreen from './Screens/DisplayScreen';
import SelectStudents from './Screens/SelectStudents';
import AviewAttendance from './Screens/AviewAttendance';
import FviewStudent from './Screens/FviewStudent';
import ViewAttendance from './Screens/ViewAttendance';
import SselectAttendance from './Screens/SselectAttendance';
import SProfile from './Screens/SProfile';
import FViewAttendance from './Screens/FViewAttendance';
import FViewAttendance1 from './Screens/FViewAttendance1';
import StaffDeatails from './Screens/StaffDeatails';
import SubjectDetails from './Screens/SubjectDetails';
import SAttendanceAverage from './Screens/SAttendanceAverage';
import AttendanceWoId from './Screens/AttendanceWoId';
import AttendanceWoId1 from './Screens/AttendanceWoId1';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Routes>
            <Route path='/studentsignup' element={<StudentSignup />} />
            <Route path='/studentlogin' element={<StudentLogin />} />
            <Route path='/studenthome' element={<StudentHome />} />
            <Route path='/sprofile' element={<SProfile />} />
            <Route path='/fviewstudent' element={<FviewStudent />} />
            <Route path='/fsignup' element={<FacultySignup />} />
            <Route path='/flogin' element={<FacultyLogin />} />
            <Route path='/facultyhome' element={<FacultyHome />} />
            <Route path='/fviewattendance' element={<FViewAttendance />} />
            <Route path='/fviewattendance1' element={<FViewAttendance1 />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/adminlogin' element={<AdminLogin />} />
            <Route path='/adminhome' element={<AdminHome />} />
            <Route path='/attendance' element={<MarkAttendance />} />
            <Route path='/takeattendance' element={<TakeAttendance />} />
            <Route path='/addsubject' element={<AddSubject />} />
            <Route path='/displayall' element={<DisplayScreen />} />
            <Route path='/staffdetails' element={<StaffDeatails />} />
            <Route path='/subjectdetails' element={<SubjectDetails />} />
            <Route path='/selectstudent' element={<SelectStudents />} />
            <Route path='/aviewattendance' element={<AviewAttendance />} />
            <Route path='/viewattendance' element={<ViewAttendance />} />
            <Route path='/sattendance' element={<SselectAttendance />} />
            <Route path='/sattendanceavg' element={<SAttendanceAverage />} />
            <Route path='/awoid' element={<AttendanceWoId />} />
            <Route path='/awoid1' element={<AttendanceWoId1 />} />
            <Route path='/' element={<HomeScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>

  );
}

export default App;
