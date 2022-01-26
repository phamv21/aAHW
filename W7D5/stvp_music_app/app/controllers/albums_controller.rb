class AlbumsController < ApplicationController
before_action :ensure_current_user, except: [:show]
before_action :ensure_active_user
    
    def show
        @album = Album.find_by(id:params[:id])
        render :show
    end

    def new
        @bands = Band.all
        @current_band = Band.find_by(id:params[:band_id])
        @album = Album.new
        render :new
        
    end

    def create
        @bands = Band.all
        @album = Album.new(album_params)
        @current_band = Band.find_by(id:album_params[:band_id])
        if @album.save
            flash[:notice] = "Successfully created an album"
            redirect_to album_url(@album)
        else
            flash[:error] = @album.errors.full_messages
            render :new

        end
        
    end

    

    def edit
        
    end

    def update
        
    end

    def destroy
        
    end
    private
    def album_params 
        params.require(:album).permit(:title,:year,:live,:band_id)
    end
end