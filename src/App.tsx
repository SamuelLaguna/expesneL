import  { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import axios from "axios";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseFrom";
import { BASE_URL } from "./constant";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./expense-tracker/components/Login";
import {  Link } from 'react-router-dom';
import CreateAccount from "./expense-tracker/components/CreateAccount";


export interface Expense {
  id: number;
  description: string;
  amount: number
  category:string;
  
  
}

const App = () => {



  const [data, setData] = useState<Expense[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [error, setError] = useState("");

  const fetchData = () => {
    axios.get(BASE_URL + "Expenses")
    .then((response) => {
      setData(response.data);
    }).catch(error => {
      setError(error.message)
      console.log(error);
      
    })
  }
  
  useEffect(() => {
    fetchData();
  }, [])

 
  return (
   <>
    {/* <ExpenseForm addOnExpense={() => handleAdd} currentData={currentData} fetchData={fetchData}/> */}
      <BrowserRouter>
      
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Expense App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Create Account</Nav.Link>
            <Nav.Link  as={Link} to={"/Login"} >Login</Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   
    
   <h1 className="text-center">Expense Tracker</h1>

   <div className="m-5"> 
       {/* From InterFace ExpenseFrom  */}
    <ExpenseForm  fetchData={fetchData}/>
   </div>

    <div className="mb-5">
   <ExpenseFilter fetchData={fetchData} onSelectCategory={category => setSelectedCategory(category) }/>

    </div>
    <div className="mb-5">
    <ExpenseList category={selectedCategory} fetchData={fetchData} expenses={data} setExpenseArr={setData}/>
    </div>
    <CreateAccount/>
    {/* <Login/> */}

    <Routes>
      <Route path="/Login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
   </>
  )
}

export default App