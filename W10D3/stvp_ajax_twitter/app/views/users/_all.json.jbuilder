json.array!(User.all) do |user|
#   json.(user, *User.column_names)
    json.(user,:id,:username)
end
