class UsersController < ApplicationController
    before_action :require_current_user!, except:[:new,:create]
    def new
        render :new    
    end

    def create  
        @user = User.new(user_params)
        if @user.save
            login!(@user)
        else
            render json: @user.errors.full_messages, status: 422
        end
    end
    private
    def user_params
        params.require(:user).permit(:username,:password)
    end
end