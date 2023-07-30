import { ReactNode, createContext, useState } from 'react';
import Header from './components/Header';
import NavBar from './components/NavBar';
import RewardBar from './components/RewardBar';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Profile from './pages/Profile';
import Diary from './pages/Diary';
import CreateMeal from './pages/CreateMeal';
import { NavBarContextProvider } from './context/NavBarContext';

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
        <NavBarContextProvider defaultValue={{ hideNavBar, showNavBar }}>
          <div className='flex-grow overflow-y-scroll scrollbar-hide'>
            <Routes>
              <Route path="/" element={
                <Navigate to="/profile" />
              }/>
              <Route path="/login" element={<Login/>} />
              <Route path="/regsiter" element={<Login/>} />
              <Route path="/profile" element={
                <PrivateRoute children={<Profile/>} />
              } />
              <Route path="/diary" element={
                <PrivateRoute children={<Diary/>} />
              } />
              <Route path="/createmeal" element={
                <PrivateRoute children={<CreateMeal/>} />
              } />
            </Routes>
          </div>
        </NavBarContextProvider>
        <NavBar hidden={!navBarVisibility}/>
      </div>
    </Router>
    
    
  );
}

export default App;
