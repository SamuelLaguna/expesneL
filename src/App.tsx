import { useState } from "react"
import ExpenseList from "./expense-tracker/components/ExpenseList"
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter"
import ExpenseFrom from "./expense-tracker/components/ExpenseFrom";






const App = () => {

  //Create a useState to help us handle out selectedCategories
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleDelete = (id:number) => {
    setDummyExpensesArray(dummyExpensesArray.filter(expense => expense.id !== id))
  }


  
  
  const [dummyExpensesArray, setDummyExpensesArray] = useState([
    {id:1, description : 'aaaaa' , amount: 10, catagory: 'Utilites'},
    {id:2, description : 'bbbbb' , amount: 15, catagory: 'Entertainment'},
    {id:3, description : 'ccccc' , amount: 20, catagory: 'Food'},
    {id:4, description : 'ddddd' , amount: 25, catagory: 'Shopping'},
    {id:5, description : 'eeeee' , amount: 16, catagory: 'Groceries'}
  ])
  
  //Create a varable with a ternary operator, we are going to use out selectedCatagory as a boolean filter though our dummy expensise array. 
  const visibleExpense = selectedCategory ? dummyExpensesArray.filter(e => e.catagory === selectedCategory) : dummyExpensesArray
  return (
   <>
   <h1 className="text-center">Expense Tracker</h1>

   <div className="m-5">
    <ExpenseFrom/>
   </div>

    <div className="mb-5">
   <ExpenseFilter onSelectCategory={category => setSelectedCategory(category) }/>

    </div>
    <div className="mb-5">
   <ExpenseList expenses={visibleExpense} onDelete={handleDelete}/>

    </div>
   </>
  )
}

export default App