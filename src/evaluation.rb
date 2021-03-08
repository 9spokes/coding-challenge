require 'bigdecimal'

class Evaluation
  ZERO = BigDecimal("0")

  def initialize(data:)
    @data = data["data"]
  end

  def revenue
    @revenue ||= @data.sum(ZERO) { |item| item['account_category'] == 'revenue' ? normalize(item['total_value']) : ZERO }
  end

  def expenses
    @expenses ||= @data.sum(ZERO) { |item| item['account_category'] == 'expense' ? normalize(item['total_value']) : ZERO }
  end

  def gross_profit_margin
    @gross_profit_margin ||=
      @data.sum(ZERO) do |item|
        item['account_type'] == 'sales' && item['value_type'] == 'debit' ? normalize(item['total_value']) : ZERO
      end / revenue
  end

  def net_profit_margin
    @net_profit_margin ||= (revenue - expenses) / revenue
  end

  def working_capital_ratio
    @working_capital_ratio ||=
      begin
        assets =
          @data.sum(ZERO) do |item|
            next ZERO unless item['account_category'] == 'assets' \
                       && %w[current bank current_accounts_receivable].include?(item['account_type'])

            credit_debit_sign(item) * normalize(item['total_value'])
          end

        liabilities =
          @data.sum(ZERO) do |item|
            next ZERO unless item['account_category'] == 'liability' \
                       && %w[current current_accounts_payable].include?(item['account_type'])

            credit_debit_sign(item) * normalize(item['total_value'])
          end

        assets / -liabilities
      end
  end

  private

  def credit_debit_sign(item)
    case item['value_type']
    when 'debit'
      1
    when 'credit'
      -1
    else
      ZERO
    end
  end

  def coerce(value)
    value || ZERO
  end

  def from_float(float)
    return float if float.nil?

    BigDecimal(float.to_s)
  end

  def normalize(float)
    coerce from_float float
  end
end
