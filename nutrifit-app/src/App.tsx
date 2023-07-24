import PrivateRoute from './PrivateRoute';
import Header from './components/Header';
import NavBar from './components/NavBar';
import RewardBar from './components/RewardBar';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <RewardBar />
        <Routes>
          <Route path="/" element={
            <PrivateRoute exact component={Login} />
          }/>
          <Route path="/login" Component={Login}/>
        </Routes>
        <NavBar />
      </div>
    </Router>
    
    
  );
}

export default App;
