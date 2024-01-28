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
import { AuthContextProvider } from './context/AuthContext';
import Register from './pages/Register';
import { ToastContextProvider } from './context/ToastContext';
import ErrorBoundary from './components/error/ErrorBoundary';
import "./fonts/Britannic.ttf";

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

let fr = require("./lang/fr.json");
let en = require("./lang/en.json");
const resources = { en, fr }

i18next.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false
  }
});

function App() {

  return (
    <ErrorBoundary>
      <Router>
        <ToastContextProvider>
          <div className="containerr" id="container">
            <AuthContextProvider defaultValue={{account: undefined, setAccount: () => {}}}>
              <NavBarContextProvider>
                <Header />
                <RewardBar />
                  <div className='flex-grow overflow-y-scroll scrollbar-hide'>
                    <Routes>
                      <Route path="/" element={
                        <Navigate to="/profile" />
                      }/>
                      <Route path="/login" element={<Login/>} />
                      <Route path="/register" element={<Register/>} />
                      <Route path="/profile" element={
                        <PrivateRoute children={<Profile/>} />
                      } />
                      <Route path="/diary" element={
                        <PrivateRoute children={<Diary/>} />
                      } />
                      <Route path="/createmeal" element={
                        <PrivateRoute children={<CreateMeal/>} />
                      } />
                      <Route path="*" element={<Navigate to="/profile" />}/>
                    </Routes>
                  </div>
                <NavBar />
              </NavBarContextProvider>
            </AuthContextProvider>
          </div>
        </ToastContextProvider>
      </Router>
    </ErrorBoundary>
    
    
  );
}

export default App;
