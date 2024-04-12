import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
import Users from './pages/admin/Users';
import Doctors from './pages/admin/Doctors';
import Profile from './pages/doctor/Profile';
import BookingPage from './pages/BookingPage';
import Appointments from './pages/Appointments';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import Report from './pages/doctor/ReportGraph'
import Index from './pages/Index';
import HomePage from './pages/HomePage';
import DoctorList from './components/DoctorList';
import PublicRoute from './components/PublicRoute';
import Comment from './pages/doctor/Comment';
import Home1 from './pages/Home1';
import Details from './pages/Details';

// import Dashboard from './pages/Dashboard';

function App() {
  const { loading } = useSelector(state => state.alerts);

  return (
    <BrowserRouter>
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route path="/" element={
            <PublicRoute>
              <Index />
            </PublicRoute>
          }
          />
          <Route path="/home" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
          />

          <Route path="/homedoctor" element={
            <ProtectedRoute>
              <Home1 />
            </ProtectedRoute>
          }
          />

          <Route path="/details" element={
            <ProtectedRoute>
              <Details />
            </ProtectedRoute>
          }
          />

          <Route path="/doctorlist" element={
            <ProtectedRoute>
              <DoctorList />
            </ProtectedRoute>
          }
          />
          <Route path="/apply-doctor" element={
            <ProtectedRoute>
              <ApplyDoctor />
            </ProtectedRoute>
          }
          />
          <Route path="/admin/users" element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
          />
          <Route path="/admin/doctors" element={
            <ProtectedRoute>
              <Doctors />
            </ProtectedRoute>
          }
          />
          <Route path="/doctor/profile/:id" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
          />
          <Route path="/doctor/book-appointment/:doctorId" element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
          />
          <Route path="/notification" element={
            <ProtectedRoute>
              <NotificationPage />
            </ProtectedRoute>
          }
          />
          <Route path="/appointments" element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
          />
          <Route path="/doctor-appointments" element={
            <ProtectedRoute>
              <DoctorAppointments />
            </ProtectedRoute>
          }
          />
          <Route path='/patient-report' element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          }
          />

          <Route path='/comment' element={
            <ProtectedRoute>
              <Comment />
            </ProtectedRoute>
          }
          />

          <Route
            path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>

            }
          />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>

          }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
