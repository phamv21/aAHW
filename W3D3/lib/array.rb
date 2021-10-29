class Array
    def my_uniq
        result = []
        self.each do |el|
            result << el unless result.include?(el)
        end
        result
    end
    def two_sum
        result = []
        length = self.length
        i = 0
        while i < length - 1
            j = i + 1
            while j < length
                result << [i,j] if (self[i] + self[j]) == 0
                j += 1
            end

            i += 1
        end
        result
    end

    def my_transpose
        
         row_size = self.length
         col_size = self[0].length
         result = Array.new(col_size){[]}
        i = 0
        while i < col_size
            j = 0
            while j < row_size
                result[i] << self[j][i]
                j+= 1
            end
            i += 1
        end
        result
    end

    def stock_picker
        result = []
        length = self.length
        i = 0
        while i < length - 1
            best_outcome = self[i+1..-1].max - self[i]
            result << best_outcome unless best_outcome < 0
            i += 1
        end
        result.max
    end
    
end