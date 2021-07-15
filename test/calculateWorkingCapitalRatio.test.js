import getworkingCapitalRatio from '../src/calculateWorkingCapitalRatio.js';

  describe('Test Calculating Assets', () => {

    const assetDebitItem_1 = {
      account_category: 'assets',
      account_type: 'current',
      value_type: 'debit',
      total_value: 400,
    };
    const assetDebitItem_2 = {
      account_category: 'assets',
      account_type: 'current_accounts_receivable',
      value_type: 'debit',
      total_value: 500,
    };

    const assetCreditItem_1 = {
      account_category: 'assets',
      account_type: 'bank',
      value_type: 'credit',
      total_value: 125,
    };
    const assetCreditItem_2 = {
      account_category: 'assets',
      account_type: 'current',
      value_type: 'credit',
      total_value: 500,
    };


    const liabilityDebitItem_1 = {
      account_category: 'liability',
      account_type: 'current',
      value_type: 'debit',
      total_value: 150,
    };

    const liabilityDebitItem_2 = {
      account_category: 'liability',
      account_type: 'current_accounts_payable',
      value_type: 'debit',
      total_value: 250,
    };
    const liabilityCreditItem_1 = {
      account_category: 'liability',
      account_type: 'current_accounts_payable',
      value_type: 'credit',
      total_value: 40,
    };
    const liabilityCreditItem_2 = {
      account_category: 'liability',
      account_type: 'current',
      value_type: 'credit',
      total_value: 65,
    };

    test('when items are empty ', () => {
      expect(getworkingCapitalRatio([])).toEqual(NaN);
    });
    test('when have one asset debit', () => {
      expect(getworkingCapitalRatio([assetDebitItem_1])).toEqual(Infinity);
    });
    test('when have one asset credit', () => {
      expect(getworkingCapitalRatio([assetCreditItem_1])).toEqual(-Infinity);
    });
    test('when have one laibility debit', () => {
      expect(getworkingCapitalRatio([liabilityDebitItem_2])).toEqual(0);
    });

    test('when have one laibility credit', () => {
      expect(getworkingCapitalRatio([liabilityCreditItem_1])).toEqual(-0);
    });

    test('when have one multiple types of  items', () => {
      expect(getworkingCapitalRatio([assetDebitItem_2,assetCreditItem_1,liabilityDebitItem_2,liabilityCreditItem_1])).toBeCloseTo(1.785);
    });
    
  });

