import { useState } from 'react';
import Header from './components/Header';
import NavBar from './components/NavBar';
import RewardBar from './components/RewardBar';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Profile from './pages/Profile';
import Diary from './pages/Diary';
import CreateMeal from './pages/CreateMeal';

function App() {

  const [navBarVisibility, setNavBarVisibility] = useState(true);

  // Fonction pour cacher la barre de navigation
  const hideNavBar = () => {
    setNavBarVisibility(false);
  };

  // Fonction pour afficher la barre de navigation
  const showNavBar = () => {
    setNavBarVisibility(true);
  };
  return (
    <Router>
      <div className="container">
        <Header />
        <RewardBar />
        <div className='flex-grow overflow-y-scroll scrollbar-hide'>
          <Routes>
            <Route path="/" element={
              <Navigate to="/profile" />
            }/>
            <Route path="/login" element={<Login hideNavBar={hideNavBar}/>}/>
            <Route path="/regsiter" element={<Login hideNavBar={hideNavBar}/>}/>
            <Route path="/profile" element={
              <PrivateRoute children={<Profile showNavBar={showNavBar}/>} />
            }/>
            <Route path="/diary" element={
              <PrivateRoute children={<Diary showNavBar={showNavBar}/>} />
            }/>
            <Route path="/createmeal" element={
              <PrivateRoute children={<CreateMeal showNavBar={showNavBar}/>} />
            }/>
          </Routes>
        </div>
        <NavBar hidden={!navBarVisibility}/>
      </div>
    </Router>
    
    
  );
}

export default App;
