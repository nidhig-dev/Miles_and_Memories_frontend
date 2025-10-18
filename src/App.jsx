import './App.css'
import { Routes, Route } from 'react-router-dom';

//import pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Missing from "./pages/Missing";
import StoryDetail from './pages/Story/StoryDetail';
import AddStory from './pages/Story/AddStory';

//import components
import ProtectedRoutes from "./components/ProtectedRoutes";


function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/storydetail/:id" element={<StoryDetail />} />
          <Route path="/addstory" element={<AddStory />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </>
  )
}

export default App
