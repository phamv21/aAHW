def four_sum?(array,sum)
    t = Time.now
    array.each_with_index do |num,i|
        if three_sum?(array[0..i]+array[i+1..-1],sum-num)
            p Time.now - t
            return true
        end
    end
    p Time.now - t
    false
    
end

def three_sum?(array,sum)
    #t = Time.now
    array.each_with_index do |num,i|
        if two_sum?(array[0..i]+array[i+1..-1],sum-num)
            #p Time.now - t
            return true
        end
    end
    #p Time.now - t
    false
end

def two_sum?(array,sum)
    #t = Time.now
    hash = Hash.new(0)
    array.each do |num|
        hash[num] += 1
        hash[sum-num] += 1 unless num*2 == sum
    end

    result = hash.has_value?(2)
    #p Time.now - t
    result
    
end



def okey_four_sum?(array,sum)
    t = Time.now
    i = 0
    array.sort! 
    length = array.length 
    while i < length - 3
        i1 = i + 1
        while i1 < length - 2
            i2 = i1 + 1
            while i2 < length - 1
                i3 = i2 + 1
                while i3 < length   
                        if (array[i]+array[i1]+array[i2]+array[i3]) == sum 
                            p Time.now - t
                            return true 
                        end
                    i3 += 1
                end  
                i2+=1      
            end

            i1 += 1
        end
        i += 1
    end
    p Time.now - t
    false
end