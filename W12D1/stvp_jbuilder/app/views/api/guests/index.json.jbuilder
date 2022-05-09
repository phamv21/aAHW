json.array! @guests.each do |guest|

    if (guest.age < 50) && (guest.age > 40)  
        json.extract! guest, :name, :age, :favorite_color  
    else
        nil
    end    
        
end