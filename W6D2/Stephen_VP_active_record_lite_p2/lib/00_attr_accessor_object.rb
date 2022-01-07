class AttrAccessorObject
  def self.my_attr_accessor(*names)
    # ...
    names.each do |name|
        mt_name = "@#{name}".to_sym
        define_method(name){
            self.instance_variable_get(mt_name)
          }
        define_method("#{name}=") do |arg|
          self.instance_variable_set(mt_name,arg)
        end

      end
    
  end
end

