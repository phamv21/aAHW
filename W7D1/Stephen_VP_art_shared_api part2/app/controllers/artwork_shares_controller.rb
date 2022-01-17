class ArtworkSharesController < ApplicationController
    def create
        @artwork_share = ArtworkShare.new(artwork_share_params)
       if @artwork_share.save
           render json: @artwork_share
       elsif 
           render json: @artwork_share.errors.full_messages, status: :unprocessable_entity
       end
        
    end

    def destroy
        @artwork_share = ArtworkShare.find(params[:id])
        if @artwork_share.destroy
           render json: @artwork_share
       elsif 
           render json: @artwork_share.errors.full_messages, status: :unprocessable_entity
       end

    end

    protected
    def artwork_share_params
        result = {}
        if params[:user_id]
            result = params.require(:artwork_share).permit(:artwork_id,:favorite)
            result[:viewer_id] = params[:user_id]
            #result[:favorite] = true if params[:artwork_share][:favorite]
        elsif params[:artwork_id]
            result = params.require(:artwork_share).permit(:viewer_id,:favorite)
            result[:artwork_id]= params[:artwork_id]
            #result[:favorite] = true if params[:artwork_share][:favorite]
        end
    
        result
    end
end