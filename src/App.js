import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator
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
import "./App.css"
import { Auth } from 'aws-amplify';
import Housepg from "./pages/Housepg";




function App({ signOut }) {
  
  const username = useRef();

  const age = useRef();
  const name = useRef();

  const [users, setUsers] = useState([]);
  const [aws, setAws] = useState([]);
  const [worked, setWorked] = useState({
    working: true,
    message: '',
    color: ''
  });
  const [user, setUser] = useState([])


  useEffect(() => {
    getData()
  }, []);

  useEffect(() => {
    (async () =>{
      try{
        const useinf = await Auth.currentUserInfo();
        setAws(useinf)
      } catch (err) { 
        console.log('error occured')
      }
    })();
    setinternals()
  }, [users]);

  useEffect(() => {
    checkUser()  
  }, [aws]);

  const checkUser = async () =>{
    var Email = aws.attributes
    users.forEach(user => {
      if(Email.email === user.Email){
        setUser(user)
        localStorage.setItem('signedin', "true")
      }
    });
  }

  const setinternals = () => {
    localStorage.setItem('email', user.Email)
    localStorage.setItem('name', user.name)
  }
  
  const getData = async () => {
    var url = `http://localhost:4200/getAll`;
    await fetch(url)
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
    const acc = true
    if(userVal === '' || ageVal === '' || nameVal === ''){
      setWorked({working: false, message: "Cant have any empty values", color: "Red"})
    }else{
      var url = `http://localhost:4200/makeUser/${nameVal}&${ageVal}&${userVal}&${emailVal}&${acc}`;
      change()
      const reps = await fetch(url).then(r => r.json(0))
      console.log(reps)
    }
  }

  const change = () =>{
    window.location.reload()
  }

  if (localStorage.getItem('signedin') === "true"){
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout signOut={signOut} user={user}/>}>
            <Route index element={<Home />} />
            <Route path="houses" element={<Houses aws={aws} />} />
            <Route path="past" element={<Past aws={aws} />} />
            <Route path="listmaker" element={<List aws={aws} />} />
            <Route path="useredit" element={<Editor person={user}/>}/>
            <Route path="*" element={<NoPage />} />
            <Route path="useracc" element = {<Acc/>}/>
            <Route path="housepg" element = {<Housepg/>}/>
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
              <button className='btn btn-secondary'>Signup</button>
            </form>
            <p style={{color: worked.color}}>{worked.message}</p>
        </div>
      </>
    )
  }
}

export default withAuthenticator(App);
