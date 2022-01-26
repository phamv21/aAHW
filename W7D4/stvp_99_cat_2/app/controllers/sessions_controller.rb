class SessionsController < ApplicationController
before_action :require_current_user!, except: [:new,:create]
    def new
        render :new
    end

    def create
        user = User.find_by_credentials(params[:user][:username],params[:user][:password])
        if user.nil?
            render json: 'Wrong credential'
        else
            login!(user)
            flash[:notice] = 'Login successful'
            redirect_to cats_url
        end
     
    end

    def destroy
        logout!
        flash[:notice] = 'You have logged out'
        redirect_to cats_url
    end

    private
   
end