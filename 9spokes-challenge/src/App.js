import './App.css';
import {useState, useEffect} from 'react';
import data from './data.json'

//calculating Revenue  
const getRevenue = () => {
  var totalRevenue = 0;
  data.data.forEach((obj)=>{
      if(obj.account_category === 'revenue'){
        totalRevenue = totalRevenue + obj.total_value
      }
  })
  return Math.round(totalRevenue);
}

//calculating expenses
const getExpenses = () => {
  var totalExpense = 0;
  data.data.forEach((obj)=>{
    if(obj.account_category === 'expense'){
      totalExpense = totalExpense + obj.total_value
    }
  })
  return Math.round(totalExpense)
}

//calculating 
const getGrossProfitMargin = () => {
  var gpm = 0;
  data.data.forEach((obj)=>{
    if(obj.account_type === 'sales' && obj.value_type === 'debit'){     
      gpm = gpm + obj.total_value;
    }
  })
  return gpm;
}

//calculating working capital ratio
const getWorkingCapitalRatio = () => {
  var totalAssets = 0;
  var totalLiabilites = 0;
  data.data.forEach((obj)=>{
    if(obj.account_category === 'assets' && obj.value_type === 'debit' 
    && (obj.account_type === 'current'||obj.account_type === 'bank'||obj.account_type === 'current_accounts_receivable')){
      totalAssets = totalAssets + obj.total_value;
    }
    else if(obj.account_category === 'assets' && obj.value_type === 'credit' 
    && (obj.account_type === 'current'||obj.account_type === 'bank'||obj.account_type === 'current_accounts_receivable')){
      totalAssets = totalAssets - obj.total_value;
    }
    else if(obj.account_category === 'liability' && obj.value_type === 'credit' 
    && (obj.account_type === 'current'||obj.account_type === 'current_accounts_payable')){
      totalLiabilites = totalLiabilites + obj.total_value;
    }
    else if(obj.account_category === 'liability' && obj.value_type === 'debit' 
    && (obj.account_type === 'current'||obj.account_type === 'current_accounts_payable')){
      totalLiabilites = totalLiabilites - obj.total_value;
    }
  })

  return ((totalAssets/totalLiabilites)*100).toFixed(1)
}


function App() {
  const [revenue, setRevenue] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [grossProfitMargin, setGrossProfitMargin] = useState(0);
  const [workingCapitalRatio, setWorkingCapitalRatio] = useState(0);
  
  //fire the nested functions upon the rendering of the functional component
  useEffect(() => {
     setRevenue(getRevenue);
     setExpenses(getExpenses);
     setGrossProfitMargin(getGrossProfitMargin);
     setWorkingCapitalRatio(getWorkingCapitalRatio);
  }, [])

  return (
    <div className="App">
      <h1>9Spokes Challenge:</h1>
      <p>Revenue: ${revenue}</p>
      <p>Expenses: ${expenses}</p>
      <p>Gross Profit Margin: {((grossProfitMargin/revenue)*100).toFixed(1)}%</p>
      <p>Net Profit Margin: {(((revenue - expenses)/revenue)*100).toFixed(1)}%</p>
      <p>Working Capital Ratio: {workingCapitalRatio}%</p>

    </div>
  );
}

export default App;
