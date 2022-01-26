class ApplicationController < ActionController::Base
    helper_method :current_user
    def login!(user)
        @user = user
        session[:session_token] = user.session_token   
        if @user.activated?
        redirect_to '/bands'
        else
        redirect_to activate_users_url
        end
    end

    def current_user

        return nil if session[:session_token].nil?
        User.find_by(session_token:session[:session_token])

    end

    def logout!
        current_user.try(:reset_session_token!)
        session[:session_token] = nil
    end

    def ensure_current_user
        if current_user.nil? 
            #should check out the avialability of root
            redirect_to "/session/new" 
        end
        
    end

    def ensure_active_user
        unless current_user.activated?
            redirect_to activate_users_url
        end
    end
end
