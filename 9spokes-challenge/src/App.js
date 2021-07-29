import './App.css';
import {useState, useEffect} from 'react';
import data from './data.json'

  
const getRevenue = () => {
  var totalRevenue = 0;
  data.data.forEach((obj)=>{
      if(obj.account_category === 'revenue'){
        totalRevenue = totalRevenue + obj.total_value
      }
  })
  return totalRevenue;
}

const getExpenses = () => {
  var totalExpense = 0;
  data.data.forEach((obj)=>{
    if(obj.account_category === 'expense'){
      totalExpense = totalExpense + obj.total_value
    }
  })
  return totalExpense
}

const getGrossProfitMargin = () => {
  var gpm = 0;
  data.data.forEach((obj)=>{
    if(obj.account_type === "sales" && obj.value_type === "debit"){     
      gpm = gpm + obj.total_value;
    }
  })
  return gpm;
}

const getNetProfitMargin = () =>{
  return ((getRevenue - getExpenses) / getRevenue)
}


function App() {
  const [revenue, setRevenue] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [grossProfitMargin, setGrossProfitMargin] = useState(0);
  const [netProfitMargin, setNetProfitMargin] = useState(0);
  const [workingCapitalRatio, setWorkingCapitalRatio] = useState(0);
  

  useEffect(() => {
     setRevenue(getRevenue);
     setExpenses(getExpenses);
     setGrossProfitMargin(getGrossProfitMargin);
     setNetProfitMargin(getNetProfitMargin);
  }, [])

  return (
    <div className="App">
      <h1>9Spokes Challenge:</h1>
      <p>Revenue: {revenue}</p>
      <p>Expenses: {expenses}</p>
      <p>Gross Profit Margin: {grossProfitMargin}%</p>
      <p>Net Profit Margin: {netProfitMargin}%</p>
      <p>Working Capital Ratio: {workingCapitalRatio}</p>

    </div>
  );
}

export default App;
