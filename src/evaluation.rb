class Evaluation
  def initialize(data:)
    @data = data["data"]
  end

  def revenue
    @data.sum { |item| item['account_category'] == 'revenue' ? item['total_value'] : 0 }
  end
end
