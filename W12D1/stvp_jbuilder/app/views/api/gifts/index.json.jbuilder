json.array! @gifts.each do |gift|
    json.partial! './api/gifts/gift',gift:gift
end