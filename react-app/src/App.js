import './App.css';
import Card from 'react-bootstrap/Card';
import data from './data/data.json';

var _ = require('lodash');
const financeData = data.data;
const revenueData = FilterCategory('revenue');
const expenseData = FilterCategory('expense');

function FilterCategory(category) {
  const result = financeData.filter(
    (finData) => finData.account_category === category
  );

  if (result.length !== 0) {
    return result;
  } else return 0;
}

function CalculateTotal(dataArray) {
  const valueArray = dataArray.map((data) => {
    return data.total_value;
  });

  const totalValue = _.sum(valueArray);
  const calculationResult = _.ceil(totalValue);

  return calculationResult;
}

function FilterType() {
  let subResult, result;

  const total = financeData.filter(
    (finData) =>
      finData.account_type === 'sales' && finData.value_type === 'debit'
  );

  if (total.length !== 0) {
    subResult = total;
    result = CalculateGrossProfit(subResult);
  } else result = 0;

  return result;
}

function CalculateGrossProfit(dataArray) {
  const valueArray = dataArray.map((data) => {
    return data.total_value;
  });

  const totalValue = _.sum(valueArray);

  const divValue = _.divide(totalValue, revenueTotal) * 100;
  const calculationResult = _.ceil(divValue, 1);

  return calculationResult;
}

function CalculateNetProfit() {
  const subTotal = _.subtract(revenueTotal, expenseTotal);
  const totalValue = _.divide(subTotal, revenueTotal);

  const calculationResult = _.ceil(totalValue, 1) * 100;
  return calculationResult;
}

function calculateAssets() {
  const assetDebit = financeData.filter(
    (finData) =>
      finData.account_category === 'assets' &&
      finData.value_type === 'debit' &&
      (finData.account_type === 'current' ||
        finData.account_type === 'bank' ||
        finData.account_type === 'current_accounts_receivable')
  );

  const assetCredit = financeData.filter(
    (finData) =>
      finData.account_category === 'assets' &&
      finData.value_type === 'credit' &&
      (finData.account_type === 'current' ||
        finData.account_type === 'bank' ||
        finData.account_type === 'current_accounts_receivable')
  );

  const debitvalueArray = assetDebit.map((data) => {
    return data.total_value;
  });

  const creditvalueArray = assetCredit.map((data) => {
    return data.total_value;
  });

  const debitTotal = _.sum(debitvalueArray);
  const creditTotal = _.sum(creditvalueArray);
  const result = _.subtract(debitTotal, creditTotal);
  return result;
}

function calculateLiabilities() {
  const liabilityDebit = financeData.filter(
    (finData) =>
      finData.account_category === 'liability' &&
      finData.value_type === 'debit' &&
      (finData.account_type === 'current' ||
        finData.account_type === 'current_accounts_receivable')
  );

  const liabilityCredit = financeData.filter(
    (finData) =>
      finData.account_category === 'liability' &&
      finData.value_type === 'credit' &&
      (finData.account_type === 'current' ||
        finData.account_type === 'current_accounts_receivable')
  );

  const debitvalueArray = liabilityDebit.map((data) => {
    return data.total_value;
  });

  const creditvalueArray = liabilityCredit.map((data) => {
    return data.total_value;
  });

  const debitTotal = _.sum(debitvalueArray);
  const creditTotal = _.sum(creditvalueArray);
  const result = _.subtract(creditTotal, debitTotal);
  return result;
}

function CalculateWorkingCapitalRatio() {
  const asset = calculateAssets();
  const liability = calculateLiabilities();

  const result = _.divide(asset, liability) * 100;
  return _.ceil(result, 1);
}

const revenueTotal = CalculateTotal(revenueData);
const expenseTotal = CalculateTotal(expenseData);

function App() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Text>Revenue: ${revenueTotal.toLocaleString()}</Card.Text>
        <Card.Text>Expense: ${expenseTotal.toLocaleString()}</Card.Text>
        <Card.Text>Gross Profit Percentage: {FilterType()}%</Card.Text>
        <Card.Text>Net Profit Percentage: {CalculateNetProfit()}%</Card.Text>
        <Card.Text>
          Working Capital Ratio: {CalculateWorkingCapitalRatio()}%
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default App;
