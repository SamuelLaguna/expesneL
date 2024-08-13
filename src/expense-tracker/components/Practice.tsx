// import axios from "axios";
// import { useEffect, useState } from "react";

// interface User {
//   id: number
//   name: string
// }



// const Practice = () => {
//   const [users, setUsers] = useState<User[]>([])

//   const fetchData = () => {
//     axios.get('https://jsonplaceholder.typicode.com/users')
//     .then(response => {
//       setUsers(response.data)
//       console.log(response.data);
      
//     });
//   }

//   useEffect(() => {
//   fetchData()
  
    
//   }, [])

//   const addUser = () => {
//     const newUser: User =  {id: 0 , name: 'userss'}
//     setUsers([...users, newUser]);
//     axios.post('https://jsonplaceholder.typicode.com/users', newUser)
//     .then(response => setUsers([response.data, ...users]))
//   } 

//   const updateUser = (user: User) => {
//     const updateUser = {...user, name: user.name + 'Updated'}
//     setUsers(users.map((u) => (u.id === user.id ? updateUser : u)))
//     axios.put('https://jsonplaceholder.typicode.com/users' + user.id, updateUser)

//   }

//   const deleteUser = (user: User) => {
//     setUsers(users.filter(u => u.id !== user.id))
//     axios.delete('https://jsonplaceholder.typicode.com/users' + user.id)
//   }


  
  
//   return (
//   <>
//   <button className="btn btn-primary mx-3 mb-3" onClick={addUser}>Add</button>
//             <ul className="list-group">
//                 {users.map(user => (
//                     <li className="list-group-item d-flex justify-content-between align-items-center" key={user.id}>
//                         {user.name}
//                         <div>
//                             <button onClick={() => updateUser(user)} className="btn btn-outline-warning me-2">
//                                 Update
//                             </button>
//                             <button onClick={() => deleteUser(user)} className="btn btn-outline-danger">
//                                 Delete
//                             </button>
//                         </div>
//                     </li>
//                 ))}
               
//             </ul>
//   </>
//   )
// }

// export default Practice