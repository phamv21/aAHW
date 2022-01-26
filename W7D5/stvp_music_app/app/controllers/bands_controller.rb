class BandsController < ApplicationController
    before_action :ensure_current_user
    before_action :ensure_active_user
    def index
        @bands = Band.all
        render :index
    end
    def show
        @band = Band.find_by(id:params[:id])
        render :show
    end
    def new
        @band = Band.new
       render :new 
    end

    def create
        @band = Band.new(band_params)
       if @band.save
           flash[:notice] = 'Sucess'
           redirect_to bands_url
       else
           flash[:error] = @band.errors.full_messages
           render :new
       end
    end

    def edit
        @band = Band.find_by(id:params[:id])
        render :edit
    end

    def update
        @band = Band.find_by(id:params[:id])
        if @band.update(band_params)
            flash[:notice] = 'Update successfully'
            redirect_to bands_url
        else
        end
        
    end

    def destroy
        @band = Band.find_by(id:params[:id])
        if @band.destroy
            redirect_to "/bands"
        else
            flash[:error] = @band.errors.full_messages

        end
    end
    private
    def band_params
        params.require(:band).permit(:name)
    end
end