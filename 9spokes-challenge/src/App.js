import './App.css';
import {useState} from 'react';

function App() {
  const [revenue, setRevenue] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [grossProfitMargin, setGrossProfitMargin] = useState(0);
  const [netProfitMargin, setNetProfitMargin] = useState(0);
  const [workingCapitalRatio, setWorkingCapitalRatio] = useState(0);

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
