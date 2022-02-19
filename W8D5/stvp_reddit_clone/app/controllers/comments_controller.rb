class CommentsController < ApplicationController
    before_action :require_current_user!, except: [:show]
    def show
        @parent_comment = Comment.find_by(id:params[:id])
        @comment = Comment.new
        @my_vote = @parent_comment.my_vote
        render :show
    end

    def new
        if params[:post_id]
          @comment = Comment.new(post_id:params[:post_id])
          @post = @comment.post
          render :new  
        else
        
        end
    end
    
    def create
        @comment = Comment.new(comment_params)
        @post = @comment.post 
        @comment.author = current_user
        
        if @comment.save
           flash[:notice] =["success"]
           redirect_to post_url(@post)
        elsif 
           flash[:errors] = @comment.errors.full_messages
            if params[:reply]
            @parent_comment = @comment.parent_comment
            render :show
            else
           render :new
            end
        end
       
    end

    def upvote
        @comment = Comment.find_by(id:params[:id])
        current_user.upvote(@comment)
        redirect_to comment_url(@comment)
    end

    def downvote
        @comment = Comment.find_by(id:params[:id])
        current_user.downvote(@comment)
        redirect_to comment_url(@comment)
    end


    private
    def comment_params
        params.require(:comment).permit(:content,:post_id,:parent_id)
        
    end
end