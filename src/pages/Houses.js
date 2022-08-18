import react, { useEffect, useState } from 'react';
import React from 'react';
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

    const wrapperFunc = async () => {
      setPage({PageType: 'HouseList'})
      var listing = "Sold"
      var url = `http://localhost:4200/updateHomelist/${page.House._id}&${listing}`;
      const reps = await fetch(url).then(r => r.json(0))
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
              <button className='backBtn' onClick={()=>setPage({PageType: 'HouseList'})}>Return</button>
              <div className='housePage'>
              <p></p>
                <div className='BigHouseBox'>
                  <div className='textArea'>
                        <div>
                            <label>Address: </label>
                            <br></br>
                            {page.House.strAd} {page.House.city}, {page.House.state} {page.House.zipcode}
                            <p></p>
                            <label>Square Footage:</label>
                            <br></br>
                            {page.House.sqrft} sqrft.
                            <p></p>
                            <label> Pricing: </label>
                            <br></br>
                            ${page.House.pricing}
                        </div>
                  </div>
                <button className='backBtn' onClick={() => wrapperFunc()}>Sell</button>
                </div>
                
              </div>
              </>
          )
      }

      
}
  export default Houses;
  