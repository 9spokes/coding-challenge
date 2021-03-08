require 'json'
require_relative './evaluation'
require 'bigdecimal'
require 'active_support'
require 'active_support/number_helper'

def fmt_currency(value)
  ActiveSupport::NumberHelper.number_to_currency(value, precision: 0)
end

def fmt_percentage(value)
  ActiveSupport::NumberHelper.number_to_percentage(value * BigDecimal("100"), precision: 0)
end

def eval_and_print(data)
  evaluation = Evaluation.new(data: data)
  puts "Revenue: #{fmt_currency(evaluation.revenue)}"
  puts "Expenses: #{fmt_currency(evaluation.expenses)}"
  puts "Gross Profit Margin: #{fmt_percentage(evaluation.gross_profit_margin)}"
  puts "Net Profit Margin: #{fmt_percentage(evaluation.net_profit_margin)}"
  puts "Working Capital Ratio: #{fmt_percentage(evaluation.working_capital_ratio)}"
end

eval_and_print JSON.parse File.read File.expand_path ARGV[0]
