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
import { useEffect } from 'react';
import { Banner } from './components/Banner';

const version = require("../package.json").version;

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

  const advertMessageHidded: boolean = localStorage.getItem("advertMessageHidded") === "true";

  useEffect(() => {
    const userLanguage = navigator.language;
    if(userLanguage.indexOf("fr") !== -1) {
      i18next.changeLanguage("fr");
    }
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <ToastContextProvider>
          <div className="containerr" id="container">
            <AuthContextProvider defaultValue={{account: undefined, setAccount: () => {}}}>
              <NavBarContextProvider>
                <Header />
                <RewardBar />
                  <div id="content" className='overflow-y-hidden flex flex-grow relative'>
                    <Banner isWarning hiddedProp={advertMessageHidded} quitHandler={() => {localStorage.setItem("advertMessageHidded", "true");}}>
                      <span>Cette application est un projet personnel. Veuillez ne pas utiliser de mots de passe ou de données sensibles.</span>
                    </Banner>
                    <div className='overflow-y-scroll scrollbar-hide flex-grow'>
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
                      <div className='text-neutral-800 text-sm mb-8'>Nutrifit v{version}</div>
                    </div>
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
