class CatRentalRequestsController < ApplicationController
    def index
        @rentals = CatRentalRequest.all.order(start_date: :desc)
    end

    def new
        if params[:cat_id]
            @cats = Cat.where(id:params[:cat_id])
            @rental = CatRentalRequest.new
            render :new

        else
            @cats = Cat.all
            @rental = CatRentalRequest.new
            render :new
        end

    end
    def create
        if params[:cat_id]
            @cats = Cat.where(id:params[:cat_id])
            @rental = CatRentalRequest.new(rental_params)
        else
            @rental = CatRentalRequest.new(rental_params)
            @cats = Cat.all
        end

        if @rental.save
            redirect_to cat_url(rental_params[:cat_id])
        else
            render :new
        end
    end

    def approve
        @rental = CatRentalRequest.find(params[:id])
        cat = @rental.cat
        @rental.approve!
        redirect_to cat_url(cat)
        
    end

    def deny
        @rental = CatRentalRequest.find(params[:id])
        cat = @rental.cat
        @rental.deny!
        redirect_to cat_url(cat)
    
    end


    private
    def rental_params
        params.require(:rental).permit(:cat_id,:start_date,:end_date)
    end
end