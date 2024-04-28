import React from "react";
import { useRoutes, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import AddExpense from "./components/AddExpense";
import AddIncome from "./components/AddIncome";
import ViewIncome from "./components/ViewIncome";
import ViewExpense from "./components/ViewExpense";
import UpdateExpense from "./components/UpdateExpense";
import UpdateIncome from "./components/UpdateIncome";
import StdPending from "./components/StdPending";
import StdSuccess from "./components/StdSuccess";
import StdInvalid from "./components/StdInvalid";
import Home from "./components/Home";

function App() {
  return (
   <>
    <Header/>
    
    <div className="container">
      <Routes>

        
        <Route path="/" element={<Home/>}/>
        <Route path="/income/add" element={<AddIncome/>}/>
        <Route path="/income/" element={<ViewIncome/>}/>
        
        
        <Route path="/income/combined" element={<CombinedIncomeView/>}/>
        <Route path="/expense/combined" element={<CombinedExpenseView/>}/>
        

        <Route path="/expense/add" element={<AddExpense/>}/>
        <Route path="/expense/" element={<ViewExpense/>}/>
        <Route path="/expense/update/:id" element={<UpdateExpense/>}/>

        <Route path="/income/update/:id" element={<UpdateIncome/>}/>

        <Route path="/payments/pending" element={<StdPending/>}/>
        <Route path="/payments/success" element={<StdSuccess/>}/>
        <Route path="/payments/invalid" element={<StdInvalid/>}/>
      </Routes>
    </div>    
   </>
  );
}

// New component for combined view of AddIncome and ViewIncome
function CombinedIncomeView() {
  return (
    <>
      <ViewIncome />
      <br></br>
      <br></br>
      <hr></hr>
      <AddIncome />
      
    </>
  );
}

function CombinedExpenseView() {
  return (
    <>
      <ViewExpense />
      <br></br>
      <br></br>
      <hr></hr>
      <br></br>
      <AddExpense />
      
    </>
  );
}
export default App;
