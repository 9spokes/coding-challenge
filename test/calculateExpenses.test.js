  import getExpenses from '../src/calculateExpenses.js'

  describe('Test Calculate Expenses', () => {

    const expense_1 = {
      account_category: 'expense',
      total_value: 150,
    };
    const expense_2 = {
      account_category: 'expense',
      total_value: 200,
    };
    const asset_1 = {
      account_category: 'assets',
      total_value: 50,
    };
    const liability_1 = {
      account_category: 'liability',
      total_value: 75,
    };
    const revenue_1 = {
      account_category: 'revenue',
      total_value: 60,
    };

    test('empty items', () => {
      expect(getExpenses([])).toEqual(0);
    });
    test('one item', () => {
      expect(getExpenses([expense_1])).toEqual(150);
    });
    test('more than one items', () => {
      expect(getExpenses([expense_1, expense_2])).toEqual(350);
    });
    test('ignore irrelevant items', () => {
      expect(getExpenses([expense_1, asset_1])).toEqual(150);
    });
    test('mixed items scenario', () => {
      expect(getExpenses([expense_1, asset_1, expense_2, liability_1])).toEqual(350);
    });
  });