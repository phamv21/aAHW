json.array!(@users) do |user|
  json.(user, :id,:username)
  json.followed(current_user.follows?(user))
end
