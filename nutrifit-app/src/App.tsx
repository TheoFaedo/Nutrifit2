import React from 'react';
import logo from './logo.svg';
import Header from './components/Header';
import RewardBar from './components/RewardBar';

function App() {
  return (
    <div className="bg-neutral-950 h-full md:mx-32 lg:w-phone lg:mx-auto xl:w-phone xl:mx-auto text-center shadow-black
    flex flex-col">
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
      <RewardBar />
    </div>
    
  );
}

export default App;
