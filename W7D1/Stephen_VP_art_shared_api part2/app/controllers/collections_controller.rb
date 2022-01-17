class CollectionsController < ApplicationController
    def index
        if params[:search]
            search_value = '%'+ params[:search] +'%'
            @collections = Collection.where(user_id:params[:user_id]) 
            @collections = @collections.where("LOWER(collections.title) LIKE LOWER(?)",search_value)   
        else
            @collections = Collection.where(user_id:params[:user_id])
        end
        render json: @collections

    end

    def create
        @collection = Collection.new(collection_params)
        if @collection.save
            render json: @collection
        else
            render json: @collection.errors.full_messages, status: :unprocessable_entity
        end
    end

    def destroy
        @collection = Collection.find(params[:id])
        if @collection.destroy
            render json: @collection
        else
            render json: @collection.errors.full_messages, status: :unprocessable_entity
        end
    end

    protected 
    def collection_params
        result = {}
        result = params.require(:collection).permit(:title,:artwork_id)
        result[:user_id] = params[:user_id] 
        result    
    end
end