json.(tweet, :content,:id,:created_at)

json.user(tweet.user, :id,:username)

json.mentions(tweet.mentions) do |mention|
  json.(mention, *Mention.column_names)
  json.user(mention.user, :id,:username)
end