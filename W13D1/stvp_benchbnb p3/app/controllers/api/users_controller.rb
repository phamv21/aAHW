class Api::UsersController < ApplicationController
    before_action :ensure_current_user!, only:[:show,:update]
    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 402
        end
    end

    def show
        @user = User.find_by(params[:id])
        render :show
    end

    def update
        @user = User.find_by(params[:id])
        if @user && @user.update(user_params)
            render :show
        else
            render json: @user.errors.full_messages, status: 401
        end
    end
    private 
    def user_params
        params.require(:user).permit(:username,:password)
    end
end
