def bad_windowed_max_range(array,size)
    t = Time.now
    length = array.length
    raise "window too big" if size > length
    possibilities = []
    i = 0
    while i <= length - size 
        possibilities << array[i...i+size]
        i += 1
    end
    ranges = possibilities.map do |window| 
        #window.sort!
        #window[-1] - window[0]
        window.max - window.min
    end

    result = ranges.max
    p Time.now - t
    result
end

def windowed_max_range(array,size)
    t = Time.now
    max_queue = MinMaxStackQueue.new(size)
    i = 0
    length = array.length
    while i < size
        max_queue.queue(array[i])
        i += 1
    end

    while i < length
        max_queue.queue(array[i])
        max_queue.dequeue
        i += 1
    end
    p Time.now - t
    max_queue.show_max_range
end







class MyStack
    def initialize
        @store = []
    end

    def peek
        @store.last
    end

    def size
        @store.size
        
    end

    def empty?
        @store.empty?
    end

    def pop
        @store.pop
    end

    def push(num)
        @store.push(num)
    end

end






class MyQueueStack
    def initialize(size)
        @size = size
        @queue_store = MyStack.new
        @de_queue_store = MyStack.new
        
    end

    def queue(num)
        if @queue_store.size < @size
            @queue_store.push(num)
        else
            @size.times do
                @de_queue_store.push(@queue_store.pop)
            end
            @queue_store.push(num)
        end
    end

    def dequeue
        @de_queue_store.pop
    end

    def peek
        @de_queue_store.peek
    end
    
end


class MinMaxStack
    def initialize
        @store = []
        @min = []
        @max = []
    end

    def peek
        @store.last
    end

    def size
        @store.size
        
    end

    def empty?
        @store.empty?
    end

    def pop
        pop_num = @store.pop
        @max.pop if @max.last == pop_num
        @min.pop if @min.last == pop_num
        pop_num
    end

    def push(num)
            if @max.empty?
                @max.push(num)
            elsif @max.last < num
                @max.push(num )
            end
            
            if @min.empty?
                @min.push(num)  
            elsif @min.last > num 
                @min.push(num) 
            end
        
        @store.push(num)
    end

    def min
        @min.last
    end
    def max
       @max.last
    end

end


class MinMaxStackQueue
   def initialize(size)
        @size = size
        @queue_store = MinMaxStack.new
        @de_queue_store = MinMaxStack.new
        @max_range = []
        
    end

    def queue(num)
        if @queue_store.size < @size
            @queue_store.push(num)
        else
            @size.times do
                @de_queue_store.push(@queue_store.pop)
            end
            @queue_store.push(num)
        end
    end

    def dequeue
        @de_queue_store.pop
        max_range_update
    end

    def peek
        @de_queue_store.peek
    end
    
    def current_min
        q_min = @queue_store.min
        d_min = @de_queue_store.min

        return q_min if d_min.nil?
        return d_min if q_min.nil?
        q_min < d_min ? q_min : d_min
    end
    def current_max
        q_max = @queue_store.max
        d_max = @de_queue_store.max
        return q_max if d_max.nil?
        return d_max if q_max.nil?
        q_max > d_max ? q_max : d_max
    end
    def max_range_update
        current_range = current_max - current_min
        @max_range.push(current_range) if @max_range.empty?
        @max_range.push(current_range) if @max_range.last < current_range
    end

    def show_max_range
        @max_range.last
    end

    
end



