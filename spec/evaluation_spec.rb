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
      expect(subject.revenue).to be == 300
    end
  end
  describe 'Expenses' do
    it 'returns proper values'
  end
  describe 'Gross Profit Margin' do
    it 'returns proper values'
  end
  describe 'Net Profit Margin' do
    it 'returns proper values'
  end
  describe 'Working Capital Ratio' do
    it 'returns proper values'
  end
end
