json.partial! './api/parties/party', party:@party
json.guests do
    json.array! @party.guests.each do |guest|
        json.partial! './api/guests/guest2' ,guest:guest
    end
end