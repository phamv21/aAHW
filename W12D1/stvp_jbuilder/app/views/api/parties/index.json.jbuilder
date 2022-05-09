json.array! @parties.each do |party|
    json.partial! './api/parties/party', party:party
end