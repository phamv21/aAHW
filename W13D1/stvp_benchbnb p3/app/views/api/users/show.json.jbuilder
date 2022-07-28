# json.set! @user.id do
#     json.extract! @user, :id, :username
# end

json.partial! 'api/users/user', user:@user