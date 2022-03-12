require 'erb'

class ShowExceptions
  attr_reader :app
  def initialize(app)
      @app = app  

  end

  def call(env)
    begin
      app.call(env)
    rescue => e
      render_exception(e)
    end
  end

  private

  def render_exception(e)
    @exception = e
    # ['200', {"Content-Type"=>"text/html"}, [" #{e}"]]
    file_path = File.join(File.dirname(__FILE__),"templates","rescue.html.erb")
    file_content = File.read(file_path)
    content = ERB.new(file_content).result(binding)
    res = Rack::Response.new
    
    ['500', {"Content-type"=>"text/html"}, ["#{content}"]]
    #res.status = "500"
    #res.write(content)
    #res['Content-type'] = 'text/html'
    #res.finish
  end

end
