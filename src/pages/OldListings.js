import React, { useEffect, useState } from "react";
import { Auth } from 'aws-amplify';
import OldHousepg from "./Oldhouespg";
const Pastlist = ({aws}) => {
  const [houses, setHouses] = useState([])
  const [page, setPage] = useState({
    PageType:'HouseList',
    House: []
  })
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const useinf = await Auth.currentUserInfo();
    const email = useinf.attributes
    const Email = email.email
    var homes = []
    var url = `http://localhost:4200/homes/${Email}`;
    fetch(url)
    .then(r => r.json(0))
    .then(data => {
      console.log(data)
      data.forEach(house =>{
        if(house.listing === "Sold"){
          homes.push(house)
        }
      })
      console.log(homes)
      setHouses(homes)
    }).catch(e => console.log(e));
  }

  if(page.PageType === "HouseList"){
    return(
      <div className='homes'>
        <h2>Your Old or Sold Homes:</h2>
          {
            houses.map((houses, index) => (
              <div key={index + 1} className='homeBox' onClick={() => setPage({PageType: 'SingleHouse', House: houses})}>
                <br></br>
                <div className='textBox'>
                  <h3>{houses.Hname}</h3>
                  
                    <label>Zip: </label>
                    {houses.zipcode}
                    <br></br>

                    <label>Pricing:</label>
                    <br></br>
                    ${houses.pricing} 
                </div>
              </div>
            ))
          }
      </div>
    )
  }
  if(page.PageType === 'SingleHouse'){
    return(
      <>
        <OldHousepg houses={page.House}/>
      </>
    )
  }  
}

  
export default Pastlist;
  