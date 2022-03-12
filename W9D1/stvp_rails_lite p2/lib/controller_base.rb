require 'active_support'
require 'active_support/core_ext'
require 'erb'
require 'securerandom'
require_relative './session'
require_relative './flash'

class ControllerBase
  attr_reader :req, :res, :params, :session
  attr_accessor :flash

  # Setup the controller
  def initialize(req, res,route_params ={})
    @req = req
    @res = res
    @params = route_params.merge(req.params)
    @@protect_from_forgery ||= false
    @flash = Flash.new(req)
  end

  # Helper method to alias @already_built_response
  def already_built_response?
    @already_built_response ||= 0
    raise 'double render' if @already_built_response > 1
    @already_built_response == 1
  end

  # Set the response status code and header
  def redirect_to(url)
    res.status = 302
    res['Location'] = url
    @already_built_response ||= 0
    @already_built_response += 1
    
    raise 'double render' if @already_built_response > 1
    session.store_session(res)
    flash.store_flash(res)
  end

  # Populate the response with content.
  # Set the response's content type to the given type.
  # Raise an error if the developer tries to double render.
  def render_content(content, content_type)

    res.write(content)
    res['Content-type'] = content_type

    @already_built_response ||= 0
    @already_built_response += 1
    
    raise 'double render' if @already_built_response > 1

    session.store_session(res)
    flash.store_flash(res)
    nil
  end

  # use ERB and binding to evaluate templates
  # pass the rendered html to render_content
  def render(template_name)
      #finding path
      class_name = self.class.to_s.underscore
      file_name = "#{template_name}.html.erb"
      #views/my_controller/show.html.erb
      file_path = File.join(File.dirname(__FILE__).chomp("/lib"),"views",class_name,file_name)
      #read the content of template file
      file_content = File.read(file_path)
      content = ERB.new(file_content).result(binding)
      render_content(content,"text/html")
    nil
  end

  # method exposing a `Session` object
  def session
    @session ||= Session.new(req)
  end

  # use this with the router to call action_name (:index, :show, :create...)
  def invoke_action(name)
    if protect_from_forgery? && @req.request_method != 'GET'
      check_authenticity_token
    else
      form_authenticity_token
    end
    # check_authenticity_token
      self.send(name)
  end
#enable cross-side protection
  def self.protect_from_forgery
    @@protect_from_forgery = true
  end

  protected
    def protect_from_forgery?
      @@protect_from_forgery
    end

  def form_authenticity_token
      @token ||= generate_auth_token
      res.set_cookie("auth_token",value: @token, path: "/")

  end

  def check_authenticity_token
    cookie = req.cookies["auth_token"]
      unless cookie && cookie == @params["auth_token"]
      raise 'unauthorized session'
      end
  end

  def generate_auth_token
      SecureRandom.urlsafe_base64
  end





end

