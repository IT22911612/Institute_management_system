import './App.css';
// import Header from './components/Header';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import AllSchedules from './pages/AllSchedules';
import AddSchedule from './pages/AddSchedule';
import ScheduleManagement from './pages/UpdateSchedule';
import UpdateClassSchedule from './pages/scheduledetails';


function App() {
  return (
    <Router>
      {/* <Header> */}
        <Routes>
          <Route path = "/add" element={<AddSchedule/>}/>
          <Route path='/allSchedules' element={<AllSchedules/>}/>
          <Route path="/details" element={<UpdateClassSchedule/>}/>
          <Route path="/update/:id" element={<ScheduleManagement/>}/>
        </Routes>
      {/* </Header> */}

    </Router>
  );
}

export default App;
