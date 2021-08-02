class Stack
    attr_reader :data
    def initialize
     @data = []
    end

    def push(el)
      
      data << el
    end

    def pop
      
      data.pop
    end

    def peek
      
      data.last
    end
end