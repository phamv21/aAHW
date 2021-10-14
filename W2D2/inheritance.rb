class Employee
    attr_reader :boss, :salary, :name
    def initialize(name,title,salary,boss=nil)
        @name = name
        @title = title
        @salary = salary
        @boss = boss
        boss.add_employee(self) unless boss.nil?
    end
    def bonus(multiplier)
        salary * multiplier
    end

end

class Manager < Employee
    attr_reader :employees
    def initialize(name,title,salary,boss=nil)
    super
    @employees = []
    end

    def add_employee(employee)
        @employees << employee
    end
    def bonus(multiplier)
        bonus_sum = 0
        salary_sum = 0
        @employees.each do |employee|
        bonus_sum += employee.bonus(1) 
        salary_sum += employee.salary if employee.class == Manager
        end

        (bonus_sum +salary_sum) * multiplier
    end

end