class SessionsController < ApplicationController
before_action :ensure_current_user, except:[:new,:create]

    def new #login
        return redirect_to "/bands" if current_user && current_user.activated?
        @activation_token = params[:activation_token]
        @user_details = User.new
        render :new
    end

    def create
        @activation_token = params[:activation_token]
        @user_details = User.new(user_params)
        @user = User.find_by_credentials(params[:user][:username],params[:user][:password])
        if @user.nil?
            flash[:error] = ["Wrong credentails"]
            render :new 
        elsif !@user.activated?
            if @user.activation_token == @activation_token
                @user.update(activated:true)
                flash[:notice] = 'You have successfully activated your account'
                login!(@user)
            else
                flash[:notice] = "you have entered valid credentials. \n But your account did not active yet"
                render '/users/activate'
            end 
        else
            flash[:notice] = "Success Login"
            login!(@user)
        end
    end

    def destroy #logout
        logout!
        redirect_to '/'
    end

   
    private
    def user_params
        params.require(:user).permit(:username,:password)
    end

end