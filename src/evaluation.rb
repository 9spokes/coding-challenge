class Evaluation
  ZERO = 0.0

  def initialize(data:)
    @data = data["data"]
  end

  def revenue
    @revenue ||= @data.sum(ZERO) { |item| item['account_category'] == 'revenue' ? coerce(item['total_value']) : ZERO }
  end

  def expenses
    @expenses ||= @data.sum(ZERO) { |item| item['account_category'] == 'expense' ? coerce(item['total_value']) : ZERO }
  end

  def gross_profit_margin
    @gross_profit_margin ||=
      if revenue.zero?
        :nan
      else
        @data.sum(ZERO) do |item|
          item['account_type'] == 'sales' && item['value_type'] == 'debit' ? coerce(item['total_value']) : ZERO
        end / revenue
      end
  end

  def net_profit_margin
    @net_profit_margin ||= revenue - expenses
  end

  def working_capital_ratio
    @net_profit_margin ||=
      begin
        assets =
          @data.sum(ZERO) do |item|
            next ZERO unless item['account_category'] == 'assets' \
                      && %w[current bank current_accounts_receivable].include?(item['account_type'])

            credit_debit_sign(item) * coerce(item['total_value'])
          end

        liabilities =
          @data.sum(ZERO) do |item|
            next ZERO unless item['account_category'] == 'liability' \
                      && %w[current current_accounts_payable].include?(item['account_type'])

            credit_debit_sign(item) * coerce(item['total_value'])
          end

        liabilities.zero? ? :nan : assets / liabilities
      end
  end

  private

  def credit_debit_sign(item)
    case item['value_type']
    when 'debit'
      1.0
    when 'credit'
      -1.0
    else
      ZERO
    end
  end

  def coerce(value)
    value || ZERO
  end
end
