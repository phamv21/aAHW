class Static
  attr_reader :app
  def initialize(app)
    @app = app
  end

  def call(env)
    req = Rack::Request.new(env)
    matching_regexp = Regexp.new("^/public/(?<file_name>\.*)")
    matching = matching_regexp.match(req.path)
    if matching.nil?
      app.call(env)   
    else
      file_name = matching[:file_name]
      file_path = File.join(File.dirname(__FILE__),"public",file_name)
      begin
      file = File.open(file_path)
      rescue
        ["404",{},"file was not founded"] 
      else   
        ["200",{"Content-type"=>"mime-type"},file] 
      end
    end
  end
end
