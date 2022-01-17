class CommentsController < ApplicationController
    def index
        if params[:user_id]
            @comments = Comment.where(user_id:params[:user_id])
        elsif params[:artwork_id]
            @comments = Comment.where(artwork_id:params[:artwork_id])
        else
            @comments = Comment.all
        end
    render json: @comments
    end

    def create
        @comment = Comment.new(comment_params)
        if @comment.save
            render json: @comment
        else
            render json: @comment.errors.full_messages, status: :unprocessable_entity
        end

    end

    def destroy
        @comment = Comment.find(params[:id])

        if @comment.destroy
            render json: @comment
        else
            render json: @comment.errors.full_messages, status: :unprocessable_entity
        end
    end
    
    protected
    def comment_params
        result = {}
        if params[:user_id]
            result = params.require(:comment).permit(:body,:artwork_id)
            result[:user_id] = params[:user_id]
        elsif params[:artwork_id]
            result = params.require(:comment).permit(:body,:user_id)
            result[:artwork_id] = params[:artwork_id]
        end
        result
    end

end