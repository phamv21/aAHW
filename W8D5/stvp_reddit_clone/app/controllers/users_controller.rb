class UsersController < ApplicationController
    before_action :require_current_user!, except:[:new,:create]
    
    def new
        @user = User.new
        render :new
    end

    def create
        @user = User.new(user_params)
       if @user.save
            flash[:notice] = 'you have sucessfully created new account'
            login!(@user)
       elsif 
           flash[:errors] = @user.errors.full_messages
           render :new
       end
    end

    private
    def user_params 
        params.require(:user).permit(:username,:password)
    end
end
