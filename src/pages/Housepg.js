import { useEffect, useRef, useState } from 'react';
import React from 'react';
import "./cssFiles/Houses.css"
const Housepg = ({houses}) =>{
  const [todos, setTodos] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const newtodo = useRef();
  const newpers = useRef();
  const perscont = useRef();

  const [worked, setWorked] = useState({
    working: "true",
    message: '',
    color: ''
  });

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
    
  const createTodoAtIndex = async (e)  => {
    e.preventDefault();
    const newTodos = [...todos];
    const text = newtodo.current.value;
    newTodos.push(
      {
      todos: text,
      done: "false",
      }
    )
    newtodo.current.value = ''
    const todo = text
    const done = "false"
    var url = `http://localhost:4200/makeReq/${todo}&${done}&${houses._id}`
    const reps = await fetch(url).then(r => r.json(0))
    setTodos(reps);
  }

  const createPersonAtIndex = async (e)  => {
    e.preventDefault()
    
    const name = newpers.current.value;
    const contact = perscont.current.value;
    if(name === '' || contact === ''){
      setWorked({working: "false", message: "Cant have any empty values", color: "Red"})
    }else{
      const newBuyers = [...buyers];
      newBuyers.push(
        {
        name: name,
        contact: contact
        }
      )        
      newpers.current.value = ''
      perscont.current.value = ''
      setBuyers(newBuyers)
      var url = `http://localhost:4200/makeBuyer/${name}&${contact}&${houses._id}`
      const reps = await fetch(url).then(r => r.json(0))
      setBuyers(reps);
    }
  }

  const removeTodoAtIndex = async (i) => {
    const temporaryTodos = [...todos];
    var url = `http://localhost:4200/deleteReq/${temporaryTodos[i]._id}&${houses._id}`;
    const reps = await fetch(url).then(r => r.json(0))
    setTodos(reps);
  }

  const removePersonAtIndex = async (i) => {
    const newBuyers = [...buyers];
    var url = `http://localhost:4200/deleteBuyer/${newBuyers[i]._id}&${houses._id}`;
    const reps = await fetch(url).then(r => r.json(0))
    setBuyers(reps);
  }
    
  const toggleTodoCompleteAtIndex = async (index) => {
    const temporaryTodos = [...todos];
    console.log(temporaryTodos[index].done)
    if(temporaryTodos[index].done === "true"){
      temporaryTodos[index].done = "false"
    }else if(temporaryTodos[index].done === "false"){
      temporaryTodos[index].done = "true"
    }
    console.log(temporaryTodos[index].done)
    var url = `http://localhost:4200/updateReqs/${temporaryTodos[index]._id}&${temporaryTodos[index].done}&${houses._id}`;
    const reps = await fetch(url).then(r => r.json(0))
    setTodos(reps);

  }

  const wrapperFunc = async (i) => {
    for(let l = 0; l < buyers.length; l++){
      console.log(l)
      if(l != i){
        var url = `http://localhost:4200/deleteBuyer/${buyers[l]._id}&${houses._id}`;
        const reps = await fetch(url).then(r => r.json(0))
      }
    }    
    var listing = "Sold"
    var url = `http://localhost:4200/updateHomelist/${houses._id}&${listing}`;
    const reps = fetch(url).then(r => r.json(0))  
    window.location.reload()
  }
  
  const wrapper = () => {
    window.location.reload()
  }

  const deleteHome = async () => {
    console.log(houses._id)
    var url = `http://localhost:4200/deleteHouse/${houses._id}`;
    const reps = await fetch(url).then(r => r.json(0))
    console.log(reps)
    window.location.reload()
  }

  return(
    <>
      <div className='housePage'>
        <button onClick={()=>wrapper()}>Return</button>
        <button onClick={()=>deleteHome()}>Delete</button>
        <div className='BigHouseBox'>
          <div className='textArea'>
            <div>
              <h1>{houses.Hname}</h1>

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
            <h2>House checklist</h2>
            <div className="todo-list">
              <ul className='todoUl'>
                {todos.length > 0 && todos.map((todo, i) => (
                  <div className="todont" >
                      <div className={`todo ${todo.done === "true" && 'todo-is-completed'}`}>
                        <div key={i+1} className='checkbox' onClick={() => toggleTodoCompleteAtIndex(i)}>
                          {todo.done === "true" && (
                            <span>&#x2714;</span>
                          )}
                        </div>
                        <p className={'inputreq'}>{todo.todos}</p>
                      </div>
                      <button onClick={()=> removeTodoAtIndex(i)}>delete</button>
                  </div>
                ))}
              </ul>
              <form onSubmit={createTodoAtIndex}>
                  <input type='text' ref={newtodo} placeholder={"Add todo items"}/>
                  <button className='btn btn-secondary'>add</button>
              </form>
            </div>
          </div>
        </div>
        <div className='houseBuyers'>
          <h2>Potential buyers</h2>
          <div>
            <div className='buyers'>
              <ul>
                {buyers.length > 0 && buyers.map((buyer, i) => (
                  <div className="pers" >
                    <h4 className={'inputpers'}>{buyer.name}</h4>
                    <br></br>
                    <h5 className={'inputpers'}>{buyer.contact}</h5>
                    <br></br>
                    <button onClick={()=> removePersonAtIndex(i)}>delete</button>
                    <button onClick={() => wrapperFunc(i)}>Sell</button>
                  </div>
                ))}
              </ul>
            </div>
            <form onSubmit={createPersonAtIndex}>
              <input type='text' ref={newpers} placeholder={"Buyer name"}/>
              <input type='text' ref={perscont} placeholder={"Buyer contact"}/>
              <button className='btn btn-secondary'>add</button>
              {worked.working === "false" && <p style={{color: worked.color}}>{worked.message}</p>}
            </form>
          </div>
        </div>  
      </div>
    </>
  )
}

export default Housepg 