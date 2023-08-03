import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.js';
import RequireUser from './components/RequireUser.js';
import RequireAdmin from './components/RequireAdmin.js';
import GalleryContainer from './components/GalleryContainer';
import MainContent from './components/MainContent';
import Register from './components/Register';
import Login from './components/Login';
import Success from './components/Success';
import CoachDashboard from './components/CoachDashboard.js';
import NewUser from './components/NewUser.js';
import Coaches from './components/Coaches.js';
import Players from './components/Players.js';
import PlayerList from './components/PlayerList.js';
import Update from './components/Update.js';
import NoMatch from './components/NoMatch.js';
import Upload from './components/upload.js';
import WelcomeCoach from "./components/WelcomeCoach.js";
import Unauthorized from './components/Unauthorized.js';
import React from "react";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<MainContent />} />
          <Route path="gallery" element={<GalleryContainer />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="success" element={<Success />} />
          {/* protected routes */}
          <Route element={<RequireUser />}>
            <Route path="coach" element={<CoachDashboard />}>
              <Route index element={<WelcomeCoach />} />
              <Route path="players" element={<Players />} />
              <Route path="unauthorized" element={<Unauthorized />} />
              {/* protected admin routes */}
              <Route element={<RequireAdmin />}>
                <Route path="coaches" element={<Coaches />} />
                <Route path="newuser" element={<NewUser />} />
                <Route path="find" element={<PlayerList />}>
                    <Route path="update" element={<Update />} />
                </Route>
                <Route path="upload" element={<Upload />} />
              </Route>
            </Route>
          </Route>
          
          {/* catch all */} 
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}


export default App;