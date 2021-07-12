  import getRevenue from '../src/calculateRevenue.js'

  describe('Test Calculate Revenue', () => {

    const revenue_1 = {
      account_category: 'revenue',
      total_value: 150,
    };
    const revenue_2 = {
      account_category: 'revenue',
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
    const expense = {
      account_category: 'expense',
      total_value: 60,
    };

    test('empty items', () => {
      expect(getRevenue([])).toEqual(0);
    });
    test('one item', () => {
      expect(getRevenue([revenue_1])).toEqual(150);
    });
    test('more than one items', () => {
      expect(getRevenue([revenue_1, revenue_2])).toEqual(350);
    });
    test('ignore irrelevant items', () => {
      expect(getRevenue([revenue_1, asset_1])).toEqual(150);
    });
    test('mixed items scenario', () => {
      expect(getRevenue([revenue_1, asset_1, revenue_2, liability_1])).toEqual(350);
    });
  });