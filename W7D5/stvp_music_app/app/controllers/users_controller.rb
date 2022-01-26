class UsersController < ApplicationController
    before_action :ensure_current_user, except:[:new,:create,:activate]
    
    def activate
        if current_user.nil? 
            redirect_to "/session/new?activation_token=#{params[:activation_token]}"
        elsif current_user.activated?
            flash[:notice] = 'You have already active your account'
             redirect_to "/bands"
        elsif current_user.activation_token == params[:activation_token]
            current_user.update(activated:true)
            flash[:notice] = 'you have sucessfully active your account.'
            redirect_to "/bands"
        else
            render :activate
        end
    end

    def new
        @user = User.new
        render :new

    end

    def create
        @user = User.new(user_params)
       if @user.save
            flash[:notice] = 'You have created your account succesful'
            msg = UserMailer.welcome_email(@user)
            msg.deliver_now
            login!(@user)
       elsif 
           flash[:error] = @user.errors.full_messages
           render :new
       end
    end

    private
    def user_params
        params.require(:user).permit(:username,:password)
    end


end