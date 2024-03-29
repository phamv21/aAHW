class Api::BenchesController < ApplicationController

    def index
        @benches = Bench.in_bounds(params[:filters])
        render :index
    end
    
    def create
        @bench = Bench.new(bench_params)
        if @bench.save
            render :show
        else
            render json: @bench.errors.full_messages, status: 402
        end
    end
end

private
def bench_params
    params.require(:bench).permit(:description,:lat,:lng,:seating,:photo)
end