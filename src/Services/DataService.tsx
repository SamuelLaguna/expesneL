import axios from 'axios';
import { Controller } from 'react-hook-form';
import { BASE_URL } from '../constant';


export interface expenseStuff {
    id: number,
    category:string,
    price: string,
    description: string,
    createdUser: string,
    username: string,
    password: string,

}




let userData = {};
if (localStorage.getItem("UserData")) {
    userData = JSON.parse(localStorage.getItem("UserData")!);
}

const checkToken = ()  => {
    let result = false;
    let isData = localStorage.getItem("Token");
    if (isData && isData !== null) {
        result = true;
    }
    return result;
}

const createAccount =  (createdUser: expenseStuff) => {
  
     axios.post('http://localhost:5260/api/User/AddUsers', createdUser)
       .then(res => res.data)
   
}



const login = async (loginUser: expenseStuff) => {
    
        let userToken = "";
        try {
            const result = await axios.post('http://localhost:5260/api/User/Login', loginUser)
            let data = result.data;
            userToken = data.token;
            localStorage.setItem("Token", data.token);
            console.log(localStorage);
            console.log(data);
            console.log(loginUser);
            
            

            
        } catch (error){
            console.log(error);
            
        }
        return userToken

       

}

const GetLoggedInUser = async (username: string) => {
    
    await axios
    .get(`http://localhost:5260/api/User/GetUserByUsernameDTO/${username}`)
    .then(res => {
        userData = res.data; //store userData from response
        localStorage.setItem("UserData", JSON.stringify(userData)); //set userData to the key UserData

        // check to see if local storage is empty so JSON.parse does now throw an error as it cannot be null as line 7 currently shows userData as empty
        const storedData = localStorage.getItem("UserData");
        if(storedData)
        {
            userData = JSON.parse(storedData);  
            console.log("UserData from localStorage in FetchLoggedInUser in DataService: ", userData);
        } else 
            {
                console.error("No UserData found in localStorage");
            }
    })
    .catch(error => console.error("Error fetching user data: ", error.message));



        //   axios.get(`http://localhost:5260/api/User/GetUserByUsername/${username}`)
        //     .then((res) => {
        //         let userData = res.data;
        //         localStorage.setItem("UserData", userData);
        // })
        
    
}

const LoggedInData = () => {
    if (!userData && localStorage.getItem("UserData")) {
        userData = JSON.parse(localStorage.getItem("UserData") || "{}");
    }
    return userData;
}



const sendData = (controller: string, endpoint: string,) => {
    
      axios.post(`http://localhost:5260/api/${controller}/${endpoint}`)
        .then(res => res.data)
        
            

    }

    const GetLoggedInUserData = () : expenseStuff | {} => {
        const storedData = localStorage.getItem('UserData');
        return storedData ? JSON.parse(storedData) : {};
    }


    const getItemsByUserId = async (userId: string): Promise<any> => {
      try {
        const response = await axios.get(`http://localhost:5260/Expense/GetItemsByUserId/${userId}`);
        return response.data;
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          
          throw new Error(`Error in getItemsByUserId: ${error.response?.data?.message || error.message}`);
        } else {
         
          throw new Error(`Error in getItemsByUserId: ${error.message}`);
        }
      }
    };
    





export {
    checkToken,
    createAccount,
    login,
    GetLoggedInUser,
    LoggedInData,
    sendData,
   GetLoggedInUserData,
   getItemsByUserId
};