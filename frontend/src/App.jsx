import { useState } from 'react';
import './App.css';

function App() {

  const [data,setData] = useState([]);
  
  const handleFetchUsers=()=>{
    fetch(`http://localhost:5000/fetchusers`)
    .then((res)=>res.json())
    .then((res)=>{
      // console.log(res);
      alert(res.message)
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const handleDeleteUsers=()=>{
    fetch('http://localhost:5000/deleteUsers')
    .then((res)=>res.json())
    .then((res)=>{
      // console.log(res);
      alert(res.message)
    })
    .catch((err)=>{
      console.log(err);
    })
  }


  const handleGetAllUsers=()=>{
    fetch('http://localhost:5000/userDetails')
    .then((res)=>res.json())
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  return (
    <div className="App">
      <div>
        <button onClick={handleFetchUsers}>Fetch Users</button>
        <button onClick={handleDeleteUsers}>Delete Users</button>
        <button onClick={handleGetAllUsers}>Users Details</button>
      </div>
    </div>
  );
}

export default App;
