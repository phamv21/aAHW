class SessionsController < ApplicationController
    
    def new
        render :new
    end

    def create
        @user = User.login_by_credentials(session_params[:username],session_params[:password])
       if @user.nil?
           flash[:errors] = ["your credentials you have provided is wrong"]
            render :new

       elsif 
           flash[:notice] = "you have sucessfully login"
           login!(@user)
       end
    end

    def destroy
        logout!
    end

    private
    def session_params
        params.require(:user).permit(:username,:password)
    end

end