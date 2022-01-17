class UsersController < ApplicationController
    def index
        if params[:search]
        search_pattern = "%" + params[:search] +"%"
        @users = User.where("LOWER(users.username) LIKE LOWER(?)",search_pattern)
        else
        @users = User.all
        end

        render json: @users

    end

    def show
            @user = User.find(params[:id])
            render json: @user
    end

    def update
            @user = User.find(params[:id])
           if @user.update(user_params)
               render json: @user
           elsif 
               render json: @user.errors.full_messages, status: :unprocessable_entity
           end
    end


    def create
        @user = User.new(self.user_params)
        if @user.save
            render json: @user
        else
            render json: @user.errors.full_messages, satus: :unprocessable_entity
        end

    end
    def destroy
        @user = User.find(params[:id])
       if @user.destroy
           render json: @user
       elsif 
           render json: @user.errors.full_messages, status: :unprocessable_entity
       end
        
    end

    protected
    def user_params
        params.require(:user).permit(:username)
    end
end