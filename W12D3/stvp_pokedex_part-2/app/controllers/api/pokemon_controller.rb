class Api::PokemonController < ApplicationController
  def index 
    sleep 0.5
    @pokemon = Pokemon.all 
    render :index 
  end


  def show 
    sleep 0.5
    @pokemon = Pokemon.find(params[:id])
    render :show
  end

  def create
    # sleep 0.5
    @pokemon = Pokemon.new(pokemon_params)
    if @pokemon.save
        render :show
    else
      render json: @pokemon.errors.full_messages, status: 401
    end
  end

  private
  
  def pokemon_params
    params.require(:pokemon).permit(:name, :image_url, :attack, :defense, :poke_type, :move_names => [])
  end

end
