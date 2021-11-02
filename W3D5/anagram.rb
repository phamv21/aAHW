def first_anagram?(str1,str2)
    t = Time.now
    array_of_str1 = str1.split("")
    array_of_str2 = str2.split("")
    
    result = mutate_arrays(array_of_str1).any?(array_of_str2)
    p Time.now - t
    result
end


def second_anagram?(str1,str2)
    t = Time.now
    array_of_str1 = str1.split("")
    array_of_str2 = str2.split("")

    array_of_str1.each do |c1|
        array_of_str2.delete(c1)
    end
    p Time.now - t
    array_of_str2.empty?
end

def third_anagram?(str1,str2)
    t = Time.now
    array_of_str1 = str1.split("")
    array_of_str2 = str2.split("")
    p Time.now - t
    array_of_str1.sort == array_of_str2.sort
end
def fourth_anagram?(str1,str2)
    t = Time.now
    h_s1 = Hash.new(0)
    h_s2 = Hash.new(0)
    
    str1.each_char do |el|
        h_s1[el] += 1
    end

    str2.each_char do |el|
        h_s2[el] += 1
    end


    result = h_s1 == h_s2
    p Time.now - t 
    result

end

def fifth_anagram?(str1,str2)
    t = Time.now
    h = Hash.new(0)
    
    str1.each_char do |el|
        h[el] += 1
    end

    str2.each_char do |el|
        h[el] -= 1
    end

    result = h.values.all?{|val| val == 0}
    p Time.now - t 
    result

end


def mutate_arrays(array)
    return [array] if array.length < 2 
    first = array.first
    tail_array = array[1..-1]
    mutate_arrays(tail_array).inject([]){|sum,el| sum + insert_to_array(first,el)}
end

def insert_to_array(num,array)
    result =  []
    length = array.length
    i = 0
    while i <= length do
        array_dup = array.dup
        result << array_dup.insert(i,num)
        i += 1
    end
    result
end