import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import MyComp from "./MyComp";

function App() {

  const [token, setToken] = useState<string|null>(null)
  const [userID, setUserID] = useState(null);

  const onclick = ()=>{
    axios.post("/api/login_check", {
      "username":  "xavier.boisnon@gmail.com",
      "password": "password"
    }, {
      headers:{
        "Content-Type": "application/json"
      }
    })
    .then(evt=>{
      console.log(evt);
      if (evt.status <300) {
        axios.post("/api/test", {
        }, {
          headers:{
          }
        })
        .then(evt=>{
          console.log(evt);
          if (evt.status == 200) {
            setUserID(evt.data)
          }
        })
        .catch(err=>console.log("ERROOOOR2", err));      }
    })
    .catch(err=>console.log("ERROOOOR", err));
    
  }
  const onclick2 = ()=>{
    axios.post("/api/test", {
    }, {
      headers:{
      }
    })
    .then(evt=>{
      console.log(evt);
      if (evt.status == 200) {
      }
    })
    .catch(err=>console.log("ERROOOOR2", err));
    
  }

  useEffect(() => {
    if (!userID) {
      axios.post("/api/test", {
      }, {
        headers:{
        }
      })
      .then(evt=>{
        console.log(evt);
        if (evt.status == 200) {
          setUserID(evt.data)
        }
      })
      .catch(err=>console.log("ERROOOOR2", err));
  
    }
  

  }, [])
  

  return (
    <div className="App">
      <header className="App-header">
        {userID?<p>logged</p>:<p>not logged</p>}
        <p>
          Edit <code>src/Appo.tsx</code> and save to reload.
        </p>
        <button type="button" onClick={onclick}>GO</button>
        <button type="button" onClick={onclick2}>Test</button>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          cool man
          <MyComp />
        </a>
      </header>
    </div>
  );
}

export default App;
