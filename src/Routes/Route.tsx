import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoHome from '../pages/VideoHome/VideoHome';
import Events from '../pages/Events/Events';
import Profile from '../pages/Profile/Profile';
import TeamMembers from '../pages/TeamMember/TeamMembers';
import Store from '../pages/Store/Store';
import About from '/Users/cesarbarrera/Documents/GitHub/Game_Studio_TypScript_Cyclone/src/pages/About/About.tsx';

function AppRoutes() {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<VideoHome />} />
                <Route path="about" element={<About />} />
                <Route path="home" element={<VideoHome />} />
                <Route path="teamMembers" element={<TeamMembers />} />
                <Route path="profile" element={<Profile />} />
                <Route path="events" element={<Events />} />
                <Route path="store" element={<Store />} />



            </Routes>
        </BrowserRouter>
    );
}
export default AppRoutes;