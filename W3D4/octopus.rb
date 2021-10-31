#array_fish =['fish', 'fiiish', 'fiiiiish', 'fiiiish', 'fffish', 'ffiiiiisshh', 'fsh', 'fiiiissshhhhhh']

#require 'byebug'
def sluggish_o(array)
    #find the longest string
    result = ""
    array.each do |el1|
        is_longest = true
        array.each do |el2|
            is_longest = false if el1.length < el2.length 
        end
        return result = el1 if is_longest
    end
    result
end

def dominant_o(array)
    merge_sort(array).last
end

def merge_sort(array)
    return array if array.length < 2

    middle_idx = (array.length / 2) - 1
    first_array = array[0..middle_idx]
    second_array = array[middle_idx+1..-1]

    merge_array(merge_sort(first_array), merge_sort(second_array))
end

def merge_array(array1,array2)
    result = []
    until array1.empty? && array2.empty?

        if array1.first.nil?
             result << array2.shift 
        elsif array2.first.nil?
            result << array1.shift
        elsif array1.first.length < array2.first.length 
            result << array1.shift
        else
            result << array2.shift 
        end
    end
    result
end

def clever_o(array)
    result = array[0]
    array.each do |el|
        result = el if result.length < el.length
    end
    result
end


def slow_dance(action,tiles)
    index = 0
tiles.each_with_index do |title,idx|
    return index = idx if action == title
end
index
end
#titles is hash
new_tiles = {
    0 =>"up", 
    1 =>"right-up", 
    2 =>"right", 
    3 =>"right-down", 
    4 =>"down", 
    5 =>"left-down", 
    6 =>"left",  
    7 =>"left-up" 
}
def constant_dance(action,titles)
    tiles[action]
end
