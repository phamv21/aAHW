require_relative '03_associatable'

# Phase IV
module Associatable
  # Remember to go back to 04_associatable to write ::assoc_options

  def has_one_through(name, through_name, source_name) # class Cat - house - human - house
    # ...
    #self.assoc_options[name]
      define_method(name) do
      through_option = self.class.assoc_options[through_name] #BelongToOptions Cat -human
      source_option =  through_option.model_class.assoc_options[source_name] #BelongToOptions human - house
      foreign_id_through = self.send(through_option.foreign_key) 

      fetch =  DBConnection.execute(<<-SQL,foreign_id_through)
        SELECT
          b.*
        FROM
          (SELECT
            *
          FROM
            #{through_option.table_name}
          WHERE
            #{through_option.primary_key} = ?) AS a
        JOIN
          #{source_option.table_name} AS b
          ON a.#{source_option.foreign_key} = b.#{source_option.primary_key}
      SQL
        return nil if fetch.empty?
        source_option.model_class.new(fetch.first)

      end
  end
end
