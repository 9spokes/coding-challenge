  import getNetProfitMargin from '../src/calculateNetprofitMargin.js'

  describe('Test Calculating Net Profit Margin', () => {

    const totalRevenue_1 = 150;
    const totalExpense_1=100;

    const totalRevenue_2 = 50;
    const totalExpense_2=100;

    const totalRevenue_3 = 400;
    const totalExpense_3=400;

    const totalRevenue_4 = 0;
    const totalExpense_4=300;

    const totalRevenue_5 = 300;
    const totalExpense_5 =0;

    test('when both revenue and expenses are empty', () => {
      expect(getNetProfitMargin([0,0])).toEqual(NaN);
    });

    test('when revenue is higher than expenses', () => {
      expect(getNetProfitMargin(totalRevenue_1,totalExpense_1)).toBeCloseTo(0.3333);
    });

    test('when expenses are higher than revenue', () => {
      expect(getNetProfitMargin(totalRevenue_2,totalExpense_2)).toBeCloseTo(-1);
    });

    test('when expenses anda revenue are equal', () => {
      expect(getNetProfitMargin(totalRevenue_3,totalExpense_3)).toEqual(0);
    });

    test('when no revenue but expenses  exists', () => {
      expect(getNetProfitMargin(totalRevenue_4,totalExpense_4)).toEqual(-Infinity);
    });

    test('when no expenses but revenue exists', () => {
      expect(getNetProfitMargin(totalRevenue_5,totalExpense_5)).toEqual(1);
    });
    
  });