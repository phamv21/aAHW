class ApplicationController < ActionController::Base
    helper_method :current_user, :current_user_session

    def login!(user)
        @current_user = user
        new_session = UserSession.create!(user_id:@current_user.id ,session_device:request.env['HTTP_USER_AGENT'])
        session[:session_token] = new_session.session_token

    end

    def current_user
        result = current_user_session
        return result.user if result
        nil
    end

    def current_user_session
        return nil if session[:session_token].nil?
        UserSession.find_by(session_token:session[:session_token])
    end

    def logout!
        current_user_session.try(:destroy!)
        session[:session_token] = nil
    end
    def require_current_user!
        if current_user.nil?
            flash[:notice] = 'Your action is required login'
            redirect_to cats_url    
        end
    end
end

