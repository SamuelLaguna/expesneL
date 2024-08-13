
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import categories from "../categories";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { BASE_URL } from "../../constant";
// // import { useState } from "react";



// const schema = z.object({
//   description: z.string().min(1, { message: "Description is required" }),
//   amount: z.number().positive({ message: "Amount must be a positive number" }),
//   category: z.string().min(1, { message: "Category is required" }),
// });

// type FormData = z.infer<typeof schema>;

// interface ExpenseFormProps{
//   addOnExpense:(data: FormData) => void;
  
// }

//  const expenseForm = ({addOnExpense}: ExpenseFormProps) => {
//   const {register, handleSubmit, formState:{errors}} = useForm<FormData>({resolver:zodResolver(schema)})
//   const [expense, setExpense] = useState({
//     id:0,
//     amount:  "",
//     description: "",
//     category: ""


//  }


// const ExpenseForm = ({addOnExpense}:ExpenseFormProps) => {
//   const [data, setData] = useState<ExpenseFormProps[]>([])
//   const [currentData, setcurrentData] = useState<ExpenseFormProps>({} as ExpenseFormProps);
//   const {
//       register,
//       handleSubmit,
//       formState: { errors }
//   } = useForm<FormData>({
//       resolver: zodResolver(schema)
//   });

//     const [list, setList] = useState<FormData[]>([])

//     // const onSubmit = (data: FormData) => {
//     //   addOnExpense(data)
      
//     // };

//     const fetchData = () => {
//       axios.get(BASE_URL + "Expense")
//       .then((response) => {
//         setData(response.data);
//       })
//     }
  
//     useEffect(() => {
//       fetchData();
//     }, []); 

//     const handleAdd = () => {
    
//       setcurrentData({} as ExpenseFormProps);
//     };

    
//     return (
//         <>
//         {/* onSubmit={handleSubmit(addOnExpense)} */}
//       <form >
//         <div className="mb-3">
//           <label htmlFor="description" className="form-label">
//             Description
//           </label>
//           <input
//             id="description"
//             type="text"
//             className="form-control"
//             {...register("description")}
//             onChange={(e) => setExpense({...expense, description: e.target.value  })}
//             />
//           {errors.description && (
//               <p className="text-danger">{errors.description.message}</p>
//             )}
//         </div>
//         <div className="mb-3">
//           <label htmlFor="amount" className="form-label">
//             Amount
//           </label>
//           <input
//             id="amount"
//             type="number"
//             className="form-control"
//             {...register("amount", { valueAsNumber: true })}
//             onChange={(e)=> setExpense({...expense, amount: e.target.value })}
//             />
//           {errors.amount && (
//               <p className="text-danger">{errors.amount.message}</p>
//             )}
//         </div>
//         <div className="mb-3">
//           <label htmlFor="category" className="form-label">
//             Category
//           </label>
//           <select
//             id="category"
//             className="form-control"
//             {...register("category")}
//             >
//             <option value=""></option>
//             {categories.map((category) => (
//                 <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//           {errors.category && (
//               <p className="text-danger">{errors.category.message}</p>
//             )}
//         </div>
//         <button  className="btn btn-outline-primary"  onClick={() => handleAdd()} type="submit">
//           Submit
//         </button>
       
//       </form>
//     </>
//   );
// };
 
 

// export default ExpenseForm;
 

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import categories from "../categories";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constant";
import { Expense } from "../../App";

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

const ExpenseForm = ({ fetchData, currentData }: ExpenseFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });



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

  return (
    <>
      <form >
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
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
          <label htmlFor="amount" className="form-label">
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
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            value={expense.category}
            className="form-control"
            {...register("category")}
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
        <button onClick={addExpense} className="btn btn-outline-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default ExpenseForm;