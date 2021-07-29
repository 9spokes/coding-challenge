import './App.css';
import {useState, useEffect} from 'react';
import data from './data.json'


function App() {
  const [revenue, setRevenue] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [grossProfitMargin, setGrossProfitMargin] = useState(0);
  const [netProfitMargin, setNetProfitMargin] = useState(0);
  const [workingCapitalRatio, setWorkingCapitalRatio] = useState(0);
  
  //console.log(data.data)
    
  const getRevenue = (data) => {
      data.data.forEach((obj)=>{
          if(obj.account_category === 'revenue'){
              setRevenue(revenue + obj.total_value)
          }
      })
  }

  const getExpenses = (data) => {
    data.data.forEach((obj)=>{
      if(obj.account_category === 'expense'){
          setExpenses(expenses + obj.total_value)
      }
    })
  }

  const getGrossProfitMargin = (data) => {
    var sales = 0;
    data.data.forEach((obj)=>{
      if(obj.account_type === "sales" && obj.value_type === "debit"){     
        sales = sales + obj.total_value;
      }
    })
    setGrossProfitMargin(sales/revenue)
  }

  


  useEffect(() => {
     getRevenue(data);
     getExpenses(data);
     getGrossProfitMargin(data);
  }, [])

  return (
    <div className="App">
      <h1>9Spokes Challenge:</h1>
      <p>Revenue: {revenue}</p>
      <p>Expenses: {expenses}</p>
      <p>Gross Profit Margin: {grossProfitMargin}</p>
      <p>Net Profit Margin: {netProfitMargin}</p>
      <p>Working Capital Ratio: {workingCapitalRatio}</p>

    </div>
  );
}

export default App;
