import react, { useEffect, useRef, useState } from 'react';
import React from 'react';

function Listing({aws}) {

    const Address = useRef();
    const city = useRef();
    const state = useRef();
    const Zipcode = useRef();
    const Price = useRef();
    const sqrft = useRef();

    const [worked, setWorked] = useState({
        working: true,
        message: '',
        color: ''
    });

    const makeData = async (e) => {
        e.preventDefault();
        const email = aws.attributes
        const listing = "Open"
        const addVal = Address.current.value;
        const cityVal = city.current.value;
        const stVal = state.current.value;
        const zipVal = Zipcode.current.value;
        const priceVal = Price.current.value;
        const sqrftVal = sqrft.current.value;

        if(addVal == '' || cityVal == '' ||stVal == '' ||zipVal == '' ||priceVal == '' ||sqrftVal == ''){
            setWorked({working: false, message: "Cant have any empty values", color: "Red"})
        }else{
            
            var url = `http://localhost:4200/makeHome/${addVal}&${cityVal}&${stVal}&${zipVal}&${priceVal}&${sqrftVal}&${listing}&${email.email}`
            setWorked({working: false, message: "Listing created you may view it in listings", color: "Green"})
            const reps = await fetch(url).then(r => r.json(0))
            
            
        }
    }

        if(worked.working == false){
            return(
                <>
                <h1>Create Personal Listings:</h1>
                <div className='formDiv'>
                    <form onSubmit={makeData}>
                    <input ref={Address} className="addresstxt" type="text" placeholder="House Address" />
                    <input ref={city} className="formText" type="text" placeholder="City" />
                    <input ref={state} className="formText" type="text" placeholder="State" />
                   <input ref={Zipcode} className="formText" type="text" placeholder="Zipcode"/>
                   <input ref={Price} className="formText" type="number" min={50000} placeholder="Price"/>
                   <input ref={sqrft} className="formText" type="number" placeholder="square footage"/>
                
                   <button>Create Listing</button>
                    </form>
                    <p style={{color: worked.color}}>{worked.message}</p>
                </div>
                </>
            )
        }else{
            return(
            <>
            <h1>Create Personal Listings:</h1>
            <div className='formDiv'>
                <form onSubmit={makeData}>
                    <input ref={Address} className="addresstxt" type="text" placeholder="House Address" />
                    <input ref={city} className="formText" type="text" placeholder="City" />
                    <input ref={state} className="formText" type="text" placeholder="State" />
                   <input ref={Zipcode} className="formText" type="text" placeholder="Zipcode"/>
                   <input ref={Price} className="formText" type="number" min={50000} placeholder="Price"/>
                   <input ref={sqrft} className="formText" type="number" placeholder="square footage"/>
                   <button>Create Listing</button>
                </form>

            </div>
            </>
            )
        }

            
        }
        
    

export default Listing;