
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import categories from "../categories";


const schema = z.object({
  description: z.string().min(1, { message: "Description is required" }),
  amount: z.number().positive({ message: "Amount must be a positive number" }),
  category: z.string().min(1, { message: "Category is required" }),
});

type FormData = z.infer<typeof schema>;

const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm<FormData>({
    resolver: zodResolver(schema)
});

const ExpenseForm = () => {
    const onSubmit = (data: FormData) => {
        console.log(data);
    };
    
    return (
        <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            id="description"
            type="text"
            className="form-control"
            {...register("description")}
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
            className="form-control"
            {...register("amount", { valueAsNumber: true })}
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
        <button className="btn btn-outline-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default ExpenseForm;
