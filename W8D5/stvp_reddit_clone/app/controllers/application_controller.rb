class ApplicationController < ActionController::Base
    
    def login!(usr)
        session[:session_token] = usr.session_token
        redirect_to "/"
    end
    
    def logout!
        current_user.try(:reset_session_token)
        session[:session_token] = nil
        redirect_to new_session_url
    end
    
    def current_user
        return nil if session[:session_token].nil?
        User.find_by(session_token:session[:session_token])
    end
    
    def require_current_user!
        redirect_to new_session_url if current_user.nil?
    end
    
    helper_method :current_user 
end
