class ApplicationController < ActionController::Base
helper_method :current_user
    def current_user
        return nil if session[:session_token].nil?
        @current_user ||= User.find_by(session_token:session[:session_token])
    end

    def login!(user)
        session[:session_token] = user.session_token
        # @current_user = user
        redirect_to '/'
end
    def logout!
        session[:session_token] = nil
        @current_user.try(:reset_session_token)
        
    end

    def require_current_user!
        if current_user.nil?
            redirect_to new_session_url
        end
    end

end

