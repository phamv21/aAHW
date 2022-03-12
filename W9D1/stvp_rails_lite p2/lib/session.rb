require 'json'

class Session
  # find the cookie for this app
  # deserialize the cookie into a hash
  def initialize(req)
    value = req.cookies["_rails_lite_app"]
    @req_cookies = value.nil? ? {} : JSON.load(value)
  end

  def [](key)
    @req_cookies[key]
  end

  def []=(key, val)
    @req_cookies[key] = val
  end

  # serialize the hash into json and save in a cookie
  # add to the responses cookies
  def store_session(res)
    #first we make a harsh to for the value
    cookies_val = {path:"/",value:JSON.generate(@req_cookies)}
    res.set_cookie("_rails_lite_app",cookies_val)
  end
end
