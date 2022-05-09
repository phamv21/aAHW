
if (guest.age > 50) || (guest.age < 40)  
        nil
else
     json.extract! guest, :name, :age, :favorite_color

    json.gifts do 
        json.array! guest.gifts.each do |gift|
            json.extract! gift, :title, :description
        end
    end

end    
        


     