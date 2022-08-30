import react, { useEffect, useState } from 'react';
import React from 'react';
import "./cssFiles/Houses.css"
import Housepg from './Housepg';
const Houses = ({aws}) => {
    const [houses, setHouses] = useState([])
    const [page, setPage] = useState({
        PageType:'HouseList',
        House: []
    })

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        var email = aws.attributes
        var homes = []
        var url = `http://localhost:4200/homes/${email.email}`;
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
                {
                  houses.map((houses, index) => (
                    <div key={index + 1} className='homeBox' onClick={() => setPage({PageType: 'SingleHouse', House: houses})}>
                      <br></br>
                      <div className='textBox'>

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
              <Housepg houses={page.House}/>
            </>
          )
      }

      
}
  export default Houses;
  