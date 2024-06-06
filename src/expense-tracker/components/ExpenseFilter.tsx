import categories from "../categories";
interface FilterProps
{
    onSelectCategory: (category:string) => void;
}
const ExpenseFilter = ({onSelectCategory}:FilterProps) => {
  return (
  <>
  <select className="form-select" onChange={(e) => onSelectCategory(e.target.value)}>

  {/* <option value="">All Catergories</option>
  <option value="Groceries">Groceries</option>
  <option value="Utilites">Utilities</option>
  <option value="Enterainment">Entertainment</option>
  <option value="Food">Food</option>
  <option value="Shopping">Shopping</option> */}
  {categories.map(catagory => <option key={catagory} value={catagory}>{catagory}</option>)} 
</select>
  </>
  )
}

export default ExpenseFilter