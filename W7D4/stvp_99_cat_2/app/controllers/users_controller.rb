class UsersController < ApplicationController
    before_action :require_current_user!, except: [:new,:create]

    def new
        @user = User.new
        render :new
    end
    
    def create
        @user = User.new(user_params)
        if @user.save
            flash[:notice] = 'success'
            redirect_to cats_url
        else
            flash.now[:errors] = @user.errors.full_messages
            render :new
        end
        
    end

    #def destroy # should consider later - look at the session
    #    @user = User.find_by(session_token:session[:session_token])
    #    if @user.reset_session_token!
    #        redirect_to cats_url
    #        session[:session_token] = nil
    #    else
    #    end
    #end

    private
    def user_params
        params.require(:user).permit(:username, :password)
    end
end