import { useEffect, useRef, useState } from 'react';
import React from 'react';
import "./cssFiles/Houses.css"
const OldHousepg = ({houses}) =>{
  const [todos, setTodos] = useState([]);
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    getReqData();
    getPersonData()
  }, []);

  const getReqData = () => {
    var url = `http://localhost:4200/getReqs/${houses._id}`;
    fetch(url)
    .then(r => r.json(0))
    .then(data => {
      console.log("array")
      setTodos(data)
      console.log(data)
    }).catch(e => console.log(e));
    fetch(url)
  }

  const getPersonData = () => {
    var url = `http://localhost:4200/getBuyers/${houses._id}`;
    fetch(url)
    .then(r => r.json(0))
    .then(data => {
      setBuyers(data)
      console.log(data)
    }).catch(e => console.log(e));
    fetch(url)
  }

  const wrapper = () => {
    window.location.reload()
  }

  return(
    <>
      <div className='housePage'>
        <button onClick={()=>wrapper()}>Return</button>
        <p></p>
        <div className='BigHouseBox'>
          <div className='textArea'>
            <div>
                <h2>{houses.Hname}</h2>

                <label>Address: </label>
                <br></br>
                {houses.strAd} {houses.city}, {houses.state} {houses.zipcode}
                <p></p>

                <label>Square Footage:</label>
                <br></br>
                {houses.sqrft} sqrft.
                <p></p>

                <label> Pricing: </label>
                <br></br>
                ${houses.pricing}
            </div>
          </div>
          <div className='houseReqs'>
            <h2>Previous checklist</h2>
            <div className="todo-list">
              <ul className='todoUl'>
                {todos.length > 0 && todos.map((todo, i) => (
                  <div className="todont" >
                    <div className={` todo ${todo.done === "true" && 'todo-is-completed'}`}>
                      <p className={'inputreq'}>{todo.todos}</p>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className='houseBuyers'>
          <h2>House Purchaser</h2>
        </div>
        <div className="buyers">
          <ul>
            {buyers.length > 0 && buyers.map((buyer, i) => (
              <div className="pers" >
                <h4 className={'inputpers'}>{buyer.name}</h4>
                <br></br>
                <h5 className={'inputpers'}>{buyer.contact}</h5>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default OldHousepg 