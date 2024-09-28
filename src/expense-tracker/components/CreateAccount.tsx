import React, { useState } from 'react'
import { createAccount, expenseStuff } from '../../Services/DataService';
import { toast } from 'react-toastify';
import { number } from 'zod';
import axios from 'axios';
import { BASE_URL } from '../../constant';
import { useNavigate } from 'react-router-dom';
const CreateAccount = () => {
  
  let navigate = useNavigate();
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');


  //Function to handle our User
  const handleUser = (e: any) => {
      setUsername(e.target.value)
      
  }

  //Function to handle our Password
  const handlePassword = (e: any) => {
      setPassword(e.target.value)
  }

  //Function to handle our Submit
  const handleSubmit = () => {
      let userData : expenseStuff = {
      
          username: Username,
          password: Password
        

      }
      createAccount(userData);
      // navigate('/Login');
      console.log(userData);
      
  }

  
  



  return (
   <>
    <div>
      <input type="text" value={Username} onChange={handleUser} placeholder="Username" />
      <input type="password" value={Password} onChange={handlePassword} placeholder="Password" />
      <button type="submit" onClick={handleSubmit}>Create Account</button>
    </div>
   </>
  )
}

export default CreateAccount

