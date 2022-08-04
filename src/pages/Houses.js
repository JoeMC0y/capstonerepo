import react, { useEffect, useState } from 'react';
import React from 'react';
const Houses = () => {
    const [houses, setHouses] = useState([])

    const [page, setPage] = useState({
        PageType:'HouseList',
        House: []
      })

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        var url = `http://localhost:4200/getRand/10`;
        fetch(url)
          .then(r => r.json(0))
          .then(data => {
            setHouses(data.results)
            console.log(data.results)
          }).catch(e => console.log(e));
    }

    if(page.PageType === "HouseList"){
        return(
            <div className='homes'>
              <h2>Your Listed Homes:</h2>
                {
                  houses.map((houses, index) => (
                    <div key={index + 1} className='homeBox' onClick={() => setPage({PageType: 'SingleHouse', House: houses})}>
                      <div className='imgBox'>
                        <img src={houses.picture.medium}/>
                      </div>
                      <br></br>
                      <div className='textBox'>
                           <label>Zip: </label>
                            {houses.location.postcode}
                            <br></br>
                            <label>Listing / Pricing:</label>
                            <br></br>
                            {houses.Listing.listing} 
                            <br></br>
                             ${houses.Listing.cost}
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
              <button className='backBtn' onClick={()=>setPage({PageType: 'HouseList'})}>Return</button>
              <div className='housePage'>
              <p></p>
                <div className='BigHouseBox'>
                  <div className='imgBox'>
                    <img src={page.House.picture.large}/>
                  </div>
                  <div className='textArea'>
                        <h3>{page.House.houseType.type} Home</h3>
                        <div>
                            <label>Address: </label>
                            <br></br>
                            {page.House.location.streetnumber} {page.House.location.street} {page.House.location.city}, {page.House.location.state} {page.House.location.postcode}
                            <p></p>
                            <label>Square Footage:</label>
                            <br></br>
                            {page.House.houseType.sqrft} sqrft.
                            <p></p>
                            <label>Listing Type / Pricing: </label>
                            <br></br>
                            {page.House.Listing.listing}
                            <br></br>
                            ${page.House.Listing.cost}
                        </div>
                  </div>

                </div>
              </div>
              </>
          )
      }

      
}
  export default Houses;
  