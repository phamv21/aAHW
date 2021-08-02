class Queue
    attr_reader :data
    def initialize
     @data = []
    end

    def enqueue(el)
      data.unshift(el)
    end

    def pop
      data.pop
    end

    def peek
      data.last
    end
end