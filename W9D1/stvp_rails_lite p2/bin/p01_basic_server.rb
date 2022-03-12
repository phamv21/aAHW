require 'rack'
app = Proc.new do |env|
    req = Rack::Request.new(env)
    res = Rack::Response.new
    res['Content-type'] = 'text/html'
    res.write("Pham Vu #{env['PATH_INFO']}")
    res.finish
    
end

Rack::Server.start(
    app: app,
    Port: 3000
)