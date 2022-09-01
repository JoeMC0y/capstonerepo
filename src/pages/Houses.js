import { useEffect, useState } from 'react';
import React from 'react';
import "./cssFiles/Houses.css"
import Housepg from './Housepg';
import { Auth } from 'aws-amplify';
const Houses = ({aws}) => {
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
        if(house.listing === "Open"){
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
        <h2>Your Listed Homes:</h2>
        {houses.length > 0 ?
          houses.map((houses, index) => (
            <div key={index + 1} className='homeBox' onClick={() => setPage({PageType: 'SingleHouse', House: houses})}>
              <br></br>
              <div className='textBox'>

                <h3>{houses.Hname}</h3>

                <label>Zip: </label>
                <br></br>
                {houses.zipcode}
                <br></br>

                <label>Pricing:</label>
                <br></br>
                ${houses.pricing} 
                <br></br>
                <br></br>
                
                <h4>Click to view</h4>
              </div>
            </div>
          ))
          :
          <h3>You currently have no listed homes</h3>
        }
      </div>
    )
  }else if(page.PageType === 'SingleHouse'){
    return(
      <>
        <Housepg houses={page.House}/>
      </>
    )
  }   
}

export default Houses;
  