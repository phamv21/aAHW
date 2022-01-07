require_relative 'db_connection'
require 'active_support/inflector'
# NB: the attr_accessor we wrote in phase 0 is NOT used in the rest
# of this project. It was only a warm up.

class SQLObject
  def self.columns
    # ...
    return @columns unless @columns.nil?

    @columns =  DBConnection.execute2(<<-SQL)
      SELECT * FROM #{self.table_name}
    SQL
    .first.map{|el| el.to_sym}
 
  end

  def self.finalize!
    columns = self.columns
    

    columns.each do |column|

      define_method(column) do #getter method
        @attributes ||= {}
       @attributes[column] 
       
      end

      define_method("#{column}=") do |val| #setter method
        @attributes ||= {}
        @attributes[column] = val
      end


    end
  end

  def self.table_name=(table_name)
    # ...
    @table_name = table_name
  end

  def self.table_name
    # ...
    return self.name.to_s.tableize if @table_name.nil? 
    @table_name
  end

  def self.all
    # ...
    results = DBConnection.execute(<<-SQL)
      SELECT 
      *
      FROM 
      #{self.table_name}
    SQL

    parse_all(results)
  end

  def self.parse_all(results)
    # ...
    array = []
    results.each do |result|
      array << self.new(result)
    end
    array


  end

  def self.find(id)
    # ...
    result = DBConnection.execute(<<-SQL)
      SELECT 
      *
      FROM 
      #{self.table_name}
      WHERE 
      id = #{id}
    SQL
    return nil if result.empty?
    self.new(result.first)
  end

  def initialize(params = {})
    # ...
    self.class.finalize!
    columns = self.class.columns
    params.each do |k,v|
      raise "unknown attribute '#{k}'" unless columns.include?(k.to_sym)
      self.send("#{k}=",v)
    end
  end

  def attributes
    # ...
    @attributes ||= {}

  end

  def attribute_values
    # ...
    columns = self.class.columns
    values = columns.map{|column|self.send(column)}

  end

  def insert
    # ...
    values = self.attribute_values[1..-1]
    columns = self.class.columns[1..-1]
    operator = (['?']* (values.length)).join(',')
    #values =  values.join(",")

    DBConnection.execute(<<-SQL,*values)
        INSERT INTO
       #{self.class.table_name} (#{columns.join(',')})
        VALUES
        (#{operator});
    SQL
    self.id= DBConnection.last_insert_row_id
  end

  def update
    # ...
    values = self.attribute_values.rotate
    columns = self.class.columns[1..-1]
    operator = columns.join(" = ?,")+" = ?"
    DBConnection.execute(<<-SQL,*values)
        UPDATE
          #{self.class.table_name}
        SET
          #{operator}
        WHERE
          id = ?;
    SQL

  end

  def save
    # ...
    return self.update unless self.id.nil?
    self.insert
  end
end
