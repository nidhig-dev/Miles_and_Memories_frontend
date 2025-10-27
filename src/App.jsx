import './App.css'
import { Routes, Route } from 'react-router-dom';

//import pages
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Missing from "./pages/Missing.jsx";
import StoryDetail from './pages/Story/StoryDetail.jsx';
import AddStory from './pages/Story/AddStory.jsx';

//import components
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";


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
