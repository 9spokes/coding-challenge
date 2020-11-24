import React, { useState, useEffect } from 'react';
import './App.css';
import data from "./data/data.json";

//Function for calculating Total Revenue
function calculateRevenue (){
  var total_revenue = 0;
  data.data.forEach(d => {
    if(d.account_category === "revenue"){      
      total_revenue += d.total_value
    }
  })
  return Math.round(total_revenue);
}
//Function for calculating Total Expenses
function calculateExpense (){
  var total_expense = 0;
  data.data.forEach(d => {
    if(d.account_category === "expense"){      
      total_expense += d.total_value
    }
  })
  return Math.round(total_expense);
}
//Function for calculating Gross Profit Margin
function calculateGPM (){
  var total_GPM = 0;
  data.data.forEach(d => {
    if(d.account_type === "sales" && d.value_type === "debit"){      
      total_GPM += d.total_value
    }
  })
  return total_GPM;
}
//Function for calculating Working Capital Ratio
function calculateWCR (){
  var total_assets = 0;
  var total_liabilities = 0;
  data.data.forEach(d => {
    if(d.account_category === "assets"  && 
        (d.account_type === "current" || d.account_type === "bank" || d.account_type === "current_accounts_receivable")){ 
          if(d.value_type === "debit" ){
            total_assets += d.total_value
          } 
          else if(d.value_type === "credit"){
            total_assets -= d.total_value
          }    
    }

    if(d.account_category === "liability"  && 
        (d.account_type === "current" || d.account_type === "current_accounts_payable")){ 
          if(d.value_type === "credit" ){
            total_liabilities += d.total_value
          } 
          else if(d.value_type === "debit"){
             total_liabilities -= d.total_value
          }    
    }    
  })
  return (total_assets / total_liabilities) * 100;
}

function App() {
  const [revenue, setRevenue] = useState(0);
  const [expense, setExpense] = useState(0);
  const [gpm, setGPM] = useState(0);
  const [wcr, setWCR] = useState(0);
  useEffect(() => {
    setRevenue(calculateRevenue());
    setExpense(calculateExpense());
    setGPM(calculateGPM());
    setWCR(calculateWCR());
  }, []);
  
  return (
    <div className="App">
     <h1>9 Spokes Challenge</h1>
     <p>Revenue: ${revenue.toLocaleString()}</p>
     <p>Expenses: ${expense.toLocaleString()}</p>
     <p>Gross Profit Margin: {((gpm / revenue) * 100).toFixed(1)}%</p>
     <p>Net Profit Margin: {(((revenue - expense) / revenue) * 100).toFixed(1)}%</p>
     <p>Working Capital Ratio: {wcr.toFixed(1)}%</p>
    </div>
  );
}

export default App;