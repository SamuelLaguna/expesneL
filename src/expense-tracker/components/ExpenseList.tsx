import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constant";
import ColorModeSwitch from "./ColorModeSwitch";
import ExpenseForm from "./ExpenseFrom";
import { Expense } from "../../App";





interface ExpenseProps {
    expenses: Expense []
    // onDelete: (id:number) => void
    fetchData: () => void;
    category: string;
    setExpenseArr: (expenses: Expense[]) => void;

}


const ExpenseList = ({ expenses, fetchData,category,setExpenseArr}:ExpenseProps) => {

 
  // const [currentData, setCurrentData] = useState<Expense>({} as Expense)

 
 


  // const getExpense = (id: number) => {
  //   axios.get(BASE_URL + "Expense/" + id)
  //   .then((res) => {
  //     setExpenseArr(res.data);
      
  //   })
  // }

  const handleAdd = () => {
    // setCurrentData({} as Expense)
    axios.post(BASE_URL + "Expenses/", expenses )
    .then((res) => {
      fetchData();
      console.log(res);
      
    })
  }


  const handleDelete = (id: number) => {
    axios.delete<Expense>(BASE_URL + "Expenses/" + id)
    .then(res => {
      setExpenseArr(expenses.filter(expense => expense.id !== id))
      fetchData();


    }).catch(error => {
      console.log(error);
      
    })
  }
  return (
   <>
   <ColorModeSwitch/>
  
   <table className="table tBody table-bordered">
  <thead>
    <tr>
      <th scope="col">Description</th>
      <th scope="col">Amount</th>
      <th scope="col">Category</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody className="tBody">
    {expenses.map(expense => <tr key={expense.id}>
        <td>{expense.description}</td>
    <td>{expense.amount}</td>
    <td>{expense.category}</td>
    <td>
        <button className="btn btn-outline-danger" onClick={() => handleDelete(expense.id) }>Delete</button>
    </td>
    </tr>)}
  
  </tbody >
  <tfoot>
    <tr>
        <td>Total</td>
        <td>{expenses.reduce((acc,expenses) => expenses.amount + acc, 0).toFixed(2)}</td>
        <td></td>
        <td></td>
    </tr>
  </tfoot>
</table>
   </>
  )
}

export default ExpenseList