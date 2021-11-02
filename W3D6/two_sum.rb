def bad_two_sum?(array,sum)
    t = Time.now
    i = 0 
    length = array.length 
    while i < length - 1
        j = i + 1
        while j < length
            if (array[i]+array[j]) == sum
                p Time.now - t
                return true 

            end
            j += 1
        end
        i += 1
    end
    p Time.now - t
    false
end

def okey_two_sum?(array,sum)
    t = Time.now
    i = 0
    array.sort! 
    length = array.length 
    while i < length - 1
        j = i + 1
        while j < length
            if (array[i]+array[j]) == sum 
                p Time.now - t
                return true 
            end
            j += 1
        end
        i += 1
    end
    p Time.now - t
    false
end

def two_sum?(array,sum)
    t = Time.now
    hash = Hash.new(0)
    array.each do |num|
        hash[num] += 1
        hash[sum-num] += 1 unless num*2 == sum
    end

    result = hash.has_value?(2)
    p Time.now - t
    result
    
end



