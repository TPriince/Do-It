import { Routes, Route } from 'react-router-dom';
import Signup from '../pages/signup/Signup';
import Login from '../pages/login/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import Boards from './boards/Boards';
import Container from './container/Container';
import PageNotFound from '../pages/page-not-found/PageNotFound';
import ForgotPassword from '../pages/forgot-password/ForgotPassword';

export default function Router() {
  return (
    <>
        <Routes>
            <Route path='/' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />}>
              <Route index element={<Boards />} />
              <Route path="boards" element={<Boards />} />
              <Route path="tasks" element={<Container />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </>
  )
}
