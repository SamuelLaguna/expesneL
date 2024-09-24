
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import categories from "../categories";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constant";
import { GetLoggedInUserData } from "../../Services/DataService";
// import { Expense } from "../../App";

const schema = z.object({
  description: z.string().min(1, { message: "Description is required" }),
  amount: z.number().positive({ message: "Amount must be a positive number" }),
  category: z.string().min(1, { message: "Category is required" }),
});

type FormData = z.infer<typeof schema>;

interface ExpenseFormProps {
currentData?: Expense 
  fetchData : () => void
}
interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  isPublished: boolean;
  isDeleted: boolean;
}


const ExpenseForm = ({ fetchData, currentData, }: ExpenseFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });


  const [UserData, setUserData] = useState<any>(null)
  const [userId, setUserId] = useState(0);
  const [expenseItems, setExpenseItems] = useState<Expense[]>([]);

  // const [data, setData] = useState<ExpenseFormProps[]>([]);
  // const [currentData, setCurrentData] = useState<ExpenseFormProps>({} as ExpenseFormProps);
  // const [list, setList] = useState<FormData[]>([]);
  const [expense, setExpense] = useState({
    id:currentData?.id || 0,
    amount: currentData?.amount || "",
    description: currentData?.description || "",
    category: currentData?.category || ""
  })

  const addExpense = () => {
    axios.post(BASE_URL + "Expenses/", expense )
    .then(res => {
      console.log(res);
      fetchData();
    }).catch(errors => {
      console.log(errors);
      
    })
  }


  const loadUserData = async () => {

    let userInfo = GetLoggedInUserData();
    setUserId(userInfo);
    

  }

  return (
    <>
      <form >
        <div className="mb-3">
          <label htmlFor="description" className="form-label textC glowing-object">
            Description
          </label>
          <input
            id="description"
            type="text"
            value={expense.description}
            className="form-control"
            {...register("description")}
            onChange={(e) => setExpense({...expense, description: e.target.value })}
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label  htmlFor="amount" className="form-label textC glowing-object">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            value={expense.amount}
            className="form-control"
            {...register("amount", { valueAsNumber: true })}
            onChange={(e) => setExpense({...expense, amount: e.target.value })}
          />
          {errors.amount && (
            <p className="text-danger">{errors.amount.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label textC glowing-object">
            Category
          </label>
          <select
            id="category"
            value={expense.category}
            className="form-control"
            {...register("category")}
            onChange={(e) => {setExpense({...expense, category: e.target.value }); console.log(e.target.value);
            }}
          >
            <option value=""></option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>
        <button onClick={addExpense} className="btn btn-outline-primary" type="button">
          Submit
        </button>
        
      </form>
    </>
  );
};

export default ExpenseForm;