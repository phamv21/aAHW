require_relative '02_searchable'
require 'active_support/inflector'

# Phase IIIa
class AssocOptions
  attr_accessor(
    :foreign_key,
    :class_name,
    :primary_key
  )

  def model_class
    # ...
    self.class_name.singularize.constantize
  end

  def table_name
    # ...
    self.model_class.table_name
  end
end

class BelongsToOptions < AssocOptions
  def initialize(name, options = {})
    # ...
    self.foreign_key = options[:foreign_key].nil? ? "#{name}_id".to_sym : options[:foreign_key]
    self.primary_key = options[:primary_key].nil? ? :id : options[:primary_key]
    self.class_name = options[:class_name].nil? ? name.to_s.camelcase : options[:class_name]

  end
end

class HasManyOptions < AssocOptions
  def initialize(name, self_class_name, options = {})
    # ...
    self.foreign_key = options[:foreign_key].nil? ? "#{self_class_name.downcase}_id".to_sym : options[:foreign_key]
    self.primary_key = options[:primary_key].nil? ? :id : options[:primary_key]
    self.class_name = options[:class_name].nil? ? name.to_s.singularize.camelcase : options[:class_name]
  end
end

module Associatable
  # Phase IIIb
  def belongs_to(name, options = {})
    # ...
    
    belongs = BelongsToOptions.new(name,options)
    @assoc_options ||= {} #save the Belongtooption isntant to class variable.
     @assoc_options[name] = belongs
    define_method(name) do
      foreign_id_value = self.send(belongs.foreign_key)

     fetch =  DBConnection.execute(<<-SQL,foreign_id_value)
        SELECT
          *
        FROM
          #{belongs.table_name}
        WHERE
          #{belongs.primary_key} = ?
      SQL
    return nil if fetch.empty?
     belongs.model_class.new(fetch.first)


    end
    

  end

  def has_many(name, options = {})
    # ...
    many = HasManyOptions.new(name,self.name,options)
   
    define_method(name) do 
      match_id = self.send(:id)
      fetch = DBConnection.execute(<<-SQL,match_id)
        SELECT 
          *
        FROM
          #{many.table_name}
        WHERE
          #{many.foreign_key} = ?;
      SQL
      fetch.map{|el|many.model_class.new(el)}
    end
  end

  def assoc_options
    # Wait to implement this in Phase IVa. Modify `belongs_to`, too.
    @assoc_options ||= {}
  end
end

class SQLObject
  # Mixin Associatable here...
  extend Associatable
end
