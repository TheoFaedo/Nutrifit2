import Header from './components/Header';
import NavBar from './components/NavBar';
import RewardBar from './components/RewardBar';

function App() {
  return (
    <div className="container">
      <Header />
      <RewardBar />
      <div className='flex-grow overflow-y-scroll scrollbar-hide'>
        <div className='h-48 bg-neutral-800  my-6 mx-4 rounded-lg'>

        </div>
        <div className='h-48 bg-neutral-800  my-6 mx-4 rounded-lg'>

        </div>
        <div className='h-48 bg-neutral-800  my-6 mx-4 rounded-lg'>

        </div>
      </div>
      <NavBar />
    </div>
    
  );
}

export default App;
