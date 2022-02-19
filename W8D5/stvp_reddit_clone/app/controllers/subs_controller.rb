class SubsController < ApplicationController
    before_action :require_current_user! ,except: [:index, :show]
    def index
        @subs = Sub.all
        render :index
    end
    def show
        @sub = Sub.find_by(id:params[:id])
        @vote_of_posts = @sub.vote_of_post_by_sub
        render :show
    end

    def new
        @sub = Sub.new
        render :new
    end

    def create
        @sub = Sub.new(sub_params)
        @sub.moderator = current_user
       if @sub.save
           redirect_to sub_url(@sub)
           flash[:notice] = ["sucessfully createad a sub"]
       elsif 
           flash[:errors] = @sub.errors.full_messages
           render :new
       end
        
    end

    private
    def sub_params
        params.require(:sub).permit(:title,:description)
    end

end