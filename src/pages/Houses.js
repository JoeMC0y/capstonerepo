import react, { useEffect, useState } from 'react';
import React from 'react';
import "./cssFiles/Houses.css"
const Houses = ({aws}) => {
    const [houses, setHouses] = useState([])
    const [page, setPage] = useState({
        PageType:'HouseList',
        House: []
    })
    const [todos, setTodos] = useState([
      {
        content: 'add to do items',
        isCompleted: false,
      }
    ]);

    useEffect(() => {
        getData();
        getReqData();
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

    const getReqData = () => {

    }

    const wrapperFunc = async () => {
      setPage({PageType: 'HouseList'})
      var listing = "Sold"
      var url = `http://localhost:4200/updateHomelist/${page.House._id}&${listing}`;
      const reps = await fetch(url).then(r => r.json(0))
    }

    function handleKeyDown(e, i) {
      if (e.key === 'Enter') {
        createTodoAtIndex(e, i);
      }
      if (e.key === 'Backspace' && todos[i].content === '') {
        e.preventDefault();
        return removeTodoAtIndex(i);
      }
    }
  
    function createTodoAtIndex(e, i) {
      const newTodos = [...todos];
      newTodos.splice(i + 1, 0, {
        content: '',
        isCompleted: false,
      });
      setTodos(newTodos);
      setTimeout(() => {
        document.forms[0].elements[i + 1].focus();
      }, 0);
    }
  
    function updateTodoAtIndex(e, i) {
      const newTodos = [...todos];
      newTodos[i].content = e.target.value;
      setTodos(newTodos);
    }
  
    function removeTodoAtIndex(i) {
      if (i === 0 && todos.length === 1) return;
      setTodos(todos => todos.slice(0, i).concat(todos.slice(i + 1, todos.length)));
      setTimeout(() => {
        document.forms[0].elements[i - 1].focus();
      }, 0);
    }
  
    function toggleTodoCompleteAtIndex(index) {
      const temporaryTodos = [...todos];
      temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
      setTodos(temporaryTodos);
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
                <div className='houseReqs'>
                  House checklist
                  </div>
                   <form className="todo-list">
                     <ul>
                       {todos.map((todo, i) => (
                         <div className={`todo ${todo.isCompleted && 'todo-is-completed'}`}>
                           <div className={'checkbox'} onClick={() => toggleTodoCompleteAtIndex(i)}>
                             {todo.isCompleted && (
                               <span>&#x2714;</span>
                             )}
                           </div>
                           <input
                             type="text"
                             value={todo.content}
                             onKeyDown={e => handleKeyDown(e, i)}
                             onChange={e => updateTodoAtIndex(e, i)}
                             className={'inputreq'}
                           />
                         </div>
                       ))}
                     </ul>
                   </form>
                 </div>
              </>
          )
      }

      
}
  export default Houses;
  