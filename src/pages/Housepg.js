import react, { useEffect, useState } from 'react';
import React from 'react';
import { Route } from 'react-router-dom';
import "./cssFiles/Houses.css"
const Housepg = ({houses}) =>{


    const [todos, setTodos] = useState([
        {
          content: 'add to do items',
          isCompleted: false,
        }
    ]);

    useEffect(() => {
        getReqData();
    }, []);

    const getReqData = () => {
        var url = `http://localhost:4200/`;
        fetch(url)
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
        var url = `http://localhost:4200/makeReq/${newTodos}&${houses._id}`
        setTimeout(() => {
          document.forms[0].elements[i + 1].focus();
          var url = ``
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

    const wrapperFunc = async () => {
        var listing = "Sold"
        var url = `http://localhost:4200/updateHomelist/${houses._id}&${listing}`;
        const reps = await fetch(url).then(r => r.json(0))
        
    }
  


    return(
        <>
          <div className='housePage'>
          <p></p>
            <div className='BigHouseBox'>
              <div className='textArea'>
                    <div>
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

export default Housepg 