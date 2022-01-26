class TracksController < ApplicationController
    before_action :ensure_current_user
    before_action :ensure_active_user

    def show 
        @track = Track.find_by(id:params[:id])    
        render :show
    end

    def new
        @albums = Album.all
        @current_album = Album.find_by(id:params[:album_id])
        @track = Track.new
        render :new
    end

    def create
        @albums = Album.all
        @current_album = Album.find_by(id:track_params[:album_id])
        @track = Track.new(track_params)
        if @track.save
            redirect_to track_url(@track)
        else
            flash[:error] = @track.errors.full_messages
            render :new
        end
        
    end

    def edit
        @albums = Album.all
        @track = Track.find_by(id:params[:id])
        @current_album = @track.album
        render :edit
    end
    def update
        @track = Track.find_by(id:params[:id])
        @albums = Album.all
        @current_album = @track.album
        if @track.update(track_params)
            redirect_to track_url(@track)
        else
            flash[:error] = @track.errors.full_messages
            render :edit
        end
    end

    def destroy
        @track = Track.find_by(id:params[:id])
        @album = @track.album
        if @track.destroy
        else
            flash[:error] = @track.errors.full_messages
        end
        redirect_to album_url(@album)
    end
    private
    def track_params
        params.require(:track).permit(:title,:orb,:album_id,:lyric,:regular)
    end

    
end