import { useEffect, useState } from "react"
import ExpenseList from "./expense-tracker/components/ExpenseList"
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter"
import ExpenseFrom from "./expense-tracker/components/ExpenseFrom";

import axios from "axios";
import { BASE_URL } from "./constant";


// import Practice from "./expense-tracker/components/Practice";




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

  //Create a useState to help us handle out selectedCategories
 

  // const handleDelete = (id:number) => {
  //   setDummyExpensesArray(dummyExpensesArray.filter(expense => expense.id !== id))
  // }


  
  
  // const [dummyExpensesArray, setDummyExpensesArray] = useState([
  //   {id:1, description : '' , amount: 0, category: ''},
  //   // {id:2, description : 'bbbbb' , amount: 15, category: 'Entertainment'},
  //   // {id:3, description : 'ccccc' , amount: 20, category: 'Food'},
  //   // {id:4, description : 'ddddd' , amount: 25, category: 'Shopping'},
  //   // {id:5, escriptiond : 'eeeee' , amount: 16, category: 'Groceries'}
    

  // ])
  
  //Create a varable with a ternary operator, we are going to use out selectedCatagory as a boolean filter though our dummy expensise array. 
  // const visibleExpense = selectedCategory ? dummyExpensesArray.filter(e => e.category === selectedCategory) : dummyExpensesArray
  return (
   <>
    {/* <ExpenseForm addOnExpense={() => handleAdd} currentData={currentData} fetchData={fetchData}/> */}
  
   
    
   <h1 className="text-center">Expense Tracker</h1>

   <div className="m-5"> 
       {/* From InterFace ExpenseFrom  */}
    <ExpenseFrom  fetchData={fetchData}/>
   </div>

    <div className="mb-5">
   <ExpenseFilter fetchData={fetchData} onSelectCategory={category => setSelectedCategory(category) }/>

    </div>
    <div className="mb-5">
    <ExpenseList category={selectedCategory} fetchData={fetchData} expenses={data} setExpenseArr={setData}/>
    </div>
   </>
  )
}

export default App