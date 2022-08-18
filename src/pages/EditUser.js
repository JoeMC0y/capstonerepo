import React, { useState } from "react";
const EditUser = ({person}) => {
  const [username, setUsername] = useState(person.Username)
  const [age, setAge] = useState(person.age)
  const [name, setName] = useState(person.name)


  const [worked, setWorked] = useState({
      working: true,
      message: '',
      color: ''
  });

  const updateData = async (e) => {
      e.preventDefault();

      if(username === ''|| age === '' || name === ''){
          setWorked({working: false, message: "Cant have any empty values"})
      }else{
          var url = `http://localhost:4200/updateUser/${person._id}&${name}&${age}&${username}`;
          const reps = await fetch(url).then(r => r.json(0))
          console.log(reps)

      }
      
  }


  if(worked.working === false){
      return(
          <>
              <div>
                  <form onSubmit={updateData}>
                      <input type="text" placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                     <input type="number" min={18} placeholder="Age" value={age} onChange={(e)=> setAge(e.target.value)}/>
                     <input type="text" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)}/>
                     <button>Update</button>
                  </form>
                  <p style={{color: worked.color}}>{worked.message}</p>
              </div>
          </>
      )
  }else{
      return(
          <>
          <div>
              <form onSubmit={updateData}>
                 <input type="text" placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                 <input type="number" min={18} placeholder="Age" value={age} onChange={(e)=> setAge(e.target.value)}/>
                 <input type="text" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)}/>
                 <button>Update</button>
              </form>
          </div>
          </>
      )
  }
}
  
  export default EditUser;  