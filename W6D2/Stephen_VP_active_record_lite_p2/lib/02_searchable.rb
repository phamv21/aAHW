require_relative 'db_connection'
require_relative '01_sql_object'

module Searchable
  def where(params)
    # ...
    values = params.values
    keys = params.keys
    operator = keys.join(" = ? AND ")+" = ?"
    results =DBConnection.execute(<<-SQL,*values)
      SELECT
        *
      FROM
        #{self.table_name}
      WHERE
        #{operator};
    SQL
    results.map{|result| self.new(result)}
  end
end

class SQLObject
  # Mixin Searchable here...
extend Searchable
end
