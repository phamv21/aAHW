num = 1
json.array!(@tweets) do |tweet|
    json.set! num do 
        json.content(tweet.content)
        json.user_id (tweet.user.id)
        json.username(tweet.user.username)
        json.(json.mentioned_users(tweet.mentioned_users,:id,:username))
    end
    num += 1
end

# json.(@tweets, *Tweet.column_names)