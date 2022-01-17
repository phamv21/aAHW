class ArtworksController < ApplicationController
  def index
    if params[:user_id]
      if params[:section] == "owned"
        @arts = User.find(params[:user_id]).artworks
      elsif 
        @arts = User.find(params[:user_id]).shared_artworks
      end
    else
      @arts = Artwork.all
    end
      render json: @arts
  end

  def create
    @artwork = Artwork.new(artwork_params)
    if @artwork.save
      render json: @artwork
    else
      render @artwork.errors.full_messages, satus: :unprocessable_entity
    end
  end

  def destroy
    @artwork = Artwork.find(params[:id])  
    if @artwork.destroy
      render json: @artwork
    else
      render json: @artwork.errors.full_messages, status: :unprocessable_entity
    end
  end
  

  def favorite
    if params[:section] == "owned"
        @arts = User.find(params[:user_id]).artworks
        @arts = @arts.where(favorite:true)
    else
        @arts = User.find(params[:user_id]).viewed_artworks
        @arts = @arts.where(favorite:true).shared_artworks
      end
  render json: @arts
  end


  protected
  def artwork_params
    result = {}
    if params[:user_id]
      result = params.require(:artwork).permit(:title,:image_url,:favorite)
      result[:artist_id] = params[:user_id]
      
    else
      result = params.require(:artwork).permit(:title,:image_url,:artist_id,:favorite)
    
    end
  result
  end

end