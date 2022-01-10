class UsersController < ApplicationController
    def index
        @users = User.all
        render json: @users
    end


    def create
        @user = User.new(user_params)
        if @user.save!
            render json: params
        else
            render json: @user.errors.full_messages, status: :unprocessable_entity
        end
    end

    def new
        render json: params
    end

    def show
        render json: params
    end

    def update
        @user = User.find(params[:id])
        if @user.update(user_params)
            render json: @user
        else
            render @user.errors.full_messages, status: :unprocessable_entity
        end

    end



    protected
    def user_params
        params.require(:user).permit(:name,:email)
    end

end