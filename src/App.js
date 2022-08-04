import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
import React from "react";
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


function App({ signOut }) {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout signOut={signOut} />}>
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

    // <View className="App">
    //   <Card>
    //     <Image src={logo} className="App-logo" alt="logo" />
    //     <Heading level={1}>We now have Auth!</Heading>
    //   </Card>
    //   <Button onClick={signOut}>Sign Out</Button>
    // </View>
  );
}

export default withAuthenticator(App);
