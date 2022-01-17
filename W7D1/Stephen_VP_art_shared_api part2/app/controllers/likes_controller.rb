class LikesController < ApplicationController
    def index
       if params[:user_id]
           @likes = Like.where(user_id:params[:user_id])
       elsif params[:artwork_id]
           @likes = Like.where(likable_type:'Artwork',likable_id:params[:artwork_id])
       elsif params[:comment_id]
            @likes = Like.where(likable_type:'Comment',likable_id:params[:comment_id])
       end
       render json: @likes

    end

    def create
       @like = Like.new(like_params)
        if @like.save
            render json: @like
        else 
            render json: @like.errors.full_messages, status: :unprocessable_entity
        end
    end
    def destroy
        @like = Like.find(params[:id])
        if @like.destroy
            render json: @like
        else
            render json: @like.errors.full_messages, status: :unprocessable_entity
        end
    end

    protected
    def like_params
        result = {}
       if params[:artwork_id]
           result = params.require(:like).permit(:user_id)
           result[:likable_type] = "Artwork"
           result[:likable_id] = params[:artwork_id]
       elsif params[:comment_id]
            x = params[:comment_id]
            result = params.require(:like).permit(:user_id)
            result[:likable_type] = "Comment"
            result[:likable_id] = x
       end

       result
    end
end