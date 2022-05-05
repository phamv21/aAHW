class SessionsController < ApplicationController
    def new
        render :new  
    end

    def create
        @user = User.login_by_credential(session_params[:username],session_params[:password])
       unless @user.nil?
           login!(@user)
       else 
           render json: "wrong credential"
       end
    end

    def destroy
        logout!
        redirect_to new_session_url
    end
    private
    def session_params
        params.require(:user).permit(:username,:password)
    end

end