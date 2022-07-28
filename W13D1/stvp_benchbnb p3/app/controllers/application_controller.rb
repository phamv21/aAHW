class ApplicationController < ActionController::Base
    

helper_method :ensure_current_user!, :current_user, :logged_in?

def current_user
    if session[:session_token].nil?
        return nil
    else
        
        return @current_user ||= User.find_by(session_token: session[:session_token])
    
    end
end

def login!(user)
    session[:session_token] = user.session_token
    @current_user = user
end

def logout!
    current_user.try(:reset_session_token)
    session[:session_token] = nil    
end

def ensure_current_user!
    redirect_to "/" unless current_user   
end

def logged_in?
     !current_user.nil?
end

end
