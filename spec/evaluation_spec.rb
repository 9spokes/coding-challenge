require 'spec_helper'

describe Evaluation do
  subject { described_class.new(data: data) }

  describe 'Revenue' do
    let(:data) do
      {
        "data" =>  [
          {
            "account_category" =>  "revenue",
            "total_value" =>  100.0
          },
          {
            "account_category" =>  "not-revenue",
            "total_value" =>  666.0
          },
          {
            "account_category" =>  "revenue",
            "total_value" =>  200.0
          }
        ]
      }
    end
    it 'returns proper values' do
      expect(subject.revenue).to be == 300.0
    end
  end
  describe 'Expenses' do
    let(:data) do
      {
        "data" =>  [
          {
            "account_category" =>  "expense",
            "total_value" =>  100.0
          },
          {
            "account_category" =>  "not-expense",
            "total_value" =>  666.0
          },
          {
            "account_category" =>  "expense",
            "total_value" =>  200.0
          }
        ]
      }
    end
    it 'returns proper values' do
      expect(subject.expenses).to be == 300.0
    end
  end
  describe 'Gross Profit Margin' do
    let(:data) do
      {
        "data" =>  [
          {
            "account_type" =>  "sales",
            "value_type" => "debit",
            "total_value" =>  100.0
          },
          {
            "account_type" =>  "not-salesalien",
            "value_type" => "debit",
            "total_value" =>  100.0
          },
          {
            "account_category" =>  "revenue",
            "total_value" =>  200.0
          }
        ]
      }
    end
    it 'returns proper values' do
      expect(subject.gross_profit_margin).to be == 0.5
    end
  end
  describe 'Net Profit Margin' do
    let(:data) do
      {
        "data" =>  [
          {
            "account_category" =>  "revenue",
            "total_value" =>  100.0
          },
          {
            "account_category" =>  "revenue",
            "total_value" =>  200.0
          },
          {
            "account_category" =>  "expense",
            "total_value" =>  100.0
          },
          {
            "account_category" =>  "expense",
            "total_value" =>  201.0
          }
        ]
      }
    end
    it 'returns proper values' do
      expect(subject.net_profit_margin).to be == -1.0
    end
  end
  describe 'Working Capital Ratio' do
    let(:data) do
      {
        "data" =>  [
          {
            "account_category" =>  "assets",
            "account_type" => "current",
            "total_value" =>  300.0,
            "value_type" => "debit"
          },
          {
            "account_category" =>  "assets",
            "account_type" => "current_accounts_receivable",
            "total_value" =>  100.0,
            "value_type" => "credit"
          },
          {
            "account_category" =>  "liability",
            "account_type" => "current",
            "total_value" =>  800.0,
            "value_type" => "debit"
          },
          {
            "account_category" =>  "liability",
            "account_type" => "current",
            "total_value" =>  400.0,
            "value_type" => "credit"
          },
          {
            "account_category" =>  "liability",
            "account_type" => "mistake",
            "total_value" =>  666.0
          }
        ]
      }
    end
    it 'returns proper values' do
      expect(subject.working_capital_ratio).to be == 0.5
    end
  end
end
