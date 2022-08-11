import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Houses from "./pages/Houses";
import Past from "./pages/OldListings";
import List from "./pages/Listingmaker";
import Editor from "./pages/EditUser";
import Acc from "./pages/userAcc"
import "./App.css";
import { Auth } from 'aws-amplify';




function App({ signOut }) {
  
  const username = useRef();

  const age = useRef();
  const name = useRef();

  const [users, setUsers] = useState([]);
  const [aws, setAws] = useState([]);
  const [worked, setWorked] = useState({
    signedIn: false,
    user: []
  });

  useEffect(() => {
    getData()
  }, []);

  useEffect(() => {
    getAws()
  }, [users]);

  useEffect(() => {
    checkUser()
  }, [aws]);

  

  const checkUser = () =>{

    var Email = aws.attributes
    

    users.forEach(user => {
      if(Email.email === user.Email){
        setWorked({signedIn: true, user: user})
      }
    });
  }
  

  const getAws = async () => {
    const useinf = await Auth.currentUserInfo();
    console.log(useinf)
    setAws(useinf)
  }

  const getData = () => {
    var url = `http://localhost:4200/getAll`;
    fetch(url)
      .then(r => r.json(0))
      .then(data => {
        setUsers(data);
        console.log(data)
    }).catch(e => console.log(e));
  }



  const makeData = async (e) =>{
    e.preventDefault();
    const userVal = username.current.value;
    const ageVal = age.current.value;
    const nameVal = name.current.value;
    const emailVal = aws.attributes.email

    if(userVal === '' || ageVal === '' || nameVal === ''){
        setWorked({signedIn: false})
    }else{
      var url = `http://localhost:4200/makeUser/${nameVal}&${userVal}&${ageVal}&${emailVal}`;
      change()
      const reps = await fetch(url).then(r => r.json(0))
      console.log(reps)
    }
  }

  const change = () =>{
    setWorked({signedIn: true})
  }



  if (worked.signedIn === true){
      return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout signOut={signOut} aws={aws}/>}>
          <Route index element={<Home />} />
          <Route path="houses" element={<Houses />} />
          <Route path="past" element={<Past />} />
          <Route path="listmaker" element={<List />} />
          <Route path="useredit" element={<Editor/>}/>
          <Route path="*" element={<NoPage />} />
          <Route path="useracc" element = {<Acc/>}/>

        </Route>
      </Routes>
    </BrowserRouter>

    );
  }else{
    return(
      <>
          <div>
              <form onSubmit={makeData}>
              <input ref={username} className="formText" type="text" placeholder="Username" />
              <input ref={age} className="formText" type="number" min={18} placeholder="Age"/>
              <input ref={name} className="formText" type="text" placeholder="Name"/>
              <button>Signup</button>
              </form>
          </div>
      </>
  )
  }

}

export default withAuthenticator(App);
