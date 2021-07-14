  import getAssets from '../src/calculateAssets.js'

  describe('Test Calculating Assets', () => {

    const assetDebitItem_1 = {
      account_category: 'assets',
      account_type: 'current',
      value_type: 'debit',
      total_value: 10,
    };
    const assetDebitItem_2 = {
      account_category: 'assets',
      account_type: 'current_accounts_receivable',
      value_type: 'debit',
      total_value: 25,
    };

    const assetCreditItem_1 = {
      account_category: 'assets',
      account_type: 'bank',
      value_type: 'credit',
      total_value: 1400,
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
      total_value: 20,
    };

    const liabilityDebitItem_2 = {
      account_category: 'liability',
      account_type: 'current_accounts_payable',
      value_type: 'debit',
      total_value: 50,
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
      expect(getAssets([])).toEqual(0);
    });
    test('when have one debit', () => {
      expect(getAssets([assetDebitItem_1])).toEqual(10);
    });
    test('when have one credit', () => {
      expect(getAssets([assetDebitItem_1])).toEqual(-1);
    });
    
  });

