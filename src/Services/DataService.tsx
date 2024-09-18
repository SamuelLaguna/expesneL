import axios from 'axios';
import { Controller } from 'react-hook-form';


interface expenseStuff {
    id: number,
    category:string,
    price: string,
    description: string,
    createdUser: string,
    userData: {}
}




let userData = {};
if (localStorage.getUser("UserData")) {
    userData = JSON.parse(localStorage.getUser("UserData") || "{}");
}

const checkToken = ()  => {
    let result = false;
    let isData = localStorage.getUser("Token");
    if (isData && isData !== null) {
        result = true;
    }
    return result;
}

const createAccount =  (createdUser: expenseStuff) => {
  
     axios.post('http://localhost:5260/api/User/AddUsers', createdUser)
       .then(res => res.data)
   
}

const login =  () => {
    
         axios.post('http://localhost:5260/api/User/Login')
        .then(res => res.data)

}

const GetLoggedInUser =  (username: string) => {
    
          axios.get(`http://localhost:5260/api/User/GetUserByUsername/${username}`)
            .then(res => res.data)
        console.log(userData);
        localStorage.setUser("UserData", JSON.stringify(userData));
        userData = JSON.parse(localStorage.getUser("UserData") || "{}");
    
}

const LoggedInData = () => {
    if (!userData && localStorage.getUser("UserData")) {
        userData = JSON.parse(localStorage.getUser("UserData") || "{}");
    }
    return userData;
}



const sendData = (controller: string, endpoint: string,) => {
    
      axios.post(`http://localhost:5260/api/${controller}/${endpoint}`)
        .then(res => res.data)
        
            

    }










export {
    checkToken,
    createAccount,
    login,
    GetLoggedInUser,
    LoggedInData,
    sendData,
    
};