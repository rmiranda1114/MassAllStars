import { Routes, Route } from 'react-router-dom';
import React from "react";
import WelcomeCoach from './components/WelcomeCoach.js';
import NavbarLayout from './components/Navbar.js';
import RequireUser from './components/RequireUser.js';
import RequireAdmin from './components/RequireAdmin.js';
import GalleryContainer from './components/GalleryContainer';
import MainContent from './components/MainContent';
import Registration from './components/register/Registration.js'
import Login from './components/Login';
import Success from './components/Success';
import CoachDashboard from './components/CoachDashboard.js';
import NewUser from './components/NewUser.js';
import Coaches from './components/Coaches.js';
import Players from './components/players/Players.js';
import PlayerDetails from './components/players/PlayerDetails.js';
import PlayerContainer from './components/playerUpdate/PlayerContainer.js';
import PlayerUpdate from './components/playerUpdate/PlayerUpdate.js';
import Teams from './components/teamUpdate/Teams.js';
import TeamDetail from './components/teamUpdate/TeamDetail.js';
import NoMatch from './components/NoMatch.js';
import Upload from './components/upload.js';
import Unauthorized from './components/Unauthorized.js';



function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavbarLayout />}>
          {/* public routes */}
          <Route path="/" element={<MainContent />} />
          <Route path="gallery" element={<GalleryContainer />} />
          <Route path="register" element={<Registration />} />
          <Route path="login" element={<Login />} />
          <Route path="success" element={<Success />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          {/* protected routes */}
          <Route element={<RequireUser />}>
            <Route element={<WelcomeCoach />}>
              <Route path="players" element={<Players />} />
              <Route path="players/:playerId" element={<PlayerDetails />} />
              {/* protected admin routes */}
              <Route element={<RequireAdmin />}>
                <Route element={<CoachDashboard />}>
                  <Route path="coaches" element={<Coaches />} />
                  <Route path="coaches/add" element={<NewUser />} />
                  <Route path="find" element={<PlayerContainer />} />
                  <Route path="find/:playerId" element={<PlayerUpdate />} />
                  <Route path="teams" element={<Teams />} />
                  <Route path="teams/:teamId" element={<TeamDetail />} />
                  <Route path="upload" element={<Upload />} />
                </Route>
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