import React, { useState } from 'react';
  
const App: React.FC = () => {

 let [name, setName] = useState<String>('React');
    
 return (
  <h1>Hello, {name} !</h1>
 )
}

function httpreq(){
    return fetch('http://localhost:8080/connect');
}
  
export default App;